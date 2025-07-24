import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = "your_secret_key_here"; // replace with env variable in production

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const isAdmin =
      email === "shitansu.gochhayat@bookingjini.co" &&
      password === "shitansu@123";

    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    // Create a JWT token
    const token = jwt.sign({ email, role: "admin" }, SECRET, { expiresIn: "1h" });

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
