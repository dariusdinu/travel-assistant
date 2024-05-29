import { createStackNavigator } from "@react-navigation/stack";
import {
  AITripScreen,
  AddAStopScreen,
  ManualTripScreen,
  TripPlanningOptionsScreen,
} from "../screens";

const Stack = createStackNavigator();

export default function StackTripPlanning() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TripPlanningOptions"
        component={TripPlanningOptionsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ManualTrip"
        component={ManualTripScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AITrip"
        component={AITripScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddAStop"
        component={AddAStopScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
