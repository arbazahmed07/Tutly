import { withAuth } from "next-auth/middleware";
import { NEXT_PUBLIC_SIGN_IN_URL } from "./utils/constants";
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

export default withAuth(
  function middleware(req, res) {
    const { nextUrl } = req;
    const token = req.nextauth?.token?.username;
    // const isLoggedIn = !!token;
    // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    // const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    // const isAdminRoute = nextUrl.pathname.startsWith("/admin");

    // if (isApiAuthRoute) {
    //   return null;
    // }

    // if (isAuthRoute) {
    //   if (isLoggedIn) {
    //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    //   }
    //   return null;
    // }

    // if (!isLoggedIn && !isPublicRoute) {
    //   let callbackUrl = nextUrl.pathname;
    //   if (nextUrl.search) {
    //     callbackUrl += nextUrl.search;
    //   }

    //   const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    //   return Response.redirect(
    //     new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    //   );
    // }

    // return null;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/courses/:path*",
    "/leaderboard/:path*",
    "/doubts/:path*",
    "/playground/:path*",
    "/profile/:path*",
    "/assignments/:path*",
  ],
};
