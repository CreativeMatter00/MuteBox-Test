// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export function middleware(request: NextRequest) {
//  const path = request.nextUrl.pathname;

//  const publicRoutes = ["/login", "/"];
//  const userRoutes = ["/opinion"];
//  const adminRoutes = ["/admin", "/admin/password", "/admin/result"];

//  // const isPublicPath = path === "/login" || path === "/";

//  const token = request.cookies.get("token")?.value || "";

//  const role = parseRoleFromToken(token);
//  console.log(role);

//  // if (isPublicPath && token) {
//  //  return NextResponse.redirect(new URL("/", request.nextUrl));
//  // }

//  if (!publicRoutes && !token) {
//  return NextResponse.redirect(new URL("/login", request.nextUrl));
//  }

//  return null;
// }

// export const config = {
//  // Include all private routes in the matcher
//  matcher: ["/login", "/", "/admin", "/admin/password", "/admin/result", "/opinion"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import parseRoleFromToken from "./helpers/jwtHelper";

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const publicRoutes = ["/login", "/"];
	const userRoutes = ["/opinion"];
	const adminRoutes = ["/admin", "/admin/password", "/admin/result"];

	const token = request.cookies.get("token")?.value || "";

	console.log(token);

	const role = parseRoleFromToken(token);

	console.log(role);

	// If user is not logged in
	if (!token) {
		// Allow access to public routes only
		if (!publicRoutes.includes(path)) {
			return NextResponse.redirect(new URL("/login", request.nextUrl));
		}
	}

	// If user is logged in
	else {
		// If user is admin, allow access to all routes
		if (role === "admin") {
			return null;
		}
		// If user is regular user, allow access to public and user routes
		else if (role === "user") {
			if (!publicRoutes.includes(path) && !userRoutes.includes(path)) {
				return NextResponse.redirect(new URL("/login", request.nextUrl));
			}
		}
	}

	return null;
}

export const config = {
	// Include all private routes in the matcher
	matcher: [
		"/login",
		"/",
		"/admin",
		"/admin/password",
		"/admin/result",
		"/opinion",
	],
};
