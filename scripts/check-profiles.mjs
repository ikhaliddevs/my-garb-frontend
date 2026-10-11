import assert from 'node:assert/strict'
import { createServices, resetDemoStore } from '../src/services/index.js'

function servicesFor(identityId, patch = {}) {
  return createServices({
    adapterMode: 'mock',
    scenario: 'normal',
    identityId,
    ...patch,
  })
}

resetDemoStore()

const aminaServices = servicesFor('acct-customer-amina')
const aminaProfile = await aminaServices.profiles.getOwnProfile()
assert.equal(aminaProfile.accountId, 'acct-customer-amina')

const savedCustomer = await aminaServices.profiles.updateOwnProfile({
  name: 'Amina Saved Demo',
  city: 'Lekki demo area',
  contactPreference: 'email for demo notices',
  publicationStatus: 'approved',
})
assert.equal(savedCustomer.name, 'Amina Saved Demo')
assert.equal(savedCustomer.city, 'Lekki demo area')
assert.equal(savedCustomer.contactPreference, 'email for demo notices')
assert.equal(savedCustomer.publicationStatus, undefined)

const chidiServices = servicesFor('acct-customer-chidi')
const chidiProfile = await chidiServices.profiles.getOwnProfile()
assert.equal(chidiProfile.accountId, 'acct-customer-chidi')
assert.notEqual(chidiProfile.name, savedCustomer.name)

await assert.rejects(
  () => chidiServices.profiles.getProfile('profile-customer-amina'),
  /another private customer profile/,
)

const kemiServices = servicesFor('acct-designer-kemi')
const savedDesigner = await kemiServices.profiles.updateOwnProfile({
  businessName: 'Kemi Saved Atelier',
  serviceLocation: 'Victoria Island demo area',
  specializations: ['aso ebi', 'agbada'],
  availability: 'accepting demo requests',
  publicationStatus: 'suspended',
})
assert.equal(savedDesigner.businessName, 'Kemi Saved Atelier')
assert.equal(savedDesigner.publicationStatus, 'approved')

const lolaProfile = await servicesFor('acct-designer-lola').profiles.getOwnProfile()
assert.equal(lolaProfile.publicationStatus, 'pending')
assert.equal(lolaProfile.serviceLocation, '')
assert.deepEqual(lolaProfile.specializations, [])

await assert.rejects(
  () => servicesFor('acct-customer-amina', { adapterMode: 'real' }).profiles.getOwnProfile(),
  /Backend not configured/,
)

resetDemoStore()
const resetAmina = await aminaServices.profiles.getOwnProfile()
assert.equal(resetAmina.name, 'Amina Bello')
assert.equal(resetAmina.city, 'Lagos demo area')

console.log('Profile service checks passed.')
