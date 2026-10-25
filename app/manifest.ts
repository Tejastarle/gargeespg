import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gargee's — Seamen Hostel & AC Dormitory, CBD Belapur",
    short_name: "Gargee's",
    description: "PG, AC dormitory and seamen hostel in CBD Belapur, Navi Mumbai.",
    start_url: "/",
    display: "standalone",
    background_color: "#16181b",
    theme_color: "#16181b",
    orientation: "portrait",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
