// Root-level not-found for paths that couldn't be resolved to a locale.
// The localized version lives at app/[locale]/not-found.tsx.
import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          background: "#FFFFFF",
          color: "#2D151E",
          margin: 0,
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Page not found</h1>
        <p style={{ color: "#6B5A5F", marginTop: "0.5rem" }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
        <Link href="/" style={{ color: "#CDA020", marginTop: "1rem" }}>
          Back to Aerovy Travels
        </Link>
      </body>
    </html>
  );
}
