import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const isPublicPath = path === "/login" || path === "/";

	const token = request.cookies.get("token")?.value || "";

	// if (isPublicPath && token) {
	// 	return NextResponse.redirect(new URL("/", request.nextUrl));
	// }

	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL("/login", request.nextUrl));
	}

	return null;
}

export const config = {
	// Include all private routes in the matcher
	matcher: ["/login", "/", "/admin", "/admin/password", "/admin/result"],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export function middleware(request: NextRequest) {
// 	const path = request.nextUrl.pathname;
// 	const token = request.cookies.get("token")?.value || "";

// 	// Parse role from token
// 	const role = parseRoleFromToken(token);

// 	// Define routes for each role
// 	const publicRoutes = ["/login", "/"];
// 	const userRoutes = ["/opinion"];
// 	const adminRoutes = [
// 		"/admin",
// 		"/admin/password",
// 		"/admin/result",
// 		"/opinion",
// 	];

// 	// Check if the requested path is public
// 	const isPublicPath = publicRoutes.includes(path);

// 	// Check if the user is logged in
// 	const isLoggedIn = token !== "";

// 	// Redirect logic based on role and route
// 	if (isPublicPath || (isLoggedIn && role === "public")) {
// 		return null; // Allow access to public routes
// 	} else if (isLoggedIn && role === "user" && userRoutes.includes(path)) {
// 		return null; // Allow access to user routes for users
// 	} else if (isLoggedIn && role === "admin" && adminRoutes.includes(path)) {
// 		return null; // Allow access to admin routes for admins
// 	} else {
// 		// Redirect to login if user is not authenticated or not authorized for the requested route
// 		return NextResponse.redirect(new URL("/login", request.nextUrl));
// 	}
// }

// function parseRoleFromToken(token: string): string {
// 	try {
// 		// Decode the JWT token to get the payload
// 		const decodedToken = jwt.decode(token);

// 		// Extract the role claim from the payload
// 		const role = decodedToken?.role;

// 		// Check if role exists and return it
// 		if (role) {
// 			return role;
// 		} else {
// 			// If role doesn't exist in token, return a default role
// 			return "public";
// 		}
// 	} catch (error) {
// 		console.error("Error parsing token:", error);
// 		return "public"; // Return default role in case of error
// 	}
// }

// export const config = {};
