import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/hospitals",
    "/about",
    "/documents",
    "/sign-up",
    "/sign-in",
    `/hospitals/:id*`,
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
