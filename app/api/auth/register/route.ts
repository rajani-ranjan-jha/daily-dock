import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(reqest: NextRequest) {
  try {
    const { name, email, password } = await reqest.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}