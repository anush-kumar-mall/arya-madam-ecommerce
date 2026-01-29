import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const isAdmin = token?.role === "ADMIN";

    // Protect admin routes - redirect non-admins to home
    if (path.startsWith("/admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Redirect admin to admin panel from home and auth pages
    if (isAdmin && (path === "/" || path.startsWith("/auth"))) {
      return NextResponse.redirect(new URL("/admin/products", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        
        // Allow auth pages without token
        if (path.startsWith("/auth")) return true;
        
        // Require token for admin pages
        if (path.startsWith("/admin")) return !!token;
        
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/auth/:path*",
    "/checkout",
    "/profile/:path*"
  ],
};