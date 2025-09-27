// app/api/submit/route.js

import connect from "@/dbConfig/dbconfig";
import Application from "@/models/devModels";

// POST: Save a new job application
export async function POST(req) {
    try {
        await connect(); // Connect to MongoDB

        const body = await req.json();

        const {
            name,
            email,
            phone,
            linkedin,
            exp,
            doj,
            ctc,
            expected,
            skills,
        } = body;

        // Basic validation
        if (!name || !email || !phone) {
            return new Response(
                JSON.stringify({ error: "Name, email, and phone are required." }),
                { status: 400 }
            );
        }

        // Normalize skills array (convert to array of strings)
        const skillValues = Array.isArray(skills)
            ? skills.map((s) => (typeof s === "string" ? s : s.value))
            : [];

        // Create new application
        const newApplication = new Application({
            name,
            email,
            phone,
            linkedin,
            exp,
            doj,
            ctc,
            expected,
            skills: skillValues,
        });

        await newApplication.save();

        console.log("New Application Saved:", newApplication);

        return new Response(
            JSON.stringify({ success: true, id: newApplication._id }),
            { status: 201 }
        );

    } catch (err) {
        console.error("Error saving application:", err);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}




export async function GET(req) {
    try {
        await connect(); // Connect to MongoDB

        const applications = await Application.find().sort({ createdAt: -1 });

        return new Response(JSON.stringify(applications), { status: 200 });
    } catch (err) {
        console.error("Error fetching applications:", err);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
