# Milestone 03: Welcome and Demo Authentication

## Branding and Header Refinement

The rejected scrollwork SVG has been replaced by `src/assets/phasionable-sewing-logo.svg`. It traces the supplied `WhatsApp Image 2025-10-30 at 13.10.51_d6fde0ee.png`: a green P with a shaded stem/bowl, needle and looping thread on the left, and a four-hole button at the lower right. The original image is preserved as a visual reference only; the application imports only the new SVG. The obsolete SVG was removed. `BrandLogo.jsx` retains the same keyboard-accessible PHASIONABLE home link and 16 x 24 image box; all its product-header consumers use the correction. The central title, photo composition, desktop layout, browsing/signup actions, controls, and service contracts are unchanged.

The new reference is only 46 x 32 pixels, with the actual mark occupying roughly 16 x 18 pixels. The needle-eye contour, exact thread crossings, button-hole contours, rim thickness, and precise shade boundaries remain blurred. Four holes follow the supplied identification; their small circular contours are approximate. Clean paths and transparent button holes replace raster blur without adding scrollwork, stitches, shadows, or a background. Colors are based on source samples, with restrained green shading. The SVG remains a reconstruction, not the original vector. Original font files remain missing.

The user's explicit visual exception now permits a reference-style cart icon with `aria-disabled`, an accessible explanation, and a keyboard/hover tooltip: "Shopping cart is outside the current MVP." It deliberately has no action or navigation, no counts, and no cart/checkout/payment service or workflow. It stays focusable solely so keyboard users can discover why it is unavailable. Earlier instructions to remove the icon remain superseded only for this visual exception.

The reference's small green Log out treatment appears only when the demo session is active. It calls the existing mock logout service, prevents repeated clicks while pending, clears the session, and returns home. Failure is announced with a retry instruction. Signed-out welcome visitors retain the existing Log in link.

Verification and close-up comparisons are in `artifacts/milestone-03/header`; `logo-comparison.png` compares the supplied WhatsApp reference and SVG enlarged and at header scale. The button size/position was corrected after visual comparison. `npm run check:brand:browser` checks unchanged logo alignment/size on welcome/login/signup at 360/402/768/1280 widths, cart/keyboard/session behavior, and 3x-density header rendering. The original vector is still needed for exact fidelity. This logo correction does not authorize a commit, push, deployment, or later milestone.

## Screens and References

- `/` or `/welcome`: SIGNUP HOME SCREEN.png (402 x 874).
- `/login`: Login.png (402 x 874).
- `/signup`: Sign Up.png (402 x 874).
- `/forgot-password`, `/reset-password?token=demo-reset`, `/verification`: proposed layouts, no supplied matching designs.
- `/discover`: Milestone 06 development placeholder. Its request-placeholder link preserves fictional `designer-kemi` through login.
- `/customer`, `/designer`, `/admin` and their requests-orders/messages/profile routes: guarded future-workflow placeholders.
- `/dev`, `/dev/customer`, `/dev/designer`, `/dev/admin`: preserved shell showcase; `/dev/states` and `/dev/services`: preserved development tools.

`design-references/milestone-03` is a ZIP without an extension. Its three entries are byte-identical to the loose reference PNGs. All were visually inspected. The pages use the matching separate `src/assets/image 62.png` photo, never the whole-screen PNG. PHASIONABLE is preserved. MY GARB remains the documentation/project name.

## Login and Signup

All fictional accounts use the fixed password `demo-only`: `amina.demo@example.test` (customer, verified), `chidi.demo@example.test` (customer, unverified), `kemi.demo@example.test` (approved designer), `bayo.demo@example.test` (pending designer), `zara.demo@example.test` (suspended designer), `admin.demo@example.test` (administrator). Administrator registration is unavailable.

Signup requires a fictional `@example.test` address, a nonempty password, and customer/designer selection. No password policy or confirmation field is approved; only required input is provisionally validated. The entered password is discarded. Every newly registered fictional account subsequently logs in with `demo-only`, regardless of the entered signup password. Signup creates an unverified session; designer records remain pending/unpublished. No profile editing is implemented.

The signup address restriction is a demo-data safeguard, not a production email policy. Do not enter real personal information.

## Sessions and Recovery

The fictional session is `{ accountId }` inside the existing `my-garb.demo-store.v2` localStorage record. Refresh restores it. Logout clears it; reset restores seeds and clears it. Chidi is provisionally unverified when no persisted verification override exists. Verification does not impose undocumented access rules: unverified users see a notice and can enter their role placeholder. Verification controls live in `/dev/services`.

Recovery returns the same acknowledgment for known and unknown valid addresses. No email is sent. `demo-reset` is a one-use example identifier; `demo-expired` produces expiry. These are public constants, not real security tokens. Reset records only a used flag, never any password, and does not change login credentials. Reset recovery example in development tools re-enables it. Invalid/reused identifiers show errors.

Internal return locations use an exact allowlist of the signed-in role's placeholder routes. External, unknown, and other-role locations fall back to the role root. The fictional designer ID is preserved only for customer routes. There is no request submission or discovery journey.

Development identity selection still scopes the Milestone 02 service checks. Product account screens receive a service instance scoped to the restored session identity; development checks retain their separately selected identity. Enter selected demo session explicitly changes the separate session; merely selecting an identity does not sign in. Mock sessions, ownership checks, and route guards provide no real authentication, authorization, or security. The real adapter explicitly reports Backend not configured.

## Visual Differences and Verification

The original couple photo is available; no replacement photography is used. Exact fonts and the original reference monogram vector are missing. Arial and Georgia are explicit temporary font substitutes; the local decorative-P SVG now approximates the missing monogram. Asset rights remain unverified. Guest logout is removed; cart is only the explicitly requested unavailable header placeholder. Email replaces phone/email, and role selection, password visibility, labels, signup login link, and the demo notice are intentional MVP adaptations. Tablet/desktop compositions are proposed adaptations.

The source PRD document was not found; AGENTS.md's reproduced requirements were used.

## Verified Results

- `npm run check:auth`: passed required input checks, invalid credentials, signup for both roles, duplicate email, rejection of administrator signup, verified/unverified/approval states, session restoration/logout/reset, generic recovery, one-use/expired/invalid reset outcomes, no password persistence, service scenarios, and safe return allowlists.
- `npm run check:services`: original Milestone 02 checks passed.
- `npm run check:auth:browser`: passed in installed Microsoft Edge. Customer/designer login, designer signup, role guards, refresh/logout, designer context through login, external return rejection, verification controls, recovery/reset reuse, loading/failure states, and real-adapter errors passed with no page errors. Tab/Enter, field-error focus, and showcase menu/dialog Escape focus restoration passed.
- `npm run lint` and `npm run build`: passed.
- All six account screens and all three development routes had no horizontal overflow at 360, 768, and 1280 px. The demo notice remained in the viewport. Screenshots of welcome/login/signup at these widths were visually inspected; controls/text remain separate and readable. A native mobile device keyboard and assistive technology were not tested.
- Each finished welcome/login/signup screen was compared side by side with its corresponding reference at 402 x 874. Comparisons are in `artifacts/milestone-03/{welcome,login,signup}-comparison.png`; individual viewport screenshots are in the same folder.

Welcome reproduces the couple photo placement, central branding, and bottom actions. Login reproduces the photo crop, strong overlay, underlined fields, and button placement; field baselines/typography remain slightly different. Signup uses its own field spacing and overlay; its button is lower because role selection and approval guidance are required. Password visibility, email labels, login navigation, simulation copy, the persistent notice, approximate SVG monogram, unavailable cart, and removed guest logout are intentional differences. Exact font and logo fidelity remains unverified until source assets arrive. Photo licensing and direct PRD comparison also remain unverified.

The in-app browser bridge failed with a missing sandboxPolicy error. Standalone Playwright with installed Edge completed the checks instead. The browser script defaults to `http://127.0.0.1:5173`; set `DEMO_URL` to test another local port. It uses an isolated browser context and does not change the user's existing browser data.

## Try It Locally

Start `npm run dev`, then open the URL Vite reports. Visit `/`, `/signup`, `/login`, `/forgot-password`, `/reset-password?token=demo-reset`, and `/verification`. Use Amina or Kemi's fictional address with `demo-only` to log in, refresh the role placeholder, and log out. Signup using a new fictional `@example.test` address demonstrates unverified/pending status; subsequent login also uses `demo-only`.

In `/dev/services`, select normal/delayed/failure or the real adapter, then open login to see those outcomes. Select an identity and use Enter selected demo session or the verification controls; use Expire demo session to clear it. Reset demo data restores fixtures and clears the session; Reset recovery example re-enables the one-use reset demonstration. Choose the normal mock scenario afterward to restore ordinary behavior.

Status: Milestone 03 demo implementation verified, with the documented asset/policy/source-document limitations. No later milestone workflows or deployment were performed.
