import { View, FlatList } from "react-native";
import NotesCard from "./NotesCard";
import notesData from "../data/notes.json";

export default function NotesContainer() {
  return (
    <View className="px-4 mt-4 mb-[150px]">
      <FlatList
        data={notesData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 12,
        }}
        renderItem={({ item, index }) => (
          <View
            className={`
              w-[48%]
              ${index % 2 !== 0 ? "-ml-[60px] mt-[40px] z-10" : ""}
            `}
          >
            <NotesCard
              title={item.title}
              desc={item.desc}
              date={item.date}
              color={item.color}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}