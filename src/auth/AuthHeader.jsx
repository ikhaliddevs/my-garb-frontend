import { useRef, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import BrandLogo from './BrandLogo'

export default function AuthHeader({ navigate, session, onLogout }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const pending = useRef(false)

  const logout = async () => {
    if (pending.current) return
    pending.current = true
    setBusy(true)
    setError('')
    try { await onLogout() }
    catch (err) { setError(err.message || 'Demo logout is unavailable.') }
    finally { pending.current = false; setBusy(false) }
  }

  return <header className="auth-header">
    <BrandLogo navigate={navigate} />
    <div className="auth-header-actions">
      <div className="auth-cart-wrapper">
        <button type="button" className="auth-cart-placeholder" aria-disabled="true" aria-label="Shopping cart is outside the current MVP." aria-describedby="cart-unavailable-reason">
          <ShoppingCart size={24} strokeWidth={1.5} fill="currentColor" aria-hidden="true" />
        </button>
        <span className="auth-cart-tooltip" id="cart-unavailable-reason" role="tooltip">Shopping cart is outside the current MVP.</span>
      </div>
      {session ? <button type="button" className="auth-header-logout" disabled={busy} aria-busy={busy} onClick={logout}><span>{busy ? 'Logging out...' : 'Log out'}</span></button> : null}
    </div>
    {error ? <p className="auth-header-error" role="alert">{error} Please retry Log out.</p> : null}
  </header>
}
