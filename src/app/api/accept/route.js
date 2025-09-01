export async function POST(req) {
  try {
    const body = await req.json();
    const { goalId, email } = body;

    console.log("Accepted:", goalId, email);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
