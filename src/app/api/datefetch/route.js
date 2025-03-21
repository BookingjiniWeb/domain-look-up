import connect from "@/dbConfig/dbconfig";
import { NextResponse } from "next/server";
import Feedback from "@/models/feedModels";

export async function GET(req) {
    try {
        await connect(); // Ensure DB connection

        // Extract search parameters from the request URL
        const { searchParams } = new URL(req.url);
        const sdate = searchParams.get("sdate"); // Get the "date" query parameter
        const edate = searchParams.get("edate"); // Get the "date" query parameter

        console.log("Received Date:", sdate , edate);

        // if (!date) {
        //     return new Response(JSON.stringify({ error: "Date is required" }), { status: 400 });
        // }

        // Convert date string into a Date object
        const startDate = new Date(sdate);
        const endDate = new Date(edate);
        endDate.setHours(23, 59, 59, 999); // Set end of the day

        // Find feedbacks where the timestamp matches the selected date
        const feedbacks = await Feedback.find({
            timestamp: {
                $gte: startDate, // Greater than or equal to start of the day
                $lte: endDate,   // Less than or equal to end of the day
            }
        });

        return new Response(JSON.stringify({ success: true, data: feedbacks }), { status: 200 });

    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}