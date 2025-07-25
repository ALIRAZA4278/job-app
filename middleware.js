
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/api/applications(.*)',
  '/api/users(.*)',
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  
  // If user is authenticated and on homepage, redirect to dashboard
  if (userId && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  // Protect specific routes
  if (isProtectedRoute(req)) {
    if (!userId) {
      // Not authenticated, redirect to sign-in page
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }
  
  // Continue to the next middleware or route
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

