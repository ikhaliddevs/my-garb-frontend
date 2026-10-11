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
import AuthHeader from './auth/AuthHeader'

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

function FormField({ id, label, error, helpText, inputRef, ...props }) {
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
        ref={inputRef}
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

function TextAreaField({ id, label, error, helpText, ...props }) {
  const errorId = error ? `${id}-error` : undefined
  const helpId = helpText ? `${id}-help` : undefined
  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        aria-describedby={describedBy}
        aria-invalid={error ? 'true' : undefined}
        rows="5"
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
    return <div className="auth-page"><AuthHeader navigate={navigateTo} session={sessionState.account} onLogout={async () => {
      await sessionServices.accounts.logout()
      onSessionChange(null)
      navigateTo('/')
    }} />
      <main className="placeholder-content"><h1>Designer discovery</h1><p>Development placeholder. Designer discovery arrives in Milestone 06.</p>
        <LinkButton className="auth-primary" path="/customer/requests-orders?designer=designer-kemi">Open request placeholder for fictional Kemi Atelier</LinkButton>
        <LinkButton path="/login">Log in</LinkButton>
      </main><DemoNotice /></div>
  }

  if (route.type === 'shell' && !route.development && route.role !== 'public') {
    if (sessionState.status !== 'ready') return <div className="auth-page"><main className="placeholder-content">{sessionState.status === 'loading' ? <Spinner label="Restoring fictional session" /> : <ErrorState title="Demo session unavailable" onRetry={() => setSessionRevision((value) => value + 1)}>{sessionState.error}</ErrorState>}</main><DemoNotice /></div>
    if (route.section.path === '/profile' && ['customer', 'designer'].includes(route.role)) {
      return (
        <ProfilePage
          key={`${route.role}-${sessionState.account?.id || 'guest'}-${demoSettings.scenario}-${demoSettings.adapterMode}`}
          role={route.role}
          services={sessionServices}
          session={sessionState.account}
          onSessionChange={onSessionChange}
          navigate={navigateTo}
        />
      )
    }
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

const profileConfig = {
  contactPreferences: [
    { value: '', label: 'Select a provisional demo preference' },
    { value: 'in-app message', label: 'In-app message' },
    { value: 'email for demo notices', label: 'Email for demo notices' },
  ],
  availabilityOptions: [
    { value: '', label: 'Select provisional demo availability' },
    { value: 'accepting demo requests', label: 'Accepting demo requests' },
    { value: 'reviewing availability', label: 'Reviewing availability' },
    { value: 'not accepting new work', label: 'Not accepting new work' },
  ],
  specializationOptions: ['aso ebi', 'bridal reception', 'agbada', 'senator wear', 'kaftan', 'traditional wrapper', 'occasion blouse'],
  designerRequiredFields: ['businessName', 'serviceLocation', 'specializations', 'availability'],
}

function ProfilePage({ role, session, services, onSessionChange, navigate }) {
  const permitted = session?.role === role
  const [loadState, setLoadState] = useState({ status: 'loading', profile: null, error: null })
  const [formValues, setFormValues] = useState(null)
  const [editing, setEditing] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [feedback, setFeedback] = useState(null)
  const [saving, setSaving] = useState(false)
  const pendingSave = useRef(false)
  const firstFieldRef = useRef(null)

  const isDirty = Boolean(formValues && loadState.profile && JSON.stringify(toProfileForm(loadState.profile)) !== JSON.stringify(formValues))

  const loadProfile = () => {
    if (!permitted) return
    setLoadState({ status: 'loading', profile: null, error: null })
    setFeedback(null)
    services.profiles.getOwnProfile().then((profile) => {
      if (!profile) {
        setLoadState({ status: 'missing', profile: null, error: null })
        setFormValues(null)
        return
      }
      setLoadState({ status: 'ready', profile, error: null })
      setFormValues(toProfileForm(profile))
      setEditing(false)
      setFieldErrors({})
    }).catch((error) => {
      if (error.code === 'not_found') setLoadState({ status: 'missing', profile: null, error: null })
      else setLoadState({ status: 'error', profile: null, error })
    })
  }

  useEffect(() => {
    if (!permitted) return undefined
    let active = true
    services.profiles.getOwnProfile().then((profile) => {
      if (!active) return
      if (!profile) {
        setLoadState({ status: 'missing', profile: null, error: null })
        setFormValues(null)
        return
      }
      setLoadState({ status: 'ready', profile, error: null })
      setFormValues(toProfileForm(profile))
      setEditing(false)
      setFieldErrors({})
    }).catch((error) => {
      if (!active) return
      if (error.code === 'not_found') setLoadState({ status: 'missing', profile: null, error: null })
      else setLoadState({ status: 'error', profile: null, error })
    })
    return () => { active = false }
  }, [permitted, services])

  useEffect(() => {
    if (!isDirty) return undefined
    const warn = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [isDirty])

  const updateField = (key, value) => {
    setFormValues((current) => ({ ...current, [key]: value }))
    setFieldErrors((current) => ({ ...current, [key]: undefined }))
    setFeedback(null)
  }

  const toggleSpecialization = (value) => {
    setFormValues((current) => {
      const selected = new Set(current.specializations || [])
      if (selected.has(value)) selected.delete(value)
      else selected.add(value)
      return { ...current, specializations: Array.from(selected) }
    })
    setFieldErrors((current) => ({ ...current, specializations: undefined }))
    setFeedback(null)
  }

  const startEdit = () => {
    setEditing(true)
    setFeedback(null)
    requestAnimationFrame(() => firstFieldRef.current?.focus())
  }

  const cancelEdit = () => {
    setFormValues(toProfileForm(loadState.profile))
    setFieldErrors({})
    setFeedback({ type: 'info', message: 'Unsaved profile changes were discarded.' })
    setEditing(false)
  }

  const saveProfile = async (event) => {
    event.preventDefault()
    if (pendingSave.current || !formValues) return
    const errors = validateProfile(role, formValues)
    setFieldErrors(errors)
    if (Object.keys(errors).length) {
      const first = Object.keys(errors)[0]
      document.getElementById(`profile-${first}`)?.focus()
      return
    }
    pendingSave.current = true
    setSaving(true)
    setFeedback(null)
    try {
      const saved = await services.profiles.updateOwnProfile(toProfilePatch(role, formValues))
      setLoadState({ status: 'ready', profile: saved, error: null })
      setFormValues(toProfileForm(saved))
      setEditing(false)
      setFeedback({ type: 'success', message: 'Demo profile saved locally. Refreshing this browser keeps the fictional change until demo reset.' })
    } catch (error) {
      setFieldErrors(normalizeFieldErrors(error.details?.fieldErrors))
      setFeedback({ type: 'error', message: error.message || 'Temporary demo save failure. Retry without losing entered values.' })
    } finally {
      pendingSave.current = false
      setSaving(false)
    }
  }

  const guardedNavigate = (path) => {
    if (isDirty && !window.confirm('Discard unsaved profile changes and leave this form?')) return
    navigate(path)
  }

  const logout = async () => {
    if (isDirty && !window.confirm('Discard unsaved profile changes and log out?')) return
    await services.accounts.logout()
    onSessionChange(null)
    navigate('/')
  }

  return (
    <div className="auth-page profile-page">
      <AuthHeader navigate={guardedNavigate} session={session} onLogout={logout} />
      <main className="profile-shell">
        <DemoNotice />
        <ProfileNav role={role} activePath={`/${role}/profile`} navigate={guardedNavigate} />
        {!session ? (
          <ProfileGate title="Log in to view your profile" destination={`/${role}/profile`} navigate={navigate} actionLabel="Log in" />
        ) : !permitted ? (
          <ProfileGate title="This profile area belongs to another role" destination={`/${session.role}`} navigate={navigate}>
            Fictional route guards are demonstrations only. Open the workspace for the active demo role.
          </ProfileGate>
        ) : loadState.status === 'loading' ? (
          <section className="profile-panel">
            <Spinner label="Loading fictional profile" />
          </section>
        ) : loadState.status === 'error' ? (
          <ErrorState title="Profile unavailable" onRetry={loadProfile}>
            {loadState.error?.message || 'The demo profile could not be loaded.'}
          </ErrorState>
        ) : loadState.status === 'missing' ? (
          <EmptyState title="No demo profile record" action={<Button onClick={loadProfile}>Retry</Button>}>
            This demo does not create profile records automatically. Reset demo data or choose another fictional identity.
          </EmptyState>
        ) : (
          <ProfileWorkspace
            editing={editing}
            feedback={feedback}
            fieldErrors={fieldErrors}
            firstFieldRef={firstFieldRef}
            formValues={formValues}
            isDirty={isDirty}
            onCancel={cancelEdit}
            onSave={saveProfile}
            onStartEdit={startEdit}
            onToggleSpecialization={toggleSpecialization}
            onUpdateField={updateField}
            profile={loadState.profile}
            role={role}
            saving={saving}
            session={session}
          />
        )}
      </main>
    </div>
  )
}

function ProfileNav({ role, activePath, navigate }) {
  const items = [
    { label: 'Discover', path: `/${role}` },
    { label: 'Requests and Orders', path: `/${role}/requests-orders` },
    { label: 'Messages', path: `/${role}/messages` },
    { label: 'Profile', path: `/${role}/profile` },
  ]
  return (
    <nav className="profile-nav" aria-label={`${role} workspace navigation`}>
      {items.map((item) => (
        <a
          className={item.path === activePath ? 'active' : ''}
          href={item.path}
          key={item.path}
          onClick={(event) => {
            event.preventDefault()
            navigate(item.path)
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

function ProfileGate({ title, destination, navigate, actionLabel = 'Continue', children }) {
  return (
    <section className="profile-panel">
      <h1>{title}</h1>
      <p>{children || 'Fictional sessions and frontend route guards are demonstrations, not production security.'}</p>
      <Button onClick={() => navigate(destination.startsWith('/login') ? destination : `/login?returnTo=${encodeURIComponent(destination)}`)}>
        {actionLabel}
      </Button>
    </section>
  )
}

function ProfileWorkspace({
  editing,
  feedback,
  fieldErrors,
  firstFieldRef,
  formValues,
  isDirty,
  onCancel,
  onSave,
  onStartEdit,
  onToggleSpecialization,
  onUpdateField,
  profile,
  role,
  saving,
  session,
}) {
  const designerComplete = role === 'designer' ? isDesignerProfileComplete(profile) : true

  return (
    <div className="profile-grid">
      <section className="profile-panel profile-overview" aria-labelledby="profile-heading">
        <div className="profile-heading-row">
          <div className="avatar-fallback" aria-hidden="true">{initials(profileDisplayName(profile, session))}</div>
          <div>
            <p className="eyebrow">{role === 'designer' ? 'Designer profile' : 'Customer profile'}</p>
            <h1 id="profile-heading">{profileDisplayName(profile, session)}</h1>
            <p className="profile-muted">Private account details stay separate from editable profile information.</p>
          </div>
        </div>

        {role === 'designer' ? <ApprovalStatusPanel profile={profile} complete={designerComplete} /> : null}

        <div className="profile-facts" aria-label="Current saved profile values">
          {role === 'customer' ? (
            <>
              <ProfileFact label="Name" value={profile.name} />
              <ProfileFact label="Demo location" value={profile.city} />
              <ProfileFact label="Contact preference" value={profile.contactPreference} />
            </>
          ) : (
            <>
              <ProfileFact label="Business name" value={profile.businessName} />
              <ProfileFact label="Service location" value={profile.serviceLocation} />
              <ProfileFact label="Availability" value={profile.availability} />
              <ProfileFact label="Specializations" value={(profile.specializations || []).join(', ')} />
              <ProfileFact label="Bio" value={profile.bio} />
            </>
          )}
        </div>
      </section>

      <section className="profile-panel" aria-labelledby="profile-form-heading">
        <div className="profile-form-header">
          <div>
            <p className="eyebrow">Demo mode</p>
            <h2 id="profile-form-heading">{editing ? 'Edit saved profile' : 'Saved profile details'}</h2>
          </div>
          {!editing ? <Button onClick={onStartEdit}>Edit profile</Button> : null}
        </div>

        {feedback ? <AppAlert variant={feedback.type === 'error' ? 'danger' : feedback.type === 'success' ? 'success' : 'info'}>{feedback.message}</AppAlert> : null}

        <form noValidate onSubmit={onSave} aria-busy={saving}>
          {role === 'customer' ? (
            <CustomerProfileFields disabled={!editing || saving} errors={fieldErrors} firstFieldRef={firstFieldRef} values={formValues} onUpdate={onUpdateField} />
          ) : (
            <DesignerProfileFields
              disabled={!editing || saving}
              errors={fieldErrors}
              firstFieldRef={firstFieldRef}
              values={formValues}
              onToggleSpecialization={onToggleSpecialization}
              onUpdate={onUpdateField}
            />
          )}

          <section className="account-separation" aria-labelledby="account-separation-title">
            <h3 id="account-separation-title">Account credentials</h3>
            <p>{session.email}</p>
            <p>Password, verification, approval, and account role changes are outside this profile form.</p>
          </section>

          {role === 'customer' ? (
            <section className="measurement-entry" aria-labelledby="measurement-entry-title">
              <h3 id="measurement-entry-title">Private measurement profile</h3>
              <p>Measurement editing starts in a later milestone. This entry point is shown only as a blocked demo placeholder.</p>
              <Button variant="secondary" disabled>Measurements not implemented yet</Button>
            </section>
          ) : null}

          {editing ? (
            <div className="profile-actions">
              <Button type="submit" disabled={saving}>
                {saving ? <><span className="spinner-border spinner-border-sm" aria-hidden="true" /> Saving...</> : 'Save profile'}
              </Button>
              <Button variant="secondary" onClick={onCancel} disabled={saving} type="button">
                Cancel
              </Button>
              {isDirty ? <span className="profile-dirty" role="status">Unsaved changes</span> : null}
            </div>
          ) : null}
        </form>
      </section>
    </div>
  )
}

function CustomerProfileFields({ disabled, errors, firstFieldRef, values, onUpdate }) {
  return (
    <>
      <FormField
        id="profile-name"
        label="Name"
        inputRef={firstFieldRef}
        value={values.name}
        disabled={disabled}
        error={errors.name}
        onChange={(event) => onUpdate('name', event.target.value)}
      />
      <FormField
        id="profile-city"
        label="Demo location"
        value={values.city}
        disabled={disabled}
        error={errors.city}
        helpText="Provisional location label only. No full address or geolocation is collected."
        onChange={(event) => onUpdate('city', event.target.value)}
      />
      <SelectField
        id="profile-contactPreference"
        label="Contact preference"
        value={values.contactPreference}
        disabled={disabled}
        error={errors.contactPreference}
        onChange={(event) => onUpdate('contactPreference', event.target.value)}
      >
        {profileConfig.contactPreferences.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </SelectField>
    </>
  )
}

function DesignerProfileFields({ disabled, errors, firstFieldRef, values, onToggleSpecialization, onUpdate }) {
  return (
    <>
      <FormField
        id="profile-businessName"
        label="Business name"
        inputRef={firstFieldRef}
        value={values.businessName}
        disabled={disabled}
        error={errors.businessName}
        onChange={(event) => onUpdate('businessName', event.target.value)}
      />
      <FormField
        id="profile-serviceLocation"
        label="Service location"
        value={values.serviceLocation}
        disabled={disabled}
        error={errors.serviceLocation}
        helpText="Provisional demo location label only."
        onChange={(event) => onUpdate('serviceLocation', event.target.value)}
      />
      <fieldset className="profile-fieldset" aria-describedby={errors.specializations ? 'profile-specializations-error' : 'profile-specializations-help'} disabled={disabled}>
        <legend>Specializations</legend>
        <p id="profile-specializations-help">Provisional demo taxonomy pending pilot approval.</p>
        <div className="specialization-grid">
          {profileConfig.specializationOptions.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                checked={(values.specializations || []).includes(option)}
                onChange={() => onToggleSpecialization(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.specializations ? <p className="field-error" id="profile-specializations-error">{errors.specializations}</p> : null}
      </fieldset>
      <TextAreaField
        id="profile-bio"
        label="Bio"
        value={values.bio}
        disabled={disabled}
        error={errors.bio}
        helpText="Optional public-facing studio summary for later discovery screens."
        onChange={(event) => onUpdate('bio', event.target.value)}
      />
      <SelectField
        id="profile-availability"
        label="Availability"
        value={values.availability}
        disabled={disabled}
        error={errors.availability}
        onChange={(event) => onUpdate('availability', event.target.value)}
      >
        {profileConfig.availabilityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </SelectField>
    </>
  )
}

function ApprovalStatusPanel({ profile, complete }) {
  const status = profile.publicationStatus || 'pending'
  const displayStatus = !complete && status !== 'suspended' ? 'incomplete' : status
  const tone = displayStatus === 'approved' ? 'success' : displayStatus === 'suspended' ? 'danger' : 'warning'
  const message = {
    approved: complete ? 'Approved for later public discovery. Designers cannot approve themselves or edit this status.' : 'Approved record has missing required demo fields; publication remains blocked until completed.',
    pending: 'Pending administrator review. Public discovery stays unavailable until a later admin milestone approves it.',
    suspended: 'Suspended designers cannot accept new work in the demo, but existing-record access is retained.',
    incomplete: 'Required profile information is incomplete, so publication remains blocked.',
  }[displayStatus] || 'Publication state is unresolved in the demo configuration.'

  return (
    <section className="approval-panel" aria-labelledby="approval-status-title">
      <div>
        <h2 id="approval-status-title">Approval status</h2>
        <p>{message}</p>
      </div>
      <StatusBadge tone={tone}>{displayStatus === 'approved' ? 'Approved' : displayStatus}</StatusBadge>
    </section>
  )
}

function ProfileFact({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value || 'Not provided'}</strong>
    </div>
  )
}

function toProfileForm(profile) {
  if (profile.role === 'designer') {
    return {
      businessName: profile.businessName || '',
      serviceLocation: profile.serviceLocation || '',
      specializations: Array.isArray(profile.specializations) ? profile.specializations : [],
      bio: profile.bio || '',
      availability: profile.availability || '',
    }
  }
  return {
    name: profile.name || '',
    city: profile.city || '',
    contactPreference: profile.contactPreference || '',
  }
}

function toProfilePatch(role, values) {
  if (role === 'designer') {
    return {
      businessName: values.businessName.trim(),
      serviceLocation: values.serviceLocation.trim(),
      specializations: values.specializations,
      bio: values.bio.trim(),
      availability: values.availability,
    }
  }
  return {
    name: values.name.trim(),
    city: values.city.trim(),
    contactPreference: values.contactPreference,
  }
}

function validateProfile(role, values) {
  const errors = {}
  if (role === 'customer') {
    if (!values.name.trim()) errors.name = 'Enter the fictional customer name.'
    if (values.name.trim().length > 80) errors.name = 'Use 80 characters or fewer.'
    if (values.city.trim().length > 80) errors.city = 'Use 80 characters or fewer.'
    if (!values.contactPreference) errors.contactPreference = 'Choose a provisional contact preference.'
    return errors
  }
  if (!values.businessName.trim()) errors.businessName = 'Enter the fictional business name.'
  if (values.businessName.trim().length > 100) errors.businessName = 'Use 100 characters or fewer.'
  if (!values.serviceLocation.trim()) errors.serviceLocation = 'Enter a provisional service location.'
  if (values.serviceLocation.trim().length > 100) errors.serviceLocation = 'Use 100 characters or fewer.'
  if (!values.specializations?.length) errors.specializations = 'Select at least one provisional specialization.'
  if (values.bio.trim().length > 400) errors.bio = 'Use 400 characters or fewer.'
  if (!values.availability) errors.availability = 'Choose a provisional availability value.'
  return errors
}

function normalizeFieldErrors(errors = {}) {
  if (!errors.title) return errors
  return { ...errors, title: undefined, name: errors.title }
}

function isDesignerProfileComplete(profile) {
  return Boolean(
    profile.businessName?.trim()
    && profile.serviceLocation?.trim()
    && profile.specializations?.length
    && profile.availability,
  )
}

function profileDisplayName(profile, session) {
  return profile.businessName || profile.name || session?.displayName || 'Demo profile'
}

function initials(name) {
  return (name || 'DP').split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'DP'
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
