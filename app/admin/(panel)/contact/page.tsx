"use client";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { DEFAULT_SITE } from "@/lib/defaults";

const t = (key: string, label: string, hint?: string, full = false) => ({ key, label, type: "text" as const, hint, full });

export default function ContactSettingsPage() {
  return (
    <SettingsForm
      settingKey="site"
      defaults={DEFAULT_SITE}
      title="Contact information"
      description="Phone number, WhatsApp, address and map location. Used in the header, footer, every Call button and Google structured data."
      sections={[
        { title: "Business", fields: [t("brand", "Brand"), t("business_name", "Business name"), t("tagline", "Tagline", undefined, true), t("contact_person", "Manager name (optional)"), t("contact_person_phone", "Manager's mobile (optional)"), t("hours_label", "Hours label")] },
        {
          title: "Phone & messaging",
          fields: [
            t("phone_mobile", "Primary mobile (Call / WhatsApp)", "Used for every Call button"),
            t("phone_office_1", "Second mobile"),
            t("phone_office_2", "Third mobile (optional)"),
            t("phone_landline", "Landline"),
            t("whatsapp", "WhatsApp number", "With country code, digits only — e.g. 919967393925"),
            t("email", "Email (optional — hidden when empty)"),
            { key: "whatsapp_message", label: "WhatsApp pre-filled message", type: "textarea" },
          ],
        },
        {
          title: "Address & map",
          fields: [
            t("address_line_1", "Address line 1", undefined, true),
            t("address_line_2", "Address line 2", undefined, true),
            t("landmarks", "Landmarks", "e.g. Near CBD Belapur railway station", true),
            t("locality", "Locality"),
            t("city", "City"),
            t("region", "State"),
            t("postal_code", "PIN code"),
            { key: "latitude", label: "Latitude", type: "number" },
            { key: "longitude", label: "Longitude", type: "number" },
            { key: "maps_url", label: "Google Maps link", type: "url", full: true },
            t("google_place_id", "Google Maps place ID", "Used for Get directions — find it at developers.google.com/maps/documentation/places/web-service/place-id", true),
            t("map_query", "Map search text", "What the embedded map searches for, e.g. business name + address", true),
          ],
        },
      ]}
    />
  );
}
