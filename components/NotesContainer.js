// NotesContainer.jsx
import { View } from "react-native";
import NotesCard from "./NotesCard";

export default function NotesContainer() {
    const colors = [
    "bg-blue-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-orange-300",
  ];
  const notes = [
    {
      id: 1,
      title: "Meeting Notes - Team Sync Oct 15, 2023",
      desc: "Notes from the weekly team meeting.",
      date: "Oct 15, 2023",
    },
    {
      id: 2,
      title: "Project Planning",
      desc: "Discuss app structure, API integration and deadlines.",
      date: "Nov 2, 2023",
    },
    {
      id: 3,
      title: "UI Improvements",
      desc: "Need smoother animations and responsive layout fixes.",
      date: "Dec 8, 2023",
    },
    {
      id: 4,
      title: "Client Feedback",
      desc: "Update dashboard layout and add loading states.",
      date: "Jan 4, 2024",
    },
     {
      id: 5,
      title: "Client Feedback",
      desc: "Update dashboard layout and add loading states.",
      date: "Jan 4, 2024",
    },
     {
      id: 6,
      title: "Client Feedback",
      desc: "Update dashboard layout and add loading states.",
      date: "Jan 4, 2024",
    },
  ];

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
          <NotesCard
            title={item.title}
            desc={item.desc}
            date={item.date}
            color={colors[index % colors.length]}
          />
        </View>
      ))}
    </View>
  );
}