import React from "react";
import { View, Image, Pressable, Animated } from "react-native";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";

export default function SecondaryTopNav({ onBack }) {
  return (
    <Animated.View
      style={{ height: 80 }}
      className="w-[340px] self-center rounded-[40px] border border-white/60 overflow-hidden"
    >
      {/* FIX: borderRadius in style prop for Android BlurView compatibility */}
      <BlurView
        intensity={40}
        tint="light"
        style={{ borderRadius: 40, flex: 1, paddingTop: 4 }}
      >
        <View className="h-20 flex-row items-center justify-between px-3">

          {/* BACK BUTTON — FIX: bg-white/50 → bg-white/30 to match frosted aesthetic */}
          <Pressable
            onPress={onBack}
            className="w-14 h-14 rounded-full bg-white/30 items-center justify-center"
          >
            <Feather name="chevron-left" size={30} color="#333" />
          </Pressable>

          {/* PROFILE */}
          <View className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/40">
            <Image
              source={{
                uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
              }}
              className="w-full h-full"
            />
          </View>

        </View>
      </BlurView>
    </Animated.View>
  );
}