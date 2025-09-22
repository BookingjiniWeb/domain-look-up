import mongoose from "mongoose";

const Ceomessage = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Feedback || mongoose.model("Feedback", Ceomessage);
