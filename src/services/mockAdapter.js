import { ServiceError } from './errors.js'
import { clone, readDemoStore, resetDemoStore, writeDemoStore } from './storage.js'
import { createMockAccounts } from './mockAccounts.js'

const DELAY_MS = 900

function normalizeContext(context = {}) {
  return {
    scenario: 'normal',
    identityId: 'acct-customer-amina',
    ...context,
  }
}

function getIdentity(store, identityId) {
  const identity = store.accounts.find((account) => account.id === identityId)
  if (!identity) {
    throw new ServiceError('forbidden', 'Demo identity is unavailable. Choose another fictional identity.')
  }
  return identity
}

function delayIfNeeded(scenario) {
  if (scenario !== 'delayed') return Promise.resolve()
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, DELAY_MS)
  })
}

function applyScenario(scenario, fallbackEmpty) {
  if (scenario === 'validation') {
    throw new ServiceError('validation_error', 'Demo validation error. Review the highlighted fictional fields.', {
      fieldErrors: { title: 'A valid demo title is required.' },
    })
  }
  if (scenario === 'missing') {
    throw new ServiceError('not_found', 'Demo record was not found or is unavailable.')
  }
  if (scenario === 'forbidden') {
    throw new ServiceError('forbidden', 'This fictional identity cannot access that demo record.')
  }
  if (scenario === 'failure') {
    throw new ServiceError('temporary_failure', 'Temporary demo failure. Retry without losing entered data.')
  }
  if (scenario === 'empty') {
    return clone(fallbackEmpty)
  }
  return undefined
}

async function respond(context, fallbackEmpty, producer) {
  const { scenario } = normalizeContext(context)
  await delayIfNeeded(scenario)
  const scenarioResult = applyScenario(scenario, fallbackEmpty)
  if (scenarioResult !== undefined) return scenarioResult
  return clone(producer())
}

function ownDesignerId(identity) {
  return identity.role === 'designer' ? identity.designerId : null
}

function canAccessRequest(identity, request) {
  return request.customerId === identity.id || request.designerId === ownDesignerId(identity) || identity.role === 'admin'
}

function canAccessOrder(identity, order) {
  return order.customerId === identity.id || order.designerId === ownDesignerId(identity) || identity.role === 'admin'
}

function saveOperation(store, operationId, result) {
  if (!operationId) return null
  if (store.meta.duplicateOperations[operationId]) {
    return store.meta.duplicateOperations[operationId]
  }
  store.meta.duplicateOperations[operationId] = result
  return null
}

export function createMockAdapter(context) {
  const currentContext = () => normalizeContext(typeof context === 'function' ? context() : context)

  return {
    accounts: {
      ...createMockAccounts(currentContext, respond),
      listDemoIdentities() {
        return respond(currentContext(), [], () =>
          readDemoStore().accounts.map(({ id, role, displayName, email }) => ({ id, role, displayName, email })),
        )
      },
      getCurrentIdentity() {
        return respond(currentContext(), null, () => getIdentity(readDemoStore(), currentContext().identityId))
      },
    },
    profiles: {
      getOwnProfile() {
        return respond(currentContext(), null, () => {
          const store = readDemoStore()
          const identity = getIdentity(store, currentContext().identityId)
          return store.profiles.find((profile) => profile.accountId === identity.id)
        })
      },
      updateOwnProfile(patch) {
        return respond(currentContext(), null, () => {
          const store = readDemoStore()
          const identity = getIdentity(store, currentContext().identityId)
          const index = store.profiles.findIndex((profile) => profile.accountId === identity.id)
          if (index < 0) throw new ServiceError('not_found', 'Demo profile is unavailable.')
          store.profiles[index] = { ...store.profiles[index], ...patch, accountId: identity.id }
          writeDemoStore(store)
          return store.profiles[index]
        })
      },
      getProfile(profileId) {
        return respond(currentContext(), null, () => {
          const profile = readDemoStore().profiles.find((item) => item.id === profileId)
          if (!profile) throw new ServiceError('not_found', 'Demo profile was not found.')
          return profile
        })
      },
    },
    portfolios: {
      listForDesigner(designerId) {
        return respond(currentContext(), [], () =>
          readDemoStore().portfolios.filter((portfolio) => portfolio.designerId === designerId),
        )
      },
    },
    discovery: {
      listDesigners() {
        return respond(currentContext(), [], () => {
          const store = readDemoStore()
          return store.designers
            .filter((designer) => designer.status === 'approved' && designer.published)
            .map((designer) => ({
              ...designer,
              profile: store.profiles.find((profile) => profile.designerId === designer.id),
              portfolios: store.portfolios.filter(
                (portfolio) => portfolio.designerId === designer.id && portfolio.status === 'published',
              ),
            }))
        })
      },
    },
    requests: {
      listMine() {
        return respond(currentContext(), [], () => {
          const store = readDemoStore()
          const identity = getIdentity(store, currentContext().identityId)
          return store.requests.filter((request) => canAccessRequest(identity, request))
        })
      },
      createDraft({ designerId, title, operationId }) {
        return respond(currentContext(), null, () => {
          const store = readDemoStore()
          const identity = getIdentity(store, currentContext().identityId)
          if (identity.role !== 'customer') {
            throw new ServiceError('forbidden', 'Only fictional customers can create demo request drafts.')
          }
          const duplicate = saveOperation(store, operationId, null)
          if (duplicate) return { ...duplicate, duplicate: true }
          if (!title?.trim()) {
            throw new ServiceError('validation_error', 'Demo request title is required.', {
              fieldErrors: { title: 'Enter a fictional request title.' },
            })
          }
          const request = {
            id: `request-draft-${identity.id}-${store.requests.length + 1}`,
            customerId: identity.id,
            designerId,
            title,
            state: 'draft',
            measurementStatus: 'pending',
            createdAt: '2026-10-08',
          }
          store.requests.push(request)
          if (operationId) store.meta.duplicateOperations[operationId] = request
          writeDemoStore(store)
          return request
        })
      },
    },
    measurements: {
      listMine() {
        return respond(currentContext(), [], () => {
          const store = readDemoStore()
          const identity = getIdentity(store, currentContext().identityId)
          if (identity.role === 'customer') {
            return store.measurements.filter((measurement) => measurement.customerId === identity.id)
          }
          if (identity.role === 'designer') {
            const ownedCustomerIds = store.requests
              .filter((request) => request.designerId === identity.designerId)
              .map((request) => request.customerId)
            return store.measurements.filter((measurement) => ownedCustomerIds.includes(measurement.customerId))
          }
          return store.measurements
        })
      },
    },
    conversations: {
      listMine() {
        return respond(currentContext(), [], () => {
          const store = readDemoStore()
          const identity = getIdentity(store, currentContext().identityId)
          if (identity.role === 'admin') return store.conversations
          return store.conversations.filter((thread) => thread.participantIds.includes(identity.id))
        })
      },
      listMessages(threadId) {
        return respond(currentContext(), [], () => {
          const store = readDemoStore()
          const identity = getIdentity(store, currentContext().identityId)
          const thread = store.conversations.find((item) => item.id === threadId)
          if (!thread) throw new ServiceError('not_found', 'Demo conversation is unavailable.')
          if (identity.role !== 'admin' && !thread.participantIds.includes(identity.id)) {
            throw new ServiceError('forbidden', 'This fictional identity cannot read that demo conversation.')
          }
          return store.messages.filter((message) => message.threadId === threadId)
        })
      },
    },
    specifications: {
      listForRequest(requestId) {
        return respond(currentContext(), [], () => {
          const store = readDemoStore()
          const identity = getIdentity(store, currentContext().identityId)
          const request = store.requests.find((item) => item.id === requestId)
          if (!request) throw new ServiceError('not_found', 'Demo request is unavailable.')
          if (!canAccessRequest(identity, request)) {
            throw new ServiceError('forbidden', 'This fictional identity cannot access those specifications.')
          }
          return store.specifications.filter((spec) => spec.requestId === requestId)
        })
      },
      confirmLatest({ requestId, version, operationId }) {
        return respond(currentContext(), null, () => {
          const store = readDemoStore()
          const identity = getIdentity(store, currentContext().identityId)
          if (identity.role !== 'customer') {
            throw new ServiceError('forbidden', 'Only the fictional customer can confirm a demo specification.')
          }
          const duplicate = saveOperation(store, operationId, null)
          if (duplicate) return { ...duplicate, duplicate: true }
          const request = store.requests.find((item) => item.id === requestId)
          if (!request || request.customerId !== identity.id) {
            throw new ServiceError('forbidden', 'This fictional customer cannot confirm that request.')
          }
          const specs = store.specifications.filter((spec) => spec.requestId === requestId)
          const latest = specs.sort((a, b) => b.version - a.version)[0]
          if (!latest || latest.version !== version) {
            throw new ServiceError('stale_version', 'A newer demo specification exists. Review the latest version before confirming.', {
              latestVersion: latest?.version,
            })
          }
          const result = {
            requestId,
            specificationId: latest.id,
            status: 'ready-for-order-demo',
            note: 'Frontend-only stale-version demonstration. A real backend must enforce this atomically.',
          }
          if (operationId) store.meta.duplicateOperations[operationId] = result
          writeDemoStore(store)
          return result
        })
      },
    },
    orders: {
      listMine() {
        return respond(currentContext(), [], () => {
          const store = readDemoStore()
          const identity = getIdentity(store, currentContext().identityId)
          return store.orders.filter((order) => canAccessOrder(identity, order))
        })
      },
    },
    notifications: {
      listMine() {
        return respond(currentContext(), [], () => {
          const store = readDemoStore()
          const identity = getIdentity(store, currentContext().identityId)
          if (identity.role === 'admin') return store.notifications
          return store.notifications.filter((notification) => notification.ownerId === identity.id)
        })
      },
    },
    reviews: {
      listForDesigner(designerId) {
        return respond(currentContext(), [], () =>
          readDemoStore().reviews.filter((review) => review.designerId === designerId && review.status === 'published'),
        )
      },
    },
    administration: {
      listModerationQueue() {
        return respond(currentContext(), [], () => {
          const store = readDemoStore()
          const identity = getIdentity(store, currentContext().identityId)
          if (identity.role !== 'admin') {
            throw new ServiceError('forbidden', 'Only the fictional administrator can view the demo moderation queue.')
          }
          return {
            pendingDesigners: store.designers.filter((designer) => designer.status === 'pending'),
            issues: store.issues,
          }
        })
      },
      resetDemoData() {
        return respond({ ...currentContext(), scenario: 'normal' }, null, () => resetDemoStore())
      },
    },
  }
}
