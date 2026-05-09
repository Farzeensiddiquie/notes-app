import { BlurView } from "expo-blur";
import { Pressable, View, Text, Animated, Dimensions } from "react-native";
import { useRef, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function BottomNav() {
  const navigation = useNavigation();
  const route = useRoute();
  const slideAnim = useRef(new Animated.Value(0)).current;

  const icons = [
    { id: 1, name: "check-square", label: "Tasks", route: "Home" },
    { id: 2, name: "file-text", label: "Notes", route: "Notes" },
    { id: 3, name: "list", label: "Lists", route: "Lists" },
    { id: 4, name: "activity", label: "Progress", route: "Progress" },
  ];

  const routeMap = {
    Home: 0,
    Notes: 1,
    Lists: 2,
    Progress: 3,
  };

  const activeIndex = routeMap[route.name] ?? 0;
  const tabWidth = (width * 0.8) / icons.length;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: activeIndex * tabWidth,
      useNativeDriver: true,
    }).start();
  }, [activeIndex]);

  return (
    <BlurView
      intensity={30}
      tint="light"
      style={{
        width: width * 0.8,
        height: 70,
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <View style={{ flexDirection: "row", flex: 1 }}>

        <Animated.View
          style={{
            position: "absolute",
            width: tabWidth,
            height: "100%",
            transform: [{ translateX: slideAnim }],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View className="w-14 h-14 bg-[#CEB7FF] rounded-full" />
        </Animated.View>

        {icons.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <Pressable
              key={item.id}
              onPress={() => navigation.navigate(item.route)}
              style={{
                width: tabWidth,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather
                name={item.name}
                size={22}
                color={isActive ? "#333" : "#555"}
              />

              {!isActive && (
                <Text style={{ fontSize: 11, marginTop: 4 }}>
                  {item.label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </BlurView>
  );
}