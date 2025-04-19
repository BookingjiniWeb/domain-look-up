import mongoose from "mongoose";

const LookupSchema = new mongoose.Schema({
    propertyName: { type: String, required: true, unique: true },
    propertyId: { type: String, required: true, unique: true },
    accountManager: { type: String, required: true },
    email: { type: String, required: true },
    url: { type: String, required: true },
});

// Prevent multiple model registration
export default mongoose.models.Lookup || mongoose.model("Lookup", LookupSchema);
