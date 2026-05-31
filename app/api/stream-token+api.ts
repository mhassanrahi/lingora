import { StreamClient } from "@stream-io/node-sdk";

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_API_SECRET;

export async function POST(request: Request) {
  if (!API_KEY || !API_SECRET) {
    return Response.json(
      { error: "Stream is not configured on the server" },
      { status: 500 }
    );
  }

  let body: { userId?: string; userName?: string; lessonId?: string; language?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { userId, userName, lessonId, language } = body;

  if (!userId || !lessonId) {
    return Response.json(
      { error: "userId and lessonId are required" },
      { status: 400 }
    );
  }

  const client = new StreamClient(API_KEY, API_SECRET);

  // Generate a user token (~4 hour TTL)
  const token = client.generateUserToken({
    user_id: userId,
    validity_in_seconds: 60 * 60 * 4,
  });

  // Derive a stable, per-user call ID for this lesson
  const safeUserId = userId.replace(/[^a-zA-Z0-9]/g, "").substring(0, 10);
  const safeLessonId = lessonId.replace(/[^a-zA-Z0-9-]/g, "");
  const callId = `lesson-${safeLessonId}-${safeUserId}`;

  return Response.json({
    apiKey: API_KEY,
    token,
    callId,
    userId,
    userName: userName ?? userId,
    language: language ?? "unknown",
  });
}
