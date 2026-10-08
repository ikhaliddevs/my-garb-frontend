# Milestone Progress

## Milestone 03 - Welcome and Demo Authentication

Status: Demo implementation verified. See `docs/milestone-03.md` for checks, provisional contracts, visual differences, limitations, and local test steps.

- Welcome, signup, login, proposed recovery/reset/verification layouts, and PHASIONABLE branding implemented with the original separate couple photo.
- Promise-based account operations, fictional session restoration/logout, safe internal return paths, role guards, and development account simulations added.
- Existing showcase preserved at `/dev`, `/dev/states`, and `/dev/services`; future workflows remain labeled placeholders.
- Account/service checks, browser flows, keyboard checks, 402 x 874 comparisons, 360/768/1280 layouts, lint, and build passed. Exact fonts/monogram, asset licensing, direct PRD comparison, native mobile keyboard, and assistive technology remain unverified.
- Milestone 04 and deployment not started.

## Milestone 01 - Project Setup and Shared Styling

Status: Implemented for review. Production build and lint pass.

Completed:

- React/Vite app replaced with MY GARB public, customer, designer, and admin layout shells.
- Labeled navigation added for Discover, Requests and Orders, Messages, and Profile.
- Shared Button, FormField, Select, Alert, Spinner, EmptyState, ErrorState, StatusBadge, and confirmation-dialog components added.
- Development-only state review page added at `/dev/states`.
- Not-found state added for unknown routes.
- CSS variables added for green palette, spacing, typography, rounded surfaces, focus states, and responsive layout.

Not included:

- No authentication, service adapter, persistence, request flow, messaging flow, orders, payments, or backend code.
- No later milestone work has been started.

Validation:

- `npm.cmd run lint` passed with no warnings.
- `npm.cmd run build` passed.
- Local Vite dev server responded successfully for the app shell and development state routes.
- Browser-based visual checks at 360 px, 768 px, and 1280 px still need a human pass because the available in-app browser automation bridge failed in this session.

## Milestone 02 - Replaceable Service Layer and Demo Fixtures

Status: Implemented for review.

Completed:

- Added grouped promise-based frontend services for accounts, profiles, portfolios, discovery, requests, measurements, conversations, specifications, orders, notifications, reviews, and administration.
- Added a mock adapter with deterministic fictional fixtures, owner-scoped reads, persisted demo records, reset support, duplicate-operation demonstration, and stale-version demonstration.
- Added an explicitly unconfigured real adapter that returns `backend_not_configured` without falling back to mock records.
- Added development-only scenario controls for normal, delayed, empty, validation, missing, forbidden, temporary-failure, identity switching, adapter switching, and reset.
- Documented provisional service contracts, persistence keys, gaps, and backend responsibilities.

Not included:

- No welcome/authentication flow, profile editing journey, discovery product screen, messaging product screen, order workflow, backend code, API URLs, payments, checkout, carts, escrow, courier tracking, maps, calls, or AI behavior.
