import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AITripForm from "../components/AITripForm";
import Colors from "../styles/colors";

function AiTrip() {
  const handleFormSubmit = async (formData) => {
    // prettier-ignore
    const prompt = `Generate a trip plan for a traveler with the following details: Place: ${formData.place} Arrival Date: ${formData.arrivalDate.toDateString()} Leave Date: ${formData.leaveDate.toDateString()} Number of Stops: ${formData.stops} Traveling Style: ${formData.travelingStyle} Main Interests: ${formData.mainInterests.join(", ")} Special Requirements: ${formData.specialRequirements.join(", ")} Outside Place: ${formData.outsidePlace ? "Yes" : "No"} Please format the response as a JSON object with the following structure: {"trip":{"title":"Trip to ${formData.place}","startDate":"${formData.arrivalDate.toISOString()}","endDate":"${formData.leaveDate.toISOString()}","stops":[{"place":"[Stop Place]","address":"[Stop Address]","arrivalTime":"[Stop Arrival Time]","website":"[Stop Website]"}]}}`;

    console.log(prompt);

    try {
      console.log("completions");
      const response = await fetch(`http://localhost:5000/completions`, {
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
      Alert.alert("Error", "Failed to generate trip");
    }
  };

  const saveGeneratedTrip = async (generatedTrip) => {
    const userId = "your-logged-in-user-id"; // Get the user ID from context or props

    try {
      const response = await fetch("YOUR_BACKEND_URL/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, trip: generatedTrip.trip }),
      });

      if (response.ok) {
        const savedTrip = await response.json();
        console.log(savedTrip);
        Alert.alert("Success", "Trip generated and saved successfully");
        navigation.navigate("TripPlanningOptions", {
          screen: "TripPlanningOptions",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error("Error saving trip:", error);
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

export default AiTrip;
