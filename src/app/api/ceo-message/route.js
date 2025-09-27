// app/api/ceo-message/route.js
import connect from "@/dbConfig/dbconfig";
import Feedback from "@/models/ceoModels";

// POST: Save a new CEO message
export async function POST(req) {
    try {
        await connect(); // connect to MongoDB

        const body = await req.json();
        const { name, message } = body;

        if (!name || !message) {
            return new Response(
                JSON.stringify({ error: "Name and message are required" }),
                { status: 400 }
            );
        }

        const newFeedback = new Feedback({ name, message });
        await newFeedback.save();

        return new Response(
            JSON.stringify({ success: true, id: newFeedback._id }),
            { status: 200 }
        );
    } catch (err) {
        console.error("Error saving message:", err);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}

// GET: Fetch all CEO messages


export async function GET() {
    try {
        await connect(); // connect to MongoDB

        const messages = await Feedback.find().sort({ createdAt: -1 }); // latest first

        return new Response(JSON.stringify(messages), { status: 200 });
    } catch (err) {
        console.error("Error fetching messages:", err);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
