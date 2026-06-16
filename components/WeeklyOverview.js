import React, { useState } from "react";
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

// Demo data — replace with real weekly task counts
function getWeekData(weekOffset) {
  const seed = Math.abs(weekOffset) + 1;
  return [40, 70, 25, 95, 55, 65, 60].map((v, i) =>
    Math.max(15, (v + seed * 3) % 100)
  );
}

function formatWeekRange(weekOffset) {
  const today = new Date();
  const monday = new Date(today);
  const dayOfWeek = today.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  monday.setDate(today.getDate() + diffToMonday + weekOffset * 7);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(monday)} - ${fmt(sunday)}`;
}

export default function WeeklyOverview() {
  const { width } = useWindowDimensions();
  const [weekOffset, setWeekOffset] = useState(0);

  const values = getWeekData(weekOffset);
  const maxVal = Math.max(...values, 1);

  const CHART_HEIGHT = 110;
  const MIN_BAR_HEIGHT = 28;
  const BAR_WIDTH = 18;

  return (
    <View style={{ paddingVertical: 16 }}>
      {/* Title */}
      <Text
        style={{
          textAlign: "center",
          fontSize: 17,
          fontWeight: "700",
          color: "#1F2937",
          marginBottom: 8,
        }}
      >
        Weekly Overview
      </Text>

      {/* Week navigator */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => setWeekOffset((w) => w - 1)} hitSlop={10}>
          <Feather name="chevron-left" size={18} color="#4B5563" />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: "#374151",
            marginHorizontal: 12,
          }}
        >
          {formatWeekRange(weekOffset)}
        </Text>

        <TouchableOpacity onPress={() => setWeekOffset((w) => w + 1)} hitSlop={10}>
          <Feather name="chevron-right" size={18} color="#4B5563" />
        </TouchableOpacity>
      </View>

      {/* Bars */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingHorizontal: 24,
          height: CHART_HEIGHT,
        }}
      >
        {values.map((v, i) => {
          const barHeight = Math.max(
            MIN_BAR_HEIGHT,
            (v / maxVal) * CHART_HEIGHT
          );
          return (
            <View
              key={i}
              style={{
                width: BAR_WIDTH,
                height: barHeight,
                borderRadius: BAR_WIDTH / 2,
                backgroundColor: "#BCA6FF",
              }}
            />
          );
        })}
      </View>

      {/* Day labels */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 24,
          marginTop: 10,
        }}
      >
        {DAYS.map((d, i) => (
          <Text
            key={i}
            style={{
              width: BAR_WIDTH,
              textAlign: "center",
              fontSize: 12,
              color: "#9CA3AF",
            }}
          >
            {d}
          </Text>
        ))}
      </View>
    </View>
  );
}