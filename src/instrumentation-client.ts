import posthog from "posthog-js";

// Client-side analytics, initialized before React hydration.
//
// The key is read from the environment and intentionally kept out of committed
// source (the repo is public). Set NEXT_PUBLIC_POSTHOG_KEY in .env locally and in
// the Vercel project env vars for production. If it's absent, PostHog is skipped.
// Events route through the same-origin "/ingest" reverse proxy (next.config.ts)
// to dodge ad blockers.
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();

if (POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    capture_pageview: "history_change",
    capture_pageleave: true,
    person_profiles: "identified_only",
  });
}
