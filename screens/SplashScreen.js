import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
} from "react-native-reanimated";

export default function SplashScreen() {
  const navigation = useNavigation();

  const titleOpacity = useSharedValue(0);
  const cursorOpacity = useSharedValue(1);
  const taskOpacity = useSharedValue(0);
  const groupTranslateX = useSharedValue(40);

  useEffect(() => {
    // TICKER appears
    titleOpacity.value = withTiming(1, {
      duration: 700,
    });

    // blinking cursor
    cursorOpacity.value = withRepeat(
      withTiming(0, { duration: 500 }),
      -1,
      true
    );

    // task manager appears from cursor position
    taskOpacity.value = withDelay(
      1200,
      withTiming(1, {
        duration: 700,
      })
    );

    // whole logo settles to center
    groupTranslateX.value = withDelay(
      1800,
      withTiming(0, {
        duration: 700,
      })
    );

    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }));

  const cursorStyle = useAnimatedStyle(() => ({
    opacity: cursorOpacity.value,
  }));

  const taskStyle = useAnimatedStyle(() => ({
    opacity: taskOpacity.value,
    transform: [
      {
        translateX: 30 * (1 - taskOpacity.value),
      },
    ],
  }));

  const groupStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: groupTranslateX.value,
      },
    ],
  }));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          {
            flexDirection: "row",
            alignItems: "flex-end",
          },
          groupStyle,
        ]}
      >
        <Animated.Text
          style={[
            {
              fontSize: 42,
              fontWeight: "800",
              color: "#F59E0B",
              letterSpacing: 1,
            },
            titleStyle,
          ]}
        >
          TICKER
        </Animated.Text>

        <Animated.Text
          style={[
            {
              fontSize: 42,
              color: "#9CA3AF",
              marginLeft: 2,
            },
            cursorStyle,
          ]}
        >
          |
        </Animated.Text>

        <Animated.View
          style={[
            {
              marginLeft: 10,
              marginBottom: 6,
            },
            taskStyle,
          ]}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#374151",
              lineHeight: 13,
              fontWeight: "500",
            }}
          >
            task{"\n"}manager
          </Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}