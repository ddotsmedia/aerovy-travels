import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { prisma, type Role } from "@aerovy/db";

/**
 * Session shape exchanged between Next.js middleware and tRPC. Populated
 * with a real Auth.js payload in P1-T07; currently the context builder
 * returns `null`.
 */
export interface TRPCSession {
  userId: string;
  email: string;
  role: Role;
}

export interface TRPCContext {
  prisma: typeof prisma;
  session: TRPCSession | null;
  locale: string;
}

/**
 * Build the tRPC context. Called from the Next route handler with the
 * fetch request so downstream middlewares can read headers if needed.
 */
export async function createTRPCContext(opts: {
  req?: Request;
  session?: TRPCSession | null;
  locale?: string;
}): Promise<TRPCContext> {
  return {
    prisma,
    session: opts.session ?? null,
    locale: opts.locale ?? opts.req?.headers.get("x-aerovy-locale") ?? "en",
  };
}

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

/**
 * Role-gated procedures. Each throws UNAUTHORIZED (no session) or
 * FORBIDDEN (wrong role). P1-T07 wires the session; today these throw
 * on every call, which is the correct behavior until auth lands.
 */
const enforceAuth = t.middleware(({ ctx, next }) => {
  if (!ctx.session) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { ...ctx, session: ctx.session } });
});

function requireRoles(allowed: Role[]) {
  return t.middleware(({ ctx, next }) => {
    if (!ctx.session) throw new TRPCError({ code: "UNAUTHORIZED" });
    if (!allowed.includes(ctx.session.role)) throw new TRPCError({ code: "FORBIDDEN" });
    return next({ ctx: { ...ctx, session: ctx.session } });
  });
}

export const protectedProcedure = t.procedure.use(enforceAuth);
export const staffProcedure = t.procedure.use(requireRoles(["STAFF", "ADMIN"]));
export const adminProcedure = t.procedure.use(requireRoles(["ADMIN"]));
export const supplierProcedure = t.procedure.use(requireRoles(["SUPPLIER", "ADMIN"]));
