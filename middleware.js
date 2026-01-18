import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/register", "/verify"];
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Check if route is a dashboard route
  const isDashboardRoute =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings") ||
    pathname === "/" ||
    pathname.startsWith("/accounts") ||
    pathname.startsWith("/ads") ||
    pathname.startsWith("/categories") ||
    pathname.startsWith("/sub-categories") ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/points") ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/stores") ||
    pathname.startsWith("/branches");

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If it's a dashboard route, check for authentication
  if (isDashboardRoute) {
    // Get token from cookie
    const token = request.cookies.get("shhal_admin_token")?.value;

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      // Add the current path as a redirect parameter
      loginUrl.searchParams.set("redirect", pathname);
      // Add unauthorized parameter to show message
      loginUrl.searchParams.set("unauthorized", "true");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|icons).*)",
  ],
};
