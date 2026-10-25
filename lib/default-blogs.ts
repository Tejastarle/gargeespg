import type { Blog } from "./types";

/** Starter articles shown until blogs are managed from the admin panel (also seeded in schema.sql). */
export const DEFAULT_BLOGS: Blog[] = [
  {
    id: "blog-1",
    title: "PG in Belapur: how to choose the right stay",
    slug: "pg-in-belapur-guide",
    excerpt:
      "Moving to Belapur for work, a course or between contracts? Here's what to check before you book a PG, hostel or dormitory in CBD Belapur.",
    cover_image: "/media/img/dorm-bunks-ac.jpg",
    tags: ["PG in Belapur", "Guides"],
    status: "published",
    author: "Team Gargee's",
    published_at: "2026-10-20T09:00:00.000Z",
    seo_title: "PG in Belapur — How to Choose the Right PG, Hostel or Dormitory",
    seo_description:
      "A practical guide to choosing a PG in Belapur, Navi Mumbai: AC, Wi-Fi, location, bedding and what to ask before you book.",
    created_at: "2026-10-20T09:00:00.000Z",
    content: `CBD Belapur is one of Navi Mumbai's busiest business districts, and every week people arrive here for a new job, a training course, an interview or the next ship. The first question is always the same: **where do I stay?**

## PG, hostel or dormitory?

- **A traditional PG** suits people who already know they're staying for months. Expect deposits and lock-in periods.
- **A hotel room** works for a night or two, but the cost adds up quickly.
- **An AC dormitory or hostel** sits in between: your own bed in a clean, shared, air-conditioned room, and you can stay a night, a week or a month.

## What to check before you book

1. **Is it air-conditioned — all night?** Belapur nights can be warm.
2. **Is Wi-Fi included?**
3. **Do you get fresh bedsheets and a blanket?**
4. **How often is it cleaned?**
5. **Can you check in late?** Trains and flights don't keep office hours.
6. **How far is the station?**

## Where Gargee's fits

Gargee's is a PG, AC dormitory and seamen hostel on the 4th floor of Bay View Tower, Sector 11, CBD Belapur — near the railway station. The AC runs 24 hours, Wi-Fi is free, every new guest gets fresh linen and the dorm is cleaned daily.

[Check availability](/contact) for your dates, or call +91 99673 93925.`,
  },
  {
    id: "blog-2",
    title: "A seafarer's guide to staying in CBD Belapur",
    slug: "seafarer-stay-cbd-belapur",
    excerpt:
      "Between contracts, on a course or about to sign on? Tips for sailors staying in CBD Belapur — from late arrivals to choosing a seamen hostel.",
    cover_image: "/media/img/dorm-bunk.jpg",
    tags: ["Seamen hostel", "Guides"],
    status: "published",
    author: "Team Gargee's",
    published_at: "2026-10-22T09:00:00.000Z",
    seo_title: "Seamen Hostel in CBD Belapur — A Seafarer's Guide to Staying",
    seo_description:
      "Tips for seafarers staying in CBD Belapur, Navi Mumbai: late check-in, what a good seamen hostel offers, and getting around.",
    created_at: "2026-10-22T09:00:00.000Z",
    content: `Sailors arrive in Navi Mumbai at all hours — off a flight, between contracts or ahead of a course. What you need is simple: a clean bed, a cool room and people who don't mind a 2 am check-in.

## What a good seamen hostel offers

- **24/7 check-in.** Your travel plans change; your bed should still be there.
- **Clean, fresh bedding** for every new guest.
- **Air-conditioning that runs all night.**
- **Wi-Fi** for calls home and paperwork.
- **A central location** close to the station.

## Arriving late

Save the exact address and the phone number before you travel, and share the landmark with your driver:

> Gargee's — 401, 4th Floor, Bay View Tower, Plot No. 7, opposite Domino's Pizza, Sector 11, CBD Belapur. Open 24/7.

## Getting around

From Sector 11 you're about **2 minutes from CBD Belapur railway station**, **3 minutes from the highway** and around **10 minutes from the airport** by road (approximate; depends on traffic).

Need a bed tonight? Call or WhatsApp **+91 99673 93925**, or [send an enquiry](/contact).`,
  },
  {
    id: "blog-3",
    title: "What to pack for an AC dormitory stay",
    slug: "what-to-pack-ac-dormitory",
    excerpt: "A short checklist for your first dormitory stay — what we provide, and the few things worth bringing yourself.",
    cover_image: "/media/img/capsule-bed.jpg",
    tags: ["AC dormitory", "Guides"],
    status: "published",
    author: "Team Gargee's",
    published_at: "2026-10-24T09:00:00.000Z",
    seo_title: "What to Pack for an AC Dormitory Stay — Checklist",
    seo_description: "First AC dormitory or hostel stay in Belapur? Here's what's provided and a short packing checklist.",
    created_at: "2026-10-24T09:00:00.000Z",
    content: `Dormitory stays are simple by design: a comfortable bed, clean linen and a cool, quiet room. You don't need to bring much — but a few small things help.

## What Gargee's provides

- A made-up bed with **fresh bedsheets, a pillow and a blanket**
- **24-hour air-conditioning**
- **Free Wi-Fi**
- A dorm that's **cleaned every day**

## What to bring

1. **Earplugs and an eye mask** if you're a light sleeper.
2. **A small lock** for your bag.
3. **A long charging cable.**
4. **Slippers and a toiletry kit.**
5. **A light layer** — the AC keeps things cool.

## A few dorm courtesies

- Use headphones for calls and videos after lights out.
- Keep your things on or under your bed so walkways stay clear.

Ready to book? [Check availability](/contact) and we'll get back to you shortly.`,
  },
];
