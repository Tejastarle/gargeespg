import type {
  Amenity,
  Availability,
  ContentSettings,
  Faq,
  GalleryItem,
  LocationPoint,
  Room,
  SeoPage,
  SeoSettings,
  SiteContent,
  SiteSettings,
  Testimonial,
} from "./types";

/**
 * Default content for Gargee's. Used when Supabase is not configured yet, and to fill any
 * setting that is missing in the database. Everything here can be changed from the admin
 * panel once Supabase is connected (see supabase/schema.sql seed).
 */

export const DEFAULT_SITE: SiteSettings = {
  business_name: "Gargee's Seamen Hostel & AC Dormitory",
  brand: "Gargee's",
  tagline: "Seamen hostel · AC dormitory · PG in CBD Belapur",
  phone_mobile: "9967393925",
  phone_office_1: "",
  phone_office_2: "",
  phone_landline: "",
  contact_person: "",
  contact_person_phone: "",
  whatsapp: "919967393925",
  whatsapp_message: "Hi Gargee's, I'd like to check availability for a bed.",
  email: "",
  address_line_1: "401, 4th Floor, Bay View Tower, Plot No. 7",
  address_line_2: "Opp. Domino's Pizza, Sector 11",
  landmarks: "Near CBD Belapur railway station",
  locality: "CBD Belapur",
  city: "Navi Mumbai",
  region: "Maharashtra",
  postal_code: "400614",
  country: "IN",
  latitude: 19.019623,
  longitude: 73.0371694,
  google_place_id: "ChIJvx8QVhHD5zsRm75T5-D6P5E",
  map_query: "Gargees seamen hostel AC Dormitory, Bay View Tower, Sector 11, CBD Belapur, Navi Mumbai",
  maps_url:
    "https://www.google.com/maps/search/?api=1&query=Gargees+seamen+hostel+AC+Dormitory&query_place_id=ChIJvx8QVhHD5zsRm75T5-D6P5E",
  hours_label: "Open 24 hours, 7 days a week",
};

export const DEFAULT_CONTENT: ContentSettings = {
  hero_line_1: "Your home port in Belapur.",
  hero_line_2: "Cool, clean, ready for you.",
  hero_subtext:
    "AC PG, seamen hostel and dormitory beds at Bay View Tower, CBD Belapur — 24-hour AC, free Wi-Fi and fresh linen for every guest.",
  cta_primary: "Check availability",
  cta_secondary: "Book a bed",
  cta_call: "Call now",
  location_title: "Everything close. Nothing complicated.",
  location_text:
    "Gargee's is on the 4th floor of Bay View Tower in Sector 11, CBD Belapur — a short walk from the railway station, with the highway and the new airport a quick ride away.",
  stay_title: "Your bed. Your space. Your Gargee's.",
  stay_text:
    "Clean, air-conditioned beds with fresh bedsheets and a blanket for every new guest. Stay a night between ships, a week for a course, or make it your PG for the month.",
  capsule_title: "Step inside your berth.",
  capsule_text: "Every bed is built around four things: comfort, privacy, cool air and a space that is yours.",
  amenities_title: "Everything a good night needs.",
  why_title: "Why Gargee's?",
  gallery_title: "See the beds.",
  trust_title: "Everything you need for a comfortable stay.",
  faq_title: "Questions, answered.",
  final_title: "Your next stay starts here.",
  final_subtitle: "Stay cool. Stay connected. Stay at Gargee's.",
  enquiry_success: "Thank you. Our team will contact you shortly.",
  show_testimonials: true,
  show_availability: false,
};

export const DEFAULT_SEO: SeoSettings = {
  title: "Gargee's — AC PG, Seamen Hostel & Dormitory in CBD Belapur, Navi Mumbai",
  title_template: "%s | Gargee's PG Belapur",
  description:
    "Looking for a PG in Belapur? Gargee's offers AC dormitory beds, PG and seamen hostel stays at Bay View Tower, Sector 11, CBD Belapur. 24-hour AC, free Wi-Fi, fresh linen, open 24/7.",
  keywords:
    "PG in Belapur, PG in CBD Belapur, AC PG Belapur, seamen hostel Belapur, sailor hostel Navi Mumbai, AC dormitory Belapur, hostel in CBD Belapur, PG near Belapur station, student hostel Belapur, PG in Navi Mumbai",
  og_image: "/media/og-gargees.jpg",
};

const id = (p: string, n: number) => `${p}-${n}`;

export const DEFAULT_ROOMS: Room[] = [
  {
    id: id("room", 1),
    title: "AC dormitory bed",
    slug: "ac-dormitory-bed",
    description:
      "A made-up bed in the air-conditioned dorm with fresh white bedsheets, a pillow and a blanket. Ideal for a night or a short trip to Belapur.",
    price_label: "Nightly stays",
    features: ["24-hour AC", "Fresh bedsheets & blanket", "Privacy curtain", "Free Wi-Fi"],
    image_url: "/media/img/capsule-bed.jpg",
    sort_order: 1,
    is_active: true,
  },
  {
    id: id("room", 2),
    title: "Seamen hostel stay",
    slug: "seamen-hostel-stay",
    description:
      "Between contracts, on a course or waiting to sign on? A clean, cool bed close to the station, with staff who understand a sailor's schedule.",
    price_label: "Weekly stays",
    features: ["Seafarer-friendly", "Open 24/7", "Daily cleaning", "Near Belapur station"],
    image_url: "/media/img/dorm-bunks-ac.jpg",
    sort_order: 2,
    is_active: true,
  },
  {
    id: id("room", 3),
    title: "PG monthly stay",
    slug: "pg-monthly-stay",
    description:
      "Studying or working in CBD Belapur? Make Gargee's your PG for the month — in Sector 11, a short walk from the station and the business district.",
    price_label: "Monthly stays",
    features: ["For students & professionals", "AC & Wi-Fi included", "Flexible move-in", "Secure building"],
    image_url: "/media/img/dorm-bunk.jpg",
    sort_order: 3,
    is_active: true,
  },
];

export const DEFAULT_AMENITIES: Amenity[] = [
  ["24-hour AC", "Air-conditioned day and night, so you always sleep cool.", "snowflake"],
  ["Free Wi-Fi", "Wi-Fi round the clock for calls home, streaming and work.", "wifi"],
  ["Fresh linen for every guest", "New bedsheets and a clean blanket for every new guest.", "bed"],
  ["Daily cleaning", "The dorm is cleaned every day and kept tidy.", "spray"],
  ["Open 24/7", "Check in after a late train or an early flight.", "clock"],
  ["Near Belapur station", "Bay View Tower, Sector 11 — a short walk from the station.", "train"],
  ["Seafarer-friendly", "A favourite with sailors between contracts and on courses.", "anchor"],
  ["Friendly staff", "Helpful people on hand whenever you need something.", "users"],
].map(([title, description, icon], i) => ({ id: id("am", i + 1), title, description, icon, sort_order: i + 1, is_active: true }));

const g = (n: number, title: string, category: string, image_url: string, alt: string): GalleryItem => ({
  id: id("g", n),
  title,
  category,
  image_url,
  alt,
  sort_order: n,
  is_active: true,
});
export const DEFAULT_GALLERY: GalleryItem[] = [
  g(1, "AC dormitory", "Dormitory", "/media/img/dorm-bunks-ac.jpg", "Bunk beds with curtains under an air conditioner in the AC dormitory"),
  g(2, "Made-up bed", "Beds", "/media/img/capsule-berth-wide.jpg", "Bed with white bedsheets, a folded blanket and an AC remote"),
  g(3, "Bunk with curtain", "Dormitory", "/media/img/dorm-bunk.jpg", "Upper and lower bunks with privacy curtains and fresh linen"),
  g(4, "Lower bed", "Beds", "/media/img/capsule-bed.jpg", "Lower bed with pillow, blanket and tie-back curtain"),
  g(5, "Dorm aisle", "Rooms", "/media/img/dorm-aisle.jpg", "Aisle between rows of bunk beds in the dormitory"),
  g(6, "Bed light & socket", "Beds", "/media/img/lower-berth-light.jpg", "Lower bed with a reading light and a power socket"),
  g(7, "Upper bed ladder", "Rooms", "/media/img/room-walk-2.jpg", "Steel ladder up to an upper bed"),
  g(8, "Curtained bunk", "Dormitory", "/media/img/room-walk-3.jpg", "Bunk bed with a tie-back curtain"),
];

export const DEFAULT_FAQS: Faq[] = [
  ["What is Gargee's?", "Gargee's is a seamen hostel, AC dormitory and PG at Bay View Tower, Sector 11, CBD Belapur, Navi Mumbai. You get a clean bed with fresh bedsheets and a blanket, 24-hour AC, free Wi-Fi and daily cleaning."],
  ["Where is Gargee's located?", "401, 4th Floor, Bay View Tower, Plot No. 7, opposite Domino's Pizza, Sector 11, CBD Belapur, Navi Mumbai 400614 — near CBD Belapur railway station."],
  ["Is Gargee's a PG or a hostel?", "Both. Stay a night like a hostel, a week while you're between ships or on a course, or a month as your PG in Belapur."],
  ["Is the dormitory air-conditioned?", "Yes. The dormitory has AC running 24 hours a day."],
  ["Is Wi-Fi available?", "Yes, free Wi-Fi is available for all guests."],
  ["Do you give fresh bedsheets?", "Yes. Every new guest gets fresh bedsheets and a clean blanket, and the dorm is cleaned daily."],
  ["Do you take seafarers and sailors?", "Yes. Gargee's is a seamen hostel and is popular with sailors between contracts, on courses or waiting to sign on."],
  ["Can students and working professionals stay?", "Yes. Students, interns and working professionals stay with us for weeks or months as a PG."],
  ["Is Gargee's open 24/7?", "Yes. We're open 24 hours a day, 7 days a week, so you can check in after a late train or flight."],
  ["How far is Gargee's from Belapur railway station?", "About 2 minutes away. Travel times are approximate and depend on traffic."],
  ["How far is it from the airport?", "About 10 minutes by road to the Navi Mumbai airport. Travel times are approximate and depend on traffic."],
  ["How can I book or check availability?", "Use the Check availability form on this site, or call or WhatsApp +91 99673 93925. We'll confirm a bed for your dates."],
].map(([question, answer], i) => ({ id: id("faq", i + 1), question, answer, page: "home", sort_order: i + 1, is_active: true }));

/** Testimonials ship empty on purpose — add real guest feedback from the admin panel. */
export const DEFAULT_TESTIMONIALS: Testimonial[] = [];

export const DEFAULT_LOCATIONS: LocationPoint[] = [
  { id: id("loc", 1), label: "Railway Station", minutes: 2, description: "CBD Belapur station", icon: "train", map_x: 0.42, map_y: 0.32, sort_order: 1, is_active: true },
  { id: id("loc", 2), label: "Highway", minutes: 3, description: "Quick highway access", icon: "route", map_x: -0.18, map_y: 0.78, sort_order: 2, is_active: true },
  { id: id("loc", 3), label: "Airport", minutes: 10, description: "Navi Mumbai International Airport", icon: "plane", map_x: 0.78, map_y: -0.72, sort_order: 3, is_active: true },
];

export const DEFAULT_AVAILABILITY: Availability[] = [
  { id: id("av", 1), label: "Dormitory beds", available: 0, total: null, note: "Call to confirm for tonight", is_public: false, sort_order: 1 },
];

export const DEFAULT_SEO_PAGES: SeoPage[] = [];

export const DEFAULT_SITE_CONTENT: SiteContent = {
  site: DEFAULT_SITE,
  content: DEFAULT_CONTENT,
  seo: DEFAULT_SEO,
  rooms: DEFAULT_ROOMS,
  amenities: DEFAULT_AMENITIES,
  gallery: DEFAULT_GALLERY,
  faqs: DEFAULT_FAQS,
  testimonials: DEFAULT_TESTIMONIALS,
  locations: DEFAULT_LOCATIONS,
  availability: DEFAULT_AVAILABILITY,
  seoPages: DEFAULT_SEO_PAGES,
};

export const ACCOMMODATION_PREFERENCES = [
  "Dormitory bed (nightly)",
  "Seamen hostel (weekly)",
  "PG (monthly)",
  "Lower bed",
  "Upper bed",
  "Not sure yet",
];
