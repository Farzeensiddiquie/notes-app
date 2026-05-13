import BottomNav from "components/BottomNav";
import TopNav from "components/TopNav";
import { View, StatusBar, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ListsComponent from "components/ListCard";

export default function Lists() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1">
      <StatusBar barStyle="dark-content" />
      
      {/* Background */}
      <Image 
        source={require('../assets/gradient-bg.png')} 
        className="absolute w-full h-full" 
        resizeMode="cover" 
      />

      {/* Top Nav Fixed */}
      <View 
        style={{ top: insets.top + 50 , zIndex: 999 }} 
        className="absolute w-full z-[999] items-center px-6"
      >
        <TopNav />
      </View>

      {/* Scrollable Content */}
      <View className="flex-1  z-0">
        <ListsComponent insets={insets} />
      </View>

      {/* Bottom Nav Fixed */}
      <View 
        style={{ bottom: insets.bottom + 40 }} 
        className="absolute w-full z-[100] items-center"
      >
        <BottomNav />
      </View>
    </View>
  );
}