import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createTRPCContext } from "@aerovy/api";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () =>
      createTRPCContext({
        req,
        session: null, // populated by P1-T07
        locale: req.headers.get("x-aerovy-locale") ?? "en",
      }),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`tRPC ${path ?? "<unknown>"} failed:`, error);
          }
        : undefined,
  });

export { handler as GET, handler as POST };
