import logo from '../assets/phasionable-sewing-logo.svg'

export default function BrandLogo({ navigate }) {
  return <a className="brand-logo" href="/" aria-label="PHASIONABLE home" onClick={(event) => {
    if (!navigate || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate('/')
  }}>
    <img src={logo} width="16" height="24" alt="" aria-hidden="true" />
  </a>
}
