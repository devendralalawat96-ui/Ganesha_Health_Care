# Ganesha Home Health Care — Website

Next.js 15 + Prisma + Tailwind. Public marketing site plus admin-only billing tools.
Built to deploy on **Vercel** with **Neon Postgres**.

## Run locally

```bash
npm install
cp .env.example .env      # fill in the values
npx prisma generate
npm run dev               # http://localhost:3200
```

The public site works without a database. Only `/admin` and `/caregivers` need `DATABASE_URL`.

## What's built

**Public** — homepage, 15 service pages, nursing institute, about, why-choose-us, caregiver
profiles, cost calculator, booking (Google Form embed), testimonials, FAQs, 6 care-guide blog
posts, contact, 10 SEO landing pages, privacy/terms/disclaimer, sitemap.xml, robots.txt.

**Admin** (`/admin`, password-gated) — invoices with payment tracking and partial payments,
WhatsApp invoice sending, UPI payment links, print/PDF invoices, caregiver profile management,
monthly salary records.

**Deliberately out of scope** — careers, patient/nurse dashboards, full admin panel, lead
tracking, live tracking, AI chat, video reviews. See the scope decision from 2026-08-06.

## Deploying to Vercel

### 1. Database (Neon)

Create a project at [neon.tech](https://neon.tech), copy the **pooled** connection string, then:

```bash
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

### 2. Push to GitHub

```bash
git init && git add . && git commit -m "feat: initial site"
gh repo create ganesha-care --private --source=. --push
```

### 3. Import into Vercel

Import the repo at [vercel.com/new](https://vercel.com/new). Root directory: `app`.
Add every variable from `.env.example` under Settings → Environment Variables.

Generate the session secret with:

```bash
openssl rand -base64 32
```

After the first deploy, set `NEXT_PUBLIC_SITE_URL` to the real Vercel URL and redeploy — the
sitemap and canonical URLs read from it.

## Placeholders to replace before launch

| Where | What |
|---|---|
| `NEXT_PUBLIC_WHATSAPP` | **A mobile number.** The GBP number (079747 36011) looks like a landline; WhatsApp needs a mobile. |
| `NEXT_PUBLIC_EMAIL` | No business email is published anywhere yet. |
| `NEXT_PUBLIC_UPI_ID` | Owner's personal UPI ID for invoice payments. |
| `NEXT_PUBLIC_BOOKING_FORM_URL` | Google Form embed URL (Send → `< >` → copy `src`). |
| `NEXT_PUBLIC_GBP_REVIEW_URL` | Google review link from the Business Profile. |
| `NEXT_PUBLIC_MAPS_EMBED_URL` | Google Maps → Share → Embed a map. |
| `src/lib/site.ts` → `stats` | Years/patients/caregivers/cities are estimates — confirm with the owner. |
| `src/components/CostCalculator.tsx` → `careTypes` | **Rates are placeholders.** Must be confirmed before launch. |
| `src/app/institute/page.tsx` → `courses` | Confirm which courses actually run, plus durations and fees. |
| `src/app/testimonials/page.tsx` → `stories` | Written from typical cases — replace with real (permitted) client stories. |
| `public/` | No photos yet. Real caregiver/patient images would significantly help conversion. |

## Notes

- `sharp` reports a CVE via Next 15's bundled copy. It runs at build time only and is not
  reachable by visitors; fixing it requires a breaking upgrade to Next 16.
- Admin auth is a single signed-cookie session from `ADMIN_EMAIL`/`ADMIN_PASSWORD` — there is
  no user table in use. Fine for one owner; revisit if staff need their own logins.
- The root `[slug]` route serves SEO landing pages. Static routes take precedence, and unknown
  slugs 404 correctly — but check `src/lib/landing.ts` before adding a new top-level page.
