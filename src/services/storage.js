import { createSeedData } from './fixtures.js'

export const DEMO_STORAGE_KEY = 'my-garb.demo-store.v2'
export const DEMO_SETTINGS_KEY = 'my-garb.demo-settings.v2'

let memoryStore = null

function getLocalStorage() {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null
  } catch {
    return null
  }
}

export function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

export function readDemoStore() {
  const storage = getLocalStorage()
  if (!storage) {
    memoryStore ||= createSeedData()
    return clone(memoryStore)
  }

  const stored = storage.getItem(DEMO_STORAGE_KEY)
  if (!stored) {
    const seed = createSeedData()
    storage.setItem(DEMO_STORAGE_KEY, JSON.stringify(seed))
    return clone(seed)
  }

  try {
    return JSON.parse(stored)
  } catch {
    const seed = createSeedData()
    storage.setItem(DEMO_STORAGE_KEY, JSON.stringify(seed))
    return clone(seed)
  }
}

export function writeDemoStore(nextStore) {
  const storage = getLocalStorage()
  if (!storage) {
    memoryStore = clone(nextStore)
    return clone(memoryStore)
  }

  storage.setItem(DEMO_STORAGE_KEY, JSON.stringify(nextStore))
  return clone(nextStore)
}

export function resetDemoStore() {
  const seed = createSeedData()
  return writeDemoStore(seed)
}

export function readDemoSettings() {
  const defaults = {
    adapterMode: 'mock',
    scenario: 'normal',
    identityId: 'acct-customer-amina',
  }
  const storage = getLocalStorage()
  if (!storage) return defaults

  try {
    return { ...defaults, ...JSON.parse(storage.getItem(DEMO_SETTINGS_KEY) || '{}') }
  } catch {
    return defaults
  }
}

export function writeDemoSettings(settings) {
  const next = { ...readDemoSettings(), ...settings }
  const storage = getLocalStorage()
  if (storage) {
    storage.setItem(DEMO_SETTINGS_KEY, JSON.stringify(next))
  }
  return next
}
