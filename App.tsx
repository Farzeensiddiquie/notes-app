import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";
import "./global.css";
import { View } from "react-native";

export default function App() {
  return (
    <View>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </View>
  );
}