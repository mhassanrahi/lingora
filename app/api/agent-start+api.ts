import { getLessonById } from "@/data/lessons";
import { StreamClient } from "@stream-io/node-sdk";

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_API_SECRET;
// Vision Agent HTTP server URL — set AGENT_SERVER_URL in .env for production
const AGENT_SERVER_URL =
  process.env.AGENT_SERVER_URL ?? "http://localhost:8000";

const AGENT_USER_ID = "lingora-teacher";
const CALL_TYPE = "audio_room";

export async function POST(request: Request) {
  if (!API_KEY || !API_SECRET) {
    return Response.json(
      { error: "Stream is not configured on the server" },
      { status: 500 }
    );
  }

  let body: {
    callId?: string;
    lessonId?: string;
    language?: string;
    userId?: string;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { callId, lessonId, language, userId } = body;
  if (!callId || !lessonId || !language || !userId) {
    return Response.json(
      { error: "callId, lessonId, language, and userId are required" },
      { status: 400 }
    );
  }

  const lesson = getLessonById(lessonId);
  if (!lesson) {
    return Response.json({ error: "Lesson not found" }, { status: 404 });
  }

  const client = new StreamClient(API_KEY, API_SECRET);
  const callRef = client.video.call(CALL_TYPE, callId);

  // Flatten lesson data for Stream custom fields (all values must be strings)
  const vocabActivity = lesson.activities.find((a) => a.type === "vocabulary");
  const phraseActivity = lesson.activities.find((a) => a.type === "phrase");

  const customData = {
    lesson_id: lessonId,
    lesson_title: lesson.title,
    language,
    goals: JSON.stringify(lesson.goals.map((g) => g.description)),
    vocabulary: JSON.stringify(
      (vocabActivity?.vocabulary ?? []).map(
        (v) =>
          `${v.word} (${v.translation})${v.pronunciation ? ` — ${v.pronunciation}` : ""}`
      )
    ),
    phrases: JSON.stringify(
      (phraseActivity?.phrases ?? []).map(
        (p) =>
          `${p.phrase} (${p.translation})${p.pronunciation ? ` — ${p.pronunciation}` : ""}`
      )
    ),
    ai_teacher_prompt: JSON.stringify(lesson.aiTeacherPrompt),
  };

  try {
    // Ensure both the agent and student exist in Stream before using them in call ops
    await client.upsertUsers([
      { id: AGENT_USER_ID, name: "Lingora", role: "admin" },
      { id: userId },
    ]);

    // Get or create the call — created_by_id is required with server-side auth
    await callRef.getOrCreate({ data: { created_by_id: userId } });

    // Stamp lesson context onto the call's custom data
    await callRef.update({ custom: customData });

    // Give agent host role so it can publish audio in audio_room
    await callRef.updateCallMembers({
      update_members: [{ user_id: AGENT_USER_ID, role: "host" }],
    });

    // Grant student send-audio permission so they can speak after goLive
    await callRef.updateUserPermissions({
      user_id: userId,
      grant_permissions: ["send-audio"],
    });

    // Transition call to live — both agent and student can now publish audio
    await callRef.goLive();
  } catch (err) {
    console.error("[agent-start] Stream call setup failed:", err);
    return Response.json(
      { error: "Failed to configure call" },
      { status: 500 }
    );
  }

  // Ask the Vision Agent server to spawn an agent for this call
  try {
    const agentRes = await fetch(
      `${AGENT_SERVER_URL}/calls/${callId}/sessions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ call_type: CALL_TYPE }),
      }
    );

    if (!agentRes.ok) {
      const text = await agentRes.text().catch(() => "");
      console.error("[agent-start] Agent server error:", agentRes.status, text);
      return Response.json(
        { error: "Agent server rejected the request" },
        { status: 502 }
      );
    }

    const agentData: { session_id: string } = await agentRes.json();
    return Response.json({ sessionId: agentData.session_id }, { status: 201 });
  } catch (err) {
    console.error("[agent-start] Cannot reach agent server:", err);
    return Response.json(
      { error: "Agent server is unreachable" },
      { status: 503 }
    );
  }
}
