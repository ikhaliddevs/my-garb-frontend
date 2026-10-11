import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const base = process.env.DEMO_URL || 'http://127.0.0.1:5173'
const browser = await chromium.launch({ channel: 'msedge', headless: true })
const context = await browser.newContext({ viewport: { width: 1280, height: 960 } })
const page = await context.newPage()
const errors = []
page.on('pageerror', (error) => errors.push(error.message))

async function login(email, returnTo) {
  await page.goto(`${base}/login?returnTo=${encodeURIComponent(returnTo)}`)
  await page.getByLabel('Email', { exact: true }).fill(email)
  await page.getByLabel('Password', { exact: true }).fill('demo-only')
  await page.getByRole('button', { name: 'Log In', exact: true }).click()
  await page.waitForURL(`**${returnTo}`)
}

async function resetDemoData() {
  await page.goto(`${base}/dev/services`)
  await page.getByLabel('Adapter mode', { exact: true }).selectOption('mock')
  await page.getByLabel('Service scenario', { exact: true }).selectOption('normal')
  await page.getByRole('button', { name: 'Reset demo data', exact: true }).click()
  await page.getByText('Demo data reset to deterministic fictional fixtures.', { exact: true }).waitFor()
}

try {
  await mkdir('artifacts/milestone-04', { recursive: true })
  await resetDemoData()

  await login('amina.demo@example.test', '/customer/profile')
  await page.getByRole('heading', { name: 'Amina Bello', exact: true }).waitFor()
  await page.getByRole('button', { name: 'Edit profile', exact: true }).click()
  await page.getByLabel('Name', { exact: true }).fill('')
  await page.getByRole('button', { name: 'Save profile', exact: true }).click()
  await page.getByText('Enter the fictional customer name.', { exact: true }).waitFor()
  await page.getByLabel('Name', { exact: true }).fill('Amina Milestone Four')
  await page.getByLabel('Demo location', { exact: true }).fill('Lekki demo area')
  await page.getByLabel('Contact preference', { exact: true }).selectOption('email for demo notices')
  await page.getByRole('button', { name: 'Save profile', exact: true }).click()
  await page.getByText('Demo profile saved locally.', { exact: false }).waitFor()
  await page.reload()
  await page.getByRole('heading', { name: 'Amina Milestone Four', exact: true }).waitFor()
  await page.getByText('Lekki demo area', { exact: true }).waitFor()
  await page.screenshot({ path: 'artifacts/milestone-04/customer-profile-1280.png', fullPage: true })

  await page.getByRole('button', { name: 'Edit profile', exact: true }).click()
  await page.getByLabel('Demo location', { exact: true }).fill('Discarded demo area')
  await page.getByRole('button', { name: 'Cancel', exact: true }).click()
  await page.getByText('Unsaved profile changes were discarded.', { exact: true }).waitFor()
  assert.equal(await page.getByText('Discarded demo area', { exact: true }).count(), 0)

  await page.goto(`${base}/dev/services`)
  await page.getByLabel('Fictional identity', { exact: true }).selectOption('acct-customer-chidi')
  await page.getByRole('button', { name: 'Enter selected demo session', exact: true }).click()
  await page.getByText('Simulated session', { exact: true }).waitFor()
  await page.goto(`${base}/customer/profile`)
  await page.getByRole('heading', { name: 'Chidi Okafor', exact: true }).waitFor()
  assert.equal(await page.getByText('Amina Milestone Four', { exact: true }).count(), 0)

  await resetDemoData()
  await login('kemi.demo@example.test', '/designer/profile')
  await page.getByRole('heading', { name: 'Kemi Atelier', exact: true }).waitFor()
  await page.getByText('Designers cannot approve themselves', { exact: false }).waitFor()
  await page.getByRole('button', { name: 'Edit profile', exact: true }).click()
  await page.getByLabel('Business name', { exact: true }).fill('Kemi Milestone Atelier')
  await page.getByLabel('Service location', { exact: true }).fill('Victoria Island demo area')
  await page.getByLabel('Availability', { exact: true }).selectOption('accepting demo requests')
  await page.getByRole('button', { name: 'Save profile', exact: true }).click()
  await page.getByText('Demo profile saved locally.', { exact: false }).waitFor()
  await page.reload()
  await page.getByRole('heading', { name: 'Kemi Milestone Atelier', exact: true }).waitFor()
  await page.getByText('Approved', { exact: true }).waitFor()
  await page.screenshot({ path: 'artifacts/milestone-04/designer-profile-1280.png', fullPage: true })

  await page.goto(`${base}/dev/services`)
  await page.getByLabel('Fictional identity', { exact: true }).selectOption('acct-designer-lola')
  await page.getByRole('button', { name: 'Enter selected demo session', exact: true }).click()
  await page.getByText('Simulated session', { exact: true }).waitFor()
  await page.goto(`${base}/designer/profile`)
  await page.getByRole('heading', { name: 'Lola Demo Studio', exact: true }).waitFor()
  await page.getByText('publication remains blocked', { exact: false }).waitFor()

  await page.goto(`${base}/dev/services`)
  await page.getByLabel('Fictional identity', { exact: true }).selectOption('acct-designer-zara')
  await page.getByRole('button', { name: 'Enter selected demo session', exact: true }).click()
  await page.getByText('Simulated session', { exact: true }).waitFor()
  await page.goto(`${base}/designer/profile`)
  await page.getByRole('heading', { name: 'Zara Heritage Studio', exact: true }).waitFor()
  await page.getByText('Suspended designers cannot accept new work', { exact: false }).waitFor()

  await page.goto(`${base}/dev/services`)
  await page.getByLabel('Service scenario', { exact: true }).selectOption('normal')
  await page.evaluate(() => {
    const key = 'my-garb.demo-store.v2'
    const store = JSON.parse(localStorage.getItem(key))
    store.profiles = store.profiles.filter((profile) => profile.id !== 'profile-designer-zara')
    localStorage.setItem(key, JSON.stringify(store))
  })
  await page.goto(`${base}/designer/profile`)
  await page.getByRole('heading', { name: 'No demo profile record', exact: true }).waitFor()

  await resetDemoData()
  await page.goto(`${base}/dev/services`)
  await page.getByLabel('Fictional identity', { exact: true }).selectOption('acct-designer-zara')
  await page.getByRole('button', { name: 'Enter selected demo session', exact: true }).click()
  await page.getByText('Simulated session', { exact: true }).waitFor()
  await page.getByLabel('Service scenario', { exact: true }).selectOption('forbidden')
  await page.goto(`${base}/designer/profile`)
  await page.getByRole('heading', { name: 'Demo session unavailable', exact: true }).waitFor()
  await page.getByText('cannot access', { exact: false }).waitFor()
  await page.goto(`${base}/dev/services`)
  await page.getByLabel('Service scenario', { exact: true }).selectOption('failure')
  await page.goto(`${base}/designer/profile`)
  await page.getByRole('heading', { name: 'Demo session unavailable', exact: true }).waitFor()
  await page.getByText('Temporary demo failure', { exact: false }).waitFor()

  await page.goto(`${base}/dev/services`)
  await page.getByLabel('Service scenario', { exact: true }).selectOption('normal')
  await page.getByRole('button', { name: 'Expire demo session', exact: true }).click()
  await page.goto(`${base}/designer/profile`)
  await page.getByRole('heading', { name: 'Log in to view your profile', exact: true }).waitFor()

  for (const width of [360, 768, 1280]) {
    await page.setViewportSize({ width, height: width === 360 ? 860 : 960 })
    await resetDemoData()
    await login('amina.demo@example.test', '/customer/profile')
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Horizontal overflow at ${width}: customer profile`)
    await page.screenshot({ path: `artifacts/milestone-04/customer-profile-${width}.png`, fullPage: true })
  }

  assert.deepEqual(errors, [])
  console.log('Profile browser checks passed')
} finally {
  await browser.close()
}
