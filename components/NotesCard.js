// NotesCard.jsx
import { Text, View } from "react-native";

export default function NotesCard({ title, desc, date,color }) {
  return (
    <View className={`w-[180px] -rotate-[12deg] h-[230px] ${color} rounded-xl p-5 overflow-hidden`}>
      
      <Text
        className="text-lg font-bold"
        numberOfLines={2}
      >
        {title}
      </Text>

      <Text
        className="text-gray-600 mt-4"
        numberOfLines={4}
      >
        {desc}
      </Text>

      <View className="w-[104px] h-[27px] absolute bottom-7 self-center justify-center bg-white/20 rounded-lg">
        <Text className="text-center text-md font-medium">
          {date}
        </Text>
      </View>

    </View>
  );
}