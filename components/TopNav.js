import React, { useState, useRef } from "react";
import { View, Image, Pressable, Animated, Text, TextInput } from "react-native";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";

export default function TopNav() {
  const [openMenu, setOpenMenu] = useState(null); 
  const navHeight = useRef(new Animated.Value(80)).current;
  const searchWidth = useRef(new Animated.Value(56)).current;
  const plusRotation = useRef(new Animated.Value(0)).current;

  const animateTo = (height, sWidth, rotation) => {
    Animated.spring(navHeight, { toValue: height, useNativeDriver: false, bounciness: 4 }).start();
    Animated.spring(searchWidth, { toValue: sWidth, useNativeDriver: false }).start();
    Animated.spring(plusRotation, { toValue: rotation, useNativeDriver: false }).start();
  };

  const toggleSearch = () => {
    if (openMenu === 'search') {
      setOpenMenu(null);
      animateTo(80, 56, 0);
    } else {
      setOpenMenu('search');
      animateTo(80, 200, 0); 
    }
  };

  const togglePlus = () => {
    if (openMenu === 'plus') {
      setOpenMenu(null);
      animateTo(80, 56, 0); 
    } else {
      setOpenMenu('plus');
      animateTo(160, 56, 1); 
    }
  };

  const spin = plusRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  return (
   
    <Animated.View 
      style={{ height: navHeight  }} 
      className="w-[340px] self-center rounded-[40px]  border border-white/60 overflow-hidden"
    >
      <BlurView intensity={40} tint="light" className="flex-1 pt-1 ">
        
        {/* TOP ROW */}
        <View className="h-20 flex-row items-center justify-between px-3">
          {/* Profile */}
          <View className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/40">
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }} 
              className="w-full h-full" 
            />
          </View>

          <View className="flex-row items-center">
            {/* SEARCH */}
            <Animated.View style={{ width: searchWidth ,height:56}} className=" bg-white/50 rounded-full flex-row items-center mr-2">
              <Pressable onPress={toggleSearch} className="w-16 h-16  items-center justify-center">
                <Feather name={openMenu === 'search' ? "x" : "search"} size={22} color="#333" />
              </Pressable>
              {openMenu === 'search' && (
                <TextInput autoFocus placeholder="Search..." className="flex-1 pr-4 font-medium" />
              )}
            </Animated.View>

            {/* PLUS */}
            <Pressable 
              onPress={togglePlus} 
              className={`w-16 h-16 rounded-full items-center justify-center ${openMenu === 'plus' ? 'bg-white/50' : 'bg-white/50'}`}
            >
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Feather name="plus" size={28} color="#333" />
              </Animated.View>
            </Pressable>
          </View>
        </View>

        
        {openMenu === 'plus' && (
          <View className="px-4 py-2 flex-row justify-around items-center bg-white/90 mx-3 mb-3 rounded-3xl h-16 shadow-sm">
            <View className="items-center">
               <Feather name="check-square" size={20} color="#333" />
               <Text className="text-[10px] mt-1 font-bold">Tasks</Text>
            </View>
            <View className="items-center">
               <Feather name="file-text" size={20} color="#333" />
               <Text className="text-[10px] mt-1 font-bold">Notes</Text>
            </View>
            <View className="items-center">
               <Feather name="list" size={20} color="#333" />
               <Text className="text-[10px] mt-1 font-bold">Lists</Text>
            </View>
          </View>
        )}
      </BlurView>
    </Animated.View>
  );
}