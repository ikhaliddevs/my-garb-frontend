import { ServiceError } from './errors.js'

function backendNotConfigured() {
  return Promise.reject(
    new ServiceError(
      'backend_not_configured',
      'Backend not configured. Approved backend contracts and endpoints have not been supplied.',
    ),
  )
}

function group(methods) {
  return Object.fromEntries(methods.map((method) => [method, backendNotConfigured]))
}

export function createRealAdapter() {
  return {
    accounts: group(['listDemoIdentities', 'getCurrentIdentity', 'restoreSession', 'login', 'signup', 'logout', 'requestRecovery', 'resetPassword', 'simulateIdentity', 'simulateVerification', 'resetRecoveryDemo']),
    profiles: group(['getOwnProfile', 'updateOwnProfile', 'getProfile']),
    portfolios: group(['listForDesigner']),
    discovery: group(['listDesigners']),
    requests: group(['listMine', 'createDraft']),
    measurements: group(['listMine']),
    conversations: group(['listMine', 'listMessages']),
    specifications: group(['listForRequest', 'confirmLatest']),
    orders: group(['listMine']),
    notifications: group(['listMine']),
    reviews: group(['listForDesigner']),
    administration: group(['listModerationQueue', 'resetDemoData']),
  }
}
