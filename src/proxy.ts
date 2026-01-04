import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for /api, /trpc, /_next, /_vercel, static files, and /auth
    "/((?!api|trpc|_next|_vercel|.*\\..*|auth).*)",
  ],
};
