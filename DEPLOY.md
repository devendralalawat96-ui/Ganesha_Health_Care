# Deploying to Vercel + Neon

Follow these in order. Steps marked **[you]** need your accounts; the rest I can run.

---

## 1. Create the Neon database **[you]**

1. Go to <https://neon.tech> and sign up (GitHub login is fine — free tier, no card).
2. **Create a project**: name it `ganesha`, region **AWS ap-southeast-1 (Singapore)** — closest to Indore.
3. On the project dashboard, find **Connection string** and select the **Pooled connection** tab.
4. Copy the string. It looks like:

   ```
   postgresql://neondb_owner:XXXX@ep-something-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```

   It must contain **`-pooler`**. The non-pooled string exhausts connections on serverless.

> Send me that string and I'll do steps 2 and 3 for you.

---

## 2. Local `.env`

```bash
cd app
cp .env.example .env
```

Then set:

| Variable | Value |
|---|---|
| `DATABASE_URL` | the pooled Neon string from step 1 |
| `SESSION_SECRET` | `openssl rand -base64 32` |
| `ADMIN_EMAIL` | the owner's login email |
| `ADMIN_PASSWORD` | a strong password (this *is* the admin login — there is no user table check) |

---

## 3. Create the tables

```bash
npm run db:deploy   # applies prisma/migrations
npm run db:seed     # two example caregivers, safe to skip
```

Verify with `npm run db:studio`.

---

## 4. Put the app in its own GitHub repo **[you]**

The app currently sits inside the `My_Project` workspace repo, which contains unrelated
projects. Vercel needs a repo containing **only** this app.

```bash
cd app
git init
git add .
git commit -m "feat: Ganesha Home Health Care website"
```

Then create an empty **private** repo on GitHub and:

```bash
git remote add origin git@github.com:<you>/ganesha-care.git
git branch -M main
git push -u origin main
```

Confirm `.env` is **not** in the push — `.gitignore` already excludes it.

---

## 5. Deploy on Vercel **[you]**

1. <https://vercel.com> → **Add New → Project** → import the repo.
2. **Root Directory**: leave as `/` if you pushed the `app` folder itself.
3. Framework preset: **Next.js** (auto-detected). Don't override the build command —
   `package.json` already runs `prisma generate && next build`.
4. Under **Environment Variables**, add every row from your `.env`:

   - `DATABASE_URL` (pooled Neon string)
   - `SESSION_SECRET`
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`
   - all `NEXT_PUBLIC_*` values
   - set `NEXT_PUBLIC_SITE_URL` to the real domain once you have one

5. **Deploy**.

---

## 6. After the first deploy

- Visit `/admin/login` and confirm you can sign in.
- Check `/sitemap.xml` and `/robots.txt` resolve on the live domain.
- Point the custom domain (Vercel → Settings → Domains) and update
  `NEXT_PUBLIC_SITE_URL`, then redeploy so metadata and sitemap use it.

---

## Before going live — content blockers

These are still placeholder or unverified. Fix before announcing the site:

| Item | Where | Problem |
|---|---|---|
| `patientsServed: 2500` | `src/lib/site.ts` | **Invented number**, shown on the homepage |
| `caregivers: 120` | `src/lib/site.ts` | **Invented number**, shown on the homepage |
| `yearsExperience` | `src/lib/site.ts` | Sources conflict: Sulekha says est. 2022, JustDial says 6 and 8 |
| Rating 4.7★/33 | `src/lib/site.ts` | JustDial shows 4.4★/80 — confirm the real Google figure |
| Pricing | `src/lib/pricing.ts` | Placeholder rates; also feeds the cost calculator |
| `NEXT_PUBLIC_UPI_ID` | env | `owner@upi` — needs the real UPI ID |
| Booking form | env | `NEXT_PUBLIC_BOOKING_FORM_URL` needs a real Google Form |
| Testimonials | `src/app/testimonials/page.tsx` | Only the first is real; the rest are written placeholders |
| Photos | `public/img/` | Unsplash stock, not real staff or patients |

## Notes

- **Admin auth** compares directly against `ADMIN_EMAIL` / `ADMIN_PASSWORD`. The
  `AdminUser` table exists but is unused, so changing the password means changing the
  env var and redeploying.
- **Neon free tier** suspends the database after ~5 minutes idle. The first request
  after that takes a few seconds to wake it. Normal, and fine for this traffic level.
