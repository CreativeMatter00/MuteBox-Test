import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { username, password } = reqBody;

		// ? check if user already exists

		const user = await User.findOne({ username });

		if (user) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}

		// ? hash password

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		// ? create user

		const newUser = new User({ username, password: hashedPassword });

		const savedUser = await newUser.save();

		return NextResponse.json({
			message: "user created successfully",
			success: true,
			savedUser,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
