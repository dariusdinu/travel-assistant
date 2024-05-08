import "react-native-gesture-handler";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../components/UI";

function TripPlanningOptions({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={() => navigation.navigate("ManualTrip")}>
        <Text>Create your own adventure</Text>
      </Button>
      <Button onPress={() => navigation.navigate("AITrip")}>
        <Text>
          Let us do the magic{" "}
          <Ionicons name="color-wand" size={24} color="black" />
        </Text>
      </Button>
    </View>
  );
}

export default TripPlanningOptions;
