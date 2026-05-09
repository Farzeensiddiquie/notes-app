import { Text, ScrollView, View } from "react-native";
import "../global.css";

export default function Categories() {
  return (
    <View className="h-[60px] self-center mt-8 justify-center">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20, paddingHorizontal: 10 }}
      >
        <Text className="text-black text-lg bg-white/40 py-2 px-6 h-12 rounded-full font-medium">
          All
        </Text>

        <Text className="text-black text-lg bg-white/40 py-2 px-6 h-12 rounded-full font-medium">
          On hold
        </Text>

        <Text className="text-black text-lg bg-white/40 py-2 px-6 h-12 rounded-full font-medium">
          In progress
        </Text>

        <Text className="text-black text-lg bg-white/40 py-2 px-6 h-12 rounded-full font-medium">
          Completed
        </Text>
      </ScrollView>
    </View>
  );
}