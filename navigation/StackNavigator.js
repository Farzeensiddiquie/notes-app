import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "../screens/SplashScreen";
import Home from "../screens/Home";
import Notes from "../screens/Notes";
import Lists from "../screens/Lists";
import Progress from "../screens/Progress";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notes" component={Notes} />
      <Stack.Screen name="Lists" component={Lists} />
      <Stack.Screen name="Progress" component={Progress} />
    </Stack.Navigator>
  );
}