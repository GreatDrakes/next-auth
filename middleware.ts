import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Restrict /admin to only admins
    if (
      req.nextauth.token &&
      !req.nextauth.token.roles?.includes("admin") &&
      req.nextUrl.pathname.startsWith("/admin")
    ) {
      return new Response("Access Denied", { status: 403 });
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
