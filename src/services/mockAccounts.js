import { ServiceError } from './errors.js'
import { readDemoStore, writeDemoStore } from './storage.js'
import { validateAccountInput } from './authValidation.js'

export const DEMO_PASSWORD = 'demo-only'

function accountView(store, account) {
  return { ...account, verified: account.verified ?? account.id !== 'acct-customer-chidi',
    approvalStatus: store.designers.find((item) => item.accountId === account.id)?.status || null }
}

function validate(input, options) {
  const fieldErrors = validateAccountInput(input, options)
  if (Object.keys(fieldErrors).length) throw new ServiceError('validation_error', 'Review the highlighted fields.', { fieldErrors })
}

export function createMockAccounts(context, respond) {
  const run = (action) => respond(context(), null, action).then((result) => {
    if (!result) throw new ServiceError('unavailable', 'No account result is available. Retry with the normal demo scenario.')
    return result
  }).catch((error) => {
    if (error.code === 'validation_error' && error.details?.fieldErrors?.title) {
      throw new ServiceError('validation_error', 'Simulated account validation error. Review the email field.', { fieldErrors: { email: 'Simulated email validation error.' } })
    }
    throw error
  })
  const sessionView = (store) => {
    const account = store.accounts.find((item) => item.id === store.meta.demoSession?.accountId)
    return account ? accountView(store, account) : null
  }
  return {
    restoreSession: () => respond(context(), null, () => sessionView(readDemoStore())),
    login(input) {
      return run(() => {
        validate(input)
        const store = readDemoStore()
        const account = store.accounts.find((item) => item.email.toLowerCase() === input.email.trim().toLowerCase())
        if (!account || input.password !== DEMO_PASSWORD) throw new ServiceError('invalid_credentials', 'Invalid demo credentials. Use a documented fictional email and demo-only.')
        store.meta.demoSession = { accountId: account.id }
        writeDemoStore(store)
        return accountView(store, account)
      })
    },
    signup(input) {
      return run(() => {
        validate(input, { signup: true })
        const store = readDemoStore()
        const email = input.email.trim().toLowerCase()
        if (store.accounts.some((item) => item.email.toLowerCase() === email)) throw new ServiceError('duplicate_email', 'This fictional email already exists. Try logging in.', { fieldErrors: { email: 'This demo email is already registered.' } })
        const id = `acct-${input.role}-demo-${store.accounts.length + 1}`
        const account = { id, email, role: input.role, displayName: `Fictional ${input.role}`, profileId: `profile-${id}`, verified: false }
        store.accounts.push(account)
        if (input.role === 'designer') {
          account.designerId = `designer-${id}`
          store.designers.push({ id: account.designerId, accountId: id, profileId: account.profileId, status: 'pending', published: false, rating: null })
        }
        store.profiles.push({ id: account.profileId, accountId: id, role: account.role })
        store.meta.demoSession = { accountId: id }
        writeDemoStore(store)
        return accountView(store, account)
      })
    },
    logout() {
      return run(() => {
        const store = readDemoStore()
        store.meta.demoSession = null
        writeDemoStore(store)
        return { cleared: true }
      })
    },
    requestRecovery(input) {
      return run(() => {
        validate(input, { recovery: true })
        return { message: 'Recovery demonstration acknowledged. No email was sent. A reset example is available in this demo.' }
      })
    },
    resetPassword({ token, password }) {
      return run(() => {
        validate({ password }, { reset: true })
        const store = readDemoStore()
        if (token === 'demo-expired') throw new ServiceError('expired_token', 'This simulated reset link has expired. Return to recovery.')
        if (token !== 'demo-reset') throw new ServiceError('invalid_token', 'This simulated reset link is unavailable.')
        if (store.meta.resetUsed) throw new ServiceError('used_token', 'This simulated reset link was already used. Reset the demonstration in development controls.')
        store.meta.resetUsed = true
        writeDemoStore(store)
        return { message: 'Simulated reset completed. No password was saved or changed. Demo login still uses demo-only.' }
      })
    },
    simulateIdentity(identityId) {
      return run(() => {
        const store = readDemoStore()
        if (!store.accounts.some((item) => item.id === identityId)) throw new ServiceError('not_found', 'Fictional identity unavailable.')
        store.meta.demoSession = { accountId: identityId }
        writeDemoStore(store)
        return sessionView(store)
      })
    },
    simulateVerification(identityId, verified) {
      return run(() => {
        const store = readDemoStore()
        const account = store.accounts.find((item) => item.id === identityId)
        if (!account) throw new ServiceError('not_found', 'Fictional identity unavailable.')
        account.verified = Boolean(verified)
        writeDemoStore(store)
        return accountView(store, account)
      })
    },
    resetRecoveryDemo() {
      return run(() => {
        const store = readDemoStore()
        store.meta.resetUsed = false
        writeDemoStore(store)
        return { reset: true }
      })
    },
  }
}
