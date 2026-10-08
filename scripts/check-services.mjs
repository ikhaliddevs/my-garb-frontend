import assert from 'node:assert/strict'
import { createServices } from '../src/services/index.js'
import { resetDemoStore } from '../src/services/storage.js'

async function expectCode(promise, code) {
  try {
    await promise
  } catch (error) {
    assert.equal(error.code, code)
    return
  }
  throw new Error(`Expected ${code}`)
}

resetDemoStore()

let settings = { adapterMode: 'mock', scenario: 'normal', identityId: 'acct-customer-amina' }
let services = createServices(settings)

const identities = await services.accounts.listDemoIdentities()
assert.equal(identities.length, 6)

const aminaRequests = await services.requests.listMine()
assert(aminaRequests.every((request) => request.customerId === 'acct-customer-amina'))

settings = { adapterMode: 'mock', scenario: 'normal', identityId: 'acct-designer-kemi' }
services = createServices(settings)
const designerRequests = await services.requests.listMine()
assert(designerRequests.every((request) => request.designerId === 'designer-kemi'))

settings = { adapterMode: 'mock', scenario: 'normal', identityId: 'acct-customer-amina' }
services = createServices(settings)
const created = await services.requests.createDraft({
  designerId: 'designer-kemi',
  title: 'Duplicate prevention sample',
  operationId: 'op-test-request-draft',
})
const duplicate = await services.requests.createDraft({
  designerId: 'designer-kemi',
  title: 'Duplicate prevention sample changed',
  operationId: 'op-test-request-draft',
})
assert.equal(duplicate.id, created.id)
assert.equal(duplicate.duplicate, true)

await expectCode(
  services.specifications.confirmLatest({
    requestId: 'request-awaiting-confirmation-chidi',
    version: 1,
    operationId: 'op-stale-version',
  }),
  'forbidden',
)

settings = { adapterMode: 'mock', scenario: 'normal', identityId: 'acct-customer-chidi' }
services = createServices(settings)
await expectCode(
  services.specifications.confirmLatest({
    requestId: 'request-awaiting-confirmation-chidi',
    version: 1,
    operationId: 'op-stale-version-chidi',
  }),
  'stale_version',
)

settings = { adapterMode: 'mock', scenario: 'empty', identityId: 'acct-customer-amina' }
services = createServices(settings)
assert.deepEqual(await services.requests.listMine(), [])

settings = { adapterMode: 'mock', scenario: 'failure', identityId: 'acct-customer-amina' }
services = createServices(settings)
await expectCode(services.requests.listMine(), 'temporary_failure')

settings = { adapterMode: 'real', scenario: 'normal', identityId: 'acct-customer-amina' }
services = createServices(settings)
await expectCode(services.requests.listMine(), 'backend_not_configured')

resetDemoStore()
settings = { adapterMode: 'mock', scenario: 'normal', identityId: 'acct-customer-amina' }
services = createServices(settings)
const resetRequests = await services.requests.listMine()
assert(!resetRequests.some((request) => request.title === 'Duplicate prevention sample'))

console.log('Service checks passed')
