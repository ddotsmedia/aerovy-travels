import { router } from "./trpc";
import { experienceRouter } from "./routers/experience";

export const appRouter = router({
  experience: experienceRouter,
});

export type AppRouter = typeof appRouter;
