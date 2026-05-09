import { View, Text, Pressable } from "react-native";

export default function WeekCalendar() {
  const today = new Date();

  const currentDay = today.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    return {
      fullDate: date,
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      date: date.getDate(),
      active: date.toDateString() === today.toDateString(),
    };
  });

  return (
    <View className="flex-row items-center justify-between w-full  px-4 py-3 rounded-[28px]">
      {days.map((item, index) => (
        <Pressable
          key={index}
          className={`items-center justify-center rounded-2xl px-3 py-2 ${
            item.active ? "bg-[#2F2F33]" : ""
          }`}
        >
          <Text
            className={`text-sm ${
              item.active ? "text-white" : "text-[#5B5B5B]"
            }`}
          >
            {item.day.slice(0, 2)}
          </Text>

          <Text
            className={`mt-8 text-base font-medium ${
              item.active ? "text-white" : "text-[#5B5B5B]"
            }`}
          >
            {item.date}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}