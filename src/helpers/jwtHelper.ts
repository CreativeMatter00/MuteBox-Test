import jwt, { JwtPayload } from "jsonwebtoken";

export default function parseRoleFromToken(token: string): string {
	try {
		// Decode the JWT token to get the payload
		const decodedToken = jwt.decode(token) as JwtPayload;

		// Extract the role claim from the payload
		const role = decodedToken?.role;

		// Check if role exists and return it
		if (role) {
			return role;
		} else {
			// If role doesn't exist in token, return a default role
			return "public";
		}
	} catch (error) {
		console.error("Error parsing token:", error);
		return "public"; // Return default role in case of error
	}
}
