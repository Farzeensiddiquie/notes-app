import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function TodoCard({ title, description, date, time, onOpen }) {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={onOpen}
      // 1. Added a fixed height (h-56 is 224px) to keep cards uniform
      className="mb-4 self-center rounded-[20px] overflow-hidden w-[340px] h-56 shadow-lg"
    >
      <LinearGradient
        colors={checked ? ['#94A3B8', '#64748B'] : ['#CEB7FF', '#FFBB7C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-6 h-full w-full justify-between" // Added justify-between to space out header and body
      >
        
        {/* HEADER SECTION */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="bg-white/20 px-3 py-1.5 rounded-2xl border border-white/20 mr-2">
              <Text className="text-white text-[11px] font-bold">{date}</Text>
            </View>
            <View className="bg-white/20 px-3 py-1.5 rounded-2xl border border-white/20">
              <Text className="text-white text-[11px] font-bold">{time}</Text>
            </View>
          </View>

          <Pressable 
            onPress={onOpen}
            className="w-12 h-12 bg-white rounded-full items-center justify-center"
          >
            <Feather name="arrow-up-right" size={22} color="#333" />
          </Pressable>
        </View>

        {/* BODY SECTION */}
        <View className="flex-row items-start mb-2">
          {/* Circular Checkbox */}
          <Pressable 
            onPress={() => setChecked(!checked)}
            className={`w-7 h-7 rounded-full border-2 items-center justify-center mr-4 mt-1 ${
              checked ? 'bg-white border-white' : 'border-white/50'
            }`}
          >
            {checked && <Feather name="check" size={16} color="#CEB7FF" />}
          </Pressable>

          <View className="flex-1">
            {/* 2. Added numberOfLines={1} for the title ellipses */}
            <Text 
              numberOfLines={1}
              className={`text-white text-[24px] font-bold leading-7 mb-1 ${
                checked ? 'line-through opacity-60' : ''
              }`}
            >
              {title}
            </Text>
            
            {/* 3. Added numberOfLines={3} for the description ellipses */}
            <Text 
              numberOfLines={3}
              className={`text-white/90 text-[14px] leading-5 ${
                checked ? 'opacity-50' : ''
              }`}
            >
              {description}
            </Text>
            
            {/* 4. "Read More" Hint (Visual Only) */}
            <Text className="text-white/40 text-[10px] mt-1 font-bold">
              TAP TO READ MORE
            </Text>
          </View>
        </View>

      </LinearGradient>
    </TouchableOpacity>
  );
}