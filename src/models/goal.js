import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true }, // uuid token
  name: { type: String, required: true },
  email: { type: String, required: true },
  goal: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Goal || mongoose.model("Goal", GoalSchema);
