import { Platform, StatusBar, View, ViewStyle } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { twMerge } from "tailwind-merge";

import { useAppSafeArea } from "@/hooks";

interface Props {
  children: React.ReactNode;
  backgroundColor: string;
  style?: ViewStyle;
}

export function ScrollViewContainer({
  children,
  backgroundColor,
  style,
  className,
}: Props & { className?: string }) {
  const { top } = useAppSafeArea();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedTabBarStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 150],
      [0, 1],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  return (
    <>
      {Platform.OS === "ios" && (
        <Animated.View
          style={[
            {
              height: top,
              position: "absolute",
              width: "100%",
              backgroundColor: "red",
              zIndex: 1,
            },
            animatedTabBarStyle,
          ]}
          className="justify-center items-center"
        >
          <StatusBar backgroundColor="red" barStyle="dark-content" />
        </Animated.View>
      )}

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        className={className}
        style={{ backgroundColor }}
        contentContainerStyle={[
          { flexGrow: 1, paddingTop: top, paddingBottom: 24 },
          style,
        ]}
      >
        <StatusBar barStyle="dark-content" />
        {children}
      </Animated.ScrollView>
    </>
  );
}

export function ViewContainer({
  children,
  backgroundColor,
  style,
  className,
}: Props & { className?: string }) {
  return (
    <View
      className={twMerge("flex-1", className)}
      style={[{ backgroundColor }, style]}
    >
      {children}
    </View>
  );
}
