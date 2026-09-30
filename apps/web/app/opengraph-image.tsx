import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aerovy Travels - Abu Dhabi Travel Platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "linear-gradient(135deg, #CDA020 0%, #D4AF37 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "60px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: "bold",
          marginBottom: 24,
          textShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        Aerovy Travels
      </div>
      <div
        style={{
          fontSize: 36,
          marginBottom: 40,
          opacity: 0.95,
          fontWeight: "500",
        }}
      >
        Abu Dhabi&apos;s Premier Travel Platform
      </div>
      <div
        style={{
          fontSize: 24,
          opacity: 0.85,
          fontWeight: "400",
          maxWidth: "800px",
          lineHeight: 1.4,
        }}
      >
        Premium tours, desert safaris, hotels, flights, visas & custom itineraries
      </div>
    </div>,
    {
      ...size,
    },
  );
}
