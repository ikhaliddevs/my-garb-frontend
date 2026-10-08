# Frontend Service Contracts

Milestone 02 introduces provisional frontend-only service groups. These contracts are intentionally small and promise-based so a real backend adapter can replace the mock adapter later.

## Adapter Modes

- `mock`: reads and writes fictional demo records in browser `localStorage` under `my-garb.demo-store.v2`.
- `real`: every method rejects with `backend_not_configured` until approved backend contracts and endpoints exist. It does not fall back to mock data.

Development settings are stored in `localStorage` under `my-garb.demo-settings.v2`.

## Service Groups

- `accounts`: list fictional identities and read the currently selected demo identity.
- `profiles`: read/update the current identity profile and read a specific profile.
- `portfolios`: list portfolio records for a designer.
- `discovery`: list approved and published designers.
- `requests`: list accessible requests and create a demo draft with an operation identifier.
- `measurements`: list measurements scoped to the fictional owner or related designer.
- `conversations`: list accessible threads and messages.
- `specifications`: list request specification versions and demonstrate stale-version protection.
- `orders`: list accessible orders and production progress history.
- `notifications`: list in-app notifications for the fictional owner.
- `reviews`: list published reviews for a designer.
- `administration`: list pending demo moderation records and reset the demo store.

All methods return promises and may reject with a `ServiceError` containing a stable `code`.

## Development Scenarios

- Normal responses.
- Delayed responses.
- Empty results.
- Validation errors.
- Missing records.
- Forbidden operations.
- Temporary failures.

These scenarios exist for frontend state testing only. They are not real authentication, authorization, validation, or retry guarantees.

## Duplicate and Version Demonstrations

`requests.createDraft` accepts an `operationId` and returns the original fictional result if the same operation is submitted again.

`specifications.confirmLatest` rejects with `stale_version` when the caller confirms an older version. This is a frontend/mock demonstration only. A real backend must enforce deduplication and version consistency atomically.

## Milestone 03 Account Contracts

All account methods are promises. `login({email,password})` and `signup({email,password,role})` return a fictional account with `verified` and optional `approvalStatus`; password inputs are transient only. `restoreSession()` returns that account or null. `logout()` returns `{cleared:true}`. Signup allows only customer/designer and creates pending designers; duplicate email rejects with `duplicate_email`.

`requestRecovery({email})` returns a generic `{message}` for every syntactically valid address. `resetPassword({token,password})` returns `{message}` or rejects with `invalid_token`, `expired_token`, or `used_token`. Public constant reset identifiers demonstrate outcomes only; no credentials change. See milestone-03.md for the fixed demo login mechanism.

Development-only operations: `simulateIdentity(identityId)` returns the selected fictional account/session; `simulateVerification(identityId,verified)` returns an updated fictional account; `resetRecoveryDemo()` returns `{reset:true}`. A missing verification override defaults to verified except for Chidi. Session restoration uses the configured adapter/scenario; empty gives no session, failures give actionable unavailable states. Mutating account operations reject an empty scenario rather than reporting success.

Errors use existing `ServiceError` codes and optional `{fieldErrors}`. Required password only and no confirmation field are provisional, not production policy. This milestone does not specify real credentials, session expiry durations, email delivery, or verification gates.

## Backend Responsibilities (Unchanged)

A production backend must provide real authentication, authorization, sessions, persistence, secure uploads, notification delivery, state-transition enforcement, audit records, atomic duplicate-submit handling, and stale-version protection. No backend URLs or endpoints are defined in this milestone.
