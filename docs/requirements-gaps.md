# Requirements Gaps

## Milestone 03

- The latest implementation request includes the existing fictional admin identity in demo login, while the earlier plan limited administrator entry to development controls. Existing-admin demo login follows the latest request; public administrator registration remains unavailable. Real administrator access policy is unresolved.

- The source PRD document is absent from the repository. Implementation follows the reproduced requirements in AGENTS.md; direct source-document comparison is unverified.
- Password policy and confirmation-field requirement remain unspecified. Demo validation requires a nonempty value only; no password is saved. All fictional logins use `demo-only`, including newly registered identities.
- Real verification/recovery/session contracts, expiry duration, and access restrictions for unverified accounts remain undefined. Demo verification is a notice, not a newly invented access policy. Development controls select verified/unverified outcomes.
- Signup accepts fictional `@example.test` addresses only to avoid storing real contact data. This restriction is not a production policy.
- Matching photography is supplied as `image 62.png`. Exact typefaces and the reference monogram are missing; Arial/Georgia and a PHASIONABLE wordmark are explicit temporary substitutes. Asset licensing remains a handoff requirement.
- Recovery/reset/verification and tablet/desktop layouts are proposed adaptations without matching supplied designs. PHASIONABLE is preserved wherever present; MY GARB remains the documentation project name.

## Milestone 01

- Final approved device coverage is not confirmed. The 360 px, 768 px, and 1280 px widths are treated as proposed review checkpoints.
- Supplied screenshots are visual references only. This milestone does not claim production asset rights or final Figma coverage.
- Admin navigation is implemented as a separate shell placeholder. Administrative workflows, authorization, and approval behavior are out of scope until later milestones.
- No service contracts or backend endpoints are defined in this milestone.

## Milestone 02

- Real backend contracts, endpoint URLs, authorization rules, session behavior, secure upload handling, and persistent database responsibilities are not supplied. The real adapter therefore returns `backend_not_configured`.
- Mock identity switching, owner filtering, duplicate-submit behavior, and stale specification conflicts are frontend demonstrations only and do not provide real security or server guarantees.
- Exact garment taxonomy, measurement schema, profile-required fields, availability vocabulary, file limits, and moderation outcomes remain provisional demo assumptions.
- Commercial terms are represented only as fictional labels. The demo does not simulate checkout, payments, escrow, refunds, courier tracking, or delivery guarantees.
- Request withdrawal is limited to explicit submitted/discussing demo states until the missing awaiting-confirmation withdrawal rule is resolved.
