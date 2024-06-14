import React, { useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AITripForm from "../components/AITripForm";
import Colors from "../styles/colors";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/AuthContext";

async function createStop(stopData, tripId) {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const url = `${apiUrl}/stops`;
  const stop = { ...stopData, tripId };
  console.log("stop", stop);
  const response = await axios.post(url, stop);
  console.log(response.data);
  return response.data._id;
}

async function createTripFromAPIResponse(userId, generatedTrip) {
  const { startDate, endDate, stops } = generatedTrip;
  console.log("generatedTrip: ", generatedTrip);
  const trip = {
    userId,
    type: "generated",
    title: generatedTrip.title,
    dateRange: {
      start: new Date(startDate),
      end: new Date(endDate),
    },
    numberOfStops: stops.length,
    stops: [],
  };

  try {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const tripUrl = `${apiUrl}/trips`;
    const tripResponse = await axios.post(tripUrl, trip);
    const tripId = tripResponse.data._id;
    console.log("tripId: ", tripId);
    const stopPromises = stops.map((stopData) => createStop(stopData, tripId));
    const stopIds = await Promise.all(stopPromises);

    trip.stops = stopIds; // Update the trip's stops array with the created stop ObjectIds

    // Update the trip with the stop references
    await axios.put(`${tripUrl}/${tripId}`, trip);

    return tripResponse.data;
  } catch (error) {
    console.error("Error saving trip and stops:", error);
    throw error;
  }
}

export default function AiTripScreen() {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  const userId = auth.user; // Get the user ID from context or props
  const handleFormSubmit = async (formData) => {
    // prettier-ignore
    const prompt = `Generate a trip plan for a traveler with the following details: Place: ${formData.place} Arrival Date: ${formData.arrivalDate.toDateString()} Leave Date: ${formData.leaveDate.toDateString()} Number of Stops: ${formData.stops} Traveling Style: ${formData.travelingStyle} Main Interests: ${formData.mainInterests.join(", ")} Special Requirements: ${formData.specialRequirements.join(", ")} Outside Place: ${formData.outsidePlace ? "Yes" : "No"} Please format the response as a JSON object with the following structure: {"trip":{"title":"Trip to ${formData.place}","startDate":"${formData.arrivalDate.toISOString()}","endDate":"${formData.leaveDate.toISOString()}","stops":[{"place":"[Stop Place]","address":"[Stop Address]","arrivalTime":"[Stop Arrival Time]","website":"[Stop Website]"}]}}"`;

    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const url = `${apiUrl}/completions`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, maxTokens: 1000, temperature: 0.7 }),
      });
      const data = await response.json();
      const generatedTrip = JSON.parse(data.choices[0].text.trim());

      saveGeneratedTrip(generatedTrip.trip);
    } catch (error) {
      console.error("Error generating trip:", error);
      Alert.alert("Error", "Failed to generate trip 1");
    }
  };

  const saveGeneratedTrip = async (generatedTrip) => {
    try {
      const trip = await createTripFromAPIResponse(userId, generatedTrip);
      console.log("save trip:", trip);
      Alert.alert("Success", "Trip generated and saved successfully");
      navigation.navigate("TripPlanningOptions", {
        screen: "TripPlanningOptions",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to save generated trip");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tell us more about your trip</Text>
      <AITripForm onSubmit={handleFormSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    fontSize: 28,
    color: Colors.textDark1,
    fontFamily: "Quicksand-Bold",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});
