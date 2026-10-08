const sections = ['', '/requests-orders', '/messages', '/profile']

export function safeReturnDestination(candidate, role) {
  const fallback = `/${role}`
  if (typeof candidate !== 'string' || /[\\\r\n]/.test(candidate)) return fallback
  try {
    const url = new URL(candidate, 'https://demo.invalid')
    if (!candidate.startsWith('/') || candidate.startsWith('//') || url.origin !== 'https://demo.invalid') return fallback
    if (!sections.some((section) => url.pathname === `/${role}${section}`)) return fallback
    const result = new URL(url.pathname, 'https://demo.invalid')
    const designer = url.searchParams.get('designer')
    if (role === 'customer' && designer && /^designer-[a-z0-9-]+$/.test(designer)) result.searchParams.set('designer', designer)
    return result.pathname + result.search
  } catch { return fallback }
}
