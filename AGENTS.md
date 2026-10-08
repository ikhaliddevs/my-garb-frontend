# MY GARB Frontend Development Instructions

## Milestone 03 Header Refinement Override

The explicitly requested header refinement permits a reference-style shopping-cart icon only as an unavailable visual placeholder. It must explain "Shopping cart is outside the current MVP." accessibly and provide no cart navigation, counts, checkout, payment, or shopping behavior. This visual exception overrides earlier instructions to omit the icon, not the MVP exclusions.

Use the local decorative-P SVG approximation through BrandLogo.jsx in the product headers. Preserve the central PHASIONABLE title. The raster-derived SVG is not the original Figma vector; record unresolved decorative details. Show mock Log out only for an active fictional session and preserve signed-out login navigation.

## Instructions for Codex

- Implement only the milestone I explicitly request. Do not automatically continue to another milestone.
- Preserve existing working code. Inspect the repository and applicable instructions before editing, and avoid unnecessary rewrites.
- Verify each milestone against its acceptance criteria and testing steps before marking it complete.
- Clearly identify mock functionality. Display “Demo mode — simulated data and actions” wherever applicable, and never present simulated authentication, messages, orders, approvals, or other actions as production functionality.
- If a milestone is partially implemented, report what works, what remains, and which checks have not passed.
- Follow the revised MVP scope strictly.
- Flag missing or conflicting requirements instead of silently inventing product rules.
- Use a separate service layer so mock implementations can later be replaced with approved backend integrations.
- Do not invent API endpoints.
- Do not write backend code, deploy the application, or claim production readiness unless separately requested.
- Keep implementation work limited to the requested milestone and the dependencies genuinely necessary for it.

# MY GARB Frontend Development Milestones

Based on MY_GARB_PRD(1).docx, Draft 2.0, dated 7 October 2026.

Frontend stack:

- React
- Vite
- JavaScript
- Bootstrap
- Custom CSS

This document is a development plan and implementation guide. It does not contain application code.

## How to Use This Plan

Work in order. Each milestone is a small piece of the PRD’s broader delivery phases. Do not start the next milestone until the current milestone’s checklist passes.

Use the complete implementation prompt under the requested milestone. Make the revised PRD and available screenshots accessible in the repository or Codex session.

Commit or otherwise checkpoint each verified milestone. No duration is promised because team capacity is unknown.

An adapter is a replaceable implementation of a service. Screens call the same service methods whether data comes from fictional fixtures now or approved backend contracts later.

A snapshot is a saved copy of the terms both parties accepted. Editing a profile must not change an existing order snapshot.

Acceptance criteria describe the behavior that must pass the listed checks.

All asynchronous screens need:

- Loading states.
- Empty states.
- Error states with useful retry actions.
- Successful loaded or saved states.

Errors should preserve entered data.

Demo role checks and authentication are simulations. Frontend route guards are not production security.

Persist only fictional demo records. Never persist entered passwords or real personal measurements.

Keep a visible “Demo mode — simulated data and actions” notice.

Use a development-only scenario switch and reset tool outside normal product navigation.

## Strict MVP Scope

Build:

- Designer discovery.
- Accounts.
- Customer and designer profiles.
- Designer portfolios.
- Custom requests.
- Guided measurements.
- Discussion and messaging.
- Versioned specification confirmation.
- Order management and production progress.
- In-app notifications.
- Customer completion.
- Completed-order reviews.
- Basic administration.
- Issue reporting and resolution.

Exclude:

- Ready-made shopping.
- Shopping carts.
- Checkout.
- Favorites.
- Discounts.
- Flash sales.
- Integrated payments.
- Escrow.
- Courier tracking.
- AI recommendations.
- Virtual try-on.
- Advanced identity verification.
- Native mobile apps.
- International expansion.

## Visual References

The five earlier supplied PNGs were inspected:

- SIGNUP HOME SCREEN.png
- Sign Up.png
- Login.png
- Home page fidelity.png
- Message.png

They are contained in BUTTON _ PRODUCT CARD.zip.

Use these references for:

- Green colors.
- Photography.
- Rounded cards.
- Form treatments.
- Conversation rows.

Welcome, authentication, discovery, and messages have visual references.

Request, measurement, specification, order, review, designer dashboard, and admin screens do not have supplied designs. Design simple, consistent layouts for those screens and flag them for review rather than claiming Figma supplied them.

| Reference conflict | Follow the revised PRD |
| --- | --- |
| PHASIONABLE branding | Preserve PHASIONABLE wherever it appears in supplied Figma designs. MY GARB remains the project name in documentation. This correction overrides earlier visible-branding replacement instructions. |
| Phone Number / Email | Email/password is the proposed baseline; phone sign-in is deferred. |
| Cart, heart, six unlabeled navigation icons | Use labeled Discover, Requests and Orders, Messages, Profile; separate admin navigation. |
| New Collection, 50% discount, Flash Sale, Shop Now | Replace with focused designer and portfolio discovery; no commerce controls. |
| T-shirt/Pant and other fixed categories | Use configurable provisional demo taxonomy until pilot categories are approved. |
| Log out on guest/authentication screens | Show only for an active demo session. |
| Compose icon implying arbitrary new chats | Only linked participant threads until pre-request messaging rules are confirmed. |

Use mobile-first layouts.

Test at:

- 360 px.
- 768 px.
- 1280 px.

These are proposed checkpoints rather than final approved device coverage.

Use readable forms and grids on larger screens rather than stretching a phone screenshot.

Aim for the PRD’s proposed:

- 44 × 44 px touch targets.
- Keyboard operation.
- Visible focus.
- No horizontal scrolling.
- No content hidden behind navigation.

Asset usage rights and production-ready image files remain a handoff requirement.

## Decisions to Flag Before Real Implementation or Pilot Use

Use explicit provisional demo configuration when possible.

If an action depends on an absent policy, show a blocked or unconfigured state.

Record gaps in docs/requirements-gaps.md.

Record service assumptions in docs/frontend-service-contracts.md.

These are proposed documentation names, not claims that the files already exist.

1. Exact garment and occasion categories, pilot geography, required profile fields, contact preferences, and availability vocabulary.
2. Approved measurement labels, instructions and images, required fields, assisted-measurement arrangements, and rounding. A request may start with pending measurements; confirmation needs complete, reviewed measurements.
3. Password policy, recovery and verification contracts, and whether one account can have more than one non-admin role. Do not invent production rules or expose administrator self-registration.
4. Draft/published portfolio workflow and allowed moderation outcomes. Customer review editing is unspecified.
5. Commercial terms, fabric ownership, payment arrangements, prerequisites for production, and handover/correction responsibility. No paid badge, checkout, or refund simulation that implies actual money movement.
6. Allowed changes and cancellations by order state, handling concurrent changes, and proof of customer agreement for administrator exceptions.
7. Withdrawal conflict: prose permits withdrawal before conversion, but the Awaiting confirmation row omits it. Build explicit Submitted/Discussing withdrawal only and flag the missing rule.
8. Whether public contact before a request is allowed. Existing request/order threads are the documented baseline, not a final policy decision.
9. File-count and text-length limits, support escalation, retention/deletion policy, final branding, missing designs, performance test profile, and pilot thresholds.
10. Actual backend method contracts and endpoint URLs. Define provisional frontend method interfaces only; never invent URLs or treat the demo as a live multi-user pilot.

## Dependency Map

| Milestone | Working result | PRD coverage |
| --- | --- | --- |
| 01 — Project setup and shared styling | A React/Vite app opens with one consistent, responsive layout. No business workflows are built yet. | Quality requirements; navigation and missing designs |
| 02 — Replaceable service layer and demo fixtures | Every later screen can request data through one replaceable service interface, with predictable demo states. | Implementation and data boundaries; quality requirements |
| 03 — Welcome and demo authentication | Visitors can browse publicly or enter a clearly labeled customer/designer demo session and return to an interrupted action. | FR01; supplied welcome, Sign Up, and Login designs |
| 04 — Customer and designer profiles | Each role can manage its own profile, and designer publication status is clear. | FR02 |
| 05 — Designer portfolio management | Designers can manage work samples without presenting them as stock for sale. | FR04 |
| 06 — Designer discovery and public portfolio viewing | A guest can find an approved designer and inspect relevant work before requesting an outfit. | FR03; FR04; Home page fidelity design |
| 07 — Custom request form and drafts | A customer can send one selected designer a valid request and recover a private draft. | FR05; customer journey |
| 08 — Guided measurements and private measurement profile | Customers can enter category-specific measurements with explicit units, and designers can later review them. | FR06; measurement journey |
| 09 — Designer request inbox and triage | A designer can inspect an owned request, begin discussion, or decline; the customer sees the result. | FR07 response; request lifecycle |
| 10 — Request and order messaging | Participants can discuss a request in a persistent demo thread without changing structured terms. | FR08; Message design |
| 11 — Versioned specification and mutual confirmation | The designer proposes complete terms, and customer confirmation creates exactly one demo order from the latest version. | FR07; request-to-order conversion |
| 12 — Order lists, timeline, and production progress | Both roles see accepted terms and progress; designers can update production through handover. | FR09; order lifecycle |
| 13 — Order change proposals and cancellation requests | Accepted terms stay intact until a change is agreed; a cancellation request does not cancel immediately. | FR09; fit correction; cancellation lifecycle |
| 14 — Issue reporting and participant issue status | Customers/designers can report a problem and see that an unresolved issue blocks completion. | FR12; independent issue lifecycle |
| 15 — Customer completion and eligible reviews | A customer confirms receipt/completion only after handover with no unresolved issue, then posts one eligible review. | FR10; completion journey |
| 16 — In-app notifications | Each user can see relevant workflow events and open the correct authorized destination. | FR11 |
| 17 — Admin designer categories and moderation | The demo administrator can manage pilot visibility and moderate reported content with reasons. | FR12; FR02; FR10 |
| 18 — Admin issue assignment and resolution | An administrator can record a traceable issue outcome that participants can read. | FR12; issue and completion exceptions |
| 19 — Full journey verification and backend handoff | The frontend demonstrates every P0 journey, passes responsive checks, and has a precise integration handoff; it is still not a live pilot. | Release acceptance; quality requirements; pilot measurement |

The sequence is linear for implementation convenience.

Cross-feature dependencies:

- Completion in milestone 15 depends on issue reporting in milestone 14.
- Admin resolution in milestone 18 depends on issue reporting and admin access.
- Notifications in milestone 16 connect events already emitted by earlier milestones.

Customer and designer pages share the same demo record store so switching identities reflects the same journey.

The development-only administrator/scenario control is not a production feature.

## Milestone 01 — Project Setup and Shared Styling

Depends on: none.

PRD coverage: Quality requirements; navigation and missing designs.

### 1. Goal and Completed Result

A React/Vite app opens with one consistent, responsive layout.

No business workflows are built yet.

### 2. Pages, Components, and Features

Inspect the existing project first.

Use JavaScript, Bootstrap, and custom CSS. Add client-side routing if needed.

Create:

- Public layout shell.
- Customer layout shell.
- Designer layout shell.
- Admin layout shell.
- Labeled Discover navigation.
- Requests and Orders navigation.
- Messages navigation.
- Profile navigation.
- Button.
- FormField.
- Select.
- Alert.
- Spinner.
- EmptyState.
- ErrorState.
- StatusBadge.
- Confirmation dialog.
- Not-found page.

Add CSS variables for:

- The supplied green palette.
- Spacing.
- Typography.
- Rounded surfaces.

### 3. Interactions, Validation, and States

Test:

- Active navigation.
- Keyboard focus.
- Menu opening and closing.

Shared form fields need persistent labels and associated error text.

Create a development-only page demonstrating loading, empty, error, and success states.

Fixed navigation must leave enough bottom padding.

### 4. Mock Data

Only fictional navigation identities and sample state messages.

No mock sign-in yet.

### 5. Acceptance Criteria and Simple Tests

The milestone passes when all of these checks pass:

1. Open the app and navigate between shell routes; unknown routes show Not found.
2. At 360, 768, and 1280 px, verify no horizontal scrolling or covered content.
3. Use Tab, Enter, and Escape with menus and dialogs; check focus returns to the trigger.
4. Check shared loading, empty, error, and success examples and run the production build.

Boundary or unresolved requirement:

Use the screenshots for visual direction, not their obsolete commerce navigation.

Admin navigation is separate.

The width checkpoints are proposed test sizes, not approved final breakpoints.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 01: Project setup and shared styling.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: A React/Vite app opens with one consistent, responsive layout. No business workflows are built yet.

Build: Inspect the existing project first. Use JavaScript, Bootstrap, and custom CSS; add client-side routing if needed. Create public, customer, designer, and admin layout shells; labeled Discover, Requests and Orders, Messages, and Profile navigation; Button, FormField, Select, Alert, Spinner, EmptyState, ErrorState, StatusBadge, and confirmation-dialog components. Add CSS variables for the supplied green palette, spacing, typography, and rounded surfaces. Include a not-found page.

Interactions, validation, and states: Test active navigation, keyboard focus, and menu opening/closing. Shared form fields need persistent labels and associated error text. Create a development-only page demonstrating loading, empty, error, and success states. Fixed navigation must leave enough bottom padding.

Mock fixtures: Only fictional navigation identities and sample state messages. No mock sign-in yet.

Milestone boundaries and gaps: Use the screenshots for visual direction, not their obsolete commerce navigation. Admin navigation is separate. The width checkpoints are proposed test sizes, not approved final breakpoints.

Acceptance checks:

1. Open the app and navigate between shell routes; unknown routes show Not found.
2. At 360, 768, and 1280 px, verify no horizontal scrolling or covered content.
3. Use Tab, Enter, and Escape with menus and dialogs; check focus returns to the trigger.
4. Check shared loading, empty, error, and success examples and run the production build.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 02 — Replaceable Service Layer and Demo Fixtures

Depends on: milestone 01.

PRD coverage: Implementation and data boundaries; quality requirements.

### 1. Goal and Completed Result

Every later screen can request data through one replaceable service interface, with predictable demo states.

### 2. Pages, Components, and Features

Create services grouped by:

- Accounts.
- Profiles.
- Portfolios.
- Discovery.
- Requests.
- Measurements.
- Conversations.
- Specifications.
- Orders.
- Notifications.
- Reviews.
- Administration.

Components call services rather than importing fixture arrays.

Implement a mock adapter.

A real adapter must report Not configured until actual contracts are supplied.

Add a development-only scenario selector and reset control outside product navigation.

### 3. Interactions, Validation, and States

All service methods return promises.

Provide selectable:

- Delay.
- Empty response.
- Validation error.
- Unavailable resource.
- Forbidden action.
- Temporary failure.

Keep pending/retry UI behavior reusable.

Persist fictional serializable records across refresh, partition them by owner, and make reset reproducible.

### 4. Mock Data

Seed:

- Two customers.
- Several designers with approved, pending, and suspended states.
- One demo administrator.
- Published and unpublished portfolios.
- Requests in each lifecycle state.
- Versioned specifications.
- Orders.
- Messages.
- Reviews.
- Notifications.
- Issues.

Use deterministic IDs, relative dates, and fake contact details.

Binary images may use bundled demo assets. An unavailable temporary preview must show a recovery state.

### 5. Acceptance Criteria and Simple Tests

1. Switch delay/error/empty scenarios and verify service results.
2. Edit a fictional record, refresh, and confirm persistence; reset restores seeds.
3. Switch demo identities and verify owner filtering and forbidden results.
4. Select real-service mode: show Not configured instead of silently using mocks.

Boundary or unresolved requirement:

No invented HTTP paths, production requests, server, database, password storage, real uploads, or security claims.

Simulate operation identifiers for repeat-submit protection and specification version conflicts.

Document method inputs and outputs as provisional frontend contracts.

Mock role rules are demonstrations, never authorization.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 02: Replaceable service layer and demo fixtures.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: Every later screen can request data through one replaceable service interface, with predictable demo states.

Build: Create services grouped by accounts, profiles, portfolios, discovery, requests, measurements, conversations, specifications, orders, notifications, reviews, and administration. Components call services rather than importing fixture arrays. Implement a mock adapter; a real adapter must report Not configured until actual contracts are supplied. Add a development-only scenario selector and reset control outside product navigation.

Interactions, validation, and states: All service methods return promises. Provide selectable delay, empty response, validation error, unavailable resource, forbidden action, and temporary failure. Keep pending/retry UI behavior reusable. Persist fictional serializable records across refresh, partition them by owner, and make reset reproducible.

Mock fixtures: Seed two customers, several designers with approved/pending/suspended states, one demo administrator, published/unpublished portfolios, requests in each lifecycle state, versioned specifications, orders, messages, reviews, notifications, and issues. Use deterministic IDs, relative dates, and fake contact details. Binary images may use bundled demo assets; an unavailable temporary preview must show a recovery state.

Milestone boundaries and gaps: No invented HTTP paths, production requests, server, database, password storage, real uploads, or security claims. Simulate operation identifiers for repeat-submit protection and specification version conflicts. Document method inputs/outputs as provisional frontend contracts. Mock role rules are demonstrations, never authorization.

Acceptance checks:

1. Switch delay/error/empty scenarios and verify service results.
2. Edit a fictional record, refresh, and confirm persistence; reset restores seeds.
3. Switch demo identities and verify owner filtering and forbidden results.
4. Select real-service mode: show Not configured instead of silently using mocks.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 03 — Welcome and Demo Authentication

Depends on: milestones 01–02.

PRD coverage: FR01; supplied welcome, Sign Up, and Login designs.

### 1. Goal and Completed Result

Visitors can browse publicly or enter a clearly labeled customer/designer demo session and return to an interrupted action.

### 2. Pages, Components, and Features

Build:

- Welcome.
- Login.
- Sign Up.
- Forgot password.
- Reset password.
- Email-verification state pages.
- AuthForm.
- DemoNotice.

Preserve selected designer and safe internal return location during login.

Registration offers customer or designer only.

Logout clears the demo session.

### 3. Interactions, Validation, and States

Use email/password as the PRD’s proposed baseline, not the screenshot phone/email label.

Validate:

- Required fields.
- Email format.

Password policy and confirmation-field choice remain unresolved. Do not invent a production policy.

Show:

- Password visibility.
- Submitting.
- Duplicate email.
- Invalid credentials.
- Expired/reused demo reset token.
- Recovery acknowledgment.
- Verified/unverified states.

Never claim an email was sent.

### 4. Mock Data

Use:

- Fictional verified/unverified accounts.
- Fixed demo outcomes.
- One-use/expired token scenarios.

Do not retain entered passwords or put them into browser logs or storage.

Demo session expiry can be triggered manually.

### 5. Acceptance Criteria and Simple Tests

1. Browse without signing in; start a request and verify login returns to the same designer.
2. Try blank/malformed values, duplicate email, and invalid demo credentials.
3. Exercise expired/reused reset-token scenarios and verification states.
4. Expire or end the session; private pages show the appropriate login state, and administrator cannot be selected at registration.

Boundary or unresolved requirement:

Use supplied photography only when a suitable licensed asset is available. Screenshots are references, not automatically reusable production photos.

Show Simulated authentication clearly.

The demo administrator is available only through the development scenario control.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 03: Welcome and demo authentication.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: Visitors can browse publicly or enter a clearly labeled customer/designer demo session and return to an interrupted action.

Build: Build Welcome, Login, Sign Up, Forgot password, Reset password, and email-verification state pages; AuthForm and DemoNotice. Preserve selected designer and safe internal return location during login. Registration offers customer or designer only. Logout clears the demo session.

Interactions, validation, and states: Use email/password as the PRD proposed baseline, not the screenshot phone/email label. Validate required fields and email format. Password policy and confirmation-field choice remain unresolved; do not invent a production policy. Show password visibility, submitting, duplicate email, invalid credentials, expired/reused demo reset token, recovery acknowledgment, and verified/unverified states. Never claim an email was sent.

Mock fixtures: Fictional verified/unverified accounts, fixed demo outcomes, and one-use/expired token scenarios. Do not retain entered passwords or put them into browser logs/storage. Demo session expiry can be triggered manually.

Milestone boundaries and gaps: Use supplied photography only when a suitable licensed asset is available; screenshots are references, not automatically reusable production photos. Show Simulated authentication clearly. The demo administrator is available only through the development scenario control.

Acceptance checks:

1. Browse without signing in; start a request and verify login returns to the same designer.
2. Try blank/malformed values, duplicate email, and invalid demo credentials.
3. Exercise expired/reused reset-token scenarios and verification states.
4. Expire or end the session; private pages show the appropriate login state, and administrator cannot be selected at registration.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 04 — Customer and Designer Profiles

Depends on: milestones 01–03.

PRD coverage: FR02.

### 1. Goal and Completed Result

Each role can manage its own profile, and designer publication status is clear.

### 2. Pages, Components, and Features

Build:

- Customer Profile.
- Customer Edit profile.
- Designer Profile.
- Designer Edit profile.
- Shared profile forms.
- Avatar fallback.
- Approval-status panel.

Customer fields:

- Name.
- Contact preference.

Designer fields:

- Business name.
- Service location.
- Specializations.
- Bio.
- Availability.

Show the private measurement-profile entry point without implementing measurement editing yet.

### 3. Interactions, Validation, and States

Include:

- Loading.
- Empty optional fields.
- Validation.
- Save failure/retry.
- Saved confirmation.

Required designer fields must come from configuration marked provisional until approved.

Pending/incomplete profiles remain unpublished.

Suspended designers cannot accept new work but keep access to existing records.

Undefined contact-preference and availability options must be recorded as decisions.

### 4. Mock Data

Use:

- Own profiles.
- Other-owner profiles.
- Approved designers.
- Incomplete designers.
- Pending designers.
- Suspended designers.

Use fictional category/location options explicitly labeled demo values.

### 5. Acceptance Criteria and Simple Tests

1. Edit each own profile, save, refresh, and confirm the result.
2. Try saving an incomplete designer profile and verify publication stays blocked.
3. Switch identities and attempt another profile ID; show a forbidden/unavailable state.
4. Check pending and suspended notices and the measurement entry point.

Boundary or unresolved requirement:

Do not invent identity certification, geolocation, social features, or real approval behavior.

This milestone displays approval state; administrative approval comes later.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 04: Customer and designer profiles.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: Each role can manage its own profile, and designer publication status is clear.

Build: Build customer Profile/Edit profile and designer Profile/Edit profile pages. Use shared profile forms, avatar fallback, and approval-status panel. Customer fields: name and contact preference. Designer fields: business name, service location, specializations, bio, and availability. Show the private measurement-profile entry point without implementing measurement editing yet.

Interactions, validation, and states: Loading, empty optional fields, validation, save failure/retry, and saved confirmation. Required designer fields must come from configuration marked provisional until approved. Pending/incomplete profiles remain unpublished; suspended designers cannot accept new work but keep access to existing records. Undefined contact-preference and availability options must be recorded as decisions.

Mock fixtures: Own and other-owner profiles; approved, incomplete, pending, and suspended designers. Use fictional category/location options explicitly labeled demo values.

Milestone boundaries and gaps: Do not invent identity certification, geolocation, social features, or real approval behavior. This milestone displays approval state; administrative approval comes later.

Acceptance checks:

1. Edit each own profile, save, refresh, and confirm the result.
2. Try saving an incomplete designer profile and verify publication stays blocked.
3. Switch identities and attempt another profile ID; show a forbidden/unavailable state.
4. Check pending and suspended notices and the measurement entry point.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 05 — Designer Portfolio Management

Depends on: milestones 01–04.

PRD coverage: FR04.

### 1. Goal and Completed Result

Designers can manage work samples without presenting them as stock for sale.

### 2. Pages, Components, and Features

Build:

- My portfolio list.
- Add work.
- Edit work.
- PortfolioEditor.
- Image-preview grid.
- Deletion dialog.

Capture:

- Title.
- Category.
- Description.
- Images.

Omit optional indicative pricing initially to keep the milestone small.

If later added, it must say estimate.

### 3. Interactions, Validation, and States

Validate:

- Required configured fields.
- Supported image extensions/MIME hints.
- The PRD proposed 5 MB maximum for JPEG, PNG, and WebP.

Show:

- Pending preview.
- Failed/unavailable media.
- Empty portfolio.
- Save/delete pending.
- Failure with retry.
- Success.

Confirm deletion.

Browser checks are convenience validation. Actual file-type checks are a backend responsibility.

### 4. Mock Data

Use:

- Published/unpublished own work.
- Another designer’s work.
- Valid/invalid demo images.
- Missing-image fixtures.

Preview images locally.

No upload endpoint or cloud storage.

### 5. Acceptance Criteria and Simple Tests

1. Create and edit a fictional sample and confirm persistence.
2. Try oversized/unsupported files and verify useful errors.
3. Cancel and confirm deletion; check the empty state.
4. Verify another designer’s edit is rejected by the mock adapter and unpublished work is not public.

Boundary or unresolved requirement:

Portfolio publishing/moderation policy is unresolved.

Keep draft visibility explicit.

Use seeded published records for discovery.

Do not silently auto-publish new work.

No Add to cart, inventory, checkout, or fixed-price purchase.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 05: Designer portfolio management.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: Designers can manage work samples without presenting them as stock for sale.

Build: Build My portfolio list, Add work, and Edit work pages; PortfolioEditor, image-preview grid, and deletion dialog. Capture title, category, description, and images. Omit optional indicative pricing initially to keep the milestone small; if later added, it must say estimate.

Interactions, validation, and states: Validate required configured fields, supported image extensions/MIME hints, and the PRD proposed 5 MB maximum for JPEG, PNG, and WebP. Show pending preview, failed/unavailable media, empty portfolio, save/delete pending, failure with retry, and success. Confirm deletion. Browser checks are convenience validation; actual file-type checks are a backend responsibility.

Mock fixtures: Published/unpublished own work, another designer’s work, valid/invalid demo images, and missing-image fixtures. Preview images locally; no upload endpoint or cloud storage.

Milestone boundaries and gaps: Portfolio publishing/moderation policy is unresolved. Keep draft visibility explicit; use seeded published records for discovery and do not silently auto-publish new work. No Add to cart, inventory, checkout, or fixed-price purchase.

Acceptance checks:

1. Create and edit a fictional sample and confirm persistence.
2. Try oversized/unsupported files and verify useful errors.
3. Cancel and confirm deletion; check the empty state.
4. Verify another designer’s edit is rejected by the mock adapter and unpublished work is not public.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 06 — Designer Discovery and Public Portfolio Viewing

Depends on: milestones 01–05.

PRD coverage: FR03; FR04; Home page fidelity design.

### 1. Goal and Completed Result

A guest can find an approved designer and inspect relevant work before requesting an outfit.

### 2. Pages, Components, and Features

Build:

- Discover.
- Public Designer profile.
- Portfolio work detail.
- Search field.
- Filter panel.
- Designer card.
- Portfolio card/grid.
- Image gallery.
- Rating summary placeholder.

Filter by configured:

- Occasion/garment category.
- Declared service location.
- Availability.

Add pagination through the service layer.

The Request CTA records the selected designer.

### 3. Interactions, Validation, and States

Support:

- Combined search/filters.
- Reset.
- Page changes.
- Request/login navigation.

Preserve filters on failure and return.

Handle:

- Loading.
- No matches.
- No published work.
- Unavailable/suspended profile.
- Failed media.
- Retry.

Successful loaded results are the success state. Do not add an artificial success toast for browsing.

### 4. Mock Data

Use:

- Approved matching/nonmatching designers.
- Excluded pending/suspended designers.
- Missing media.
- Portfolio categories.

Seed zero-review and reviewed summaries.

Review creation is later.

All pilot taxonomy and geography are provisional demo configuration.

### 5. Acceptance Criteria and Simple Tests

1. Combine filters and compare results with known fixtures; Reset restores defaults.
2. Verify pending/suspended designers and unpublished work never appear publicly.
3. Exercise no matches, failed service, and missing image; retry preserves filters.
4. Open a designer/work item and start a request; guests retain selection through login.

Boundary or unresolved requirement:

Replace New Collection, discounts, and Flash Sale with focused designer/work discovery.

Remove cart/favorites and obsolete category tabs.

Declared service coverage does not imply GPS.

Desktop gets a usable grid. Mobile filters remain accessible.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 06: Designer discovery and public portfolio viewing.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: A guest can find an approved designer and inspect relevant work before requesting an outfit.

Build: Build Discover, public Designer profile, and Portfolio work detail. Components: search field, filter panel, designer card, portfolio card/grid, image gallery, and rating summary placeholder. Filter by configured occasion/garment category, declared service location, and availability. Add pagination through the service layer. Request CTA records the selected designer.

Interactions, validation, and states: Combined search/filters, Reset, page changes, and request/login navigation. Preserve filters on failure and return. Handle loading, no matches, no published work, unavailable/suspended profile, failed media, and retry. Provide success as loaded results; no artificial success toast for browsing.

Mock fixtures: Approved matching/nonmatching designers, excluded pending/suspended designers, missing media, and portfolio categories. Seed zero-review and reviewed summaries; review creation is later. All pilot taxonomy and geography are provisional demo configuration.

Milestone boundaries and gaps: Replace New Collection, discounts, and Flash Sale with focused designer/work discovery. Remove cart/favorites and obsolete category tabs. Declared service coverage does not imply GPS. Desktop gets a usable grid; mobile filters remain accessible.

Acceptance checks:

1. Combine filters and compare results with known fixtures; Reset restores defaults.
2. Verify pending/suspended designers and unpublished work never appear publicly.
3. Exercise no matches, failed service, and missing image; retry preserves filters.
4. Open a designer/work item and start a request; guests retain selection through login.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 07 — Custom Request Form and Drafts

Depends on: milestones 01–06.

PRD coverage: FR05; customer journey.

### 1. Goal and Completed Result

A customer can send one selected designer a valid request and recover a private draft.

### 2. Pages, Components, and Features

Build:

- New request.
- Customer Requests list.
- Request summary.
- Selected-designer panel.
- Request fields.
- Reference-image picker.
- Draft indicator.

Fields:

- Category/occasion.
- Description.
- References.
- Quantity.
- Needed-by date.
- Service location.
- Measurement approach.

Link to measurement entry for the next milestone.

### 3. Interactions, Validation, and States

Validate:

- Required configured fields.
- Positive integer quantity.
- Dates that are not in the past, using local calendar dates.
- Unsupported/oversized images.

Save drafts across navigation and interrupted login.

Scope drafts to the demo customer.

Show:

- Initial loading.
- No requests.
- Unavailable designer.
- Draft-save failures.
- Submission failures.
- Submitting.
- Submitted request ID.

Repeated submission uses one operation identifier.

### 4. Mock Data

Use:

- Unsaved/saved drafts.
- Submitted requests.
- Invalid dates.
- Suspended designer.
- Temporary submission failure.

Submission creates one fictional request and a notification event fixture, not a real order.

### 5. Acceptance Criteria and Simple Tests

1. Fill a draft, leave, return, and refresh; confirm values and selected designer remain.
2. Submit invalid date/quantity and inspect field errors.
3. Submit valid data; retry or double-click and confirm exactly one request ID.
4. Switch customer and verify the draft and private references are not exposed.

Boundary or unresolved requirement:

Required references, maximum reference count, and category schemas are unresolved.

Do not invent these limits.

Submission may precede completed measurements, but confirmation later requires the configured complete, reviewed measurements.

No payment or checkout.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 07: Custom request form and drafts.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: A customer can send one selected designer a valid request and recover a private draft.

Build: Build New request, customer Requests list, and Request summary. Components: selected-designer panel, request fields, reference-image picker, and draft indicator. Fields: category/occasion, description, references, quantity, needed-by date, service location, and measurement approach. Link to measurement entry for the next milestone.

Interactions, validation, and states: Validate required configured fields, positive integer quantity, and dates that are not in the past using local calendar dates. Handle unsupported/oversized images. Save drafts across navigation and interrupted login; scope them to the demo customer. Show initial loading, no requests, unavailable designer, draft-save/submission failures, submitting, and submitted ID. Repeated submission uses one operation identifier.

Mock fixtures: Unsaved/saved drafts, submitted requests, invalid dates, suspended designer, and temporary submission failure. Submission creates one fictional request and a notification event fixture, not a real order.

Milestone boundaries and gaps: Required references, maximum reference count, and category schemas are unresolved. Do not invent these limits. Submission may precede completed measurements, but confirmation later requires the configured complete, reviewed measurements. No payment or checkout.

Acceptance checks:

1. Fill a draft, leave, return, and refresh; confirm values and selected designer remain.
2. Submit invalid date/quantity and inspect field errors.
3. Submit valid data; retry or double-click and confirm exactly one request ID.
4. Switch customer and verify the draft and private references are not exposed.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 08 — Guided Measurements and Private Measurement Profile

Depends on: milestones 01–07.

PRD coverage: FR06; measurement journey.

### 1. Goal and Completed Result

Customers can enter category-specific measurements with explicit units, and designers can later review them.

### 2. Pages, Components, and Features

Build:

- Measurement profile.
- Request-linked Measurement form.
- Labeled measurement input.
- Instruction panel.
- Unit selector.
- Source/timestamp/review-status summary.

Offer:

- Self-measurement.
- Pending designer-assisted arrangement.

Save a request measurement copy independently from the reusable customer profile.

### 3. Interactions, Validation, and States

Support:

- Positive numeric values.
- Configured required fields.
- Missing/uncertain values.
- Pending assisted measurements.

Convert cm/inch values rather than merely changing labels.

Keep sufficient underlying precision to avoid drift on repeated conversions.

Show:

- Loading.
- No saved measurements.
- Save failure/retry.
- Saved state.

Mark edited values as awaiting review.

### 4. Mock Data

Use:

- One explicitly fictional, provisional category schema with instructions.
- Blank values.
- Valid values.
- Uncertain values.
- Pending assisted measurements.
- Reviewed/unreviewed copies.

Never claim this schema is an approved tailoring standard.

### 5. Acceptance Criteria and Simple Tests

1. Enter 10 inches and switch to cm; expect 25.4 cm, then switch back.
2. Try zero, negative, and nonnumeric input; correct errors and save.
3. Choose assisted measurement and confirm pending status remains visible.
4. Edit profile values and verify existing request/order snapshots are not overwritten.

Boundary or unresolved requirement:

Approved measurement labels, instruction imagery, precision/rounding, and fit correction policy must be supplied before real use.

Do not invent body-size ranges or AI measurements.

Designer review UI is completed with specification work.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 08: Guided measurements and private measurement profile.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: Customers can enter category-specific measurements with explicit units, and designers can later review them.

Build: Build Measurement profile and request-linked Measurement form; labeled measurement input, instruction panel, unit selector, and source/timestamp/review-status summary. Offer self-measurement or pending designer-assisted arrangement. Save a request measurement copy independently from the reusable customer profile.

Interactions, validation, and states: Positive numeric values, configured required fields, missing/uncertain values, and pending assisted measurements. Convert cm/inch values, not merely labels; keep sufficient underlying precision to avoid drift on repeated conversions. Show loading, no saved measurements, save failure/retry, and saved state. Mark edited values as awaiting review.

Mock fixtures: One explicitly fictional, provisional category schema with instructions; blank, valid, and uncertain values; pending assisted measurements; reviewed/unreviewed copies. Never claim this schema is an approved tailoring standard.

Milestone boundaries and gaps: Approved measurement labels, instruction imagery, precision/rounding, and fit correction policy must be supplied before real use. Do not invent body-size ranges or AI measurements. Designer review UI is completed with specification work.

Acceptance checks:

1. Enter 10 inches and switch to cm; expect 25.4 cm, then switch back.
2. Try zero, negative, and nonnumeric input; correct errors and save.
3. Choose assisted measurement and confirm pending status remains visible.
4. Edit profile values and verify existing request/order snapshots are not overwritten.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 09 — Designer Request Inbox and Triage

Depends on: milestones 01–08.

PRD coverage: FR07 response; request lifecycle.

### 1. Goal and Completed Result

A designer can inspect an owned request, begin discussion, or decline.

The customer sees the result.

### 2. Pages, Components, and Features

Build:

- Designer request inbox.
- Request detail.
- Request card.
- Status filter.
- Private references/measurement summary.
- Decline dialog.

Add:

- Start discussion.
- Decline with reason.
- Customer withdrawal for Submitted and Discussing only, as explicitly listed by the lifecycle table.

### 3. Interactions, Validation, and States

Include:

- Loading.
- No incoming requests.
- Stale/unavailable request.
- Action pending.
- Failure/retry.
- Success.

Decline reason is required.

Do not allow Converted, Declined, or Withdrawn requests to return to an active state.

Suspended designers cannot take new work.

Preserve private records for existing support.

### 4. Mock Data

Use:

- Submitted requests.
- Discussing requests.
- Declined requests.
- Withdrawn requests.
- Converted requests.
- Requests owned by different designers.
- Suspended account.
- Stale-action scenarios.

### 5. Acceptance Criteria and Simple Tests

1. Start discussion and check both parties see Discussing after reload.
2. Attempt a blank decline reason, then decline with a reason.
3. Withdraw a Submitted/Discussing request; verify terminal actions disappear.
4. Switch designer or use an old state and verify invalid actions fail safely.

Boundary or unresolved requirement:

The general PRD says withdrawal before conversion, but Awaiting confirmation does not list withdrawal.

Flag that conflict and omit that action in Awaiting confirmation until clarified.

Link to messaging/specification pages as pending milestones, not falsely completed features.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 09: Designer request inbox and triage.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: A designer can inspect an owned request, begin discussion, or decline; the customer sees the result.

Build: Build Designer request inbox and request detail; request card, status filter, private references/measurement summary, and decline dialog. Add Start discussion and Decline with reason. Add customer withdrawal for Submitted and Discussing only, as explicitly listed by the lifecycle table.

Interactions, validation, and states: Loading, no incoming requests, stale/unavailable request, action pending, failure/retry, and success. Decline reason is required. Do not allow Converted, Declined, or Withdrawn requests to return to an active state. Suspended designers cannot take new work. Preserve private records for existing support.

Mock fixtures: Submitted, Discussing, Declined, Withdrawn, and Converted requests owned by different designers; suspended account and stale-action scenarios.

Milestone boundaries and gaps: The general PRD says withdrawal before conversion, but Awaiting confirmation does not list withdrawal. Flag that conflict and omit that action in Awaiting confirmation until clarified. Link to messaging/specification pages as pending milestones, not falsely completed features.

Acceptance checks:

1. Start discussion and check both parties see Discussing after reload.
2. Attempt a blank decline reason, then decline with a reason.
3. Withdraw a Submitted/Discussing request; verify terminal actions disappear.
4. Switch designer or use an old state and verify invalid actions fail safely.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 10 — Request and Order Messaging

Depends on: milestones 01–09.

PRD coverage: FR08; Message design.

### 1. Goal and Completed Result

Participants can discuss a request in a persistent demo thread without changing structured terms.

### 2. Pages, Components, and Features

Build:

- Messages list.
- Conversation thread.
- Conversation search.
- Avatar/preview/time row.
- Unread badge.
- Request/order context link.
- Message bubble.
- Composer with image preview.

Use list-to-thread navigation on mobile and a split pane on larger screens.

Paginate older messages.

### 3. Interactions, Validation, and States

Support:

- Search.
- Text/image send.
- Opening threads/read counts.
- Failed-send retry with the same operation ID.

Include:

- Empty list.
- Empty thread.
- No search match.
- Fetching older messages.
- Unavailable/forbidden thread.
- Sending success/failure.

Require nonempty text or a valid image.

Preserve a failed message draft.

Casual messages never confirm terms.

### 4. Mock Data

Use:

- Linked conversations.
- Unread counts.
- Ordered timestamped messages.
- Image fallbacks.
- Failed send.

Keep serializable fictional messages across reload.

Do not claim real-time delivery.

### 5. Acceptance Criteria and Simple Tests

1. Search, open a thread, and verify unread counts update for the active recipient.
2. Send, refresh, and check persistence; retry a failed send without duplication.
3. Try an empty send and invalid image; verify errors.
4. Switch owner and attempt private thread access; no data is shown.

Boundary or unresolved requirement:

The screenshot compose icon must not create unsolicited arbitrary conversations because new-thread rules are missing.

Limit messages to existing request/order participants.

Flag the public pre-request contact ambiguity.

No WebSocket server, real notifications, or read-receipt claims.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 10: Request and order messaging.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: Participants can discuss a request in a persistent demo thread without changing structured terms.

Build: Build Messages list and conversation thread. Components: conversation search, avatar/preview/time row, unread badge, request/order context link, message bubble, and composer with image preview. Use list-to-thread navigation on mobile and a split pane on larger screens; paginate older messages.

Interactions, validation, and states: Search, text/image send, opening threads/read counts, and failed-send retry with the same operation ID. Empty list, empty thread, no search match, fetching older messages, unavailable/forbidden thread, and sending success/failure. Require nonempty text or a valid image. Preserve a failed message draft. Casual messages never confirm terms.

Mock fixtures: Linked conversations, unread counts, ordered timestamped messages, image fallbacks, and failed send. Keep serializable fictional messages across reload; do not claim real-time delivery.

Milestone boundaries and gaps: The screenshot compose icon must not create unsolicited arbitrary conversations: new-thread rules are missing. Limit messages to existing request/order participants and flag the public pre-request contact ambiguity. No WebSocket server, real notifications, or read-receipt claims.

Acceptance checks:

1. Search, open a thread, and verify unread counts update for the active recipient.
2. Send, refresh, and check persistence; retry a failed send without duplication.
3. Try an empty send and invalid image; verify errors.
4. Switch owner and attempt private thread access; no data is shown.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 11 — Versioned Specification and Mutual Confirmation

Depends on: milestones 01–10.

PRD coverage: FR07; request-to-order conversion.

### 1. Goal and Completed Result

The designer proposes complete terms.

Customer confirmation creates exactly one demo order from the latest version.

### 2. Pages, Components, and Features

Build:

- Designer specification editor.
- Customer Specification review.
- Confirmation-result view.
- Version badge.
- Terms summary.
- Measurement-review controls.
- Confirmation dialog.

Include:

- Design.
- Material/fabric responsibility.
- Measurements.
- Quantity.
- Price in NGN.
- Commercial terms.
- Production dates.
- Requested occasion date.
- Agreed ready date.
- Handover arrangement.

### 3. Interactions, Validation, and States

The designer completes/reviews required measurements and submits a new version.

The customer asks for revision or confirms only the latest version.

Validate required configured terms and numeric price.

Zero-price permission and date relationships need policy decisions.

Keep requested occasion date visible if ready date differs.

Handle:

- Saving.
- Missing fields.
- Unreviewed measurements.
- Stale version.
- Failure/retry.
- Confirmed order ID.

### 4. Mock Data

Use:

- Complete/incomplete proposals.
- Two versions.
- Unreviewed measurements.
- Conflicting old-version confirmations.

The mock adapter atomically creates one order snapshot and marks the request Converted.

Retries return the same result.

### 5. Acceptance Criteria and Simple Tests

1. Try submitting incomplete terms or unreviewed measurements; confirmation stays blocked.
2. Submit v1, replace with v2, then confirm the old version; expect a stale-version state.
3. Confirm v2 twice/retry and find one order with matching terms.
4. Edit the customer profile; the order snapshot retains its accepted values.

Boundary or unresolved requirement:

Use a clearly labeled demo commercial/handover policy only.

No payment collection or payment-verified status.

Server-enforced concurrency and atomicity are future backend obligations.

Do not copy terms from free-form chat as agreement.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 11: Versioned specification and mutual confirmation.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: The designer proposes complete terms, and customer confirmation creates exactly one demo order from the latest version.

Build: Build Designer specification editor, customer Specification review, and confirmation-result view. Components: version badge, terms summary, measurement-review controls, and confirmation dialog. Include design, material/fabric responsibility, measurements, quantity, price in NGN, commercial terms, production dates, requested occasion date, agreed ready date, and handover arrangement.

Interactions, validation, and states: Designer completes/reviews required measurements and submits a new version. Customer asks for revision or confirms only the latest version. Validate required configured terms and numeric price; zero-price permission and date relationships need policy decisions. Keep requested occasion date visible if ready date differs. Handle saving, missing fields, unreviewed measurements, stale version, failure/retry, and confirmed order ID.

Mock fixtures: Complete/incomplete proposals, two versions, unreviewed measurements, and conflicting old-version confirmations. Mock adapter atomically creates one order snapshot and marks request Converted; retries return the same result.

Milestone boundaries and gaps: Use a clearly labeled demo commercial/handover policy only. No payment collection or payment-verified status. Server-enforced concurrency and atomicity are future backend obligations. Do not copy terms from free-form chat as agreement.

Acceptance checks:

1. Try submitting incomplete terms or unreviewed measurements; confirmation stays blocked.
2. Submit v1, replace with v2, then confirm the old version; expect a stale-version state.
3. Confirm v2 twice/retry and find one order with matching terms.
4. Edit the customer profile; the order snapshot retains its accepted values.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 12 — Order Lists, Timeline, and Production Progress

Depends on: milestones 01–11.

PRD coverage: FR09; order lifecycle.

### 1. Goal and Completed Result

Both roles see accepted terms and progress.

Designers can update production through handover.

### 2. Pages, Components, and Features

Build:

- Customer Orders.
- Designer Production dashboard.
- Shared Order detail.
- Order card.
- Immutable specification summary.
- Timeline.
- Dates panel.
- Progress-action form.

Support:

Confirmed → In production → Ready → Handed over.

Retain a link to messages.

### 3. Interactions, Validation, and States

Only the designer has production controls.

Require:

- Configured commercial-prerequisite acknowledgment before starting.
- Readiness note at Ready.
- Handover date/note at Handed over.

Display missed agreed dates without altering them.

Include:

- Loading.
- Empty lists.
- Unavailable/forbidden orders.
- Pending update.
- Stale/invalid transition.
- Failure/retry.
- Success.

Repeated updates produce one event.

### 4. Mock Data

Use:

- Orders at each state.
- Late/not-late fixtures.
- Other-owner orders.
- Duplicate update cases.
- Invalid-transition cases.

Completion, issue, and review actions remain dependent on later milestones.

### 5. Acceptance Criteria and Simple Tests

1. Follow the production transitions and inspect actor/time in the timeline.
2. Try skipping states, another owner, and repeat submission; verify safe rejection/no duplicate events.
3. Open a late order; check original dates remain unchanged.
4. Refresh and compare both roles’ views of specification and timeline.

Boundary or unresolved requirement:

No delivery courier status, payment status, map, or package tracking.

Handed over is a manual demo record.

Production controls stay blocked when required operating policy is unavailable.

Demonstration uses labeled policy fixtures.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 12: Order lists, timeline, and production progress.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: Both roles see accepted terms and progress; designers can update production through handover.

Build: Build customer Orders, designer Production dashboard, and shared Order detail. Components: order card, immutable specification summary, timeline, dates panel, and progress-action form. Support Confirmed → In production → Ready → Handed over. Retain a link to messages.

Interactions, validation, and states: Only the designer has production controls; require configured commercial-prerequisite acknowledgment before starting, readiness note at Ready, and handover date/note at Handed over. Display missed agreed dates without altering them. Loading, empty lists, unavailable/forbidden orders, pending update, stale/invalid transition, failure/retry, and success. Repeated updates produce one event.

Mock fixtures: Orders at each state, late/not-late fixtures, other-owner orders, duplicate update, and invalid-transition cases. Completion/issue/review actions remain dependent on later milestones.

Milestone boundaries and gaps: No delivery courier status, payment status, map, or package tracking. Handed over is a manual demo record. Production controls stay blocked when required operating policy is unavailable; demonstration uses labeled policy fixtures.

Acceptance checks:

1. Follow the production transitions and inspect actor/time in the timeline.
2. Try skipping states, another owner, and repeat submission; verify safe rejection/no duplicate events.
3. Open a late order; check original dates remain unchanged.
4. Refresh and compare both roles’ views of specification and timeline.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 13 — Order Change Proposals and Cancellation Requests

Depends on: milestones 01–12.

PRD coverage: FR09; fit correction; cancellation lifecycle.

### 1. Goal and Completed Result

Accepted terms stay intact until an explicit change is agreed.

A cancellation request does not cancel immediately.

### 2. Pages, Components, and Features

Extend Order detail with:

- Change proposal/review.
- Cancellation request/response panels.
- Current versus proposed measurements.
- Current versus proposed dates.
- Current versus proposed design.
- Current versus proposed price, as applicable.
- Reason.
- Proposed effects.
- Counterparty confirm/decline controls.

Keep original promise and all accepted revisions visible.

### 3. Interactions, Validation, and States

Support:

- Required reason.
- Configured changed-field validation.
- Latest-version check.
- Explicit acceptance.

A pending change cannot mutate the accepted snapshot.

Either party can request cancellation.

Counterparty agreement creates Cancelled.

Refusal keeps the original state.

Include:

- Loading.
- No proposals.
- Pending.
- Stale proposal.
- Error/retry.
- Decision success.

### 4. Mock Data

Use:

- Pending/accepted/declined/stale changes.
- Cancellation requested/agreed/refused.
- Original/current dates.
- Persistent history.

Keep mock cancellation separate from future refunds.

### 5. Acceptance Criteria and Simple Tests

1. Propose a date or measurement change; accepted terms stay unchanged while pending.
2. Decline, then propose and accept a new version; inspect original and revised terms.
3. Request cancellation; verify the order remains active until accepted.
4. Retry or use a stale proposal; no duplicate event or silent overwrite occurs.

Boundary or unresolved requirement:

Who may propose which changes, cancellation at each lifecycle stage, and concurrent production/change handling are unresolved.

Use explicit demo rules with documented gaps.

Do not silently establish production policy.

Do not provide automatic refunds or reuse proposal acceptance to close issues.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 13: Order change proposals and cancellation requests.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: Accepted terms stay intact until an explicit change is agreed; a cancellation request does not cancel immediately.

Build: Extend Order detail with change proposal/review and cancellation request/response panels. Show current versus proposed measurements, dates, design, and price as applicable, reason, and proposed effects. Keep original promise and all accepted revisions visible. Add confirm/decline controls for the counterparty.

Interactions, validation, and states: Required reason, configured changed-field validation, latest-version check, and explicit acceptance. A pending change cannot mutate the accepted snapshot. Either party can request cancellation; counterparty agreement creates Cancelled, refusal keeps the original state. Loading, no proposals, pending, stale proposal, error/retry, and decision success.

Mock fixtures: Pending/accepted/declined/stale changes; cancellation requested/agreed/refused; original/current dates; persistent history. Keep mock cancellation separate from future refunds.

Milestone boundaries and gaps: Who may propose which changes, cancellation at each lifecycle stage, and concurrent production/change handling are unresolved. Use explicit demo rules with documented gaps; do not silently establish production policy. Do not provide automatic refunds or reuse proposal acceptance to close issues.

Acceptance checks:

1. Propose a date or measurement change; accepted terms stay unchanged while pending.
2. Decline, then propose and accept a new version; inspect original and revised terms.
3. Request cancellation; verify the order remains active until accepted.
4. Retry or use a stale proposal; no duplicate event or silent overwrite occurs.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 14 — Issue Reporting and Participant Issue Status

Depends on: milestones 01–13.

PRD coverage: FR12; independent issue lifecycle.

### 1. Goal and Completed Result

Customers/designers can report a problem and see that an unresolved issue blocks completion.

### 2. Pages, Components, and Features

Build:

- Report issue.
- My issue detail/list.
- Order issue panel.

Capture:

- Referenced order/content.
- Category.
- Description.
- Optional evidence.

Support reports for:

- Fit.
- Requirement mismatch.
- Missed date.
- Conduct.

Add review/content reporting entry points where relevant screens exist.

### 3. Interactions, Validation, and States

Require:

- Linked record.
- Category.
- Description.

Validate optional images with the shared picker.

Show:

- Loading.
- No reports.
- Submitting.
- Failure/retry.
- Acknowledgment.
- Open.
- Under review.
- Resolved.

Reporter sees outcome while private unrelated records stay hidden.

Pending cancellation never deletes an issue.

### 4. Mock Data

Use:

- Open issues.
- Assigned/under-review issues.
- Resolved issues.
- Other-owner issue.
- Optional evidence.
- Report retry scenarios.

Notification events are recorded, but the full notification UI is later.

### 5. Acceptance Criteria and Simple Tests

1. Report a fit issue, refresh, and find one acknowledged report.
2. Try blank fields, invalid evidence, and retry after failure.
3. Verify open issue blocks completion eligibility on Order detail.
4. Cancel an order using a fixture; its issue history remains available to authorized users.

Boundary or unresolved requirement:

Define evidence count, support contact/escalation, and retention before real operation.

This milestone does not give participants administrator resolution powers.

No assumed compensation or refund outcome.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 14: Issue reporting and participant issue status.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: Customers/designers can report a problem and see that an unresolved issue blocks completion.

Build: Build Report issue and My issue detail/list, plus order issue panel. Capture referenced order/content, category, description, and optional evidence. Support fit, requirement mismatch, missed date, and conduct reports from the PRD. Add review/content reporting entry points where relevant screens exist.

Interactions, validation, and states: Require linked record, category, and description; validate optional images with the shared picker. Show loading, no reports, submitting, failure/retry, acknowledgment, and Open/Under review/Resolved states. Reporter sees outcome while private unrelated records stay hidden. Pending cancellation never deletes an issue.

Mock fixtures: Open, assigned/under-review, and resolved issues; other-owner issue, optional evidence, and report retry scenarios. Notification events are recorded, but the full notification UI is later.

Milestone boundaries and gaps: Define evidence count, support contact/escalation, and retention before real operation. This milestone does not give participants administrator resolution powers. No assumed compensation or refund outcome.

Acceptance checks:

1. Report a fit issue, refresh, and find one acknowledged report.
2. Try blank fields, invalid evidence, and retry after failure.
3. Verify open issue blocks completion eligibility on Order detail.
4. Cancel an order using a fixture; its issue history remains available to authorized users.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 15 — Customer Completion and Eligible Reviews

Depends on: milestones 01–14.

PRD coverage: FR10; completion journey.

### 1. Goal and Completed Result

A customer confirms receipt/completion only after handover with no unresolved issue, then posts one eligible review.

### 2. Pages, Components, and Features

Build:

- Completion dialog.
- Review form integrated into Order detail.
- Designer public reviews.
- Fixture-backed rating summaries.
- Keyboard-accessible 1–5 rating input.
- Optional feedback.
- Review report action linked to milestone 14.

### 3. Interactions, Validation, and States

Only the owning customer can complete from Handed over.

Open/Under review issues prevent completion.

Rating is required within 1–5.

Feedback is optional.

Include:

- Loading.
- No reviews.
- Ineligible order.
- Completion/review submitting.
- Temporary failure/retry.
- Duplicate.
- Success.

Aggregate rating uses published eligible reviews only and displays review count.

### 4. Mock Data

Use:

- Handed-over order without issues.
- Order with open issue.
- Completed order with/without review.
- Published reviews.
- Reported reviews.
- Hidden reviews.
- Zero-review designer.

### 5. Acceptance Criteria and Simple Tests

1. Try completing before handover or while an issue is open; action is blocked.
2. Complete an eligible order and submit a 1–5 review.
3. Retry or double-click; one completion and one review remain.
4. Check public rating/count, No reviews yet, and reporting; private order terms stay private.

Boundary or unresolved requirement:

No automatic completion, fabricated testimonials, or altered ratings.

Review editing policy is missing. Do not add editing/deletion by customers.

Administrative completion exceptions are covered later and need recorded customer agreement.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 15: Customer completion and eligible reviews.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: A customer confirms receipt/completion only after handover with no unresolved issue, then posts one eligible review.

Build: Build completion dialog and review form integrated into Order detail. Add designer public reviews and fixture-backed rating summaries. Components: keyboard-accessible 1–5 rating input, optional feedback, and review report action linked to milestone 14.

Interactions, validation, and states: Only owning customer can complete from Handed over; Open/Under review issues prevent it. Rating required within 1–5, feedback optional. Loading, no reviews, ineligible order, completion/review submitting, temporary failure/retry, duplicate, and success. Aggregate uses published eligible reviews only and displays review count.

Mock fixtures: Handed-over order without issues, order with open issue, completed order with/without review, published/reported/hidden reviews, and zero-review designer.

Milestone boundaries and gaps: No automatic completion, fabricated testimonials, or altered ratings. Review editing policy is missing; do not add editing/deletion by customers. Administrative completion exceptions are covered later and need recorded customer agreement.

Acceptance checks:

1. Try completing before handover or while an issue is open; action is blocked.
2. Complete an eligible order and submit a 1–5 review.
3. Retry or double-click; one completion and one review remain.
4. Check public rating/count, No reviews yet, and reporting; private order terms stay private.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 16 — In-App Notifications

Depends on: milestones 01–15.

PRD coverage: FR11.

### 1. Goal and Completed Result

Each user can see relevant workflow events and open the correct authorized destination.

### 2. Pages, Components, and Features

Build:

- Notification panel/page.
- Unread badge.
- Notification row.

Wire existing service events for:

- Requests.
- Designer responses.
- Messages.
- Proposals.
- Accepted terms.
- Progress.
- Completion.
- Issues.

Show actor-safe text, timestamp, and destination.

### 3. Interactions, Validation, and States

Support:

- Event deduplication.
- Read/unread behavior.
- Persistent counts.

Include:

- Loading.
- No notifications.
- Load/read-update errors.
- Retry.
- Success.

Opening an event navigates only to an authorized existing record.

Missing/forbidden destinations show a safe state.

Keep measurements out of notification text.

### 4. Mock Data

Use:

- All listed event types.
- Read/unread entries.
- Duplicate event.
- Missing destination.
- Other-recipient notifications.

Fake data only.

No real delivery channels.

### 5. Acceptance Criteria and Simple Tests

1. Trigger each fixture event and check one notification per intended recipient.
2. Open/read a notification; refresh and verify counts persist.
3. Try missing/forbidden targets without exposing private data.
4. Force load/read-update failure and retry without losing the list.

Boundary or unresolved requirement:

No email, SMS, push, WebSocket backend, or browser notification-permission prompt.

Message unread counts and notification counts are different values.

Avoid adding configurable preferences not required by the PRD.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 16: In-app notifications.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: Each user can see relevant workflow events and open the correct authorized destination.

Build: Build notification panel/page, unread badge, and notification row. Wire the existing service events for requests, designer responses, messages, proposals, accepted terms, progress, completion, and issues. Show actor-safe text, timestamp, and destination.

Interactions, validation, and states: Event deduplication, read/unread behavior, and persistent counts. Loading, no notifications, load/read-update errors, retry, and success. Opening an event navigates only to an authorized existing record; missing/forbidden destinations show a safe state. Keep measurements out of notification text.

Mock fixtures: All listed event types, read/unread entries, duplicate event, missing destination, and other-recipient notifications. Fake data only; no real delivery channels.

Milestone boundaries and gaps: No email, SMS, push, WebSocket backend, or browser notification-permission prompt. Message unread counts and notification counts are different values. Avoid adding configurable preferences not required by the PRD.

Acceptance checks:

1. Trigger each fixture event and check one notification per intended recipient.
2. Open/read a notification; refresh and verify counts persist.
3. Try missing/forbidden targets without exposing private data.
4. Force load/read-update failure and retry without losing the list.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 17 — Admin Designer Categories and Moderation

Depends on: milestones 01–16.

PRD coverage: FR12; FR02; FR10.

### 1. Goal and Completed Result

The demo administrator can manage pilot visibility and moderate reported content with reasons.

### 2. Pages, Components, and Features

Build:

- Separate Admin layout.
- Designer approval queue/detail.
- Category list/editor.
- Reported portfolio/review queue/detail.
- Status badge.
- Moderation dialog.
- Audit-detail display.

Show required-profile completeness.

Add approve/suspend actions.

Restrict the interface to the development-only admin identity.

### 3. Interactions, Validation, and States

Include:

- Loading.
- Empty queues.
- Unavailable record.
- Required decision reason.
- Save/action pending.
- Failure/retry.
- Success.

Prevent approval of incomplete required profiles.

Suspension stops new requests while retaining existing orders.

Moderation can publish/hide under configured rules.

Never change the submitted star rating.

Category naming and duplicate checks are client convenience rules.

### 4. Mock Data

Use:

- Pending designers.
- Incomplete designers.
- Approved designers.
- Suspended designers.
- Provisional categories.
- Reported portfolio/review records.
- Audit events.

### 5. Acceptance Criteria and Simple Tests

1. Approve a complete designer and verify discovery visibility; reject incomplete approval.
2. Suspend a designer; new requests fail, but existing orders remain readable.
3. Hide a reported review with a reason; rating aggregation updates without changing its value.
4. Switch to customer/designer and attempt admin routes; no admin data is displayed.

Boundary or unresolved requirement:

Category field schema, portfolio publication policy, allowed moderation outcomes, and approval evidence remain open.

Use documented demo options.

Do not invent advanced verification or bulk operations.

Route guards do not replace backend administrator authorization.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 17: Admin designer categories and moderation.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: The demo administrator can manage pilot visibility and moderate reported content with reasons.

Build: Build separate Admin layout, designer approval queue/detail, category list/editor, and reported portfolio/review queue/detail. Show required-profile completeness and approve/suspend actions. Use a status badge, moderation dialog, and audit-detail display. Restrict the interface to the development-only admin identity.

Interactions, validation, and states: Loading, empty queues, unavailable record, required decision reason, save/action pending, failure/retry, and success. Prevent approval of incomplete required profiles. Suspension stops new requests while retaining existing orders. Moderation can publish/hide under configured rules; never change the submitted star rating. Category naming and duplicate checks are client convenience rules.

Mock fixtures: Pending/incomplete/approved/suspended designers, provisional categories, reported portfolio/review records, and audit events.

Milestone boundaries and gaps: Category field schema, portfolio publication policy, allowed moderation outcomes, and approval evidence remain open. Use documented demo options; do not invent advanced verification or bulk operations. Route guards do not replace backend administrator authorization.

Acceptance checks:

1. Approve a complete designer and verify discovery visibility; reject incomplete approval.
2. Suspend a designer; new requests fail, but existing orders remain readable.
3. Hide a reported review with a reason; rating aggregation updates without changing its value.
4. Switch to customer/designer and attempt admin routes; no admin data is displayed.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 18 — Admin Issue Assignment and Resolution

Depends on: milestones 01–17.

PRD coverage: FR12; issue and completion exceptions.

### 1. Goal and Completed Result

An administrator can record a traceable issue outcome that participants can read.

### 2. Pages, Components, and Features

Build:

- Admin issue queue/detail.
- Resolution form.
- Linked record access scoped to the issue.
- Assignment.
- Open → Under review → Resolved workflow.
- Audit history.

Record:

- Owner.
- Action.
- Reason.
- Time.
- Customer agreement evidence for exceptional completion/cancellation.

### 3. Interactions, Validation, and States

Require resolution details.

Actions do not automatically imply compensation.

Show:

- Loading.
- No issues.
- Unavailable linked record.
- Pending update.
- Stale state.
- Failure/retry.
- Outcome success.

Participants see acknowledgment/outcome only, not unrelated admin records.

Do not resolve solely by hiding a report.

### 4. Mock Data

Use:

- Unassigned issues.
- Under-review issues.
- Resolved issues.
- Resolution notes.
- Customer-authorized exception scenarios.
- Missing-agreement exception scenarios.

Restrict assignment to an explicit fictional administrator list.

### 5. Acceptance Criteria and Simple Tests

1. Assign an issue, move it under review, and resolve with owner/action/reason/time.
2. Verify reporter sees the recorded outcome and the history survives cancellation.
3. Try an exceptional completion without recorded customer agreement; block it.
4. Switch identity or retry a stale decision; show safe errors and no duplicate audit event.

Boundary or unresolved requirement:

Escalation policy, customer-agreement evidence format, and administrator override rules need stakeholder confirmation.

Keep exceptions disabled except explicit demo fixtures until rules are defined.

No payment/refund execution or unlimited support access.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 18: Admin issue assignment and resolution.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: An administrator can record a traceable issue outcome that participants can read.

Build: Build Admin issue queue/detail and resolution form. Include linked record access scoped to the issue, assignment, Open → Under review → Resolved workflow, and audit history. Record owner, action, reason, time, and customer agreement evidence for any exceptional completion/cancellation.

Interactions, validation, and states: Require resolution details; actions do not automatically imply compensation. Show loading, no issues, unavailable linked record, pending update, stale state, failure/retry, and outcome success. Participants see acknowledgment/outcome only, not unrelated admin records. Do not resolve solely by hiding a report.

Mock fixtures: Unassigned, under-review, and resolved issues; resolution notes; customer-authorized and missing-agreement exception scenarios. Restrict assignment to an explicit fictional administrator list.

Milestone boundaries and gaps: Escalation policy, customer-agreement evidence format, and administrator override rules need stakeholder confirmation. Keep exceptions disabled except explicit demo fixtures until rules are defined. No payment/refund execution or unlimited support access.

Acceptance checks:

1. Assign an issue, move it under review, and resolve with owner/action/reason/time.
2. Verify reporter sees the recorded outcome and the history survives cancellation.
3. Try an exceptional completion without recorded customer agreement; block it.
4. Switch identity or retry a stale decision; show safe errors and no duplicate audit event.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Milestone 19 — Full Journey Verification and Backend Handoff

Depends on: milestones 01–18.

PRD coverage: Release acceptance; quality requirements; pilot measurement.

### 1. Goal and Completed Result

The frontend demonstrates every P0 journey, passes responsive checks, and has a precise integration handoff.

It is still not a live pilot.

### 2. Pages, Components, and Features

Finish missing cross-page links and states.

Review accessibility and responsive behavior.

Document:

- Provisional service contracts.
- Fixtures.
- Policy gaps.
- Backend obligations.

Add only a service-level event interface for required pilot metrics, with local fake-event inspection in development.

Do not add a product analytics dashboard.

### 3. Interactions, Validation, and States

Recheck:

- Login interruption.
- Session expiry.
- Forbidden/missing records.
- Retries.
- Duplicate actions.
- Outdated proposals.
- Issue-blocked completion.
- Preserved snapshots.
- Empty/error states.

Maintain visible Demo mode.

Define the agreed mobile performance profile before assessing the proposed 3-second usability target.

### 4. Mock Data

Use one resettable end-to-end customer/designer journey.

Include alternate scenarios for:

- Decline.
- Withdrawal.
- Delay.
- Stale proposal.
- Issue.
- Cancellation.

Use fake metric events for:

- Views.
- Submitted/accepted requests.
- Started/completed orders.
- Reviews.

Never present them as pilot results.

### 5. Acceptance Criteria and Simple Tests

1. Reset; discover → sign in → request → measurements → discuss → propose → confirm one order.
2. Switch to designer; start → Ready → Handed over; customer completes and reviews.
3. Repeat with revised terms, open issue, admin resolution, and agreed cancellation; inspect timelines.
4. Test 360/768/1280 px, keyboard, session expiry, errors/retries, and changing private record IDs.
5. Run build and focused regression checks; document remaining gaps and verify real-adapter mode is explicitly unconfigured.

Boundary or unresolved requirement:

Backend work is still required for:

- Real identity verification/recovery.
- Sessions.
- Ownership/roles.
- Atomic state changes/deduplication.
- Secure uploads.
- Persistent data.
- Notifications.
- Moderation audit.

Frontend tests demonstrate behavior but cannot verify those server guarantees.

Deployment and real pilot launch are outside this milestone.

### 6. Complete Codex Implementation Prompt

Implement MY GARB frontend milestone 19: Full journey verification and backend handoff.

Use React + Vite + JavaScript + Bootstrap + custom CSS. Inspect the repository and applicable AGENTS.md before editing; preserve existing working behavior. Use the revised MY GARB PRD as authority and the available five Figma screenshots only for visual direction. Scope is custom-made Nigerian/culturally relevant occasion attire. No carts, checkout, favorites, flash sales, real payments, courier tracking, AI, or advanced verification.

Implement only this milestone; do not continue to the next. Use the existing separate service layer and mock adapter, establishing them only if this milestone requests it. Components must not depend directly on fixtures. Do not invent API URLs or write backend code. Real-service mode must remain explicitly unconfigured without approved contracts. Label simulated sessions, data, and actions as Demo mode. Use fictional data only and never store passwords. Mock ownership/state checks illustrate behavior and are not production security.

Keep mobile, tablet, and desktop layouts usable at 360/768/1280 px, with labeled fields, keyboard access, visible focus, and actionable errors. Flag missing/conflicting rules in docs/requirements-gaps.md. Use only clearly marked provisional demo assumptions, and block policy-dependent actions when no demo rule exists. Do not silently decide product policy.

Goal: The frontend demonstrates every P0 journey, passes responsive checks, and has a precise integration handoff; it is still not a live pilot.

Build: Finish missing cross-page links and states; review accessibility and responsive behavior; document provisional service contracts, fixtures, policy gaps, and backend obligations. Add only a service-level event interface for required pilot metrics, with local fake-event inspection in development. Do not add a product analytics dashboard.

Interactions, validation, and states: Recheck login interruption, session expiry, forbidden/missing records, retries, duplicate actions, outdated proposals, issue-blocked completion, preserved snapshots, and empty/error states. Maintain visible Demo mode. Define the agreed mobile performance profile before assessing the proposed 3-second usability target.

Mock fixtures: One resettable end-to-end customer/designer journey; alternate decline, withdrawal, delay, stale proposal, issue, and cancellation scenarios. Fake metric events for views, submitted/accepted requests, started/completed orders, and reviews; never present them as pilot results.

Milestone boundaries and gaps: Backend work still required: real identity verification/recovery, sessions, ownership/roles, atomic state changes/deduplication, secure uploads, persistent data, notifications, and moderation audit. Frontend tests demonstrate behavior but cannot verify those server guarantees. Deployment and real pilot launch are outside this milestone.

Acceptance checks:

1. Reset; discover → sign in → request → measurements → discuss → propose → confirm one order.
2. Switch to designer; start → Ready → Handed over; customer completes and reviews.
3. Repeat with revised terms, open issue, admin resolution, and agreed cancellation; inspect timelines.
4. Test 360/768/1280 px, keyboard, session expiry, errors/retries, and changing private record IDs.
5. Run build and focused regression checks; document remaining gaps and verify real-adapter mode is explicitly unconfigured.

Verify the affected interactions and run the available production build. Add focused automated checks only where they meaningfully cover state transitions, conversion, ownership filtering, stale versions, or duplicate-submit behavior; do not add tests that simply mirror markup. If a tool is unavailable, state exactly what remains manually unverified. At the end, list changed files, explain how to run and manually test this milestone in beginner-friendly language, summarize validation results and unresolved decisions, and stop. Do not deploy, build later milestones, or claim production readiness.

## Frontend Completion Is Not Pilot Launch

Passing milestone 19 means the frontend is ready for backend integration and product review.

The PRD also requires:

- Real server authorization.
- Verified authentication/recovery.
- Secure private uploads.
- Persistent storage.
- Atomic lifecycle changes.
- Audit records.
- Operating policies.
- Actual pilot measurement.

Those are separate work.

Keep the adapter interface stable and replace the mock implementation only after agreed backend contracts are available.











# MY GARB — Updated Figma Implementation Instructions

## How This Update Applies

This section updates the visual requirements in the existing frontend milestone plan.

- Keep all 19 milestones in their existing order.
- Preserve existing functional requirements, acceptance criteria, testing steps, and MVP scope.
- Apply these visual instructions when implementing each requested milestone.
- Where earlier instructions describe Figma as “visual direction,” use the compatible supplied designs as the visual implementation targets.
- This update does not authorize additional features or automatically start another milestone.

## Development Rules

1. Implement only the milestone explicitly requested by the user.
2. Inspect the existing project and preserve working code.
3. Verify the milestone before marking it complete.
4. Clearly identify mock data, authentication, messages, orders, approvals, and other simulated actions.
5. Keep a visible “Demo mode — simulated data and actions” notice.
6. Keep development-only role switches, scenario controls, reset tools, and component demonstrations separate from normal customer-facing pages.
7. Use React, Vite, JavaScript, Bootstrap, and custom CSS.
8. Use the separate service layer and mock adapter.
9. Components must not directly depend on fixture arrays.
10. Do not invent API endpoints or write backend code.
11. Real-service mode must remain explicitly unconfigured until approved backend contracts are available.
12. Flag missing or conflicting requirements instead of silently inventing product rules.
13. Do not deploy or claim production readiness unless separately requested.

## Relationship Between the Demo and Product Screens

The milestone-01 shell is a development demonstration of layouts, navigation, reusable components, and interface states.

It is not the finished welcome, login, discovery, or messages interface.

The existing component demo may remain as a development-only tool.

Its cream background, large serif headings, or other unrelated styling must not become the visual baseline for product screens.

Product screens must follow the supplied green Figma designs as their milestones are implemented.

- Milestone 03 introduces welcome, login, and sign-up screens.
- Milestone 06 introduces designer discovery and public portfolio viewing.
- Milestone 10 introduces conversation lists and chat threads.
- Milestone 12 introduces custom-order lists and production timelines.

Do not rebuild working logic unnecessarily to introduce these screens.

## Source of Authority

Use the revised MY GARB PRD as the authority for:

- MVP features.
- User roles.
- Permissions.
- Request and order lifecycle.
- Required fields.
- Acceptance criteria.

Use compatible Figma exports as the authority for the intended visual presentation.

A design containing an excluded feature does not authorize that feature.

Preserve compatible styling while explicitly adapting conflicting controls and copy.

## Supplied Design Files

Earlier archive: BUTTON _ PRODUCT CARD.zip

- SIGNUP HOME SCREEN.png
- Sign Up.png
- Login.png
- Home page fidelity.png
- Message.png

Additional archive: BUTTON _ PRODUCT CARD (1).zip

- Delivery status.png
- Tracking History.png
- Tracking map.png
- Failed payment.png
- Successful payment.png
- Successful payment-1.png
- Add PAYMENT METHOD.png
- Payment method.png
- Checkout.png
- Add to Cart.png
- Add Vendor.png
- Chat Typing.png
- Chats.png

Before implementing a referenced screen, open the actual image.

If a reference image is unavailable in the repository or session, report the missing file. Do not claim a visual match based only on its filename.

## Shared Visual Requirements

Use the supplied green visual system consistently.

These colors were sampled from exported screenshots; they are not verified editable Figma variables.

| Purpose | Color |
| --- | --- |
| Main dark-green background | #1C4F3C |
| Medium-green headers and surfaces | #3F8E6F |
| Light-green panels and accents | #79BE9E |
| Primary action buttons | #1E9E6A |
| Deep neutral-green surfaces | #2C3A33 |
| Main text on dark backgrounds | #FFFFFF |

Requirements:

- Match compatible references closely in color, typography, spacing, alignment, imagery, controls, and rounded surfaces.
- Check text contrast, especially on lighter-green panels.
- Use the reference’s outlined or filled field treatment where appropriate.
- Preserve circular avatars and distinct incoming/outgoing message bubbles.
- Maintain appropriate image proportions.
- Do not substitute an unrelated dashboard theme.
- Do not render complete screenshots as the application interface.
- Use separately supplied images, logos, icons, and fonts when available.
- Identify missing assets or fonts rather than claiming exact fidelity.

Preserve PHASIONABLE wherever it appears in supplied Figma designs, including the Milestone 03 screens. Do not replace it with MY GARB on those screens. This correction overrides earlier visible-branding replacement instructions.

Use MY GARB as the project name in documentation.

Final branding remains an open decision.

## Responsive Requirements

- Build mobile-first.
- Compare referenced screens at their source mobile width.
- Test at 360 px, 768 px, and 1280 px.
- Avoid horizontal scrolling and content covered by fixed navigation.
- Use readable forms and grids on tablet and desktop.
- Do not simply stretch a phone screenshot.
- Maintain keyboard access, visible focus, persistent labels, and actionable field errors.
- Aim for the PRD’s proposed 44 × 44 px touch targets.
- Treat tablet/desktop arrangements as responsive adaptations because dedicated designs were not supplied.

## MVP Navigation

Use labeled navigation for:

- Discover.
- Requests and Orders.
- Messages.
- Profile.

Use a separate administrator layout.

Do not copy the original cart, favorites, or social-vendor navigation.

Show logout only during an active demo session.

## Complete Screen Mapping

| Design | Milestone | Implementation instruction |
| --- | --- | --- |
| SIGNUP HOME SCREEN.png | 03 | Match the photo-led welcome composition, login link, browsing button, and sign-up link. Preserve PHASIONABLE and use appropriate discovery wording. |
| Sign Up.png | 03 | Match the green photo overlay, field treatment, and button layout. Use the proposed email/password baseline and customer/designer role selection. Remove phone sign-in, cart, and guest logout. |
| Login.png | 03 | Match the authentication composition. Include password visibility, recovery, and sign-up navigation. Use email rather than phone/email. Remove cart and guest logout. |
| Home page fidelity.png | 06 | Adapt the green header, search, filters, category presentation, and image cards to approved designer and portfolio discovery. Remove discounts, Flash Sale, purchase actions, cart, favorites, and unapproved categories. |
| Message.png | 10 | Match conversation search, avatars, previews, timestamps, unread badges, and green surfaces. Use MVP navigation and participant-linked conversations. |
| Add Vendor.png | 06 | Reuse designer-result row styling. Replace mutual friends with relevant specialization/location. Replace Add with View designer or request navigation. Do not build a vendor network or following feature. |
| Add to Cart.png | 05/06, 08, 15 | Use photography and descriptive layout for portfolio viewing, measurement-strip styling for summaries only, and rating presentation for eligible reviews. Remove purchase price, stock selectors, cart quantity, and Add to Cart. Use Request custom outfit where appropriate. |
| Checkout.png | No cart milestone | Exclude the cart and checkout workflow. Thumbnail-summary row styling may be reused in legitimate request/specification/order summaries. |
| Payment method.png | No payment milestone | Exclude payment selection, provider logos, shipping fees, and payment totals. Generic selection-row styling may be reused for legitimate forms. |
| Add PAYMENT METHOD.png | No payment milestone | Exclude card-entry and payment storage. Generic labeled-input styling may be reused without card number, expiry, CVV, or banking fields. |
| Failed payment.png | Styling reference only | Reuse non-payment error composition where suitable. Use relevant error copy, preserve entered data, and provide appropriate retry actions. |
| Successful payment.png | Styling reference for 07/11/15 | Reuse confirmation composition for Request submitted, Specification confirmed, or Order completed. Do not show paid status, receipts, sharing, courier tracking, or a five-day delivery promise. |
| Successful payment-1.png | No feature mapping | This export is a plain green panel with no meaningful controls or text. Do not infer another workflow. |
| Delivery status.png | 12 | Adapt header, order-ID panel, and timeline styling to production progress. Remove courier locations, map, parcel pickup, estimated courier arrival, and package tracking. |
| Tracking History.png | 12 | Adapt cards to custom-order history with order summaries, agreed dates, and production states. Remove courier routes, parcel weight, shipping price, and courier Delivered semantics. |
| Tracking map.png | Excluded | Do not implement maps, GPS, courier identity, distance, courier ratings, agent calls, or live tracking. Generic panel/button styling may be reused only. |
| Chats.png | 10 | Match conversation header, bubbles, reference-image messages, timestamps, and composer. Remove calls, video, voice recording, last-seen claims, and undefined actions. |
| Chat Typing.png | 10 | Use as the focused-composer reference. Test with the device’s native keyboard. Do not draw a custom keyboard or add live typing/presence features. |

## Milestone-Specific Visual Instructions

### Milestone 01 — Shared Styling

Establish the shared green design tokens and reusable controls.

Keep the component demonstration development-only.

Do not introduce excluded workflows merely to demonstrate their styling.

### Milestone 02 — Services and Fixtures

Keep scenario/reset controls outside normal product navigation.

Do not add payment, cart, courier, or social-network service groups because they appear in the exports.

### Milestone 03 — Welcome and Authentication

Use the three welcome/authentication exports directly.

Match their photo-led composition, green overlays, light text, fields, buttons, and spacing.

Preserve PHASIONABLE wherever it appears in the Figma designs and use the proposed email/password baseline. MY GARB remains the project name in documentation.

Report missing photos, fonts, or assets.

### Milestone 04 — Profiles

No complete profile-edit design was supplied.

Use consistent green headers, panels, and labeled fields.

Do not copy banking fields from the payment-method design.

### Milestone 05 — Portfolio Management

No complete portfolio-editor design was supplied.

Use the shared green form system.

Use Add to Cart.png only for compatible portfolio-viewing composition, without purchase controls.

### Milestone 06 — Discovery

Use Home page fidelity.png, Add Vendor.png, and Add to Cart.png for their mapped purposes.

Preserve compatible composition while replacing sales, social connections, and cart actions with designer/work discovery.

### Milestone 07 — Requests

No direct request-form design was supplied.

Use green fields, panels, and clear summaries.

Reuse confirmation/error styling only with request-related copy.

No cart, payment, receipt, shipping fee, or fixed delivery promise.

### Milestone 08 — Measurements

Use the measurement strip as a summary reference only.

Do not copy screenshot measurements as defaults or treat them as an approved measurement schema.

Guided measurement forms and instructions still require design review.

### Milestone 09 — Designer Triage

No complete triage/dashboard design was supplied.

Use consistent green lists, cards, and labeled statuses.

Do not add social-vendor or courier behavior.

### Milestone 10 — Messaging

Use Message.png, Chats.png, and Chat Typing.png.

Match list rows, avatars, bubbles, timestamps, image messages, and composer placement.

Support text and validated reference images.

Do not add calls, video, voice notes, last seen, live typing, a custom keyboard, or arbitrary social conversations.

### Milestone 11 — Specifications

No complete specification/version-confirmation design was supplied.

Use green forms and summary cards.

Confirmation may reuse the success composition with Specification confirmed wording.

Order creation must follow mutual confirmation, never payment.

### Milestone 12 — Orders

Adapt Delivery status.png and Tracking History.png.

Use:

Confirmed → In production → Ready → Handed over.

Customer completion is implemented in milestone 15.

Show actual fictional events, actors, timestamps, and agreed dates.

Do not add courier maps, shipping prices, parcel weights, agent details, or estimated courier arrival.

### Milestone 13 — Changes and Cancellation

Extend the green order surfaces with current-versus-proposed details and explicit decisions.

Do not use payment/delivery success as proof that a change was accepted.

### Milestone 14 — Issues

Use shared green forms and status panels.

No compensation, refund, call, or voice workflow.

### Milestone 15 — Completion and Reviews

Use an accessible rating input.

Calculate rating/count from eligible published review fixtures rather than copying screenshot numbers.

Completion confirmation must not imply payment, receipts, courier tracking, or fixed delivery dates.

### Milestone 16 — Notifications

Use consistent green panels and rows.

The delivery-status bell is a styling cue only.

Build the existing in-app event requirements without push, financial, or courier features.

### Milestone 17 — Admin Approval and Moderation

Use a separate labeled admin layout with shared green styling.

Do not copy Add vendor or mutual-friends behavior into approval workflows.

### Milestone 18 — Admin Issue Resolution

Use green admin panels, explicit resolution details, and scoped record access.

Do not introduce financial actions, courier management, or calls.

### Milestone 19 — Final Verification

Compare all compatible/adapted screens with their mapped exports.

Check responsive behavior, intentional MVP changes, missing assets, and the absence of excluded controls.

Do not claim exact fidelity or live-pilot readiness without evidence.

## Conflicts to Record

- Payment/cart designs contain dollar prices; tracking history contains an Rs. amount. The PRD uses agreed custom-order prices in NGN.
- Payment method displays $20 purchase plus $10 shipping but a $40 subtotal.
- Checkout shows three $40.01 items but a $300.50 total.
- Do not reproduce these inconsistent commerce calculations.
- The portfolio reference shows three stars alongside a 4.1 rating. Derive ratings from eligible published reviews.
- The payment-success design promises delivery within five working days. That promise is not approved.
- Handed over is a manual outfit-transfer record, not verified courier delivery.
- Completed requires customer confirmation and no unresolved issue.
- Phone sign-in, social vendors, calls, voice notes, live presence, receipts, and sharing conflict with or exceed current requirements. Preserve PHASIONABLE branding wherever it appears in the supplied Figma designs.

## Designs Still Missing or Incomplete

Complete designs have not been supplied for:

- Customer/designer profile editing.
- Portfolio editing.
- Request and draft forms.
- Guided measurements.
- Designer triage/dashboard.
- Structured specification and version confirmation.
- Change and cancellation panels.
- Issue reporting.
- Review entry.
- Notification lists.
- Administrator workflows.
- Recovery and verification states.

Use the shared green system, follow the existing milestone requirements, and flag these screens for review.

Do not claim a partial reference is a complete design for another workflow.

## Visual Acceptance and Testing

For each milestone that builds product screens:

1. Open the mapped reference images before implementation.
2. Identify the referenced filenames in the implementation report.
3. Compare the implementation with the source at its mobile width and at 360 px.
4. Check colors, typography, hierarchy, imagery, spacing, alignment, controls, and rounded surfaces.
5. Verify responsive behavior at 768 px and 1280 px.
6. Verify keyboard access, visible focus, labels, contrast, and no covered content.
7. Confirm excluded controls and misleading production claims are absent.
8. Explain intentional MVP adaptations.
9. Identify missing assets/fonts and unperformed visual checks.
10. Run the existing milestone’s functional acceptance checks and production build.
11. Mark the milestone complete only after required checks pass; otherwise report remaining work.

## Required Codex Completion Report

After implementing the requested milestone, report:

- The milestone implemented.
- Files changed.
- Reference images used.
- Functional checks performed.
- Visual/responsive checks performed.
- Intentional MVP adaptations.
- Mock functionality.
- Missing assets or requirements.
- Remaining failures or unverified checks.
- Beginner-friendly steps to run and manually test the result.

Stop after the requested milestone.

Do not automatically implement the next milestone.
