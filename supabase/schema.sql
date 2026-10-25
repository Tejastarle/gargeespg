-- ════════════════════════════════════════════════════════════════════════
--  Gargee's — Supabase schema, Row Level Security, storage and seed data
--  Run this whole file once in Supabase → SQL Editor → New query → Run.
--  It is safe to re-run: tables use IF NOT EXISTS and seeds use ON CONFLICT.
-- ════════════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ─── Helpers ────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ─── Admin users ────────────────────────────────────────────────────────
-- Only users listed here can use the admin panel. Create the user in
-- Authentication → Users, then:  insert into admin_users (user_id, email)
-- select id, email from auth.users where email = 'you@example.com';
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;
grant execute on function public.is_admin() to anon, authenticated;

-- ─── Leads ──────────────────────────────────────────────────────────────
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  full_name   text not null check (char_length(full_name) between 2 and 120),
  phone       text not null check (char_length(phone) between 7 and 20),
  email       text check (email is null or char_length(email) <= 160),
  check_in    date,
  check_out   date,
  guests      int check (guests is null or guests between 1 and 50),
  preference  text check (preference is null or char_length(preference) <= 80),
  message     text check (message is null or char_length(message) <= 2000),
  status      text not null default 'new' check (status in ('new','contacted','interested','booked','closed')),
  source      text,
  page        text,
  utm         jsonb,
  ip_hash     text,
  user_agent  text
);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_ip_recent_idx on public.leads (ip_hash, created_at desc);
drop trigger if exists leads_updated_at on public.leads;
create trigger leads_updated_at before update on public.leads
  for each row execute function public.set_updated_at();

create table if not exists public.admin_notes (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid not null references public.leads (id) on delete cascade,
  note       text not null check (char_length(note) between 1 and 4000),
  author     uuid default auth.uid(),
  created_at timestamptz not null default now()
);
create index if not exists admin_notes_lead_idx on public.admin_notes (lead_id, created_at desc);

-- ─── Content tables ─────────────────────────────────────────────────────
create table if not exists public.rooms (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text unique not null,
  description text not null default '',
  price_label text,
  features    text[] not null default '{}',
  image_url   text not null default '',
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.amenities (
  id          uuid primary key default gen_random_uuid(),
  title       text not null unique,
  description text not null default '',
  icon        text not null default 'sparkles',
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.gallery (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  category    text not null default 'Rooms',
  image_url   text not null unique,
  alt         text,
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.faqs (
  id          uuid primary key default gen_random_uuid(),
  question    text not null unique,
  answer      text not null,
  page        text not null default 'home',
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text,
  quote       text not null,
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.location_points (
  id          uuid primary key default gen_random_uuid(),
  label       text not null unique,
  minutes     int not null default 5,
  description text,
  icon        text not null default 'map-pin',
  map_x       real not null default 0.5,
  map_y       real not null default 0.5,
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.availability (
  id          uuid primary key default gen_random_uuid(),
  label       text not null unique,
  available   int not null default 0,
  total       int,
  note        text,
  is_public   boolean not null default false,
  sort_order  int not null default 0,
  updated_at  timestamptz not null default now()
);
drop trigger if exists availability_updated_at on public.availability;
create trigger availability_updated_at before update on public.availability
  for each row execute function public.set_updated_at();

create table if not exists public.seo_pages (
  id          uuid primary key default gen_random_uuid(),
  path        text not null unique,
  title       text not null,
  description text not null,
  keywords    text,
  og_image    text,
  updated_at  timestamptz not null default now()
);
drop trigger if exists seo_pages_updated_at on public.seo_pages;
create trigger seo_pages_updated_at before update on public.seo_pages
  for each row execute function public.set_updated_at();

create table if not exists public.settings (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
drop trigger if exists settings_updated_at on public.settings;
create trigger settings_updated_at before update on public.settings
  for each row execute function public.set_updated_at();

create table if not exists public.blogs (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  slug            text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  excerpt         text not null default '',
  content         text not null default '',
  cover_image     text,
  tags            text[] not null default '{}',
  status          text not null default 'draft' check (status in ('draft','published')),
  author          text,
  published_at    timestamptz,
  seo_title       text,
  seo_description text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists blogs_status_published_idx on public.blogs (status, published_at desc);
drop trigger if exists blogs_updated_at on public.blogs;
create trigger blogs_updated_at before update on public.blogs
  for each row execute function public.set_updated_at();

-- ════════════════════════════════════════════════════════════════════════
--  Row Level Security
-- ════════════════════════════════════════════════════════════════════════
alter table public.admin_users      enable row level security;
alter table public.leads            enable row level security;
alter table public.admin_notes      enable row level security;
alter table public.rooms            enable row level security;
alter table public.amenities        enable row level security;
alter table public.gallery          enable row level security;
alter table public.faqs             enable row level security;
alter table public.testimonials     enable row level security;
alter table public.location_points  enable row level security;
alter table public.availability     enable row level security;
alter table public.seo_pages        enable row level security;
alter table public.settings         enable row level security;
alter table public.blogs            enable row level security;

-- admin_users: admins can see the list; nobody can write from the client.
drop policy if exists "admins read admin_users" on public.admin_users;
create policy "admins read admin_users" on public.admin_users for select using (public.is_admin());

-- leads: NO public access. Enquiries are inserted by the server (/api/leads)
-- with the service-role key after validation + rate limiting.
drop policy if exists "admins manage leads" on public.leads;
create policy "admins manage leads" on public.leads for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins manage notes" on public.admin_notes;
create policy "admins manage notes" on public.admin_notes for all using (public.is_admin()) with check (public.is_admin());

-- Public content: anyone can read active rows; only admins can write.
do $$
declare t text;
begin
  foreach t in array array['rooms','amenities','gallery','faqs','testimonials','location_points'] loop
    execute format('drop policy if exists "public read active %1$s" on public.%1$I', t);
    execute format('create policy "public read active %1$s" on public.%1$I for select using (is_active or public.is_admin())', t);
    execute format('drop policy if exists "admins write %1$s" on public.%1$I', t);
    execute format('create policy "admins write %1$s" on public.%1$I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

drop policy if exists "public read availability" on public.availability;
create policy "public read availability" on public.availability for select using (is_public or public.is_admin());
drop policy if exists "admins write availability" on public.availability;
create policy "admins write availability" on public.availability for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read seo_pages" on public.seo_pages;
create policy "public read seo_pages" on public.seo_pages for select using (true);
drop policy if exists "admins write seo_pages" on public.seo_pages;
create policy "admins write seo_pages" on public.seo_pages for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read settings" on public.settings;
create policy "public read settings" on public.settings for select using (true);
drop policy if exists "admins write settings" on public.settings;
create policy "admins write settings" on public.settings for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read published blogs" on public.blogs;
create policy "public read published blogs" on public.blogs for select using (status = 'published' or public.is_admin());
drop policy if exists "admins write blogs" on public.blogs;
create policy "admins write blogs" on public.blogs for all using (public.is_admin()) with check (public.is_admin());

-- ════════════════════════════════════════════════════════════════════════
--  Storage — public "media" bucket for gallery images and blog covers
-- ════════════════════════════════════════════════════════════════════════
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 52428800,
        array['image/jpeg','image/png','image/webp','image/avif','image/gif','video/mp4','video/webm','application/pdf'])
on conflict (id) do update set public = true;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects for select using (bucket_id = 'media');
drop policy if exists "admins upload media" on storage.objects;
create policy "admins upload media" on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
drop policy if exists "admins update media" on storage.objects;
create policy "admins update media" on storage.objects for update using (bucket_id = 'media' and public.is_admin());
drop policy if exists "admins delete media" on storage.objects;
create policy "admins delete media" on storage.objects for delete using (bucket_id = 'media' and public.is_admin());

-- ════════════════════════════════════════════════════════════════════════
--  Seed content (matches lib/defaults.ts — edit everything later in /admin)
-- ════════════════════════════════════════════════════════════════════════
insert into public.settings (key, value) values ('site', '{
  "business_name": "Gargee''s Seamen Hostel & AC Dormitory",
  "brand": "Gargee''s",
  "tagline": "Seamen hostel · AC dormitory · PG in CBD Belapur",
  "phone_mobile": "9967393925",
  "phone_office_1": "",
  "phone_office_2": "",
  "phone_landline": "",
  "contact_person": "",
  "contact_person_phone": "",
  "whatsapp": "919967393925",
  "whatsapp_message": "Hi Gargee''s, I''d like to check availability for a bed.",
  "email": "",
  "address_line_1": "401, 4th Floor, Bay View Tower, Plot No. 7",
  "address_line_2": "Opp. Domino''s Pizza, Sector 11",
  "landmarks": "Near CBD Belapur railway station",
  "locality": "CBD Belapur",
  "city": "Navi Mumbai",
  "region": "Maharashtra",
  "postal_code": "400614",
  "country": "IN",
  "latitude": 19.019623,
  "longitude": 73.0371694,
  "google_place_id": "ChIJvx8QVhHD5zsRm75T5-D6P5E",
  "map_query": "Gargees seamen hostel AC Dormitory, Bay View Tower, Sector 11, CBD Belapur, Navi Mumbai",
  "maps_url": "https://www.google.com/maps/search/?api=1&query=Gargees+seamen+hostel+AC+Dormitory&query_place_id=ChIJvx8QVhHD5zsRm75T5-D6P5E",
  "hours_label": "Open 24 hours, 7 days a week"
}'::jsonb)
on conflict (key) do update set value = public.settings.value || excluded.value;

insert into public.settings (key, value) values ('content', '{}'::jsonb), ('seo', '{}'::jsonb) on conflict (key) do nothing;

insert into public.rooms (title, slug, description, price_label, features, image_url, sort_order, is_active) values
  ('AC dormitory bed', 'ac-dormitory-bed', 'A made-up bed in the air-conditioned dorm with fresh white bedsheets, a pillow and a blanket. Ideal for a night or a short trip to Belapur.', 'Nightly stays', array['24-hour AC','Fresh bedsheets & blanket','Privacy curtain','Free Wi-Fi']::text[], '/media/img/capsule-berth-wide.jpg', 1, true),
  ('Seamen hostel stay', 'seamen-hostel-stay', 'Between contracts, on a course or waiting to sign on? A clean, cool bed close to the station, with staff who understand a sailor''s schedule.', 'Weekly stays', array['Seafarer-friendly','Open 24/7','Daily cleaning','Near Belapur station']::text[], '/media/img/dorm-bunks-ac.jpg', 2, true),
  ('PG monthly stay', 'pg-monthly-stay', 'Studying or working in CBD Belapur? Make Gargee''s your PG for the month — in Sector 11, a short walk from the station and the business district.', 'Monthly stays', array['For students & professionals','AC & Wi-Fi included','Flexible move-in','Secure building']::text[], '/media/img/dorm-bunk.jpg', 3, true)
on conflict (slug) do update set title = excluded.title, description = excluded.description, price_label = excluded.price_label, features = excluded.features, image_url = excluded.image_url, sort_order = excluded.sort_order, is_active = excluded.is_active;

insert into public.amenities (title, description, icon, sort_order, is_active) values
  ('24-hour AC', 'Air-conditioned day and night, so you always sleep cool.', 'snowflake', 1, true),
  ('Free Wi-Fi', 'Wi-Fi round the clock for calls home, streaming and work.', 'wifi', 2, true),
  ('Fresh linen for every guest', 'New bedsheets and a clean blanket for every new guest.', 'bed', 3, true),
  ('Daily cleaning', 'The dorm is cleaned every day and kept tidy.', 'spray', 4, true),
  ('Open 24/7', 'Check in after a late train or an early flight.', 'clock', 5, true),
  ('Near Belapur station', 'Bay View Tower, Sector 11 — a short walk from the station.', 'train', 6, true),
  ('Seafarer-friendly', 'A favourite with sailors between contracts and on courses.', 'anchor', 7, true),
  ('Friendly staff', 'Helpful people on hand whenever you need something.', 'users', 8, true)
on conflict (title) do update set description = excluded.description, icon = excluded.icon, sort_order = excluded.sort_order, is_active = excluded.is_active;

insert into public.gallery (title, category, image_url, alt, sort_order, is_active) values
  ('AC dormitory', 'Dormitory', '/media/img/dorm-bunks-ac.jpg', 'Bunk beds with curtains under an air conditioner in the AC dormitory', 1, true),
  ('Made-up bed', 'Beds', '/media/img/capsule-berth-wide.jpg', 'Bed with white bedsheets, a folded blanket and an AC remote', 2, true),
  ('Bunk with curtain', 'Dormitory', '/media/img/dorm-bunk.jpg', 'Upper and lower bunks with privacy curtains and fresh linen', 3, true),
  ('Lower bed', 'Beds', '/media/img/capsule-bed.jpg', 'Lower bed with pillow, blanket and tie-back curtain', 4, true),
  ('Dorm aisle', 'Rooms', '/media/img/dorm-aisle.jpg', 'Aisle between rows of bunk beds in the dormitory', 5, true),
  ('Bed light & socket', 'Beds', '/media/img/lower-berth-light.jpg', 'Lower bed with a reading light and a power socket', 6, true),
  ('Upper bed ladder', 'Rooms', '/media/img/room-walk-2.jpg', 'Steel ladder up to an upper bed', 7, true),
  ('Curtained bunk', 'Dormitory', '/media/img/room-walk-3.jpg', 'Bunk bed with a tie-back curtain', 8, true)
on conflict (image_url) do update set title = excluded.title, category = excluded.category, alt = excluded.alt, sort_order = excluded.sort_order, is_active = excluded.is_active;

insert into public.faqs (question, answer, page, sort_order, is_active) values
  ('What is Gargee''s?', 'Gargee''s is a seamen hostel, AC dormitory and PG at Bay View Tower, Sector 11, CBD Belapur, Navi Mumbai. You get a clean bed with fresh bedsheets and a blanket, 24-hour AC, free Wi-Fi and daily cleaning.', 'home', 1, true),
  ('Where is Gargee''s located?', '401, 4th Floor, Bay View Tower, Plot No. 7, opposite Domino''s Pizza, Sector 11, CBD Belapur, Navi Mumbai 400614 — near CBD Belapur railway station.', 'home', 2, true),
  ('Is Gargee''s a PG or a hostel?', 'Both. Stay a night like a hostel, a week while you''re between ships or on a course, or a month as your PG in Belapur.', 'home', 3, true),
  ('Is the dormitory air-conditioned?', 'Yes. The dormitory has AC running 24 hours a day.', 'home', 4, true),
  ('Is Wi-Fi available?', 'Yes, free Wi-Fi is available for all guests.', 'home', 5, true),
  ('Do you give fresh bedsheets?', 'Yes. Every new guest gets fresh bedsheets and a clean blanket, and the dorm is cleaned daily.', 'home', 6, true),
  ('Do you take seafarers and sailors?', 'Yes. Gargee''s is a seamen hostel and is popular with sailors between contracts, on courses or waiting to sign on.', 'home', 7, true),
  ('Can students and working professionals stay?', 'Yes. Students, interns and working professionals stay with us for weeks or months as a PG.', 'home', 8, true),
  ('Is Gargee''s open 24/7?', 'Yes. We''re open 24 hours a day, 7 days a week, so you can check in after a late train or flight.', 'home', 9, true),
  ('How far is Gargee''s from Belapur railway station?', 'About 2 minutes away. Travel times are approximate and depend on traffic.', 'home', 10, true),
  ('How far is it from the airport?', 'About 10 minutes by road to the Navi Mumbai airport. Travel times are approximate and depend on traffic.', 'home', 11, true),
  ('How can I book or check availability?', 'Use the Check availability form on this site, or call or WhatsApp +91 99673 93925. We''ll confirm a bed for your dates.', 'home', 12, true)
on conflict (question) do update set answer = excluded.answer, page = excluded.page, sort_order = excluded.sort_order, is_active = excluded.is_active;

insert into public.location_points (label, minutes, description, icon, map_x, map_y, sort_order, is_active) values
  ('Railway Station', 2, 'CBD Belapur station', 'train', 0.42, 0.32, 1, true),
  ('Highway', 3, 'Quick highway access', 'route', -0.18, 0.78, 2, true),
  ('Airport', 10, 'Navi Mumbai International Airport', 'plane', 0.78, -0.72, 3, true)
on conflict (label) do update set minutes = excluded.minutes, description = excluded.description, icon = excluded.icon, map_x = excluded.map_x, map_y = excluded.map_y, sort_order = excluded.sort_order, is_active = excluded.is_active;

insert into public.availability (label, available, note, is_public, sort_order) values
  ('Dormitory beds', 0, 'Call to confirm for tonight', false, 1)
on conflict (label) do nothing;

-- Starter blog posts (edit or unpublish them from /admin/blogs)
insert into public.blogs (title, slug, excerpt, content, cover_image, tags, status, author, published_at, seo_title, seo_description) values
  ('PG in Belapur: how to choose the right stay', 'pg-in-belapur-guide', 'Moving to Belapur for work, a course or between contracts? Here''s what to check before you book a PG, hostel or dormitory in CBD Belapur.', 'CBD Belapur is one of Navi Mumbai''s busiest business districts, and every week people arrive here for a new job, a training course, an interview or the next ship. The first question is always the same: **where do I stay?**

## PG, hostel or dormitory?

- **A traditional PG** suits people who already know they''re staying for months. Expect deposits and lock-in periods.
- **A hotel room** works for a night or two, but the cost adds up quickly.
- **An AC dormitory or hostel** sits in between: your own bed in a clean, shared, air-conditioned room, and you can stay a night, a week or a month.

## What to check before you book

1. **Is it air-conditioned — all night?** Belapur nights can be warm.
2. **Is Wi-Fi included?**
3. **Do you get fresh bedsheets and a blanket?**
4. **How often is it cleaned?**
5. **Can you check in late?** Trains and flights don''t keep office hours.
6. **How far is the station?**

## Where Gargee''s fits

Gargee''s is a PG, AC dormitory and seamen hostel on the 4th floor of Bay View Tower, Sector 11, CBD Belapur — near the railway station. The AC runs 24 hours, Wi-Fi is free, every new guest gets fresh linen and the dorm is cleaned daily.

[Check availability](/contact) for your dates, or call +91 99673 93925.', '/media/img/dorm-bunks-ac.jpg', array['PG in Belapur','Guides']::text[], 'published', 'Team Gargee''s', '2026-10-20T09:00:00.000Z', 'PG in Belapur — How to Choose the Right PG, Hostel or Dormitory', 'A practical guide to choosing a PG in Belapur, Navi Mumbai: AC, Wi-Fi, location, bedding and what to ask before you book.'),
  ('A seafarer''s guide to staying in CBD Belapur', 'seafarer-stay-cbd-belapur', 'Between contracts, on a course or about to sign on? Tips for sailors staying in CBD Belapur — from late arrivals to choosing a seamen hostel.', 'Sailors arrive in Navi Mumbai at all hours — off a flight, between contracts or ahead of a course. What you need is simple: a clean bed, a cool room and people who don''t mind a 2 am check-in.

## What a good seamen hostel offers

- **24/7 check-in.** Your travel plans change; your bed should still be there.
- **Clean, fresh bedding** for every new guest.
- **Air-conditioning that runs all night.**
- **Wi-Fi** for calls home and paperwork.
- **A central location** close to the station.

## Arriving late

Save the exact address and the phone number before you travel, and share the landmark with your driver:

> Gargee''s — 401, 4th Floor, Bay View Tower, Plot No. 7, opposite Domino''s Pizza, Sector 11, CBD Belapur. Open 24/7.

## Getting around

From Sector 11 you''re about **2 minutes from CBD Belapur railway station**, **3 minutes from the highway** and around **10 minutes from the airport** by road (approximate; depends on traffic).

Need a bed tonight? Call or WhatsApp **+91 99673 93925**, or [send an enquiry](/contact).', '/media/img/dorm-bunk.jpg', array['Seamen hostel','Guides']::text[], 'published', 'Team Gargee''s', '2026-10-22T09:00:00.000Z', 'Seamen Hostel in CBD Belapur — A Seafarer''s Guide to Staying', 'Tips for seafarers staying in CBD Belapur, Navi Mumbai: late check-in, what a good seamen hostel offers, and getting around.'),
  ('What to pack for an AC dormitory stay', 'what-to-pack-ac-dormitory', 'A short checklist for your first dormitory stay — what we provide, and the few things worth bringing yourself.', 'Dormitory stays are simple by design: a comfortable bed, clean linen and a cool, quiet room. You don''t need to bring much — but a few small things help.

## What Gargee''s provides

- A made-up bed with **fresh bedsheets, a pillow and a blanket**
- **24-hour air-conditioning**
- **Free Wi-Fi**
- A dorm that''s **cleaned every day**

## What to bring

1. **Earplugs and an eye mask** if you''re a light sleeper.
2. **A small lock** for your bag.
3. **A long charging cable.**
4. **Slippers and a toiletry kit.**
5. **A light layer** — the AC keeps things cool.

## A few dorm courtesies

- Use headphones for calls and videos after lights out.
- Keep your things on or under your bed so walkways stay clear.

Ready to book? [Check availability](/contact) and we''ll get back to you shortly.', '/media/img/capsule-bed.jpg', array['AC dormitory','Guides']::text[], 'published', 'Team Gargee''s', '2026-10-24T09:00:00.000Z', 'What to Pack for an AC Dormitory Stay — Checklist', 'First AC dormitory or hostel stay in Belapur? Here''s what''s provided and a short packing checklist.')
on conflict (slug) do nothing;


-- ════════════════════════════════════════════════════════════════════════
--  ADMIN LOGIN  —  password only:  admin@2026
--  Run in Supabase → SQL Editor. Creates the admin account (or resets its
--  password) and gives it admin access. Safe to run as often as you like.
--
--  The login page only asks for the password. Behind the scenes Supabase
--  needs an email, so the account uses the fixed address below. It must
--  match NEXT_PUBLIC_ADMIN_EMAIL in your environment (default admin@gargeespg.com).
--  To change the password later: edit v_password below and run this again,
--  or use Admin → Settings → Change password.
-- ════════════════════════════════════════════════════════════════════════
do $$
declare
  v_email    text := 'admin@gargeespg.com';
  v_password text := 'admin@2026';
  v_uid      uuid;
begin
  perform set_config('search_path', 'public, extensions, auth', true);
  select id into v_uid from auth.users where lower(email) = lower(v_email) limit 1;

  if v_uid is null then
    v_uid := gen_random_uuid();
    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
      confirmation_token, email_change, email_change_token_new, recovery_token
    ) values (
      '00000000-0000-0000-0000-000000000000', v_uid, 'authenticated', 'authenticated', v_email,
      crypt(v_password, gen_salt('bf')), now(),
      '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now(),
      '', '', '', ''
    );
    insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    values (
      gen_random_uuid(), v_uid, v_uid::text,
      jsonb_build_object('sub', v_uid::text, 'email', v_email, 'email_verified', true),
      'email', now(), now(), now()
    );
  else
    update auth.users
       set encrypted_password = crypt(v_password, gen_salt('bf')),
           email_confirmed_at = coalesce(email_confirmed_at, now()),
           banned_until = null,
           updated_at = now()
     where id = v_uid;
  end if;

  insert into public.admin_users (user_id, email) values (v_uid, v_email)
  on conflict (user_id) do nothing;
end $$;
