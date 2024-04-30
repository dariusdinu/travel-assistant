import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../components/UI";

function TripPlanningOptions() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button>
        <Text>Create your own adventure</Text>
      </Button>
      <Button>
        <Text>
          Let us do the magic{" "}
          <Ionicons name="color-wand" size={24} color="black" />
        </Text>
      </Button>
    </View>
  );
}

export default TripPlanningOptions;
