import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { email, password, role } = reqBody;

		// ? check if user already exists

		const user = await User.findOne({ email });

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

		const newUser = new User({ email, password: hashedPassword, role });

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
