import { images } from "@/constants/images";
import { getLessonById } from "@/data/lessons";
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

const { width: SCREEN_W } = Dimensions.get("window");

const FEEDBACK = [
  { label: "Speaking", value: "Excellent", color: "#21C168" },
  { label: "Pronunciation", value: "Great", color: "#00BFA5" },
  { label: "Grammar", value: "Good", color: "#6C4EF5" },
];

// ─── Lesson body — lives inside <StreamCall> for hook access ─────────────────

function LessonBody({
  lessonId,
  joinError,
  onBack,
  onEndCall,
}: {
  lessonId: string;
  joinError: string | null;
  onBack: () => void;
  onEndCall: () => Promise<void>;
}) {
  const lesson = getLessonById(lessonId);
  const call = useCall();
  const { useCallCallingState, useMicrophoneState, useParticipants } =
    useCallStateHooks();
  const callingState = useCallCallingState();
  const { status: micStatus, isSpeakingWhileMuted } = useMicrophoneState();
  const participants = useParticipants();

  const [phase, setPhase] = useState<SessionPhase>("intro");
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [phraseIdx, setPhraseIdx] = useState(0);

  const phrases: PhraseItem[] =
    lesson?.activities.find((a) => a.type === "phrase")?.phrases ?? [];

  const isMuted = micStatus === "disabled";
  const isConnecting =
    callingState === CallingState.IDLE ||
    callingState === CallingState.JOINING ||
    callingState === CallingState.RECONNECTING;
  const isJoined = callingState === CallingState.JOINED;
  const isEnded = callingState === CallingState.LEFT;
  const hasError = !!joinError;

  // Auto-advance lesson phases once joined
  useEffect(() => {
    if (!lesson || !isJoined) return;
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
  }, [phase, phraseIdx, lesson, phrases.length, isJoined]);

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
        : "Live";

  const bubbleText =
    isConnecting || hasError || isEnded
      ? isConnecting
        ? "Preparing your lesson..."
        : hasError
          ? (joinError ?? "Could not connect")
          : "Session has ended."
      : phase === "intro"
        ? (lesson.aiTeacherPrompt.intro ?? "")
        : phase === "feedback"
          ? (lesson.aiTeacherPrompt.encouragement ?? "")
          : (phrases[phraseIdx]?.phrase ?? "");

  const bubbleTranslation =
    isJoined && phase === "teaching" && showSubtitles
      ? (phrases[phraseIdx]?.translation ?? "")
      : "";

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleToggleMute = async () => {
    if (!call || !isJoined) return;
    try {
      await call.microphone.toggle();
    } catch (err) {
      console.error("Mic toggle failed", err);
    }
  };

  const handleEndCall = async () => {
    await onEndCall();
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

        <View style={styles.headerRight}>
          <View style={styles.cameraWrap}>
            <Ionicons name="videocam-outline" size={20} color="white" />
            <View style={styles.cameraBadge}>
              <Text style={styles.cameraBadgeText}>{lesson.xpReward}</Text>
            </View>
          </View>
          {/* Participant count badge */}
          <View style={styles.avatar}>
            {isJoined ? (
              <Text style={styles.participantCount}>
                {participants.length}
              </Text>
            ) : (
              <Ionicons name="person" size={16} color="#6C4EF5" />
            )}
          </View>
        </View>
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

          {/* Student thumbnail */}
          <View style={styles.studentThumb}>
            {isJoined ? (
              <View style={styles.studentThumbInner}>
                <Ionicons
                  name={isMuted ? "mic-off" : "mic"}
                  size={18}
                  color={isMuted ? "#FF4D4F" : "#21C168"}
                />
                {isSpeakingWhileMuted && (
                  <Text style={styles.mutedHint}>Muted</Text>
                )}
              </View>
            ) : (
              <Ionicons
                name="person"
                size={28}
                color="rgba(255,255,255,0.7)"
              />
            )}
          </View>

          {/* Session status pill */}
          <View style={styles.statusPill}>
            <View style={[styles.statusDot, { backgroundColor: dotColor }]} />
            <Text style={styles.statusText}>{sessionLabel}</Text>
          </View>

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

        {/* ── Controls ─────────────────────────────────────────── */}
        <View style={styles.controls}>
          {/* Camera — audio-only lesson, always off */}
          <TouchableOpacity style={styles.ctrlBtn} activeOpacity={0.8} disabled>
            <Ionicons name="videocam-off-outline" size={22} color="white" />
          </TouchableOpacity>

          {/* Mic — wired to Stream microphone */}
          <TouchableOpacity
            style={[
              styles.ctrlBtn,
              isMuted && isJoined && styles.ctrlBtnActive,
              !isJoined && styles.ctrlBtnDisabled,
            ]}
            onPress={handleToggleMute}
            activeOpacity={0.8}
            disabled={!isJoined}
          >
            <Ionicons
              name={isMuted ? "mic-off" : "mic-outline"}
              size={22}
              color="white"
            />
          </TouchableOpacity>

          {/* Subtitles */}
          <TouchableOpacity
            style={[styles.ctrlBtn, showSubtitles && styles.ctrlBtnActive]}
            onPress={() => setShowSubtitles((v) => !v)}
            activeOpacity={0.8}
          >
            <Ionicons name="text-outline" size={22} color="white" />
          </TouchableOpacity>

          {/* End Call — wired to Stream call.leave() */}
          <TouchableOpacity
            style={styles.endCallBtn}
            onPress={handleEndCall}
            activeOpacity={0.8}
          >
            <View style={styles.endCallIcon}>
              <Ionicons name="call" size={22} color="white" />
            </View>
          </TouchableOpacity>
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

// ─── Root screen — manages call lifecycle ────────────────────────────────────

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lesson = getLessonById(id ?? "");
  const { user } = useUser();
  const client = useStreamVideoClient();

  const [call, setCall] = useState<Call | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);
  // Track whether leave() has already been requested to guard against double-leave
  const leavingRef = useRef(false);

  useEffect(() => {
    const userId = user?.id;
    if (!client || !userId || !lesson) return;

    leavingRef.current = false;
    setJoinError(null);

    const safeUserId = userId.replace(/[^a-zA-Z0-9]/g, "").substring(0, 10);
    const callId = `lesson-${id}-${safeUserId}`;

    const c = client.call("default", callId, { reuseInstance: true });
    setCall(c);

    // Audio-only lesson — disable camera before joining
    c.camera.disable().catch(console.error);

    c.join({ create: true }).catch((err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "Failed to join the session";
      setJoinError(msg);
    });

    return () => {
      if (!leavingRef.current && c.state.callingState !== CallingState.LEFT) {
        leavingRef.current = true;
        c.leave().catch(console.error);
      }
      setCall(null);
    };
    // lesson is derived from id; including it avoids stale-closure warning
  }, [client, user?.id, id, lesson]);

  const handleBack = () => router.back();

  const handleEndCall = async () => {
    if (call && !leavingRef.current && call.state.callingState !== CallingState.LEFT) {
      leavingRef.current = true;
      await call.leave().catch(console.error);
    }
    router.back();
  };

  if (!lesson) return null;

  // StreamVideo client not yet ready (user not authenticated or initialising)
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
              <View style={[styles.onlineDot, { backgroundColor: "#F59E0B" }]} />
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
          joinError={joinError}
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
  cameraWrap: {
    position: "relative",
  },
  cameraBadge: {
    position: "absolute",
    top: -6,
    right: -9,
    backgroundColor: "#6C4EF5",
    borderRadius: 8,
    minWidth: 18,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  cameraBadgeText: {
    fontFamily: "Poppins-Bold",
    fontSize: 9,
    lineHeight: 13,
    color: "white",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EEF0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  participantCount: {
    fontFamily: "Poppins-Bold",
    fontSize: 13,
    color: "#6C4EF5",
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
  studentThumb: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 80,
    height: 100,
    borderRadius: 14,
    backgroundColor: "#1E1A30",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  studentThumbInner: {
    alignItems: "center",
    gap: 4,
  },
  mutedHint: {
    fontFamily: "Poppins-Regular",
    fontSize: 9,
    color: "#FF4D4F",
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

  // ── Controls
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  ctrlBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#2A2040",
    alignItems: "center",
    justifyContent: "center",
  },
  ctrlBtnActive: {
    backgroundColor: "#6C4EF5",
  },
  ctrlBtnDisabled: {
    opacity: 0.4,
  },
  endCallBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FF4D4F",
    alignItems: "center",
    justifyContent: "center",
  },
  endCallIcon: {
    transform: [{ rotate: "135deg" }],
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
