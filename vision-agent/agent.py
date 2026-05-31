import json
import os
from pathlib import Path
from dotenv import load_dotenv

# Load parent .env first — provides STREAM_API_KEY and STREAM_API_SECRET
load_dotenv(Path(__file__).parent.parent / ".env")
# Load local .env — provides OPENAI_API_KEY (won't override parent keys)
load_dotenv(Path(__file__).parent / ".env")

from getstream import AsyncStream
from vision_agents.core import Agent, AgentLauncher, User, Runner
from vision_agents.plugins import getstream, gemini

INSTRUCTIONS = """
You are Lingora, a warm, energetic, and encouraging AI language teacher.

You speak mostly English and introduce target-language words one or two at a time,
always with their translation and pronunciation. You never switch to another language
or stray outside the current lesson's vocabulary and phrases.

Your teaching style:
- Human and natural — use contractions, short sentences, and conversational speech
- Energetic and warm — celebrate every attempt, even small ones
- Strictly lesson-focused — only teach the words and phrases listed in today's lesson plan;
  never introduce unrelated topics or vocabulary
- One or two sentences per turn — say something, then pause and listen to the student
- Adaptive — if the student struggles, slow down and invite them to try again;
  if they succeed, praise them briefly and move forward
- Patient — always ask the student to repeat after you or have another go

Never lecture. Never string together long explanations. Keep every response to one or
two short conversational sentences, then wait for the student to respond.
"""


async def _build_lesson_prompt(call_type: str, call_id: str) -> str:
    """Fetch lesson context from Stream call custom data and return a session-start prompt."""
    try:
        client = AsyncStream(
            api_key=os.environ["STREAM_API_KEY"],
            api_secret=os.environ["STREAM_API_SECRET"],
        )
        response = await client.video.call(call_type, call_id).get()
        custom: dict = response.data.call.custom or {}
    except Exception as exc:
        print(f"[agent] Could not fetch call custom data: {exc}")
        custom = {}

    language = custom.get("language", "the target language")
    lesson_title = custom.get("lesson_title", "today's lesson")

    try:
        goals: list[str] = json.loads(custom.get("goals", "[]"))
    except Exception:
        goals = []

    try:
        vocabulary: list[str] = json.loads(custom.get("vocabulary", "[]"))
    except Exception:
        vocabulary = []

    try:
        phrases: list[str] = json.loads(custom.get("phrases", "[]"))
    except Exception:
        phrases = []

    try:
        ai_teacher_prompt: dict = json.loads(custom.get("ai_teacher_prompt", "{}"))
    except Exception:
        ai_teacher_prompt = {}

    lines = [
        f"The student has joined. Start the lesson now.",
        f"",
        f"Lesson: {lesson_title}",
        f"Language to teach: {language}",
    ]

    if ai_teacher_prompt.get("intro"):
        lines += ["", f"Opening: {ai_teacher_prompt['intro']}"]

    if goals:
        lines += ["", "Goals for this session:"]
        lines += [f"  - {g}" for g in goals]

    if vocabulary:
        lines += ["", "Vocabulary to cover:"]
        lines += [f"  - {v}" for v in vocabulary]

    if phrases:
        lines += ["", "Phrases to cover:"]
        lines += [f"  - {p}" for p in phrases]

    if ai_teacher_prompt.get("closing"):
        lines += ["", f"Closing note: {ai_teacher_prompt['closing']}"]

    lines += [
        "",
        "Begin with the opening line above, then introduce the first vocabulary word with its "
        "translation and pronunciation. Keep every reply to one or two short sentences, then "
        "pause and listen. Ask the student to repeat each word after you. If they struggle, "
        "encourage them gently and invite them to try again. "
        "Stay strictly within this lesson — do not teach any words, phrases, or topics that "
        "are not listed above.",
    ]

    return "\n".join(lines)


async def create_agent(**kwargs) -> Agent:
    return Agent(
        edge=getstream.Edge(),
        agent_user=User(name="Lingora", id="lingora-teacher"),
        instructions=INSTRUCTIONS,
        # gemini.Realtime handles both STT and TTS — no separate stt/tts plugins needed
        llm=gemini.Realtime(),
    )


async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    lesson_prompt = await _build_lesson_prompt(call_type, call_id)
    call = await agent.create_call(call_type, call_id)
    async with agent.join(call):
        await agent.simple_response(lesson_prompt)
        await agent.finish()


if __name__ == "__main__":
    Runner(AgentLauncher(create_agent=create_agent, join_call=join_call)).cli()
