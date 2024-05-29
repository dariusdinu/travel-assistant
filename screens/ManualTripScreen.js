import { Text, View } from "react-native";
import { Button } from "../components/UI";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

function ManualTrip() {
  const navigation = useNavigation();
  const [trips, setTrips] = useState([]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {trips.length ? (
        "Start by adding a trip"
      ) : (
        <View>
          <Text>These are your trips</Text>
        </View>
      )}
      <Button onPress={() => navigation.navigate("AddAStop")}>
        <Text>Add a stop</Text>
      </Button>
    </View>
  );
}

export default ManualTrip;
