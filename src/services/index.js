import { createMockAdapter } from './mockAdapter.js'
import { createRealAdapter } from './realAdapter.js'
import { readDemoSettings, resetDemoStore, writeDemoSettings } from './storage.js'

export const serviceScenarios = [
  { value: 'normal', label: 'Normal responses' },
  { value: 'delayed', label: 'Delayed responses' },
  { value: 'empty', label: 'Empty results' },
  { value: 'validation', label: 'Validation errors' },
  { value: 'missing', label: 'Missing records' },
  { value: 'forbidden', label: 'Forbidden operations' },
  { value: 'failure', label: 'Temporary failures' },
]

export const adapterModes = [
  { value: 'mock', label: 'Mock adapter' },
  { value: 'real', label: 'Real adapter (not configured)' },
]

export function createServices(settings) {
  if (settings.adapterMode === 'real') {
    return createRealAdapter()
  }
  return createMockAdapter(() => settings)
}

export { readDemoSettings, resetDemoStore, writeDemoSettings }
