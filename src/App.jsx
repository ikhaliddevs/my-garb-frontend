import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import {
  adapterModes,
  createServices,
  readDemoSettings,
  resetDemoStore,
  serviceScenarios,
  writeDemoSettings,
} from './services'
import { isServiceError } from './services/errors'
import { AuthScreens, DemoNotice, GuardedPlaceholder } from './auth/AuthScreens'

const navigation = [
  { label: 'Discover', path: '/' },
  { label: 'Requests and Orders', path: '/requests-orders' },
  { label: 'Messages', path: '/messages' },
  { label: 'Profile', path: '/profile' },
]

const roleRoutes = {
  public: {
    title: 'Public discovery shell',
    eyebrow: 'Public layout',
    lead: 'A responsive starting point for browsing MY GARB without building business workflows yet.',
    pathPrefix: '',
  },
  customer: {
    title: 'Customer workspace shell',
    eyebrow: 'Customer layout',
    lead: 'A private-area placeholder for future requests, orders, messages, and profile screens.',
    pathPrefix: '/customer',
  },
  designer: {
    title: 'Designer workspace shell',
    eyebrow: 'Designer layout',
    lead: 'A private-area placeholder for future portfolio, production, and discussion workflows.',
    pathPrefix: '/designer',
  },
  admin: {
    title: 'Admin workspace shell',
    eyebrow: 'Admin layout',
    lead: 'A separate administrative shell for later moderation and issue-resolution milestones.',
    pathPrefix: '/admin',
  },
}

function getCurrentPath() {
  return (window.location.pathname || '/') + window.location.search
}

function navigateTo(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function useRoute() {
  const [path, setPath] = useState(getCurrentPath)

  useEffect(() => {
    const handleRouteChange = () => setPath(getCurrentPath())
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  return path
}

function Button({ children, className = '', variant = 'primary', ...props }) {
  const variantClass = variant === 'secondary' ? 'btn-outline-primary' : `btn-${variant}`

  return (
    <button className={`btn myg-button ${variantClass} ${className}`.trim()} type="button" {...props}>
      {children}
    </button>
  )
}

function FormField({ id, label, error, helpText, ...props }) {
  const errorId = error ? `${id}-error` : undefined
  const helpId = helpText ? `${id}-help` : undefined
  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        aria-describedby={describedBy}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      />
      {helpText ? (
        <div className="form-text" id={helpId}>
          {helpText}
        </div>
      ) : null}
      {error ? (
        <div className="invalid-feedback" id={errorId}>
          {error}
        </div>
      ) : null}
    </div>
  )
}

function SelectField({ id, label, error, children, ...props }) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className={`form-select ${error ? 'is-invalid' : ''}`}
        aria-describedby={errorId}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <div className="invalid-feedback" id={errorId}>
          {error}
        </div>
      ) : null}
    </div>
  )
}

function AppAlert({ variant = 'info', title, children }) {
  return (
    <div className={`alert alert-${variant} myg-alert`} role={variant === 'danger' ? 'alert' : 'status'}>
      {title ? <strong>{title}</strong> : null}
      {children ? <span className={title ? 'ms-1' : ''}>{children}</span> : null}
    </div>
  )
}

function Spinner({ label = 'Loading' }) {
  return (
    <div className="d-inline-flex align-items-center gap-2" role="status" aria-live="polite">
      <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true"></span>
      <span>{label}</span>
    </div>
  )
}

function EmptyState({ title, children, action }) {
  return (
    <section className="state-panel" aria-labelledby="empty-state-title">
      <StatusBadge tone="muted">Empty</StatusBadge>
      <h2 id="empty-state-title">{title}</h2>
      <p>{children}</p>
      {action}
    </section>
  )
}

function ErrorState({ title, children, onRetry }) {
  return (
    <section className="state-panel state-panel-error" aria-labelledby="error-state-title">
      <StatusBadge tone="danger">Error</StatusBadge>
      <h2 id="error-state-title">{title}</h2>
      <p>{children}</p>
      {onRetry ? <Button onClick={onRetry}>Retry</Button> : null}
    </section>
  )
}

function StatusBadge({ children, tone = 'success' }) {
  const toneMap = {
    success: 'text-bg-success',
    warning: 'text-bg-warning',
    danger: 'text-bg-danger',
    muted: 'text-bg-secondary',
    info: 'text-bg-info',
  }

  return <span className={`badge rounded-pill ${toneMap[tone] || toneMap.success}`}>{children}</span>
}

function ConfirmationDialog({ open, title, children, triggerRef, onCancel, onConfirm }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const previousFocus = document.activeElement
    const triggerElement = triggerRef?.current
    dialogRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      ;(triggerElement || previousFocus)?.focus?.()
    }
  }, [onCancel, open, triggerRef])

  if (!open) return null

  return (
    <div className="dialog-backdrop" role="presentation">
      <section
        aria-labelledby="confirmation-title"
        aria-modal="true"
        className="confirmation-dialog"
        ref={dialogRef}
        role="dialog"
        tabIndex="-1"
      >
        <h2 id="confirmation-title">{title}</h2>
        <p>{children}</p>
        <div className="d-flex flex-wrap gap-2 justify-content-end">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </section>
    </div>
  )
}

function LinkButton({ children, className = '', onClick, path }) {
  return (
    <a
      className={className}
      href={path}
      onClick={(event) => {
        event.preventDefault()
        onClick?.(event)
        navigateTo(path)
      }}
    >
      {children}
    </a>
  )
}

function App() {
  const path = useRoute()
  const route = useMemo(() => resolveRoute(path.split('?')[0]), [path])
  const [demoSettings, setDemoSettings] = useState(readDemoSettings)
  const [sessionState, setSessionState] = useState({ status: 'loading', account: null })
  const [sessionRevision, setSessionRevision] = useState(0)
  const services = useMemo(() => createServices(demoSettings), [demoSettings])
  const sessionServices = useMemo(() => createServices({ ...demoSettings, identityId: sessionState.account?.id || demoSettings.identityId }), [demoSettings, sessionState.account?.id])

  useEffect(() => {
    let active = true
    services.accounts.restoreSession().then((account) => {
      if (active) setSessionState({ status: 'ready', account })
    }).catch((error) => {
      if (active) setSessionState({ status: 'error', account: null, error: error.message })
    })
    return () => { active = false }
  }, [services, sessionRevision])

  useEffect(() => {
    const reload = () => setSessionRevision((value) => value + 1)
    window.addEventListener('demo-session-changed', reload)
    return () => window.removeEventListener('demo-session-changed', reload)
  }, [])

  const onSessionChange = (account) => setSessionState({ status: 'ready', account })

  const updateDemoSettings = (patch) => {
    setDemoSettings(writeDemoSettings(patch))
  }

  if (route.type === 'not-found') {
    return <NotFound path={path} />
  }

  if (route.type === 'states') {
    return <StateDemoPage demoSettings={demoSettings} services={services} onSettingsChange={updateDemoSettings} />
  }

  if (route.type === 'services') {
    return <ServiceDemoPage demoSettings={demoSettings} services={services} onSettingsChange={updateDemoSettings} />
  }

  if (route.type === 'auth') {
    return <AuthScreens key={path} screen={route.screen} services={sessionServices} session={sessionState.account} onSessionChange={onSessionChange} navigate={navigateTo} />
  }

  if (route.type === 'discovery') {
    return <div className="auth-page"><header className="auth-header"><LinkButton className="auth-wordmark" path="/">PHASIONABLE</LinkButton></header>
      <main className="placeholder-content"><h1>Designer discovery</h1><p>Development placeholder. Designer discovery arrives in Milestone 06.</p>
        <LinkButton className="auth-primary" path="/customer/requests-orders?designer=designer-kemi">Open request placeholder for fictional Kemi Atelier</LinkButton>
        <LinkButton path="/login">Log in</LinkButton>
      </main><DemoNotice /></div>
  }

  if (route.type === 'shell' && !route.development && route.role !== 'public') {
    if (sessionState.status !== 'ready') return <div className="auth-page"><main className="placeholder-content">{sessionState.status === 'loading' ? <Spinner label="Restoring fictional session" /> : <ErrorState title="Demo session unavailable" onRetry={() => setSessionRevision((value) => value + 1)}>{sessionState.error}</ErrorState>}</main><DemoNotice /></div>
    return <GuardedPlaceholder role={route.role} services={sessionServices} session={sessionState.account} onSessionChange={onSessionChange} navigate={navigateTo} />
  }

  return (
    <LayoutShell
      activePath={path}
      demoSettings={demoSettings}
      onSettingsChange={updateDemoSettings}
      route={route}
      services={services}
    />
  )
}

function resolveRoute(path) {
  const authRoutes = { '/': 'welcome', '/welcome': 'welcome', '/login': 'login', '/signup': 'signup', '/forgot-password': 'recovery', '/reset-password': 'reset', '/verification': 'verification' }
  if (authRoutes[path]) return { type: 'auth', screen: authRoutes[path] }
  if (path === '/discover') return { type: 'discovery' }
  if (path === '/dev/states') {
    return { type: import.meta.env.DEV ? 'states' : 'not-found' }
  }

  if (path === '/dev/services') {
    return { type: import.meta.env.DEV ? 'services' : 'not-found' }
  }

  const development = path === '/dev' || path.startsWith('/dev/')
  if (development && !import.meta.env.DEV) return { type: 'not-found' }
  const shellPath = development ? path.slice(4) || '/' : path
  for (const [role, baseConfig] of Object.entries(roleRoutes)) {
    const config = development ? { ...baseConfig, pathPrefix: `/dev${baseConfig.pathPrefix}` } : baseConfig
    const prefix = config.pathPrefix
    const routesForRole = navigation.map((item) => `${prefix}${item.path === '/' ? '' : item.path}` || '/')
    const matchedRoute = routesForRole.find((routePath) => routePath === (development ? `/dev${shellPath === '/' ? '' : shellPath}` : path))

    if (matchedRoute) {
      const section = navigation[routesForRole.indexOf(matchedRoute)]
      return { type: 'shell', role, section, config, development }
    }
  }

  return { type: 'not-found' }
}

function LayoutShell({ activePath, demoSettings, onSettingsChange, route, services }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [identityLabel, setIdentityLabel] = useState('Loading demo identity')
  const menuButtonRef = useRef(null)
  const dialogTriggerRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    let active = true
    services.accounts
      .getCurrentIdentity()
      .then((identity) => {
        if (active) setIdentityLabel(`${identity.displayName}, demo ${identity.role}`)
      })
      .catch((error) => {
        if (active) setIdentityLabel(isServiceError(error) ? error.message : 'Demo identity unavailable')
      })

    return () => {
      active = false
    }
  }, [services])

  const roleNav = Object.entries(roleRoutes).map(([role, config]) => ({
    role,
    label: role === 'public' ? 'Public' : role[0].toUpperCase() + role.slice(1),
    path: `${route.development ? '/dev' : ''}${config.pathPrefix}${route.section.path === '/' ? '' : route.section.path}` || '/',
  }))

  return (
    <div className={`app-shell app-shell-${route.role}`}>
      <header className="site-header">
        <div>
          <LinkButton className="brand-link" path="/">
            MY GARB
          </LinkButton>
          <p className="demo-notice">Demo mode — simulated data and actions</p>
        </div>

        <nav className="role-tabs" aria-label="Layout shell examples">
          {roleNav.map((item) => (
            <LinkButton
              className={`role-tab ${route.role === item.role ? 'active' : ''}`}
              key={item.role}
              path={item.path}
            >
              {item.label}
            </LinkButton>
          ))}
        </nav>

        <div className="mobile-menu">
          <Button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            ref={menuButtonRef}
            variant="secondary"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
          </Button>
        </div>
      </header>

      <div className="workspace">
        <aside className="side-nav" aria-label={`${route.role} navigation`}>
          <NavigationLinks activePath={activePath} prefix={route.config.pathPrefix} />
        </aside>

        {menuOpen ? (
          <nav className="mobile-nav-panel" id="mobile-navigation" aria-label="Mobile navigation">
            <NavigationLinks
              activePath={activePath}
              prefix={route.config.pathPrefix}
              onNavigate={() => {
                setMenuOpen(false)
                menuButtonRef.current?.focus()
              }}
            />
          </nav>
        ) : null}

        <main className="content-area">
          <section className="intro-section">
            <p className="eyebrow">{route.config.eyebrow}</p>
            <h1>{route.config.title}</h1>
            <p className="lead">{route.config.lead}</p>
            <div className="identity-row">
              <StatusBadge tone={route.role === 'admin' ? 'warning' : 'success'}>{route.section.label}</StatusBadge>
              <span>{route.role === 'public' ? 'Guest visitor' : identityLabel}</span>
            </div>
          </section>

          <section className="summary-grid" aria-label="Milestone one shell summary">
            <div className="summary-tile">
              <span>Current section</span>
              <strong>{route.section.label}</strong>
            </div>
            <div className="summary-tile">
              <span>Scope</span>
              <strong>No business workflow yet</strong>
            </div>
            <div className="summary-tile">
              <span>Admin navigation</span>
              <strong>{route.role === 'admin' ? 'Separate shell active' : 'Separate from product nav'}</strong>
            </div>
          </section>

          <section className="component-preview" aria-labelledby="shared-components-title">
            <div>
              <p className="eyebrow">Shared components</p>
              <h2 id="shared-components-title">Form and state primitives</h2>
              <p>
                These examples use fictional milestone-one content only. Later milestones can connect them to
                approved service adapters.
              </p>
            </div>
            <div className="preview-controls">
              <FormField
                error="Choose a clear request title before continuing."
                id="sample-title"
                label="Sample labeled field"
                placeholder="Occasion outfit title"
              />
              <SelectField id="sample-role" label="Sample select">
                <option>Public visitor</option>
                <option>Customer shell</option>
                <option>Designer shell</option>
              </SelectField>
              <AppAlert variant="success" title="Success state.">
                The shared shell is ready for Milestone 1 review.
              </AppAlert>
              <div className="d-flex flex-wrap gap-2">
                <Button ref={dialogTriggerRef} onClick={() => setDialogOpen(true)}>
                  Open confirmation
                </Button>
                <LinkButton className="btn btn-outline-primary myg-button" path="/dev/states">
                  View state examples
                </LinkButton>
                <LinkButton className="btn btn-outline-primary myg-button" path="/dev/services">
                  View service controls
                </LinkButton>
              </div>
            </div>
          </section>

          <DevServicePanel
            compact
            demoSettings={demoSettings}
            onSettingsChange={onSettingsChange}
            services={services}
          />
        </main>
      </div>

      <ConfirmationDialog
        open={dialogOpen}
        title="Confirm sample action"
        triggerRef={dialogTriggerRef}
        onCancel={() => setDialogOpen(false)}
        onConfirm={() => setDialogOpen(false)}
      >
        This confirms the dialog keyboard and focus behavior only. No production action is performed.
      </ConfirmationDialog>
    </div>
  )
}

function NavigationLinks({ activePath, onNavigate, prefix = '' }) {
  return (
    <ul>
      {navigation.map((item) => {
        const path = `${prefix}${item.path === '/' ? '' : item.path}` || '/'
        const isActive = activePath === path

        return (
          <li key={item.label}>
            <LinkButton className={`nav-link ${isActive ? 'active' : ''}`} path={path} onClick={onNavigate}>
              {item.label}
            </LinkButton>
          </li>
        )
      })}
    </ul>
  )
}

function StateDemoPage({ demoSettings, onSettingsChange, services }) {
  const [showError, setShowError] = useState(true)

  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <LinkButton className="brand-link" path="/">
            MY GARB
          </LinkButton>
          <p className="demo-notice">Demo mode — simulated data and actions</p>
        </div>
        <LinkButton className="btn btn-outline-primary myg-button" path="/dev">
          Back to shells
        </LinkButton>
      </header>
      <main className="content-area content-area-single">
        <section className="intro-section">
          <p className="eyebrow">Development-only</p>
          <h1>Shared state examples</h1>
          <p className="lead">A quick review page for loading, empty, error, and success states.</p>
        </section>
        <div className="state-grid">
          <section className="state-panel" aria-label="Loading example">
            <StatusBadge tone="info">Loading</StatusBadge>
            <Spinner label="Loading sample records" />
          </section>
          <EmptyState
            title="No sample records"
            action={<Button variant="secondary">Create sample placeholder</Button>}
          >
            Later screens can reuse this when a service returns an empty list.
          </EmptyState>
          {showError ? (
            <ErrorState
              title="Sample request failed"
              onRetry={() => {
                setShowError(false)
              }}
            >
              The retry action is visible and keeps the page in place.
            </ErrorState>
          ) : (
            <section className="state-panel" aria-label="Recovered success example">
              <StatusBadge>Recovered</StatusBadge>
              <h2>Retry succeeded</h2>
              <p>The success state appears without losing the rest of the page.</p>
            </section>
          )}
          <section className="state-panel" aria-label="Success example">
            <StatusBadge>Success</StatusBadge>
            <h2>Loaded sample state</h2>
            <p>Fictional state content is available for component review.</p>
          </section>
        </div>
        <DevServicePanel demoSettings={demoSettings} onSettingsChange={onSettingsChange} services={services} />
      </main>
    </div>
  )
}

function ServiceDemoPage({ demoSettings, onSettingsChange, services }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <LinkButton className="brand-link" path="/">
            MY GARB
          </LinkButton>
          <p className="demo-notice">Demo mode — simulated data and actions</p>
        </div>
        <LinkButton className="btn btn-outline-primary myg-button" path="/dev">
          Back to shells
        </LinkButton>
      </header>
      <main className="content-area content-area-single">
        <section className="intro-section">
          <p className="eyebrow">Development-only</p>
          <h1>Service adapter controls</h1>
          <p className="lead">
            Switch fictional identities, account simulations, scenarios, and adapter mode.
          </p>
        </section>
        <DevServicePanel demoSettings={demoSettings} onSettingsChange={onSettingsChange} services={services} />
      </main>
    </div>
  )
}

function DevServicePanel({ compact = false, demoSettings, onSettingsChange, services }) {
  const [identities, setIdentities] = useState([])
  const [result, setResult] = useState({ status: 'idle', message: 'Run a service check to inspect mock behavior.' })
  const [operationNumber, setOperationNumber] = useState(1)
  const checkPending = useRef(false)

  useEffect(() => {
    let active = true
    const identityServices = createServices({ ...demoSettings, adapterMode: 'mock', scenario: 'normal' })
    identityServices.accounts
      .listDemoIdentities()
      .then((items) => {
        if (active) setIdentities(items)
      })
      .catch(() => {
        if (active) setIdentities([])
      })
    return () => {
      active = false
    }
  }, [demoSettings])

  const runCheck = async (label, action) => {
    if (checkPending.current) return
    checkPending.current = true
    setResult({ status: 'loading', message: `${label} is running...` })
    try {
      const data = await action()
      setResult({
        status: 'success',
        message: label,
        data,
      })
      window.dispatchEvent(new Event('demo-session-changed'))
    } catch (error) {
      setResult({
        status: 'error',
        message: isServiceError(error) ? error.message : 'Unexpected demo service error.',
        code: error.code,
        details: error.details,
      })
    } finally {
      checkPending.current = false
    }
  }

  const resetData = () => {
    resetDemoStore()
    window.dispatchEvent(new Event('demo-session-changed'))
    setOperationNumber((number) => number + 1)
    setResult({
      status: 'success',
      message: 'Demo data reset to deterministic fictional fixtures.',
      data: { storageKey: 'my-garb.demo-store.v2' },
    })
  }

  const duplicateOperationId = `dev-duplicate-${operationNumber}`

  if (!import.meta.env.DEV) return null

  return (
    <section className={`dev-service-panel ${compact ? 'dev-service-panel-compact' : ''}`} aria-labelledby="services-title">
      <div className="dev-service-header">
        <div>
          <p className="eyebrow">Development-only</p>
          <h2 id="services-title">Replaceable service layer</h2>
          <p>
            Mock records are fictional and persisted locally. Identity filtering here is a frontend demo, not real
            authentication, authorization, or security.
          </p>
        </div>
        <StatusBadge tone={demoSettings.adapterMode === 'real' ? 'warning' : 'info'}>
          {demoSettings.adapterMode === 'real' ? 'Backend not configured' : 'Mock adapter'}
        </StatusBadge>
      </div>

      <div className="dev-control-grid">
        <SelectField
          id="adapter-mode"
          label="Adapter mode"
          value={demoSettings.adapterMode}
          onChange={(event) => onSettingsChange({ adapterMode: event.target.value })}
        >
          {adapterModes.map((mode) => (
            <option key={mode.value} value={mode.value}>
              {mode.label}
            </option>
          ))}
        </SelectField>

        <SelectField
          id="service-scenario"
          label="Service scenario"
          value={demoSettings.scenario}
          onChange={(event) => onSettingsChange({ scenario: event.target.value })}
        >
          {serviceScenarios.map((scenario) => (
            <option key={scenario.value} value={scenario.value}>
              {scenario.label}
            </option>
          ))}
        </SelectField>

        <SelectField
          id="demo-identity"
          label="Fictional identity"
          value={demoSettings.identityId}
          onChange={(event) => onSettingsChange({ identityId: event.target.value })}
        >
          {identities.map((identity) => (
            <option key={identity.id} value={identity.id}>
              {identity.displayName} — {identity.role}
            </option>
          ))}
        </SelectField>
      </div>

      <div className="dev-action-grid" aria-label="Service checks">
        <Button onClick={() => runCheck('Simulated session', () => services.accounts.simulateIdentity(demoSettings.identityId))}>Enter selected demo session</Button>
        <Button onClick={() => runCheck('Session expired', () => services.accounts.logout())}>Expire demo session</Button>
        <Button onClick={() => runCheck('Simulated verified state', () => services.accounts.simulateVerification(demoSettings.identityId, true))}>Mark demo verified</Button>
        <Button onClick={() => runCheck('Simulated unverified state', () => services.accounts.simulateVerification(demoSettings.identityId, false))}>Mark demo unverified</Button>
        <Button onClick={() => runCheck('Reset recovery demonstration', () => services.accounts.resetRecoveryDemo())}>Reset recovery example</Button>
        <LinkButton path="/reset-password?token=demo-expired" className="btn btn-outline-primary myg-button">Expired reset example</LinkButton>
        <Button onClick={() => runCheck('Owned requests', () => services.requests.listMine())}>Owned requests</Button>
        <Button onClick={() => runCheck('Discovery designers', () => services.discovery.listDesigners())}>
          Discovery designers
        </Button>
        <Button onClick={() => runCheck('Own profile', () => services.profiles.getOwnProfile())}>Own profile</Button>
        <Button onClick={() => runCheck('Conversations', () => services.conversations.listMine())}>
          Conversations
        </Button>
        <Button onClick={() => runCheck('Orders', () => services.orders.listMine())}>Orders</Button>
        <Button onClick={() => runCheck('Notifications', () => services.notifications.listMine())}>
          Notifications
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            runCheck('Persist profile note', () =>
              services.profiles.updateOwnProfile({ milestone02Note: `Saved at ${new Date().toISOString()}` }),
            )
          }
        >
          Persist sample edit
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            runCheck('Duplicate submit demo', async () => {
              const first = await services.requests.createDraft({
                designerId: 'designer-kemi',
                title: 'Development duplicate check',
                operationId: duplicateOperationId,
              })
              const second = await services.requests.createDraft({
                designerId: 'designer-kemi',
                title: 'Development duplicate check changed',
                operationId: duplicateOperationId,
              })
              return { first, second }
            })
          }
        >
          Duplicate submit
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            runCheck('Stale version demo', () =>
              services.specifications.confirmLatest({
                requestId: 'request-awaiting-confirmation-chidi',
                version: 1,
                operationId: `dev-stale-${operationNumber}`,
              }),
            )
          }
        >
          Stale version
        </Button>
        <Button variant="secondary" onClick={resetData}>
          Reset demo data
        </Button>
      </div>

      <ServiceResult result={result} />
    </section>
  )
}

function ServiceResult({ result }) {
  if (result.status === 'loading') {
    return (
      <div className="service-result" aria-live="polite">
        <Spinner label={result.message} />
      </div>
    )
  }

  if (result.status === 'error') {
    return (
      <div className="service-result service-result-error" role="alert">
        <StatusBadge tone="danger">{result.code || 'Error'}</StatusBadge>
        <strong>{result.message}</strong>
        {result.details ? <pre>{JSON.stringify(result.details, null, 2)}</pre> : null}
      </div>
    )
  }

  return (
    <div className="service-result" aria-live="polite">
      <StatusBadge tone={result.status === 'success' ? 'success' : 'muted'}>{result.status}</StatusBadge>
      <strong>{result.message}</strong>
      {result.data ? <pre>{JSON.stringify(result.data, null, 2)}</pre> : null}
    </div>
  )
}

function NotFound({ path }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div>
          <LinkButton className="brand-link" path="/">
            MY GARB
          </LinkButton>
          <p className="demo-notice">Demo mode — simulated data and actions</p>
        </div>
      </header>
      <main className="content-area content-area-single">
        <ErrorState
          title="Page not found"
          onRetry={() => {
            navigateTo('/')
          }}
        >
          The route "{path}" is not available in this demo.
        </ErrorState>
      </main>
    </div>
  )
}

export default App
