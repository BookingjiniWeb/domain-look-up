import connect from "@/dbConfig/dbconfig";
import Goal from "@/models/goal";

export async function POST(req) {
  try {
    await connect(); // connect to DB
    const { token, name, email, goal } = await req.json();

    // Check if a goal with this token already exists
    const existing = await Goal.findOne({ token });

    if (existing) {
      // Update the existing goal
      existing.goal = goal;
      existing.updatedAt = new Date();
      await existing.save();

      return new Response(JSON.stringify({ message: "Goal updated!" }), { status: 200 });
    }

    // If token doesn't exist, create a new goal
    const newGoal = new Goal({
      token,
      name,
      email,
      goal,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newGoal.save();

    return new Response(JSON.stringify({ message: "Goal saved!" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
