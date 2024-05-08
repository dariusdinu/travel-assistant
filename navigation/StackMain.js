import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens/MainScreen";

const Stack = createNativeStackNavigator();

export default function StackMain() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          headerShown: false,
          // animationTypeForReplace: "pop",
        }}
      />
    </Stack.Navigator>
  );
}
