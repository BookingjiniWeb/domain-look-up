import connect from "@/dbConfig/dbconfig";
import { NextResponse } from "next/server";
import Feedback from "@/models/feedModels";

export async function GET(req) {
    await connect();

    try {
        const { searchParams } = new URL(req.url);
        const fromDate = searchParams.get("from");
        const toDate = searchParams.get("to");

        let query = {};

        if (fromDate && toDate) {
            const start = new Date(fromDate);
            start.setHours(0, 0, 0, 0);

            const end = new Date(toDate);
            end.setHours(23, 59, 59, 999);

            query.timestamp = { $gte: start, $lte: end };
        }

        const feedback = await Feedback.find(query);

        return NextResponse.json({ success: true, data: feedback }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export const dynamic = "force-dynamic"; // Ensures the API always fetches fresh data
