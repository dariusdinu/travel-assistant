import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import StopForm from "../components/StopForm";
import Colors from "../styles/colors";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

async function addAStopToDatabase({
  place,
  address,
  arrivalTime,
  website,
  notes,
  images,
  additionalFiles,
  tripId,
}) {
  try {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const url = `${apiUrl}/stops`;
    const response = await axios.post(url, {
      place,
      address,
      arrivalTime,
      website,
      notes,
      images,
      additionalFiles,
      tripId,
    });
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    if (error.response) {
      console.error("Response Error: ", error.response.data);
      throw new Error(error.response.data.message);
    } else if (error.request) {
      console.error("Request Error: No response from the server");
      throw new Error("No response from the server");
    } else {
      console.error("General Error: ", error.message);
      throw new Error("An error occurred");
    }
  }
}

export default function AddAStopScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { tripId } = route.params;

  async function submitHandler(stopDetails) {
    let {
      place,
      address,
      arrivalTime,
      website,
      notes,
      images,
      additionalFiles,
    } = stopDetails;

    place = place.trim();
    address = address.trim();
    website = website.trim();
    notes = notes.trim();
    try {
      const stopData = await addAStopToDatabase({
        place,
        address,
        arrivalTime,
        website,
        notes,
        images,
        additionalFiles,
        tripId,
      });
      const stopId = stopData._id;

      navigation.navigate("ManualTrip", { stopId });
    } catch (error) {
      Alert.alert("Failed to add stop", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a stop</Text>
      <StopForm onSubmit={(stopDetails) => submitHandler(stopDetails)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    fontSize: 28,
    color: Colors.textDark1,
    fontFamily: "Quicksand-Bold",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
});
