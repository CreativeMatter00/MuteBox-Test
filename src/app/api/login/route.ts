import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { username, password } = reqBody;

		// ? check if user exists

		const user = await User.findOne({ username });

		if (!user) {
			return NextResponse.json(
				{ error: "User doesn't exist" },
				{ status: 400 }
			);
		}

		// ? check if password is correct

		const validPassword = await bcryptjs.compare(password, user.password);

		if (!validPassword) {
			return NextResponse.json(
				{ error: "Incorrect password" },
				{ status: 400 }
			);
		}

		// ? Verify token if JWT_SECRET is defined

		if (!process.env.JWT_SECRET) {
			throw new Error("JWT_SECRET is not defined");
		}

		// ? Generate JWT token

		const token = jwt.sign(
			{ userId: user._id, role: user.role },
			process.env.JWT_SECRET,
			{
				expiresIn: "1d",
			}
		);

		const response = NextResponse.json({
			message: "login successfully",
			success: true,
		});
		response.cookies.set("token", token, {
			httpOnly: true,
		});

		return response;

		// return NextResponse.json({
		// 	message: "login successfully",
		// 	success: true,
		// 	token,
		// });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
