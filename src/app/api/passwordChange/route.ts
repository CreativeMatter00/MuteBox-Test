import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
	try {
		const cookies = request.cookies as any; // Type assertion

		// ? Check if cookies are available and token cookie exists

		if (cookies && cookies._parsed && cookies._parsed.has("token")) {
			const tokenValue = cookies._parsed.get("token").value;

			// ? Verify token if JWT_SECRET is defined

			if (!process.env.JWT_SECRET) {
				throw new Error("JWT_SECRET is not defined");
			}

			// ? Verify token and assert its type as 'any'

			const decodedToken: any = jwt.verify(tokenValue, process.env.JWT_SECRET);

			if (!decodedToken || !decodedToken.userId) {
				return NextResponse.json({ error: "Invalid token" }, { status: 401 });
			}

			const reqBody = await request.json();
			const { oldPassword, newPassword } = reqBody;

			const userId = decodedToken.userId;

			// ? Find the user by user ID
			const user = await User.findById(userId);

			// ? If the user doesn't exist, return an error
			if (!user) {
				return NextResponse.json({ error: "User not found" }, { status: 404 });
			}

			// ? Check if the provided old password matches the user's current password
			const validOldPassword = await bcryptjs.compare(
				oldPassword,
				user.password
			);

			// ? If the old password is incorrect, return an error
			if (!validOldPassword) {
				return NextResponse.json(
					{ error: "Incorrect old password" },
					{ status: 400 }
				);
			}

			// ? Hash the new password and save
			const hashedPassword = await bcryptjs.hash(newPassword, 10);

			user.password = hashedPassword;
			await user.save();

			return NextResponse.json({
				message: "Password changed successfully",
				success: true,
			});
		}
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
