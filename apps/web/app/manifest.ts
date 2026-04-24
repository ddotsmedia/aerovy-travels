import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aerovy Travels",
    short_name: "Aerovy",
    description: "Premium AI-assisted travel platform for Abu Dhabi.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F3",
    theme_color: "#CDA020",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
