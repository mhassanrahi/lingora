<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Lingora — a Duolingo-inspired AI language learning app built with Expo, Expo Router, Clerk authentication, and NativeWind.

## Summary of changes

- **`app.config.js`** (new) — Migrated from `app.json` to `app.config.js` to expose `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` via `expo-constants` extras.
- **`.env`** — Added `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` environment variables.
- **`config/posthog.ts`** (new) — PostHog client singleton configured via `Constants.expoConfig.extra`, with lifecycle event capture, batching, and feature flag preloading.
- **`app/_layout.tsx`** — Added `PostHogProvider` wrapping the entire app, manual screen tracking using `usePathname`/`useGlobalSearchParams`, and user identification via Clerk's `user.id` (non-PII opaque ID) in an inner `AppNavigation` component.
- **`app/(auth)/sign-in.tsx`** — Captures `user_signed_in` with `{ method: "password" | "password_mfa" }` on successful sign-in.
- **`app/(auth)/sign-up.tsx`** — Captures `user_signed_up` with `{ method: "password" }` after email verification completes.
- **`app/onboarding.tsx`** — Captures `onboarding_get_started` when the Get Started button is tapped.
- **`app/language-selection.tsx`** — Captures `language_selected` with `{ language_code, language_name }` when the user confirms a language.
- **`app/(tabs)/home.tsx`** — Captures `lesson_continue_tapped` with `{ language_code, unit_order, lesson_title }` when the Continue button is pressed.
- **`hooks/useGoogleAuth.ts`** — Captures `user_signed_in_with_google` with `{ method: "google" }` on successful Google OAuth.

## Event tracking

| Event | Description | File |
|---|---|---|
| `onboarding_get_started` | User taps Get Started on the onboarding screen — top of the acquisition funnel | `app/onboarding.tsx` |
| `user_signed_up` | User completes email sign-up and verifies their email address | `app/(auth)/sign-up.tsx` |
| `user_signed_in` | User signs in with email/password (or MFA) | `app/(auth)/sign-in.tsx` |
| `user_signed_in_with_google` | User signs in or signs up via Google OAuth | `hooks/useGoogleAuth.ts` |
| `language_selected` | User selects a language to learn and confirms with Continue | `app/language-selection.tsx` |
| `lesson_continue_tapped` | User taps Continue on the home screen to resume their current lesson | `app/(tabs)/home.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/694643)
- [Acquisition funnel](/insights/vImBqKDj) — Conversion from Get Started → sign-up → language selection → first lesson
- [New sign-ups over time](/insights/BAL3EN8v) — Daily email and Google sign-ups
- [Language popularity](/insights/bz84XN2l) — Which languages users select most often
- [Daily active learners](/insights/pbGFnMOu) — Unique users engaging with lessons each day
- [Onboarding drop-off](/insights/eodlW5Se) — Users who tapped Get Started but didn't complete sign-up

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
