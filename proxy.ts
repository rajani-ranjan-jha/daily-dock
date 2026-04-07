import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function proxy(request: NextRequest) {
  // Check if user is logged in (adjust based on your auth method)
  // const token = request.cookies.get('session')?.value // or 'auth-token', 'session', etc.
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  
//   // If not logged in, redirect to /login
//   if (!token) {
//     console.log("user is not logged in!")
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   console.log("proxy token: ", token)
  
  // If logged in, allow the request to proceed
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/notes/:path*', '/diary/:path*'],
}