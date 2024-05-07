import { connect } from "@/dbConfig/dbConfig";
import Option from "@/models/optionModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    console.log("reqBody", reqBody);

    // ? Manually set the createdAt field
    reqBody.createdAt = new Date().toLocaleString();

    const newPost = new Option(reqBody);

    const savedPost = await newPost.save();

    return NextResponse.json({
      message: "Message sent successfully",
      success: true,
      savedPost,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookies = request.cookies as any; // Type assertion

    // Check if cookies are available and token cookie exists
    if (cookies && cookies._parsed && cookies._parsed.has("token")) {
      const tokenValue = cookies._parsed.get("token").value;

      // Verify token if JWT_SECRET is defined
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }

      // Verify token and assert its type as 'any'
      const decodedToken: any = jwt.verify(tokenValue, process.env.JWT_SECRET);

      if (!decodedToken || !decodedToken.userId) {
        // Token is invalid, return 401 Unauthorized
        return NextResponse.json(
          { error: "Invalid token", status: 401 },
          { status: 401 }
        );
      }

      // Token is valid, proceed to fetch posts
      const posts = await Option.find().sort({ createdAt: -1 });
      return NextResponse.json(posts);
    } else {
      // Token cookie is missing, return 401 Unauthorized
      return NextResponse.json(
        { error: "Token is missing", status: 401 },
        { status: 401 }
      );
    }
  } catch (error: any) {
    // Catch other errors and return 500 Internal Server Error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
