# @aerovy/scripts

One-shot developer scripts. Not imported by any app — run manually when needed.

## generate-icons

```bash
pnpm --filter @aerovy/scripts generate:icons
```

Reads `assets/logo.png` and writes five files to `apps/web/public/`:

| File                   | Size     | Purpose                              |
| ---------------------- | -------- | ------------------------------------ |
| `favicon.ico`          | 32×32    | Browser tab icon                     |
| `icon-192.png`         | 192×192  | PWA install icon (Android)           |
| `icon-512.png`         | 512×512  | PWA splash / larger surfaces         |
| `apple-touch-icon.png` | 180×180  | iOS home screen (surface-background) |
| `og-image.png`         | 1200×630 | Open Graph social preview            |

Output is committed. Re-run only when the source logo changes.
