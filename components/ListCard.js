import { View, Text, FlatList } from "react-native";
import lists from "../data/list.json";

function ListCard({ item, isLast }) {
  return (
    <View className="flex-row">
      {/* Timeline */}
      <View className="items-center mr-4">
        {/* Circle */}
        <View
          className={`w-6 h-6 rounded-full border ${
            item.active
              ? "bg-[#1A0000] border-[#F4D7D0]"
              : "bg-transparent border-[#6D4B4B]"
          }`}
        />

        {/* Line */}
        {!isLast && (
          <View
            className={`w-[1.5px] flex-1 mt-1 ${
              item.active ? "bg-[#5C4343]" : "bg-[#816060]"
            }`}
            style={{ minHeight: 110 }}
          />
        )}
      </View>

      {/* Content */}
      <View className="flex-1 pb-10">
        {/* Time */}
        {item.time !== "" && (
          <Text className="text-[#6E5A5A] text-[13px] mb-2 font-medium">
            {item.time}
          </Text>
        )}

        {/* Active Card */}
        {item.active ? (
          <View className="bg-[#A8D5E6]/80 rounded-[16px] px-5 py-4">
            <Text className="text-white text-[18px] font-bold mb-3">
              {item.title}
            </Text>

            {item.desc.map((point, index) => (
              <Text
                key={index}
                className="text-white/90 text-[14px] mb-1"
              >
                • {point}
              </Text>
            ))}
          </View>
        ) : (
          <View>
            <Text className="text-[#4D3E3E] text-[20px] font-bold mb-2">
              {item.title}
            </Text>

            <Text className="text-[#7A6666] text-[15px] leading-5 pr-5">
              {item.desc}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default function Lists() {
  return (
    <View className="flex-1  px-5 pt-10">
      {/* Header */}
      <Text className="text-[#7A6666] text-[15px] mb-6 ml-10">
        In process
      </Text>

      <FlatList
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        renderItem={({ item, index }) => (
          <ListCard
            item={item}
            isLast={index === lists.length - 1}
          />
        )}
      />
    </View>
  );
}