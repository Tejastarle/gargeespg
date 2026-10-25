# Gargee's — Seamen Hostel, AC Dormitory & PG in CBD Belapur

Website and admin panel for **Gargee's Seamen Hostel & AC Dormitory**, 401, 4th Floor, Bay View Tower, Plot No. 7, Opp. Domino's Pizza, Sector 11, CBD Belapur, Navi Mumbai 400614 · **+91 99673 93925**.

**Stack:** Next.js 16 (Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Three.js / React Three Fiber · GSAP · Framer Motion · Lenis · Supabase (Postgres, Auth, Storage, RLS)

---

## 1. Run it locally

Requires **Node.js 20.9+**.

```powershell
npm install
Copy-Item .env.example .env.local     # then fill in your Supabase keys
npm run dev                            # http://localhost:3000   ·   admin: /admin
```

Without Supabase keys the site runs on the built-in content in `lib/defaults.ts`. Set `NEXT_PUBLIC_DEMO_MODE=true` to click around the admin panel with sample data (nothing is saved).

## 2. Connect Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. **SQL Editor → New query →** paste all of `supabase/schema.sql` → **Run**. It creates the tables, security rules, the `media` storage bucket, Gargee's content **and the admin login**. Safe to re-run.
3. **Authentication → Providers → Email:** turn off **Allow new users to sign up**.
4. Copy your keys into `.env.local` (and into Vercel → Settings → Environment Variables):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your domain, e.g. `https://www.gargeespg.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable / anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret / service-role key — **server only**, stores enquiries |
| `LEAD_IP_SALT` | Any long random text |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Hidden admin account (default `admin@gargeespg.com`) |
| `LEAD_NOTIFY_WEBHOOK_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional |

After changing `NEXT_PUBLIC_…` values on Vercel, **redeploy**.

## 3. Admin panel — `/admin`

- **Login:** password only — **`admin@2026`**. Behind the scenes it signs in to the hidden account `admin@gargeespg.com`.
- **Change the password:** Admin → Settings, or edit `v_password` in `supabase/create-admin.sql` and run it in the SQL Editor (also use this if you forget it).
- **Leads** opens first after login: search, filter, status (New → Contacted → Interested → Booked → Closed), notes, one-tap Call / WhatsApp / Email, CSV export. It checks for new enquiries every 30 seconds and shows a red count on the Leads menu item.
- Also: dashboard, bookings, blogs, rooms, gallery, amenities, FAQs, testimonials, travel times, availability, website text, contact info and SEO.

## 4. SEO

- Home page plus six landing pages targeting Belapur searches: `/pg-in-belapur`, `/pg-in-cbd-belapur`, `/seamen-hostel-belapur`, `/ac-dormitory-belapur`, `/pg-near-belapur-station`, `/student-hostel-belapur` — each with unique copy, FAQs, metadata, canonical URL and Open Graph image.
- Structured data: `LodgingBusiness` + `Hostel` (address, geo, phone, 24/7 hours, amenities), `FAQPage`, `BreadcrumbList`, `BlogPosting`.
- `sitemap.xml`, `robots.txt` (blocks `/admin`, `/api`, `/thank-you`), web manifest, icons, a blog with three starter guides.
- After going live: add the site in Google Search Console, submit `/sitemap.xml`, and add the website link to the Google Business Profile.

## 5. Media

Bed and dormitory photos are in `public/media/img`. Replace or add photos any time in **Admin → Gallery** and **Admin → Rooms**. There are no videos or social-media embeds on this site.

## 6. 3D & animation

Hero light particles, a 3D map of CBD Belapur with animated routes, a scroll-driven 3D bed with tap-able hotspots, and a night-water particle scene at the end — plus smooth scrolling, text reveals and parallax. Phones get lighter versions automatically.

## Project structure

```
app/(site)/        home, [landing] SEO pages, contact, thank-you, blog
app/admin/         login + panel (leads, bookings, blogs, content)
app/api/leads/     validated, rate-limited enquiry endpoint
components/site/   page sections, navbar, footer, enquiry form
components/three/  3D scenes (React Three Fiber)
components/admin/  admin UI
lib/               content, defaults, Supabase clients, SEO schema
supabase/          schema.sql (everything) · create-admin.sql (reset login)
```
