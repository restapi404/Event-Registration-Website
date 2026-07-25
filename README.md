# ZENITH 2026 — Club Event Registration

Registration portal for the Computer Science Club's annual fest. Students sign up, submit one
registration, and can view, edit or delete it from a dashboard.

## Stack

React (Vite) + Tailwind CSS on the frontend, Supabase for auth and the database.

## Project layout

```
src/
  components/     shared UI: navbar, timeline, illustration, auth layout, route guard
  hooks/useAuth   session state, exposed via context
  pages/          Landing, Login, Signup, Register, Dashboard
  utils/          form validation
  supabaseClient  single Supabase client instance
supabase/schema.sql   table + Row Level Security policies
```

No `redux`, no extra abstraction layers — state lives where it's used, and the Supabase client
is the only "backend" this app talks to.

## 1. Create the Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL editor** and run `supabase/schema.sql`. This creates the `registrations`
   table and locks it down with Row Level Security so a user can only read/edit/delete their
   own row.
3. Under **Authentication → Providers**, email/password is enabled by default — nothing else
   to configure. Optionally turn off "Confirm email" under Authentication → Settings while
   testing locally, so sign-up logs you in immediately.
4. Copy your **Project URL** and **anon public key** from Project Settings → API.

## 2. Run locally

```bash
cp .env.example .env      # paste in your Project URL + anon key
npm install
npm run dev
```

## 3. Deploy

Any static host works since this builds down to plain HTML/CSS/JS in `dist/`. Easiest options:

**Vercel** (recommended, zero config for Vite)
1. Push this repo to GitHub.
2. [vercel.com](https://vercel.com) → New Project → import the repo.
3. Add the two vars from `.env.example` under Project Settings → Environment Variables.
4. Deploy — Vercel auto-detects Vite (`npm run build`, output `dist`).

**Netlify**
1. [netlify.com](https://netlify.com) → Add new site → Import from Git.
2. Build command `npm run build`, publish directory `dist`.
3. Add the same two env vars under Site settings → Environment variables.

**Cloudflare Pages**
1. Connect the repo, framework preset "Vite".
2. Build command `npm run build`, output directory `dist`, add the env vars.

Whichever you pick, the env vars must be set **before** the first deploy — Vite bakes them into
the build at build time, not at runtime.

## How the data flows

- Sign up / log in → Supabase Auth issues a session, held in `AuthProvider`.
- Submitting `/register` inserts one row into `registrations` tied to `auth.uid()`.
- `/dashboard` reads that row back, and lets you update or delete it in place.
- RLS policies mean this all works with the public anon key — there's no server code needed,
  and no user can ever read another student's data.

## Design notes

Palette and split-panel layout are original to this app (deep teal / mint / gold), themed
around the event itself — a stage, spotlight beams and a live-signal line — rather than reusing
any reference imagery.
