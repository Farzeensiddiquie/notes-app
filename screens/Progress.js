import BottomNav from "components/BottomNav";
import TopNav from "components/TopNav";
import { View, Text, Image, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Progress() {
  const insets = useSafeAreaInsets();
  return (
     <View className="flex-1 ">
           <StatusBar barStyle="dark-content" />
                 
                 {/* 1. BACKGROUND LAYER (Lowest Z-Index) */}
                 <Image 
                   source={require('../assets/gradient-bg.png')} 
                   className="absolute w-full h-full" 
                   resizeMode="cover" 
                 />
                 <View 
                         style={{ top: insets.top + 50 }} 
                         className="absolute w-full z-[100] items-center px-6"
                       >
                         <TopNav />
                       </View>
                       <Text style={{ fontSize: 40,paddingTop: insets.top + 140 ,paddingHorizontal: 24 }} className="self-center  text-black font-semibold">
                        Your Progress
                       </Text>
                        
            <View 
              style={{ bottom: insets.bottom + 40 }} 
              className="absolute w-full z-[100] items-center"
            >
              <BottomNav />
            </View>
          </View>
  );
}