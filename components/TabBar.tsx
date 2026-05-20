import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CIRCLE_SIZE = 52;
const TAB_HEIGHT = 62;

type TabIconConfig = {
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  label: string;
};

const TAB_CONFIG: TabIconConfig[] = [
  { icon: "home-outline", activeIcon: "home", label: "Home" },
  { icon: "book-outline", activeIcon: "book", label: "Learn" },
  { icon: "sparkles-outline", activeIcon: "sparkles", label: "AI Teacher" },
  { icon: "chatbubble-outline", activeIcon: "chatbubble", label: "Chat" },
  { icon: "person-outline", activeIcon: "person", label: "Profile" },
];

const inputRange = TAB_CONFIG.map((_, i) => i);

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { width } = useWindowDimensions();
  const tabWidth = width / TAB_CONFIG.length;
  const outputRange = TAB_CONFIG.map((_, i) => i * tabWidth + (tabWidth - CIRCLE_SIZE) / 2);

  const insets = useSafeAreaInsets();
  const animatedIndex = useRef(new Animated.Value(state.index)).current;

  useEffect(() => {
    Animated.spring(animatedIndex, {
      toValue: state.index,
      useNativeDriver: true,
      tension: 100,
      friction: 12,
    }).start();
  }, [state.index, animatedIndex]);

  const circleTranslateX = animatedIndex.interpolate({ inputRange, outputRange });

  return (
    <View
      className="flex-row bg-white border-t border-border"
      style={{ paddingBottom: insets.bottom || 8 }}
    >
      {/* Animated circle — Animated.View requires inline style for transform */}
      <Animated.View
        className="absolute left-0 w-[52px] h-[52px] rounded-full bg-brand-purple"
        style={{
          top: (TAB_HEIGHT - CIRCLE_SIZE) / 2,
          transform: [{ translateX: circleTranslateX }],
        }}
      />

      {state.routes.map((route, index) => {
        const config = TAB_CONFIG[index];
        const isActive = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            className="flex-1 items-center justify-center"
            style={{ height: TAB_HEIGHT }}
            onPress={onPress}
            onLongPress={() =>
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              })
            }
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={config.label}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? config.activeIcon : config.icon}
              size={22}
              color={isActive ? "#FFFFFF" : colors.muted}
            />
            {!isActive && (
              <Text
                className="font-poppins text-[10px] leading-[14px] color-muted mt-[3px]"
                numberOfLines={1}
              >
                {config.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
