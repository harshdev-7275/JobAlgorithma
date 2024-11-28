import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect to this page if not authenticated
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"], // Apply to all routes except /api, _next/static, and favicon
};
