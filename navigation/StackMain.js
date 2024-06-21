import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens/MainScreen";
import EditTripScreen from "../screens/EditTripScreen";
import { AddAStopScreen } from "../screens";
import EditStopScreen from "../screens/EditStopScreen";

const Stack = createNativeStackNavigator();

export default function StackMain() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditTrip"
        component={EditTripScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditStop"
        component={EditStopScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddAStopScreen"
        component={AddAStopScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
