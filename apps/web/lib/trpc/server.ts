import "server-only";
import { cache } from "react";
import { appRouter, createCallerFactory, createTRPCContext } from "@aerovy/api";

/**
 * Server caller for React Server Components. Each RSC render gets its
 * own context (cached via React.cache so repeated calls within a render
 * share the instance). No HTTP round-trip.
 */
const createContext = cache(() => createTRPCContext({ session: null }));

const createCaller = createCallerFactory(appRouter);

export const trpc = createCaller(async () => createContext());
