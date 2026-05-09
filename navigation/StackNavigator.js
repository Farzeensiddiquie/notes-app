import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Lists from "../screens/Lists";
import Progress from "../screens/Progress";
import Notes from "../screens/Notes";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notes" component={Notes} />
      <Stack.Screen name="Lists" component={Lists} />
      <Stack.Screen name="Progress" component={Progress} />
    </Stack.Navigator>
  );
}