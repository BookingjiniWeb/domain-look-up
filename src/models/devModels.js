// models/Application.js
import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        linkedin: { type: String },
        portfolio: { type: String },
        exp: { type: String },
        doj: { type: String },
        ctc: { type: String },
        expected: { type: String },
        skills: [{ type: String }],
    },
    { timestamps: true }
);

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
