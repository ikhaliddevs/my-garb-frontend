import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const base = process.env.DEMO_URL || 'http://127.0.0.1:5173'
const logoReference = 'WhatsApp Image 2025-10-30 at 13.10.51_d6fde0ee.png'
const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await browser.newPage({ viewport: { width: 300, height: 280 } })
await mkdir('artifacts/milestone-03/header', { recursive: true })
try {
  await page.setViewportSize({ width: 620, height: 400 })
  await page.setContent(`<body style="margin:0;background:#ddd;display:flex;gap:20px;padding:16px"><img style="width:280px;height:360px;object-fit:contain;image-rendering:pixelated" src="${base}/src/assets/${encodeURIComponent(logoReference)}"><img style="width:280px;height:360px;object-fit:contain" src="${base}/src/assets/${encodeURIComponent(logoReference)}"></body>`)
  await page.locator('img').evaluateAll((images) => Promise.all(images.map((image) => image.decode())))
  await page.screenshot({ path: 'artifacts/milestone-03/header/whatsapp-reference-enlarged.png' })
  await page.setViewportSize({ width: 300, height: 280 })
  for (const [screen, reference] of [['welcome', 'SIGNUP HOME SCREEN (1).png'], ['login', 'Login.png'], ['signup', 'Sign Up.png']]) {
    await page.setContent(`<body style="margin:0"><div style="width:264px;height:248px;overflow:hidden;position:relative"><img style="position:absolute;width:3216px;max-width:none;left:-120px;top:-32px;image-rendering:pixelated" src="${base}/design-references/${encodeURIComponent(reference)}"></div></body>`)
    await page.locator('img').evaluate((image) => image.decode())
    await page.screenshot({ path: `artifacts/milestone-03/header/${screen}-logo-reference.png` })
  }
  if (!process.argv.includes('--reference-only')) {
    await page.setViewportSize({ width: 660, height: 460 })
    await page.setContent(`<body style="margin:0;background:#ddd;font-family:Arial;padding:16px"><div style="display:flex;gap:24px"><section>WhatsApp reference (16x)<div style="width:290px;height:340px;position:relative;overflow:hidden"><img style="position:absolute;width:736px;height:512px;max-width:none;left:-224px;top:-80px;image-rendering:pixelated" src="${base}/src/assets/${encodeURIComponent(logoReference)}"></div></section><section>Traced SVG (16x)<img style="display:block;width:288px;height:320px" src="${base}/src/assets/phasionable-sewing-logo.svg"></section></div><div style="display:flex;gap:24px;margin-top:16px"><section>Reference at header scale<div style="background:#3f8e6f;height:44px;width:290px;position:relative;overflow:hidden"><img style="position:absolute;width:40.89px;height:28.44px;max-width:none;left:11.56px;top:8.67px" src="${base}/src/assets/${encodeURIComponent(logoReference)}"></div></section><section>SVG at actual 16 x 24 size<div style="background:#3f8e6f;height:44px;width:290px;display:flex;align-items:center;padding-left:24px;box-sizing:border-box"><img style="width:16px;height:24px" src="${base}/src/assets/phasionable-sewing-logo.svg"></div></section></div></body>`)
    await page.locator('img').evaluateAll((images) => Promise.all(images.map((image) => image.decode())))
    await page.screenshot({ path: 'artifacts/milestone-03/header/logo-comparison.png', fullPage: true })
    const highDensity = await browser.newContext({ viewport: { width: 402, height: 874 }, deviceScaleFactor: 3 })
    const highDensityPage = await highDensity.newPage()
    for (const screen of ['welcome', 'login', 'signup']) {
      await highDensityPage.goto(`${base}/${screen}`)
      const logo = highDensityPage.getByRole('link', { name: 'PHASIONABLE home', exact: true }).locator('img')
      await logo.evaluate((image) => image.decode())
      const logoSource = await logo.getAttribute('src')
      assert(logoSource.startsWith('data:image/svg+xml') || logoSource.includes('phasionable-sewing-logo.svg'))
      await highDensityPage.locator('.auth-header').screenshot({ path: `artifacts/milestone-03/header/${screen}-header-3x.png` })
    }
    await highDensity.close()
    for (const width of [360, 402, 768, 1280]) {
      await page.setViewportSize({ width, height: width <= 402 ? 874 : 960 })
      let firstLogo
      for (const screen of ['welcome', 'login', 'signup']) {
        await page.goto(`${base}/${screen}`)
        const logo = page.getByRole('link', { name: 'PHASIONABLE home', exact: true })
        await logo.locator('img').evaluate((image) => image.decode())
        const bounds = await logo.locator('img').boundingBox()
        assert.equal(bounds.width, 16)
        assert.equal(bounds.height, 24)
        if (firstLogo) assert.deepEqual(bounds, firstLogo)
        firstLogo = bounds
        assert.equal(await page.getByRole('button', { name: 'Log out', exact: true }).count(), 0)
        const cart = page.getByRole('button', { name: 'Shopping cart is outside the current MVP.', exact: true })
        assert(await cart.isDisabled())
        const location = page.url()
        await cart.focus()
        await page.keyboard.press('Enter')
        assert.equal(page.url(), location)
        assert(await page.getByRole('tooltip').isVisible())
        await logo.focus()
        await page.keyboard.press('Enter')
        await page.waitForURL(`${base}/`)
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
        await page.goto(`${base}/${screen}`)
        await page.locator('.auth-photo').evaluate((image) => image.decode())
        await page.screenshot({ path: `artifacts/milestone-03/header/${screen}-${width}.png`, fullPage: true })
      }
    }
    await page.goto(`${base}/login`)
    await page.getByLabel('Email', { exact: true }).fill('amina.demo@example.test')
    await page.getByLabel('Password', { exact: true }).fill('demo-only')
    await page.getByRole('button', { name: 'Log In', exact: true }).click()
    await page.waitForURL('**/customer')
    for (const width of [360, 402, 768, 1280]) {
      await page.setViewportSize({ width, height: width <= 402 ? 874 : 960 })
      for (const screen of ['welcome', 'login', 'signup']) {
        await page.goto(`${base}/${screen}`)
        const logout = page.getByRole('button', { name: 'Log out', exact: true })
        await logout.waitFor()
        const bounds = await logout.boundingBox()
        assert(bounds.x >= 0 && bounds.x + bounds.width <= width)
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
        await page.screenshot({ path: `artifacts/milestone-03/header/${screen}-${width}-signed-in.png`, fullPage: true })
      }
    }
    await page.getByRole('button', { name: 'Log out', exact: true }).focus()
    await page.keyboard.press('Enter')
    await page.waitForURL(`${base}/`)
    assert.equal(await page.getByRole('button', { name: 'Log out', exact: true }).count(), 0)
    assert(await page.getByRole('link', { name: 'Log in', exact: true }).isVisible())
    await page.reload()
    await page.goto(`${base}/customer`)
    await page.getByRole('heading', { name: 'Log in to continue' }).waitFor()
    console.log('Logo sizing, unavailable cart, keyboard access, and session header checks passed')
  }
} finally { await browser.close() }
