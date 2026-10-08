import assert from 'node:assert/strict'
import { createServices } from '../src/services/index.js'
import { readDemoStore, resetDemoStore } from '../src/services/storage.js'
import { safeReturnDestination } from '../src/routing.js'

const persisted = new Map()
globalThis.window = { localStorage: { getItem: (key) => persisted.get(key) ?? null, setItem: (key, value) => persisted.set(key, value) } }
const settings = { adapterMode: 'mock', scenario: 'normal', identityId: 'acct-customer-amina' }
const services = createServices(settings)
const code = async (promise, expected) => assert.rejects(promise, (error) => error.code === expected)
resetDemoStore()
assert.equal(await services.accounts.restoreSession(), null)
await code(services.accounts.login({ email: '', password: '' }), 'validation_error')
await code(services.accounts.login({ email: 'amina.demo@example.test', password: 'incorrect' }), 'invalid_credentials')
const customer = await services.accounts.login({ email: 'amina.demo@example.test', password: 'demo-only' })
assert.equal(customer.role, 'customer')
assert.equal((await createServices(settings).accounts.restoreSession()).id, customer.id)
await services.accounts.logout()
assert.equal(await services.accounts.restoreSession(), null)
const unverified = await services.accounts.login({ email: 'chidi.demo@example.test', password: 'demo-only' })
assert.equal(unverified.verified, false)
await services.accounts.simulateVerification(unverified.id, true)
assert.equal((await services.accounts.restoreSession()).verified, true)
for (const [email, status] of [['kemi', 'approved'], ['bayo', 'pending'], ['zara', 'suspended']]) {
  assert.equal((await services.accounts.login({ email: `${email}.demo@example.test`, password: 'demo-only' })).approvalStatus, status)
}
assert.equal((await services.accounts.login({ email: 'admin.demo@example.test', password: 'demo-only' })).role, 'admin')
await code(services.accounts.signup({ email: 'admin-new@example.test', password: 'transient-secret', role: 'admin' }), 'validation_error')
await code(services.accounts.signup({ email: 'person@gmail.com', password: 'transient-secret', role: 'customer' }), 'validation_error')
const signedUp = await services.accounts.signup({ email: 'new-designer@example.test', password: 'transient-secret', role: 'designer' })
assert.equal(signedUp.approvalStatus, 'pending')
assert.equal(signedUp.verified, false)
const newCustomer = await services.accounts.signup({ email: 'new-customer@example.test', password: 'transient-secret', role: 'customer' })
assert.equal(newCustomer.role, 'customer')
assert.equal(newCustomer.verified, false)
await code(services.accounts.signup({ email: 'NEW-DESIGNER@example.test', password: 'transient-secret', role: 'designer' }), 'duplicate_email')
assert.equal((await services.accounts.login({ email: signedUp.email, password: 'demo-only' })).id, signedUp.id)
const known = await services.accounts.requestRecovery({ email: 'amina.demo@example.test' })
const unknown = await services.accounts.requestRecovery({ email: 'unknown@example.test' })
assert.deepEqual(known, unknown)
await code(services.accounts.resetPassword({ token: 'demo-expired', password: 'transient-secret' }), 'expired_token')
await code(services.accounts.resetPassword({ token: 'unknown', password: 'transient-secret' }), 'invalid_token')
await services.accounts.resetPassword({ token: 'demo-reset', password: 'transient-secret' })
await code(services.accounts.resetPassword({ token: 'demo-reset', password: 'transient-secret' }), 'used_token')
assert(!JSON.stringify([...persisted]).includes('transient-secret'))
assert(!JSON.stringify(readDemoStore()).includes('password'))
for (const scenario of ['validation', 'missing', 'forbidden', 'failure', 'empty']) {
  const accountServices = createServices({ ...settings, scenario }).accounts
  await assert.rejects(accountServices.login({ email: customer.email, password: 'demo-only' }))
}
const delayed = createServices({ ...settings, scenario: 'delayed' })
const started = Date.now()
await delayed.accounts.login({ email: customer.email, password: 'demo-only' })
assert(Date.now() - started >= 850)
for (const operation of ['login', 'signup', 'restoreSession', 'logout', 'requestRecovery', 'resetPassword', 'simulateVerification']) {
  await code(createServices({ ...settings, adapterMode: 'real' }).accounts[operation]({}), 'backend_not_configured')
}
const intended = '/customer/requests-orders?designer=designer-kemi'
assert.equal(safeReturnDestination(intended, 'customer'), intended)
for (const unsafe of ['https://evil.test', '//evil.test', '/designer', '/admin/profile', '/customer/unknown', '/customer/../admin', '/customer%2fprofile', '/customer\\profile', 'javascript:alert(1)']) {
  assert.equal(safeReturnDestination(unsafe, 'customer'), '/customer')
}
assert.equal(safeReturnDestination('/customer?designer=designer-kemi', 'designer'), '/designer')
resetDemoStore()
assert.equal(await services.accounts.restoreSession(), null)
console.log('Authentication and return-destination checks passed')
