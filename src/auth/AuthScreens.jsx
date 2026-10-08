import { useEffect, useRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import couple from '../assets/image 62.png'
import { validateAccountInput } from '../services/authValidation.js'
import { safeReturnDestination } from '../routing.js'
import './AuthScreens.css'
import AuthHeader from './AuthHeader'
import BrandLogo from './BrandLogo'

export function DemoNotice() {
  return <p className="auth-demo-notice">Demo mode — simulated data and actions</p>
}

function AuthLink({ to, navigate, children, ...props }) {
  return <a href={to} {...props} onClick={(event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(to)
  }}>{children}</a>
}

export function AuthForm({ children, formRef, onSubmit, busy }) {
  return <form ref={formRef} noValidate onSubmit={onSubmit} aria-busy={busy}>{children}</form>
}

export function AuthScreens({ screen, services, session, onSessionChange, navigate }) {
  const [values, setValues] = useState({ email: '', password: '', role: 'customer' })
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const pending = useRef(false)
  const form = useRef(null)
  const feedbackRef = useRef(null)
  const headingRef = useRef(null)
  const params = new URLSearchParams(window.location.search)
  const returnTo = params.get('returnTo')
  // Preserve context as data; it is validated against the resulting role before navigation.
  const suffix = returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ''
  const titles = { welcome: 'PHASIONABLE', login: 'Log In', signup: 'Sign Up', recovery: 'Account recovery', reset: 'Reset password', verification: 'Email verification' }
  const isForm = ['login', 'signup', 'recovery', 'reset'].includes(screen)
  const hasPassword = ['login', 'signup', 'reset'].includes(screen)

  const title = titles[screen]
  useEffect(() => {
    headingRef.current?.focus()
    document.title = `${title} | PHASIONABLE`
  }, [title])

  const fieldChange = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const submit = async (event) => {
    event.preventDefault()
    if (pending.current) return
    const fieldErrors = validateAccountInput(values, { signup: screen === 'signup', recovery: screen === 'recovery', reset: screen === 'reset' })
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length) {
      form.current?.querySelector(`[name="${Object.keys(fieldErrors)[0]}"]`)?.focus()
      return
    }
    pending.current = true
    setBusy(true)
    setFeedback(null)
    try {
      let result
      if (screen === 'login') result = await services.accounts.login(values)
      if (screen === 'signup') result = await services.accounts.signup(values)
      if (screen === 'recovery') result = await services.accounts.requestRecovery({ email: values.email })
      if (screen === 'reset') result = await services.accounts.resetPassword({ token: params.get('token'), password: values.password })
      if (screen === 'login' || screen === 'signup') {
        onSessionChange(result)
        if (!result.verified) navigate(`/verification${suffix}`)
        else navigate(safeReturnDestination(returnTo, result.role))
      } else {
        setFeedback({ type: 'success', message: result.message })
        requestAnimationFrame(() => feedbackRef.current?.focus())
      }
    } catch (error) {
      setErrors(error.details?.fieldErrors || {})
      setFeedback({ type: 'error', message: error.message || 'Demo service unavailable. Please retry.' })
      requestAnimationFrame(() => feedbackRef.current?.focus())
    } finally {
      setValues((current) => ({ ...current, password: '' }))
      setBusy(false)
      pending.current = false
    }
  }

  return <div className={`auth-page auth-${screen}`}>
    <AuthHeader navigate={navigate} session={session} onLogout={async () => {
      await services.accounts.logout()
      onSessionChange(null)
      navigate('/')
    }} />
    <main className="auth-stage">
      <img className="auth-photo" src={couple} alt="" />
      <div className="auth-overlay" />
      {screen === 'welcome' ? <div className="welcome-content">
        <AuthLink className="welcome-login" to="/login" navigate={navigate}>Log in</AuthLink>
        <div className="welcome-heading">
          <h1 ref={headingRef} tabIndex="-1">PHASIONABLE</h1>
          <p>Explore the new world of fashion</p>
        </div>
        <div className="welcome-actions">
          <AuthLink className="auth-primary" to="/discover" navigate={navigate}>Start Browsing</AuthLink>
          <p>Don’t have an account? <AuthLink to="/signup" navigate={navigate}>Sign up</AuthLink></p>
        </div>
      </div> : <div className="auth-content">
        <h1 className={['login', 'signup'].includes(screen) ? 'visually-hidden' : 'auth-title'} ref={headingRef} tabIndex="-1">{titles[screen]}</h1>
        {isForm ? <AuthForm formRef={form} onSubmit={submit} busy={busy}>
          {screen !== 'reset' ? <div className="auth-field">
            <label htmlFor="auth-email">Email</label>
            <input id="auth-email" name="email" type="email" placeholder=" " autoComplete="email" value={values.email} disabled={busy}
              onChange={(event) => fieldChange('email', event.target.value)}
              onBlur={() => setErrors((current) => ({ ...current, email: validateAccountInput(values, { recovery: true, signup: screen === 'signup' }).email }))}
              aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
            {errors.email ? <p id="email-error" className="auth-field-error">{errors.email}</p> : null}
          </div> : null}
          {hasPassword ? <div className="auth-field auth-password-field">
            <div className="auth-field-label"><label htmlFor="auth-password">Password</label>
              {screen === 'login' ? <AuthLink to={`/forgot-password${suffix}`} navigate={navigate}>Forgot?</AuthLink> : null}
            </div>
            <div className="auth-password-input">
              <input id="auth-password" name="password" placeholder=" " type={visible ? 'text' : 'password'} autoComplete={screen === 'login' ? 'current-password' : 'new-password'}
                value={values.password} disabled={busy} onChange={(event) => fieldChange('password', event.target.value)}
                aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : undefined} />
              <button className="password-toggle" type="button" title={visible ? 'Hide password' : 'Show password'} aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible} onClick={() => setVisible(!visible)}>
                {visible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password ? <p id="password-error" className="auth-field-error">{errors.password}</p> : null}
          </div> : null}
          {screen === 'signup' ? <fieldset className="auth-role" disabled={busy}>
            <legend>Account type</legend>
            <div>{['customer', 'designer'].map((role) => <label key={role}><input type="radio" name="role" value={role} checked={values.role === role} onChange={() => fieldChange('role', role)} />{role === 'customer' ? 'Customer' : 'Designer'}</label>)}</div>
            <p>Designer accounts require approval before public discovery.</p>
          </fieldset> : null}
          <button className="auth-primary auth-submit" type="submit" disabled={busy}>{busy ? <><span className="spinner-border spinner-border-sm" aria-hidden="true" /> Please wait…</> : titles[screen]}</button>
          <p className="auth-simulation">{screen === 'recovery' || screen === 'reset' ? 'Simulated recovery. No email is sent or password changed.' : 'Simulated authentication. Use fictional accounts only.'}</p>
        </AuthForm> : null}
        {feedback ? <div ref={feedbackRef} tabIndex="-1" className={`auth-feedback auth-feedback-${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>{feedback.message}{feedback.type === 'error' ? ' Retry by submitting the form again.' : ''}</div> : null}
        {screen === 'login' ? <p className="auth-bottom-link">Don’t have an account? <AuthLink to={`/signup${suffix}`} navigate={navigate}>Sign up</AuthLink></p> : null}
        {screen === 'signup' ? <p className="auth-bottom-link">Already have an account? <AuthLink to={`/login${suffix}`} navigate={navigate}>Log in</AuthLink></p> : null}
        {screen === 'recovery' ? <div className="auth-extra-links">
          {feedback?.type === 'success' ? <AuthLink to={`/reset-password?token=demo-reset${returnTo ? `&returnTo=${encodeURIComponent(returnTo)}` : ''}`} navigate={navigate}>Open simulated reset example</AuthLink> : null}
          <AuthLink to={`/login${suffix}`} navigate={navigate}>Back to login</AuthLink>
        </div> : null}
        {screen === 'reset' ? <div className="auth-extra-links"><AuthLink to={`/forgot-password${suffix}`} navigate={navigate}>Account recovery</AuthLink><AuthLink to={`/login${suffix}`} navigate={navigate}>Back to login</AuthLink></div> : null}
        {screen === 'verification' ? <div className="verification-content">
          <p role="status">{session ? session.verified ? 'This fictional account is marked verified.' : 'This fictional account is not verified.' : 'Log in to view demo verification status.'}</p>
          <p>Simulated verification only. No email or SMS was sent.</p>
          {session?.approvalStatus ? <p>Designer status: {session.approvalStatus}. Public discovery requires approval.</p> : null}
          <AuthLink className="auth-primary" to={session ? safeReturnDestination(returnTo, session.role) : `/login${suffix}`} navigate={navigate}>{session ? 'Continue to demo workspace' : 'Log in'}</AuthLink>
        </div> : null}
      </div>}
    </main>
    <DemoNotice />
  </div>
}

export function GuardedPlaceholder({ role, session, services, onSessionChange, navigate }) {
  const [error, setError] = useState('')
  const destination = window.location.pathname + window.location.search
  const permitted = session?.role === role
  return <div className="auth-page auth-placeholder">
    <header className="auth-header"><BrandLogo navigate={navigate} /></header>
    <main className="placeholder-content">
      <h1>{permitted ? `${role[0].toUpperCase() + role.slice(1)} workspace` : session ? 'This area belongs to another role' : 'Log in to continue'}</h1>
      <p>{permitted ? 'Development placeholder. This workflow is scheduled for a later milestone.' : 'Fictional sessions and frontend route guards are demonstrations, not production security.'}</p>
      {permitted ? <>
        <p>{session.displayName} · {session.verified ? 'Demo verified' : 'Demo unverified'}</p>
        {session.approvalStatus ? <p>Designer status: {session.approvalStatus}. {session.approvalStatus === 'suspended' ? 'New work is unavailable; existing-record access is retained.' : session.approvalStatus === 'pending' ? 'Public discovery requires approval.' : ''}</p> : null}
        {new URLSearchParams(window.location.search).get('designer') ? <p>Selected designer: {new URLSearchParams(window.location.search).get('designer')}</p> : null}
        <nav aria-label="Workspace placeholders">{['', '/requests-orders', '/messages', '/profile'].map((section) => <AuthLink key={section} to={`/${role}${section}`} navigate={navigate}>{section === '' ? 'Discover' : section === '/requests-orders' ? 'Requests and Orders' : section.slice(1).replace(/^./, (letter) => letter.toUpperCase())}</AuthLink>)}</nav>
        <button className="auth-primary" onClick={async () => { try { await services.accounts.logout(); onSessionChange(null); navigate('/') } catch (err) { setError(err.message) } }}>Log out</button>
      </> : <AuthLink className="auth-primary" to={session ? `/${session.role}` : `/login?returnTo=${encodeURIComponent(destination)}`} navigate={navigate}>{session ? 'Open your workspace' : 'Log in'}</AuthLink>}
      {error ? <p role="alert">{error} Please retry.</p> : null}
    </main><DemoNotice />
  </div>
}
