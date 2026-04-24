/**
 * One-shot: generate favicons + OG image from assets/logo.png.
 *
 * Output (committed):
 *   apps/web/public/favicon.ico            (32×32 ICO)
 *   apps/web/public/icon-192.png           (192×192 PNG, transparent)
 *   apps/web/public/icon-512.png           (512×512 PNG, transparent)
 *   apps/web/public/apple-touch-icon.png   (180×180 PNG, surface bg for iOS)
 *   apps/web/public/og-image.png           (1200×630 PNG, branded surface + logo)
 *
 * Run: `pnpm --filter @aerovy/scripts generate:icons`
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");
const SOURCE = resolve(ROOT, "assets/logo.png");
const OUT_DIR = resolve(ROOT, "apps/web/public");

const BRAND = {
  surface: { r: 250, g: 248, b: 243, alpha: 1 }, // #FAF8F3
};

async function ensureDir(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true });
}

async function writePng(target: string, buffer: Buffer): Promise<void> {
  await writeFile(target, buffer);
  console.warn(`✓ ${target.replace(ROOT + "/", "").replace(ROOT + "\\", "")}`);
}

async function square(size: number): Promise<Buffer> {
  return sharp(SOURCE)
    .resize({
      width: size,
      height: size,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function appleTouchIcon(): Promise<Buffer> {
  // iOS crops corners and renders on app backgrounds — fill with warm surface.
  return sharp(SOURCE)
    .resize({
      width: 180,
      height: 180,
      fit: "contain",
      background: BRAND.surface,
    })
    .flatten({ background: BRAND.surface })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function ogImage(): Promise<Buffer> {
  const W = 1200;
  const H = 630;
  const LOGO_W = Math.round(W * 0.4);

  const logoBuffer = await sharp(SOURCE).resize({ width: LOGO_W, fit: "inside" }).png().toBuffer();

  const meta = await sharp(logoBuffer).metadata();
  const logoH = meta.height ?? LOGO_W;

  return sharp({
    create: { width: W, height: H, channels: 4, background: BRAND.surface },
  })
    .composite([
      {
        input: logoBuffer,
        top: Math.round((H - logoH) / 2),
        left: Math.round((W - LOGO_W) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function favicon(): Promise<Buffer> {
  const png32 = await sharp(SOURCE)
    .resize({
      width: 32,
      height: 32,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  return toIco([png32]);
}

async function main(): Promise<void> {
  await ensureDir(OUT_DIR);

  const [icon192, icon512, apple, og, ico] = await Promise.all([
    square(192),
    square(512),
    appleTouchIcon(),
    ogImage(),
    favicon(),
  ]);

  await Promise.all([
    writePng(resolve(OUT_DIR, "icon-192.png"), icon192),
    writePng(resolve(OUT_DIR, "icon-512.png"), icon512),
    writePng(resolve(OUT_DIR, "apple-touch-icon.png"), apple),
    writePng(resolve(OUT_DIR, "og-image.png"), og),
    writePng(resolve(OUT_DIR, "favicon.ico"), ico as Buffer),
  ]);

  console.warn("\nDone. 5 files written to apps/web/public/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
