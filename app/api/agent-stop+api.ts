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
      `${AGENT_SERVER_URL}/calls/${callId}/sessions/${sessionId}`,
      { method: "DELETE" }
    );

    // 404 means the agent already left — that's fine
    if (!res.ok && res.status !== 404) {
      console.error("[agent-stop] Agent server error:", res.status);
      return Response.json({ error: "Failed to stop agent" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[agent-stop] Cannot reach agent server:", err);
    return Response.json(
      { error: "Agent server is unreachable" },
      { status: 503 }
    );
  }
}
