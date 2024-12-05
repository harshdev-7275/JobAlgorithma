import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Redirect to this page if not authenticated
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*", // Apply to all routes inside the /dashboard directory
    "/((?!api|_next/static|favicon.ico).*)" // Exclude /api, _next/static, and favicon.ico
  ],
};
