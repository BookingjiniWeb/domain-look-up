import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { id, email, goal } = await req.json()

    if (!id || !email || !goal) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // 🚀 Save to DB (MongoDB / PostgreSQL / etc.)
    console.log("Accepted Goal:", { id, email, goal })

    return NextResponse.json({ message: "Goal accepted successfully!" })
  } catch (error) {
    console.error("Error saving goal:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
