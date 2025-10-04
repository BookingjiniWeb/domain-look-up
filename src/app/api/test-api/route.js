import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    // Construct absolute path to JSON file in project root
    const filePath = path.join(process.cwd(), "test_db.json");

    // Read file
    const fileContents = await readFile(filePath, "utf-8");

    // Parse JSON
    const data = JSON.parse(fileContents);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error reading JSON file:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
