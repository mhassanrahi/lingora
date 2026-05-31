import { images } from "@/constants/images";
import { getLessonById } from "@/data/lessons";
import { interruptAgent, startAgent, stopAgent } from "@/lib/streamApi";
import { useLanguageStore } from "@/store/languageStore";
import type { PhraseItem } from "@/types/learning";
import { useUser } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Call,
  CallingState,
  StreamCall,
  useCall,
  useCallStateHooks,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SessionPhase = "intro" | "teaching" | "feedback";
type AgentStatus = "idle" | "connecting" | "connected" | "failed";

const { width: SCREEN_W } = Dimensions.get("window");

const FEEDBACK = [
  { label: "Speaking", value: "Excellent", color: "#21C168" },
  { label: "Pronunciation", value: "Great", color: "#00BFA5" },
  { label: "Grammar", value: "Good", color: "#6C4EF5" },
];

const AGENT_USER_ID = "lingora-teacher";

// ─── Agent status badge ───────────────────────────────────────────────────────

function AgentStatusBadge({ status }: { status: AgentStatus }) {
  const config: Record<AgentStatus, { color: string; label: string }> = {
    idle: { color: "#6B7280", label: "Waiting" },
    connecting: { color: "#F59E0B", label: "Summoning teacher..." },
    connected: { color: "#21C168", label: "Teacher joined" },
    failed: { color: "#FF4D4F", label: "Teacher unavailable" },
  };
  const { color, label } = config[status];
  return (
    <View style={[styles.agentBadge, { borderColor: color }]}>
      {status === "connecting" ? (
        <ActivityIndicator size={8} color={color} style={styles.agentSpinner} />
      ) : (
        <View style={[styles.agentDot, { backgroundColor: color }]} />
      )}
      <Text style={[styles.agentLabel, { color }]}>{label}</Text>
    </View>
  );
}

// ─── Lesson body — lives inside <StreamCall> for hook access ─────────────────

function LessonBody({
  lessonId,
  callId,
  sessionId,
  joinError,
  agentStatus,
  onAgentConnected,
  onBack,
  onEndCall,
}: {
  lessonId: string;
  callId: string;
  sessionId: string | null;
  joinError: string | null;
  agentStatus: AgentStatus;
  onAgentConnected: () => void;
  onBack: () => void;
  onEndCall: () => Promise<void>;
}) {
  const lesson = getLessonById(lessonId);
  const call = useCall();
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participants = useParticipants();

  const [phase, setPhase] = useState<SessionPhase>("intro");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isPtt, setIsPtt] = useState(false);

  const phrases: PhraseItem[] =
    lesson?.activities.find((a) => a.type === "phrase")?.phrases ?? [];

  const isConnecting =
    callingState === CallingState.IDLE ||
    callingState === CallingState.JOINING ||
    callingState === CallingState.RECONNECTING;
  const isJoined = callingState === CallingState.JOINED;
  const isEnded = callingState === CallingState.LEFT;
  const hasError = !!joinError;

  // Detect when the AI teacher participant joins
  useEffect(() => {
    if (agentStatus === "connected") return;
    const agentParticipant = participants.find(
      (p) => p.userId === AGENT_USER_ID
    );
    if (agentParticipant) {
      onAgentConnected();
    }
  }, [participants, agentStatus, onAgentConnected]);

  // Auto-advance lesson phases once joined and teacher is present
  useEffect(() => {
    if (!lesson || !isJoined || agentStatus !== "connected") return;
    if (phase === "intro") {
      const t = setTimeout(() => setPhase("teaching"), 3200);
      return () => clearTimeout(t);
    }
    if (phase === "teaching" && phrases.length > 0) {
      const t = setTimeout(() => {
        if (phraseIdx < phrases.length - 1) {
          setPhraseIdx((i) => i + 1);
        } else {
          setPhase("feedback");
        }
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [phase, phraseIdx, lesson, phrases.length, isJoined, agentStatus]);

  if (!lesson) return null;

  // ── Derived display values ──────────────────────────────────────────────────

  const dotColor = hasError
    ? "#FF4D4F"
    : isEnded
      ? "#6B7280"
      : isConnecting
        ? "#F59E0B"
        : "#21C168";

  const sessionLabel = hasError
    ? "Connection error"
    : isEnded
      ? "Session ended"
      : isConnecting
        ? callingState === CallingState.RECONNECTING
          ? "Reconnecting..."
          : "Connecting..."
        : agentStatus === "connecting"
          ? "Summoning teacher..."
          : agentStatus === "failed"
            ? "Teacher unavailable"
            : phase === "intro"
              ? "Starting session..."
              : phase === "teaching"
                ? `Phrase ${phraseIdx + 1} of ${phrases.length}`
                : "Great session!";

  const onlineLabel = hasError
    ? "Error"
    : isEnded
      ? "Ended"
      : isConnecting
        ? "Connecting"
        : agentStatus === "failed"
          ? "Error"
          : "Live";

  const bubbleText =
    isConnecting || hasError || isEnded
      ? isConnecting
        ? "Preparing your lesson..."
        : hasError
          ? (joinError ?? "Could not connect")
          : "Session has ended."
      : agentStatus === "connecting"
        ? "Your AI teacher is joining the session..."
        : agentStatus === "failed"
          ? "Could not connect the AI teacher. You can still practise!"
          : phase === "intro"
            ? (lesson.aiTeacherPrompt.intro ?? "")
            : phase === "feedback"
              ? (lesson.aiTeacherPrompt.encouragement ?? "")
              : (phrases[phraseIdx]?.phrase ?? "");

  const bubbleTranslation =
    isJoined && phase === "teaching" && agentStatus === "connected"
      ? (phrases[phraseIdx]?.translation ?? "")
      : "";

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handlePttStart = async () => {
    if (!call || !isJoined) return;
    setIsPtt(true);
    // Interrupt the agent immediately so it stops speaking before the student talks.
    if (callId && sessionId) {
      interruptAgent({ callId, sessionId }).catch(console.error);
    }
    try {
      await call.microphone.enable();
    } catch (err) {
      console.error("Mic enable failed", err);
    }
  };

  const handlePttEnd = async () => {
    if (!call || !isJoined) return;
    setIsPtt(false);
    try {
      await call.microphone.disable();
    } catch (err) {
      console.error("Mic disable failed", err);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Header ───────────────────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} hitSlop={8}>
          <Ionicons name="chevron-back" size={26} color="white" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>AI Teacher</Text>
          <View style={styles.onlineRow}>
            <View style={[styles.onlineDot, { backgroundColor: dotColor }]} />
            <Text style={[styles.onlineLabel, { color: dotColor }]}>
              {onlineLabel}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.endCallHeaderBtn}
          onPress={onEndCall}
          activeOpacity={0.8}
        >
          <View style={styles.endCallHeaderIcon}>
            <Ionicons name="call" size={18} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <View style={styles.body}>
        {/* Teacher area */}
        <View style={styles.teacherArea}>
          {/* Connecting overlay */}
          {isConnecting && !hasError && (
            <View style={styles.connectingOverlay}>
              <ActivityIndicator size="large" color="#6C4EF5" />
              <Text style={styles.connectingText}>
                {callingState === CallingState.RECONNECTING
                  ? "Reconnecting to session..."
                  : "Joining session..."}
              </Text>
            </View>
          )}

          {/* Mascot */}
          <Image
            source={images.mascotWelcome}
            style={styles.mascot}
            resizeMode="contain"
          />

          {/* Session status pill */}
          <View style={styles.statusPill}>
            <View style={[styles.statusDot, { backgroundColor: dotColor }]} />
            <Text style={styles.statusText}>{sessionLabel}</Text>
          </View>

          {/* Agent connection badge */}
          {isJoined && (
            <View style={styles.agentBadgeWrap}>
              <AgentStatusBadge status={agentStatus} />
            </View>
          )}

          {/* Teacher speech bubble */}
          <View style={styles.bubble}>
            <View style={styles.bubbleInner}>
              <View style={styles.bubbleTexts}>
                <Text style={styles.bubbleMain} numberOfLines={2}>
                  {bubbleText}
                </Text>
                {bubbleTranslation ? (
                  <Text style={styles.bubbleSub}>{bubbleTranslation}</Text>
                ) : null}
              </View>
              <TouchableOpacity hitSlop={8} disabled={!isJoined}>
                <Ionicons
                  name="volume-medium"
                  size={22}
                  color={isJoined ? "#6C4EF5" : "#C4C4C4"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── Push-to-talk ─────────────────────────────────────── */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={[
              styles.pttBtn,
              isPtt && styles.pttBtnActive,
              !isJoined && styles.pttBtnDisabled,
            ]}
            onPressIn={handlePttStart}
            onPressOut={handlePttEnd}
            activeOpacity={1}
            disabled={!isJoined}
          >
            <Ionicons
              name={isPtt ? "mic" : "mic-outline"}
              size={32}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.pttLabel}>
            {!isJoined
              ? "Connecting..."
              : isPtt
                ? "Listening..."
                : "Push & Hold to speak"}
          </Text>
        </View>

        {/* ── Feedback ─────────────────────────────────────────── */}
        <View style={styles.feedbackRow}>
          {FEEDBACK.map((item, idx) => (
            <View
              key={item.label}
              style={[
                styles.feedbackItem,
                idx < FEEDBACK.length - 1 && styles.feedbackDivider,
              ]}
            >
              <Text style={styles.feedbackLabel}>{item.label}</Text>
              <Text style={[styles.feedbackValue, { color: item.color }]}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

// ─── Root screen — manages call + agent lifecycle ────────────────────────────

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lesson = getLessonById(id ?? "");
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { selectedLanguage } = useLanguageStore();

  const [call, setCall] = useState<Call | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [activeCallId, setActiveCallId] = useState<string>("");

  const leavingRef = useRef(false);
  const sessionIdRef = useRef<string | null>(null);
  const callIdRef = useRef<string | null>(null);
  const agentStopFiredRef = useRef(false);

  // ── Shared cleanup helpers ───────────────────────────────────────────────

  const fireStopAgent = () => {
    if (
      agentStopFiredRef.current ||
      !sessionIdRef.current ||
      !callIdRef.current
    )
      return;
    agentStopFiredRef.current = true;
    stopAgent({
      callId: callIdRef.current,
      sessionId: sessionIdRef.current,
    });
  };

  // ── Call + agent lifecycle ───────────────────────────────────────────────

  useEffect(() => {
    const userId = user?.id;
    if (!client || !userId || !lesson) return;

    leavingRef.current = false;
    agentStopFiredRef.current = false;
    sessionIdRef.current = null;
    callIdRef.current = null;
    setJoinError(null);
    setAgentStatus("idle");
    setSessionId(null);

    const safeUserId = userId.replace(/[^a-zA-Z0-9]/g, "").substring(0, 10);
    const callId = `lesson-${id}-${safeUserId}`;
    callIdRef.current = callId;
    setActiveCallId(callId);

    const c = client.call("audio_room", callId, { reuseInstance: true });
    setCall(c);

    c.camera.disable().catch(console.error);

    c.join({ create: true })
      .then(async () => {
        // Disable mic immediately so no ambient audio interferes with the
        // agent's opening speech — the agent will auto-start via simple_response.
        await c.microphone.disable().catch(console.error);
        setAgentStatus("connecting");
        return startAgent({
          callId,
          lessonId: id ?? "",
          language: selectedLanguage ?? id?.split("-")[0] ?? "en",
          userId,
        });
      })
      .then(({ sessionId: sid }) => {
        sessionIdRef.current = sid;
        setSessionId(sid);
      })
      .catch((err: unknown) => {
        const msg =
          err instanceof Error ? err.message : "Failed to start the session";
        if (agentStatus === "idle") {
          setJoinError(msg);
        } else {
          console.warn("[lesson] Agent start failed:", msg);
          setAgentStatus("failed");
        }
      });

    return () => {
      fireStopAgent();
      if (!leavingRef.current && c.state.callingState !== CallingState.LEFT) {
        leavingRef.current = true;
        c.leave().catch(console.error);
      }
      setCall(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, user?.id, id, lesson]);

  // ── Handlers ────────────────────────────────────────────────────────────

  const handleBack = () => router.back();

  const handleEndCall = async () => {
    fireStopAgent();
    if (
      call &&
      !leavingRef.current &&
      call.state.callingState !== CallingState.LEFT
    ) {
      leavingRef.current = true;
      await call.leave().catch(console.error);
    }
    router.back();
  };

  const handleAgentConnected = () => setAgentStatus("connected");

  // ── Render ──────────────────────────────────────────────────────────────

  if (!lesson) return null;

  if (!call) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} hitSlop={8}>
            <Ionicons name="chevron-back" size={26} color="white" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>AI Teacher</Text>
            <View style={styles.onlineRow}>
              <View
                style={[styles.onlineDot, { backgroundColor: "#F59E0B" }]}
              />
              <Text style={[styles.onlineLabel, { color: "#F59E0B" }]}>
                Connecting
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={16} color="#6C4EF5" />
            </View>
          </View>
        </View>
        <View style={[styles.body, styles.bodyLoading]}>
          <ActivityIndicator size="large" color="#6C4EF5" />
          <Text style={styles.loadingText}>Setting up your session…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StreamCall call={call}>
        <LessonBody
          lessonId={id ?? ""}
          callId={activeCallId}
          sessionId={sessionId}
          joinError={joinError}
          agentStatus={agentStatus}
          onAgentConnected={handleAgentConnected}
          onBack={handleBack}
          onEndCall={handleEndCall}
        />
      </StreamCall>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0D0B1E",
  },

  // ── Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#0D0B1E",
  },
  headerCenter: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    lineHeight: 22,
    color: "white",
  },
  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 1,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#21C168",
  },
  onlineLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: "#21C168",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EEF0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  endCallHeaderBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FF4D4F",
    alignItems: "center",
    justifyContent: "center",
  },
  endCallHeaderIcon: {
    transform: [{ rotate: "135deg" }],
  },

  // ── Body
  body: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  bodyLoading: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  loadingText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#6B7280",
  },

  // ── Teacher area
  teacherArea: {
    flex: 1,
    backgroundColor: "#EEF0FF",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  connectingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(238,240,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    gap: 12,
  },
  connectingText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#6C4EF5",
  },
  mascot: {
    width: SCREEN_W * 0.72,
    height: SCREEN_W * 0.72,
    marginBottom: 90,
  },
  statusPill: {
    position: "absolute",
    top: 14,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(13,11,30,0.55)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#21C168",
  },
  statusText: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    lineHeight: 15,
    color: "white",
  },

  // ── Agent status badge
  agentBadgeWrap: {
    position: "absolute",
    top: 46,
    left: 16,
  },
  agentBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(13,11,30,0.55)",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  agentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  agentSpinner: {
    width: 8,
    height: 8,
  },
  agentLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    lineHeight: 14,
  },

  // ── Bubble
  bubble: {
    position: "absolute",
    bottom: 14,
    left: 14,
    right: 14,
    backgroundColor: "white",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  bubbleInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 13,
    gap: 10,
  },
  bubbleTexts: {
    flex: 1,
  },
  bubbleMain: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    lineHeight: 20,
    color: "#001328",
  },
  bubbleSub: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: "#6B7280",
    marginTop: 2,
  },

  // ── Push-to-talk controls
  controls: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  pttBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#2A2040",
    alignItems: "center",
    justifyContent: "center",
  },
  pttBtnActive: {
    backgroundColor: "#6C4EF5",
  },
  pttBtnDisabled: {
    opacity: 0.4,
  },
  pttLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
  },

  // ── Feedback
  feedbackRow: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  feedbackItem: {
    flex: 1,
    alignItems: "center",
  },
  feedbackDivider: {
    borderRightWidth: 1,
    borderRightColor: "#F3F4F6",
  },
  feedbackLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    lineHeight: 18,
    color: "#6B7280",
  },
  feedbackValue: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 1,
  },
});
