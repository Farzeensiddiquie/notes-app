import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

export default function TodoCard({
  title,
  description,
  date,
  time,
  onOpen,
}) {
  const [checked, setChecked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);

  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  const cardWidth = isTablet ? (width - 60) / 2 : width - 32;

  const px = isTablet ? 24 : 20;
  const pt = isTablet ? 24 : 20;
  const pb = isTablet ? 28 : 24;
  const titleSize = isTablet ? 21 : 19;
  const descSize = isTablet ? 14 : 13;
  const btnSize = isTablet ? 44 : 40;
  const iconSize = isTablet ? 20 : 18;

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={() => isClamped && setExpanded((p) => !p)}
      style={{
        width: cardWidth,
        marginBottom: isTablet ? 20 : 16,
        borderRadius: 20,
        overflow: "hidden",
        alignSelf: "center",
      }}
    >
      <LinearGradient
        colors={checked ? ["#94A3B8", "#64748B"] : ["#CEB7FF", "#FFBB7C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingHorizontal: px,
          paddingTop: pt,
          paddingBottom: pb,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.22)",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.22)",
                borderRadius: 99,
                paddingHorizontal: 12,
                paddingVertical: 5,
              }}
            >
              <Text
                style={{ fontSize: 11, fontWeight: "700", color: "#fff" }}
              >
                {date}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.22)",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.22)",
                borderRadius: 99,
                paddingHorizontal: 12,
                paddingVertical: 5,
              }}
            >
              <Text
                style={{ fontSize: 11, fontWeight: "700", color: "#fff" }}
              >
                {time}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={onOpen}
            style={{
              width: btnSize,
              height: btnSize,
              borderRadius: 99,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name="arrow-up-right" size={iconSize} color="#333" />
          </Pressable>
        </View>

        {/* Divider */}
        <View
          style={{
            height: 0.5,
            backgroundColor: "rgba(255,255,255,0.22)",
            marginBottom: 16,
          }}
        />

        {/* Body */}
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 14 }}>
          {/* Checkbox */}
          <Pressable
            onPress={() => setChecked((p) => !p)}
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              borderWidth: 2,
              borderColor: checked ? "#fff" : "rgba(255,255,255,0.55)",
              backgroundColor: checked ? "#fff" : "transparent",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            {checked && (
              <Feather name="check" size={14} color="#CEB7FF" />
            )}
          </Pressable>

          {/* Text content */}
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: titleSize,
                fontWeight: "700",
                color: "#fff",
                marginBottom: 5,
                textDecorationLine: checked ? "line-through" : "none",
                opacity: checked ? 0.55 : 1,
              }}
            >
              {title}
            </Text>

            <Text
              numberOfLines={expanded ? undefined : 3}
              onTextLayout={(e) => {
                if (!expanded) {
                  setIsClamped(e.nativeEvent.lines.length > 3);
                }
              }}
              style={{
                fontSize: descSize,
                lineHeight: descSize * 1.55,
                color: "rgba(255,255,255,0.88)",
                opacity: checked ? 0.45 : 1,
              }}
            >
              {description}
            </Text>

            {isClamped && (
              <Text
                onPress={() => setExpanded((p) => !p)}
                style={{
                  marginTop: 8,
                  fontSize: 10,
                  fontWeight: "700",
                  letterSpacing: 0.8,
                  color: "rgba(255,255,255,0.38)",
                  textTransform: "uppercase",
                }}
              >
                {expanded ? "TAP TO COLLAPSE" : "TAP TO READ MORE"}
              </Text>
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}