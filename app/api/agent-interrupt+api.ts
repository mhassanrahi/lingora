const AGENT_SERVER_URL =
  process.env.AGENT_SERVER_URL ?? "http://localhost:8000";

export async function POST(request: Request) {
  let body: { callId?: string; sessionId?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { callId, sessionId } = body;
  if (!callId || !sessionId) {
    return Response.json(
      { error: "callId and sessionId are required" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${AGENT_SERVER_URL}/calls/${callId}/sessions/${sessionId}/interrupt`,
      { method: "POST" }
    );
    if (!res.ok) {
      return Response.json({ error: "Interrupt failed" }, { status: res.status });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Agent server unreachable" }, { status: 503 });
  }
}
