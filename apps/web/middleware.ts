import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run on everything except static assets, API, favicon, and images.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
