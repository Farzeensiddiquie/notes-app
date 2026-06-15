import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
export default function SummaryDashboard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Meeting with client",
      done: true,
    },
    {
      id: 2,
      title: "Take kids out for games",
      done: true,
    },
    {
      id: 3,
      title: "Washing bikes",
      done: false,
    },
    {
      id: 4,
      title: "Purchase groceries for tomorrow",
      done: false,
    },
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  const completedTasks = tasks.filter(
    (task) => task.done
  ).length;

  const percentage = Math.round(
    (completedTasks / tasks.length) * 100
  );
const radius = 80;
const circumference = Math.PI * radius;
const progressLength = (circumference * percentage) / 100;
  return (
    <View className="px-5 py-4">
      <Text className="text-4xl font-bold mb-5">
        Summary
      </Text>

      {/* Summary Card */}
      <View className="mb-4">
        <LinearGradient
          colors={["#A7C7F2", "#B6F0E8"]}
          style={{
            borderRadius: 28,
            padding: 20,
            overflow: "hidden",
          }}
        >
          <View className="flex-row justify-between items-start mb-5">
            <Text className="text-white text-2xl font-semibold">
              27 Sept. 2024
            </Text>

            <Pressable className="w-14 h-14 rounded-full bg-white items-center justify-center">
              <Feather
                name="arrow-up-right"
                size={22}
                color="#000"
              />
            </Pressable>
          </View>

          {tasks.map((task) => (
            <Pressable
              key={task.id}
              onPress={() => toggleTask(task.id)}
              className="flex-row items-center mb-4 active:opacity-80"
            >
              <View
                className={`w-6 h-6 rounded-md border-2 items-center justify-center mr-3 ${
                  task.done
                    ? "bg-white border-white"
                    : "border-white"
                }`}
              >
                {task.done && (
                  <Feather
                    name="check"
                    size={14}
                    color="#7C9CF5"
                  />
                )}
              </View>

              <Text
                className={`text-white text-base flex-1 ${
                  task.done
                    ? "line-through opacity-70"
                    : ""
                }`}
              >
                {task.title}
              </Text>
            </Pressable>
          ))}
        </LinearGradient>
      </View>

      {/* Daily Tasks Card */}
      <View className="mb-8">
        <LinearGradient
          colors={["#D8A7F6", "#F7C29B"]}
          style={{
            borderRadius: 24,
            padding: 20,
            overflow: "hidden",
          }}
        >
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white text-2xl font-semibold">
                Daily Tasks
              </Text>

              <Text className="text-white/80 text-base mt-1">
                {completedTasks} out of {tasks.length} done
              </Text>
            </View>

            <View className="w-16 h-16 rounded-full border-[5px] border-white/70 items-center justify-center">
              <Text className="text-white font-bold text-base">
                {percentage}%
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Score Section */}
     {/* Score Section */}
<View className="items-center">
  <Text className="text-2xl font-semibold mb-6">
    Your Score
  </Text>

  <View className="items-center justify-center">
    <Svg width={220} height={130}>
      {/* Background Arc */}
      <Path
        d="M 30 100 A 80 80 0 0 1 190 100"
        stroke="#E5E7EB"
        strokeWidth={12}
        fill="none"
        strokeLinecap="round"
      />

      {/* Progress Arc */}
      <Path
        d="M 30 100 A 80 80 0 0 1 190 100"
        stroke="#F4A261"
        strokeWidth={12}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${progressLength} ${circumference}`}
      />
    </Svg>

    <View className="absolute top-[42px] w-16 h-16 rounded-full bg-[#ECEAF4] items-center justify-center">
      <Text className="text-3xl">
        {percentage >= 80
          ? "😊"
          : percentage >= 50
          ? "🙂"
          : "😕"}
      </Text>
    </View>
  </View>

  <Text className="text-lg font-semibold text-gray-700 mt-2">
    {percentage >= 80
      ? "Excellent"
      : percentage >= 50
      ? "Almost There"
      : "Keep Going"}
  </Text>

  <Text className="text-center text-gray-400 mt-4 px-10">
    Success is the sum of small efforts,
    repeated day in and day out.
  </Text>

  <Text className="text-gray-400 mt-2">
    ~ Robert Collier
  </Text>
</View>
    </View>
  );
}