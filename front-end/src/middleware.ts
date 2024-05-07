import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const cookie = cookies().has("@todo:token-auth")

  if (!cookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}

export const config = {
  matcher: ["/"],
}
