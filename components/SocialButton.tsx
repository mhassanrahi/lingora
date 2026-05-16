import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  label: string;
  onPress?: () => void;
};

export function SocialButton({ icon, iconColor, label, onPress }: Props) {
  return (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-2xl py-4 px-5 border border-border"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name={icon} size={22} color={iconColor} />
      <Text className="typo-body-md color-ink ml-[14px]">{label}</Text>
    </TouchableOpacity>
  );
}
