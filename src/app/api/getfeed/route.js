import connect from "@/dbConfig/dbconfig";
import { NextResponse } from "next/server";
import Feedback from "@/models/feedModels";

export async function GET(req, res) {
    await connect();
    try {
        const feedback = await Feedback.find();
        // console.log(feedback)
        return NextResponse.json({ message: "success", data: feedback }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}