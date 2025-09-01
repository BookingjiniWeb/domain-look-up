import { NextResponse } from "next/server";
import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
  name: String,
  email: String,
  goal: String,
  submittedAt: { type: Date, default: Date.now }
});

const Goal = mongoose.models.Goal || mongoose.model("Goal", GoalSchema);

async function connectDB() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const newGoal = new Goal(data);
    await newGoal.save();
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}

export async function GET() {
  try {
    await connectDB();
    const goals = await Goal.find();
    return NextResponse.json(goals);
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
