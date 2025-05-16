import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
export function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    if (process.env.NODE_ENV === "development") {
        console.log("[AUTH] Session cookie:", sessionCookie);
    }

    if(!sessionCookie) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
 
    return NextResponse.next();
}
 
export const config = {
  matcher: ["/feed"],
};