# @aerovy/ui

Shared UI primitives for Aerovy Travels. Hand-authored shadcn-style
components on Radix UI, styled with Tailwind v4 and brand tokens from
`@aerovy/config/tailwind/tokens.css`.

## Usage

```tsx
// apps/web/app/layout.tsx
import "@aerovy/ui/styles.css"; // imports brand tokens on top of tailwind

// apps/web/app/some-page.tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from "@aerovy/ui";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Book an experience</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Search Abu Dhabi..." />
        <Button variant="primary">Search</Button>
      </CardContent>
    </Card>
  );
}
```

## Components (Phase 1)

- `Button` — variants: primary, secondary, outline, ghost, danger, link × sizes: sm, md, lg, icon.
  Supports `asChild` via Radix Slot for link composition.
- `Card` + `CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter`.
- `Input` — text/email/password/etc.
- `cn(...)` helper — `clsx` + `tailwind-merge`.

More primitives (Dialog, Select, Toast, Tabs) land alongside feature tickets.

## RTL

All primitives use logical properties (`ps-*`, `pe-*`, `ms-*`) where direction
matters. The token stylesheet activates via `dir="rtl"` on `<html>`; no
component-level changes needed.

## Dark mode

Activated by `class="dark"` on `<html>` (next-themes convention). Brand
palette stays constant; only the semantic tokens (`bg`, `surface`, `text`,
`muted`, `border`) swap.
