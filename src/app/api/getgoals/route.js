import connect from "@/dbConfig/dbconfig";
import Goal from "@/models/goal";

export async function GET() {
  try {
    await connect();

    // Aggregate to get latest goal per user (group by email)
    const latestGoals = await Goal.aggregate([
      { $sort: { createdAt: -1 } }, // sort latest first
      {
        $group: {
          _id: "$email",       // group by email
          name: { $first: "$name" },
          goal: { $first: "$goal" },
          createdAt: { $first: "$createdAt" },
        },
      },
      { $sort: { createdAt: -1 } }, // optional: sort users by latest submission
    ]);

    return new Response(JSON.stringify(latestGoals), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
