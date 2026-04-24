# @aerovy/db

Prisma schema + singleton client for Aerovy Travels.

## Usage

```ts
import { prisma, ExperienceStatus } from "@aerovy/db";

const published = await prisma.experience.findMany({
  where: { status: ExperienceStatus.PUBLISHED },
  include: { images: { orderBy: { order: "asc" }, take: 1 } },
});
```

## Commands

All run from the repo root:

| Script                   | What it does                                               |
| ------------------------ | ---------------------------------------------------------- |
| `pnpm db:generate`       | Generate the Prisma client into `packages/db/generated/`   |
| `pnpm db:push`           | Push schema to `DATABASE_URL` without creating a migration |
| `pnpm db:migrate`        | Create + apply a new development migration                 |
| `pnpm db:migrate:deploy` | Apply pending migrations in production                     |
| `pnpm db:studio`         | Open Prisma Studio                                         |
| `pnpm db:reset`          | Drop + recreate (development only — destructive)           |

A migration history lands in Phase 1 Ticket 5 alongside the seed data. For
now, use `pnpm db:push` against a disposable local/Neon-branch database.

## Environment

Requires `DATABASE_URL` (runtime) and `DIRECT_URL` (migrations only — use a
non-pooled connection for Neon). Both defined in `.env.example`.

## Singleton

`prisma` is cached on `globalThis` in development so HMR doesn't leak
connections. Safe to import from server components and tRPC routers; do
not import from client components.
