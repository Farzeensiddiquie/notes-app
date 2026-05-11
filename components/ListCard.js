import { View, Text, FlatList } from "react-native";
import lists from "../data/list.json";
import WeekCalendar from "./WeekCalender";

function ListCard({ item, isLast }) {
  return (
    <View className="flex-row px-5">
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

export default function ListsComponent({ insets }) {
  const HeaderComponent = () => (
    <View style={{ paddingTop: 140 }}>
      <Text style={{ fontSize: 50, paddingHorizontal: 24, paddingBottom: 16 }} className="self-start text-black font-semibold">
        To-Do Lists
      </Text>
      <View style={{ paddingHorizontal: 30, paddingTop: 8 }} className="flex gap-5 mb-4">
        <Text style={{ fontSize: 16, color: '#555' }}>
          {new Date().toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
        <View>
          <Text style={{ fontSize: 35, marginLeft: -4, color: '#000' }}>
            Today
          </Text>
        </View>
      </View>
      <View className="mt-4 self-center mb-4">
        <WeekCalendar />
      </View>
      <Text className="text-[#7A6666] text-[15px] mb-6 ml-10">
        In process
      </Text>
    </View>
  );

  return (
    <View className="flex-1 w-full">
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{
          paddingBottom: 100,
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