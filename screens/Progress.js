import React from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import BottomNav from "components/BottomNav";
import SecondaryTopNav from "components/SecondaryTopNav";
import PeriodChange from "components/PeriodChange";
import SummaryDashboard from "components/SummaryDashboard";
import StatsCard from "components/StatsCard";

export default function Progress() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [count] = React.useState(1000);
  const [period, setPeriod] = React.useState("Monthly"); // <-- single source of truth

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <Image
        source={require("../assets/gradient-bg.png")}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      <View
        style={{ top: insets.top + 50, zIndex: 999 }}
        className="absolute w-full items-center px-6"
      >
        <SecondaryTopNav onBack={() => navigation.goBack()} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 140,
          paddingBottom: insets.bottom + 140,
        }}
      >
        {/* Title + Dropdown */}
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Text style={{ fontSize: 40, fontWeight: "600", flex: 1 }} numberOfLines={2}>
            Your Progress
          </Text>

          <PeriodChange value={period} onChange={setPeriod} />
        </View>

        {/* Average Count */}
        <Text
          style={{
            fontSize: 13,
            fontWeight: "500",
            marginTop: 20,
            color: "gray",
            marginLeft: 24,
          }}
        >
          Average Count
        </Text>

        <View className="flex-row items-end mt-1 px-6">
          <Text style={{ fontSize: 32, fontWeight: "600", color: "black" }}>
            {count}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "black",
              marginBottom: 4,
              marginLeft: 4,
            }}
          >
            tasks
          </Text>
        </View>

        <View>
          <StatsCard period={period} />
        </View>

        <SummaryDashboard />
      </ScrollView>

      <View style={{ bottom: insets.bottom + 40 }} className="absolute w-full items-center z-[100]">
        <BottomNav />
      </View>
    </View>
  );
}