/** Local-SEO landing pages, one per search intent. Titles/descriptions can be overridden per path in Admin → SEO. */

export interface LandingPage {
  slug: string;
  navLabel: string;
  title: string;
  description: string;
  keywords: string;
  h1: [string, string];
  intro: string;
  image: string;
  highlights: { title: string; text: string }[];
  sections: { heading: string; body: string[] }[];
  faqs: { q: string; a: string }[];
  related: string[];
}

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "pg-in-belapur",
    navLabel: "PG in Belapur",
    title: "PG in Belapur, Navi Mumbai — AC Beds, Wi-Fi, Open 24/7",
    description:
      "Looking for a PG in Belapur? Gargee's has AC beds with free Wi-Fi, fresh linen and daily cleaning at Bay View Tower, Sector 11, CBD Belapur. Nightly, weekly and monthly stays.",
    keywords: "PG in Belapur, PG Belapur Navi Mumbai, best PG in Belapur, AC PG in Belapur, paying guest Belapur",
    h1: ["PG in Belapur", "that feels easy."],
    intro:
      "Gargee's is a PG, AC dormitory and seamen hostel at Bay View Tower in Sector 11, CBD Belapur. You get a clean, air-conditioned bed with fresh bedsheets, free Wi-Fi and staff on hand around the clock.",
    image: "/media/img/dorm-bunks-ac.jpg",
    highlights: [
      { title: "24-hour AC", text: "Cool nights, every night." },
      { title: "Free Wi-Fi", text: "Stay connected for work and calls home." },
      { title: "Fresh linen", text: "New bedsheets and a clean blanket for every guest." },
      { title: "Flexible stays", text: "A night, a week or a month." },
    ],
    sections: [
      {
        heading: "A PG in Belapur without the hassle",
        body: [
          "Most people looking for a PG in Belapur want the same few things: a clean bed, a cool room, reliable Wi-Fi and a short walk to the station. Gargee's is built around exactly that.",
          "There's no long lock-in. Start with a few nights, see how you like it, then stay on weekly or monthly.",
        ],
      },
      {
        heading: "Who stays at Gargee's",
        body: [
          "Seafarers between contracts or on courses, students and interns, and working professionals posted to CBD Belapur. The mix keeps it friendly, and daily cleaning keeps it tidy.",
        ],
      },
      {
        heading: "Where we are",
        body: [
          "401, 4th Floor, Bay View Tower, Plot No. 7, opposite Domino's Pizza, Sector 11, CBD Belapur — near the railway station and the business district.",
        ],
      },
    ],
    faqs: [
      { q: "Is Gargee's a PG or a hostel?", a: "Both. Stay a night like a hostel, or a week or month as your PG in Belapur." },
      { q: "Is the PG air-conditioned?", a: "Yes. The dormitory has 24-hour AC." },
      { q: "How do I check availability?", a: "Call or WhatsApp +91 99673 93925, or send an enquiry from this page." },
    ],
    related: ["pg-in-cbd-belapur", "seamen-hostel-belapur", "pg-near-belapur-station"],
  },
  {
    slug: "pg-in-cbd-belapur",
    navLabel: "PG in CBD Belapur",
    title: "PG in CBD Belapur — AC Dormitory in Sector 11, Bay View Tower",
    description:
      "AC PG in CBD Belapur, Sector 11. Clean beds with fresh linen, free Wi-Fi, daily cleaning and 24/7 check-in at Gargee's, Bay View Tower. Call +91 99673 93925.",
    keywords: "PG in CBD Belapur, CBD Belapur PG, PG Sector 11 CBD Belapur, AC PG CBD Belapur, paying guest CBD Belapur",
    h1: ["PG in CBD Belapur,", "Sector 11."],
    intro:
      "Right in the business district: Gargee's is on the 4th floor of Bay View Tower, Sector 11, CBD Belapur. Air-conditioned beds, free Wi-Fi and fresh linen, with nightly to monthly stays.",
    image: "/media/img/capsule-berth-wide.jpg",
    highlights: [
      { title: "Sector 11", text: "Bay View Tower, opposite Domino's Pizza." },
      { title: "Walk to work", text: "Close to CBD Belapur's offices." },
      { title: "AC & Wi-Fi", text: "Included with every stay." },
      { title: "24/7 check-in", text: "Arrive whenever you land." },
    ],
    sections: [
      {
        heading: "Live where you work",
        body: [
          "CBD Belapur is one of Navi Mumbai's busiest business districts. Staying in Sector 11 means shorter commutes, fewer autos and more time to rest.",
        ],
      },
      {
        heading: "What you get",
        body: [
          "A made-up bed with fresh bedsheets and a blanket, a privacy curtain, 24-hour AC, free Wi-Fi and a dorm that's cleaned every day. Staff are around the clock if you need anything.",
        ],
      },
    ],
    faqs: [
      { q: "Where exactly is Gargee's in CBD Belapur?", a: "401, 4th Floor, Bay View Tower, Plot No. 7, opposite Domino's Pizza, Sector 11, CBD Belapur, Navi Mumbai 400614." },
      { q: "Can I stay monthly?", a: "Yes. Monthly PG stays are available — send an enquiry with your move-in date." },
    ],
    related: ["pg-in-belapur", "ac-dormitory-belapur", "student-hostel-belapur"],
  },
  {
    slug: "seamen-hostel-belapur",
    navLabel: "Seamen hostel Belapur",
    title: "Seamen Hostel in CBD Belapur — AC Dormitory for Sailors",
    description:
      "Seamen hostel in CBD Belapur, Navi Mumbai. Clean AC beds for sailors between contracts, on courses or waiting to sign on. Fresh linen, Wi-Fi, open 24/7 at Gargee's.",
    keywords: "seamen hostel Belapur, seamen hostel Navi Mumbai, sailor hostel CBD Belapur, seafarer hostel Belapur, seaman hostel Navi Mumbai",
    h1: ["A seamen hostel", "that runs ship-shape."],
    intro:
      "Between contracts, on a course or waiting to sign on? Gargee's Seamen Hostel gives seafarers a clean, cool bed in CBD Belapur — with staff who understand odd hours and short notice.",
    image: "/media/img/dorm-bunk.jpg",
    highlights: [
      { title: "Seafarer-friendly", text: "Built around a sailor's schedule." },
      { title: "24/7 check-in", text: "Arrive at any hour." },
      { title: "Fresh linen", text: "New bedsheets and blanket for every guest." },
      { title: "24-hour AC & Wi-Fi", text: "Rest well, call home." },
    ],
    sections: [
      {
        heading: "A clean, cool place between voyages",
        body: [
          "Sailors want a stay that's clean, simple and reliable. At Gargee's, the dorm is cleaned daily, every new guest gets fresh bedsheets, and the AC runs day and night.",
        ],
      },
      {
        heading: "Stay as long as you need",
        body: [
          "A couple of nights before joining, a few weeks on a course, or longer while you wait for your next contract — stay nightly, weekly or monthly.",
        ],
      },
    ],
    faqs: [
      { q: "Do you accept seafarers on short notice?", a: "Yes. We're open 24/7. Call or WhatsApp +91 99673 93925 to check a bed for tonight." },
      { q: "Can I stay for a few weeks?", a: "Yes. Weekly and monthly stays are available." },
    ],
    related: ["ac-dormitory-belapur", "pg-in-belapur", "pg-near-belapur-station"],
  },
  {
    slug: "ac-dormitory-belapur",
    navLabel: "AC dormitory Belapur",
    title: "AC Dormitory in Belapur — Clean Beds, 24-Hour AC, Free Wi-Fi",
    description:
      "AC dormitory in CBD Belapur, Navi Mumbai. 24-hour AC, fresh bedsheets for every guest, daily cleaning and free Wi-Fi at Gargee's, Bay View Tower, Sector 11.",
    keywords: "AC dormitory Belapur, dormitory in CBD Belapur, AC dorm Navi Mumbai, cheap stay Belapur, dormitory near Belapur station",
    h1: ["An AC dormitory", "that stays cool all night."],
    intro:
      "Gargee's AC dormitory has air-conditioning running 24 hours, free Wi-Fi and fresh linen for every new guest — all in Bay View Tower, Sector 11, CBD Belapur.",
    image: "/media/img/capsule-bed.jpg",
    highlights: [
      { title: "24-hour AC", text: "Cool air, day and night." },
      { title: "Privacy curtains", text: "Close off your bed when you sleep." },
      { title: "Daily cleaning", text: "A tidy dorm, every day." },
      { title: "Open 24/7", text: "Late arrivals welcome." },
    ],
    sections: [
      {
        heading: "Upper or lower bed",
        body: [
          "Steel-frame bunks with a ladder to every upper bed, and a reading light and socket at the lower beds. Tell us your preference when you enquire and we'll do our best to match it.",
        ],
      },
      {
        heading: "Clean, simple and secure",
        body: [
          "Every new guest gets fresh bedsheets and a clean blanket, the dorm is cleaned daily, and staff are on hand around the clock.",
        ],
      },
    ],
    faqs: [
      { q: "Is the dormitory air-conditioned at night?", a: "Yes. The AC runs 24 hours a day." },
      { q: "Do you provide bedding?", a: "Yes — fresh bedsheets, a pillow and a blanket for every new guest." },
    ],
    related: ["seamen-hostel-belapur", "pg-in-cbd-belapur", "student-hostel-belapur"],
  },
  {
    slug: "pg-near-belapur-station",
    navLabel: "PG near Belapur station",
    title: "PG Near Belapur Railway Station — AC Beds in Sector 11",
    description:
      "PG near CBD Belapur railway station: Gargee's is about 2 minutes away in Bay View Tower, Sector 11. AC beds, free Wi-Fi, fresh linen, 24/7 check-in.",
    keywords: "PG near Belapur railway station, PG near CBD Belapur station, stay near Belapur station, hostel near Belapur station",
    h1: ["Minutes from", "Belapur station."],
    intro:
      "If your days start and end at CBD Belapur station, stay close to it. Gargee's is about 2 minutes away in Bay View Tower, Sector 11.",
    image: "/media/img/dorm-aisle.jpg",
    highlights: [
      { title: "≈ 2 min to the station", text: "Approximate travel time." },
      { title: "≈ 3 min to the highway", text: "Quick access for cabs and buses." },
      { title: "≈ 10 min to the airport", text: "Handy for early and late flights." },
      { title: "24/7 check-in", text: "Arrive whenever your train does." },
    ],
    sections: [
      {
        heading: "Cut your commute, not your sleep",
        body: [
          "Staying next to the station means less time in autos and more time to rest. From Gargee's you can be on the platform in minutes, whether you're heading into Mumbai or across Navi Mumbai.",
        ],
      },
      {
        heading: "Easy to find",
        body: [
          "401, 4th Floor, Bay View Tower, Plot No. 7, opposite Domino's Pizza, Sector 11, CBD Belapur. Share that with your driver, or tap Get directions on our contact page.",
        ],
      },
    ],
    faqs: [
      { q: "How far is Gargee's from CBD Belapur station?", a: "About 2 minutes away. Times are approximate and depend on traffic." },
      { q: "Is there a landmark nearby?", a: "Yes — Bay View Tower is opposite Domino's Pizza in Sector 11." },
    ],
    related: ["pg-in-belapur", "pg-in-cbd-belapur", "seamen-hostel-belapur"],
  },
  {
    slug: "student-hostel-belapur",
    navLabel: "Student hostel Belapur",
    title: "Student Hostel & PG in Belapur, Navi Mumbai — AC Beds",
    description:
      "Student hostel and PG in CBD Belapur for students, interns and trainees. AC beds, free Wi-Fi for study, daily cleaning and flexible monthly stays at Gargee's.",
    keywords: "student hostel Belapur, student PG CBD Belapur, hostel for students Navi Mumbai, PG for interns Belapur, student dormitory Belapur",
    h1: ["A student hostel", "that lets you focus."],
    intro:
      "Studying, interning or training in Belapur? Gargee's gives you a clean AC bed, free Wi-Fi for study and a short walk to the station — without a long lock-in.",
    image: "/media/img/lower-berth-light.jpg",
    highlights: [
      { title: "Wi-Fi for study", text: "Free, round the clock." },
      { title: "Reading light", text: "A light and socket at the lower beds." },
      { title: "Monthly stays", text: "Flexible move-in dates." },
      { title: "Clean & cool", text: "24-hour AC and daily cleaning." },
    ],
    sections: [
      {
        heading: "Made for courses, internships and exams",
        body: [
          "A student stay needs a quiet bed, reliable Wi-Fi and an easy commute. Gargee's covers all three, in Sector 11, CBD Belapur.",
        ],
      },
      {
        heading: "Start small, stay longer",
        body: [
          "Begin with a few nights while you settle in, then switch to a monthly PG stay. Send an enquiry with your dates and we'll share options.",
        ],
      },
    ],
    faqs: [
      { q: "Can students stay monthly?", a: "Yes. Students and interns can stay monthly as a PG." },
      { q: "Is Wi-Fi included?", a: "Yes, free Wi-Fi is included." },
    ],
    related: ["pg-in-belapur", "ac-dormitory-belapur", "pg-in-cbd-belapur"],
  },
];

export const landingBySlug = (slug: string) => LANDING_PAGES.find((p) => p.slug === slug);
