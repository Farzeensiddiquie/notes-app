import BottomNav from "components/BottomNav";
import Categories from "components/Categories";
import NotesContainer from "components/NotesContainer";
import TopNav from "components/TopNav";
import { View, Text, Image, StatusBar, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Notes() {
  const insets = useSafeAreaInsets();

  const Header = () => (
    <View>
      <Text
        style={{
          fontSize: 50,
          paddingTop: insets.top + 140,
          paddingHorizontal: 24,
        }}
        className="self-center text-center text-black font-semibold"
      >
        Quikliy Jot Down Notes
      </Text>

      <View className="-mx-6">
        <Categories />
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      <StatusBar barStyle="dark-content" />

      {/* Background */}
      <Image
        source={require("../assets/gradient-bg.png")}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      {/* TOP NAV FIXED LAYER */}
      <View
        style={{
          position: "absolute",
          top: insets.top + 50,
          width: "100%",
          zIndex: 999,
          elevation: 999, 
        }}
        className="items-center px-6"
      >
        <TopNav />
      </View>

      {/* SCROLL CONTENT - Using FlatList instead of ScrollView */}
      <FlatList
        data={[]}
        keyExtractor={() => "notesContainer"}
        ListHeaderComponent={Header}
        ListEmptyComponent={() => <NotesContainer />}
        showsVerticalScrollIndicator={false}
        style={{ zIndex: 1 }}
      />

      {/* BOTTOM NAV FIXED LAYER */}
      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 40,
          width: "100%",
          zIndex: 999,
          elevation: 999,
        }}
        className="items-center"
      >
        <BottomNav />
      </View>
    </View>
  );
}