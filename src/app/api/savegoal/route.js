import connect from "@/dbConfig/dbconfig";
import Goal from "@/models/goal";

export async function POST(req) {
  try {
    const { token, name, email, goal } = await req.json();
    await connect(); // connect to DB

    const newGoal = new Goal({
      token,
      name,
      email,
      goal,
    });

    await newGoal.save();

    return new Response(JSON.stringify({ message: "Goal saved!" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
