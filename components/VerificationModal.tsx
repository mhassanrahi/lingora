import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  email: string;
  onClose: () => void;
};

const DIGIT_COUNT = 6;

export function VerificationModal({ visible, email, onClose }: Props) {
  const [code, setCode] = useState<string[]>(Array(DIGIT_COUNT).fill(""));
  const inputRefs = useRef<(TextInput | null)[]>(Array(DIGIT_COUNT).fill(null));

  useEffect(() => {
    if (visible) {
      setCode(Array(DIGIT_COUNT).fill(""));
      const timer = setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);

    if (digit && index < DIGIT_COUNT - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (next.every(Boolean)) {
      setTimeout(() => {
        onClose();
        router.replace("/");
      }, 200);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      const next = [...code];
      next[index - 1] = "";
      setCode(next);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-black/50">
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "flex-end" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* Tappable dimmed area above card */}
          <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />

          {/* Card */}
          <View
            className="bg-white rounded-tl-[28px] rounded-tr-[28px] px-6 pt-7 pb-11"
            style={styles.cardShadow}
          >
            {/* Header row */}
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-poppins-bold text-[22px] leading-[30px] color-ink">
                Check your email!
              </Text>
              <TouchableOpacity
                className="p-1 w-8 h-8 items-center justify-center rounded-2xl bg-surface"
                onPress={onClose}
              >
                <Text className="font-poppins text-[14px] color-muted">✕</Text>
              </TouchableOpacity>
            </View>

            <Text className="typo-body-md color-muted mb-7">
              We sent a 6-digit code to{" "}
              <Text className="font-poppins-semibold color-ink">{email}</Text>
            </Text>

            {/* Digit inputs */}
            <View className="flex-row justify-between mb-7">
              {Array(DIGIT_COUNT)
                .fill(null)
                .map((_, i) => (
                  <View
                    key={i}
                    className="w-[46px] h-[56px] rounded-[14px] border-[1.5px] items-center justify-center"
                    style={code[i] ? styles.digitBoxFilled : styles.digitBoxEmpty}
                  >
                    <TextInput
                      ref={(el) => {
                        inputRefs.current[i] = el;
                      }}
                      style={styles.digitInput}
                      value={code[i]}
                      onChangeText={(t) => handleChange(t, i)}
                      onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
                      keyboardType="number-pad"
                      maxLength={2}
                      textAlign="center"
                      selectionColor="#6C4EF5"
                      caretHidden
                    />
                  </View>
                ))}
            </View>

            <Text className="typo-body-sm color-muted text-center">
              Didn{"'"}t receive it?{" "}
              <Text className="font-poppins-semibold color-brand-purple">Resend code</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Shadow exception — iOS/Android require platform-specific shadow props
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 12,
  },
  // Dynamic styles exception — selected at runtime based on digit state
  digitBoxEmpty: {
    borderColor: "#E5E7EB",
    backgroundColor: "#F6F7FB",
  },
  digitBoxFilled: {
    borderColor: "#6C4EF5",
    backgroundColor: "#F0ECFF",
  },
  // TextInput exception — input-specific props (width/height % not supported by NativeWind)
  digitInput: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    lineHeight: 28,
    color: "#001328",
    width: "100%",
    height: "100%",
    textAlign: "center",
    padding: 0,
  },
});
