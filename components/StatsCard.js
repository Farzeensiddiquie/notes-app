import React from "react";
import { View } from "react-native";
import ProgressGraph from "./ProgressGraph";
import WeeklyOverview from "./WeeklyOverview";

export default function StatsCard({ period }) {
  return (
    <View>
      {period === "Weekly" ? <WeeklyOverview /> : <ProgressGraph />}
    </View>
  );
}