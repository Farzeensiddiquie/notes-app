// NotesContainer.jsx
import { View } from "react-native";
import NotesCard from "./NotesCard";
import { FlatList } from "react-native-gesture-handler";
import notesData from "../data/notes.json";
export default function NotesContainer() {
    return (
    <View className="flex-row flex-wrap justify-center px-4 mb-20 mt-4">
      {notes.map((item, index) => (
        <View
          key={item.id}
          className={`
            w-[48%] 
            ${index % 2 !== 0 ? "-ml-[60px] mt-[40px] z-10" : ""}
          `}
        >
         <FlatList
  data={notesData}
  keyExtractor={(item) => item.id.toString()}
  numColumns={2}
  renderItem={({ item, index }) => (
    <NotesCard
      title={item.title}
      desc={item.desc}
      date={item.date}
      color={colors[index % colors.length]}
    />
  )}
/>
        </View>
      ))}
    </View>
  );
}