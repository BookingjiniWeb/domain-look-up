import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    property_name: { type: String, required: true },
    email: { type: String, required: true },
    rate_us: { type: String, required: true },
    need_assistance: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

// Prevent multiple model registration
export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
