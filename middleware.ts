import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Only run middleware for /admin-login page
  if (request.nextUrl.pathname === "/admin-login") {
    // Add your admin authentication logic here when ready
    return NextResponse.next()
  }

  return NextResponse.next()
}

// Limit middleware to just the admin-login route
export const config = {
  matcher: ["/admin-login"],
}
