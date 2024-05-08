import StackTripPlanning from "../navigation/StackTripPlanning";
import { NavigationContainer } from "@react-navigation/native";

export default function TripPlanner() {
  return (
    <NavigationContainer independent={true}>
      <StackTripPlanning />
    </NavigationContainer>
  );
}
