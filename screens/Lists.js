import BottomNav from "components/BottomNav";
import TopNav from "components/TopNav";
import WeekCalendar from "components/WeekCalender";
import { View, Text, StatusBar, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ListCard from "components/ListCard";
export default function Lists() {
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
                         <Text style={{ fontSize: 50,paddingTop: insets.top + 140 ,paddingHorizontal: 24 }} className="self-start  text-black font-semibold">
                           To-Do Lists
                         </Text>
                         <Text>
                         <View style={{ paddingHorizontal: 30, paddingTop: 8 }} className="flex gap-5">
                          <Text style={{ fontSize: 16 ,color: '#555' }}>
  {new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })}
</Text>
<View>
<Text style={{ fontSize: 35,marginLeft:-4, color: '#000' }}>
  Today
</Text>
</View>
</View>
 </Text>
<View className=" mt-4 self-center">
  <WeekCalendar/>
</View>
<View className="flex-1"><Lists/></View>
  
              <View 
                style={{ bottom: insets.bottom + 40 }} 
                className="absolute w-full z-[100] items-center"
              >
                <BottomNav />
              </View>
            </View>
  );
}