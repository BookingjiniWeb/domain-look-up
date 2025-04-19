import connect from "@/dbConfig/dbconfig";
import { NextResponse } from "next/server";
import lookupModels from "@/models/lookupModels";

export async function POST(req) {
  try {
    await connect(); // Connect to DB
    const data = await req.json(); // Parse incoming JSON

    // Save to MongoDB
    const savedEntry = await lookupModels.create(data);

    return NextResponse.json(
      { message: "Data saved successfully", data: savedEntry },
      { status: 200 }
    );
  } catch (error) {
    console.error("DB Save Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
