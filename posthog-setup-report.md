<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Lingora — a Duolingo-inspired AI language learning app built with Expo, Expo Router, Clerk authentication, and NativeWind. The integration covers the full user journey: onboarding, sign-up/sign-in (password and Google OAuth), email verification, language selection, and home screen engagement. `posthog.identify()` is called at sign-up, sign-in, and on app load via Clerk's `useUser()`. `$exception` error events are captured at all critical auth boundaries. Environment variables are set in `.env` and loaded via `expo-constants` through `app.config.js`. `PostHogProvider` wraps the app in `app/_layout.tsx` with autocapture and manual screen tracking enabled.

## Event tracking

| Event | Description | File |
|---|---|---|
| `onboarding_get_started` | User taps Get Started on the onboarding screen | `app/onboarding.tsx` |
| `sign_up_attempted` | User taps Sign Up to initiate account creation | `app/(auth)/sign-up.tsx` |
| `sign_up_failed` | Sign-up returns an error (e.g. email already in use, weak password) | `app/(auth)/sign-up.tsx` |
| `email_verification_submitted` | User submits the email verification code during sign-up | `app/(auth)/sign-up.tsx` |
| `user_signed_up` | User successfully completes account creation and email verification | `app/(auth)/sign-up.tsx` |
| `sign_in_attempted` | User taps Sign In with email/password credentials | `app/(auth)/sign-in.tsx` |
| `sign_in_failed` | Email/password sign-in returns an error from Clerk | `app/(auth)/sign-in.tsx` |
| `user_signed_in` | User successfully completes sign-in (password or password_mfa method) | `app/(auth)/sign-in.tsx` |
| `user_signed_in_with_google` | User successfully completes Google OAuth sign-in/sign-up | `hooks/useGoogleAuth.ts` |
| `google_auth_failed` | Google OAuth flow throws an error | `hooks/useGoogleAuth.ts` |
| `language_searched` | User types a query in the language search box (debounced 600ms) | `app/language-selection.tsx` |
| `language_selected` | User confirms their chosen learning language and proceeds | `app/language-selection.tsx` |
| `lesson_continue_tapped` | User taps Continue to resume their current lesson | `app/(tabs)/home.tsx` |
| `today_plan_item_tapped` | User taps one of the items in Today's Plan on the home screen | `app/(tabs)/home.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/700602)
- [Sign-up conversion funnel](/insights/Q61ymq5y) — 3-step funnel: Get Started → attempted → account created
- [Sign-in success rate](/insights/dPNVKfAq) — funnel: sign-in attempted → signed in (within 1 hour)
- [Auth errors over time](/insights/Pb0YEyMZ) — trend of sign-in, sign-up, and Google auth failures
- [New sign-ups over time](/insights/bYOVQIn5) — daily registrations by method (password vs Google)
- [Home screen engagement](/insights/mmB2ZfvV) — trend of lesson continuation and Today's Plan taps

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
