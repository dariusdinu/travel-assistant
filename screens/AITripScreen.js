import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AITripForm from "../components/AITripForm";
import Colors from "../styles/colors";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/AuthContext";
import { LoadingOverlay } from "../components/UI";
import ModalWindow from "../components/UI/ModalWindow";

async function createStop(stopData, tripId) {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const url = `${apiUrl}/stops`;

  const stop = {
    ...stopData,
    tripId,
    isWheelchairAccessible: stopData.isWheelchairAccessible === "True",
    isKidFriendly: stopData.isKidFriendly === "True",
  };

  const response = await axios.post(url, stop);

  return response.data._id;
}

async function createTripFromAPIResponse(userId, generatedTrip) {
  const { startDate, endDate, stops } = generatedTrip;

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

    const stopPromises = stops.map((stopData) => {
      const stopDetails = {
        place: stopData.place,
        address: stopData.address,
        arrivalTime: new Date(stopData.arrivalTime),
        website: stopData.website,
        notes: stopData.notes,
        images: stopData.images,
        additionalFiles: stopData.additionalFiles,
        isWheelchairAccessible:
          stopData.meetsRequirements.isWheelchairAccessible,
        isKidFriendly: stopData.meetsRequirements.isKidFriendly,
      };

      return createStop(stopDetails, tripId);
    });
    const stopIds = await Promise.all(stopPromises);

    trip.stops = stopIds;

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
  const userId = auth.user;
  const [isLoading, setIsLoading] = useState(false);
  const [currentTripPlace, setCurrentTripPlace] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIcon, setModalIcon] = useState("");
  const [onModalConfirm, setOnModalConfirm] = useState(null);

  const handleFormSubmit = async (formData) => {
    // prettier-ignore
    const prompt = `Generate a trip plan for a traveler with the following details: Place: ${formData.place} Arrival Date: ${formData.arrivalDate.toDateString()} Leave Date: ${formData.leaveDate.toDateString()} Average Number of Stops for Each Day: ${formData.stops} Traveling Style: ${formData.travelingStyle} Main Interests: ${formData.mainInterests.join(", ")} Special Requirements: ${formData.specialRequirements.join(", ")} Outside Place: ${formData.outsidePlace ? "Yes" : "No"} Please ensure that the recommendations: Align with the specified traveling style (e.g., adventure, leisure, cultural), Cater to the main interests of the traveler, Fulfill any special requirements mentioned (indicate if the requirement is met or not for each stop), Include outside locations close to the specified place if the traveler prefers, Add as many daily stops as they intend. Please format the response as a JSON object with the following structure: {"trip":{"title":"Trip to ${formData.place}","startDate":"${formData.arrivalDate.toISOString()}","endDate":"${formData.leaveDate.toISOString()}","stops":[{"place":"[Stop Place]","address":"[Stop Address]","arrivalTime":"[Stop Arrival Time]","website":"[Stop Website]","meetsRequirements": {"isWheelchairAccessible": "[True/False]","isKidFriendly": "[True/False]"}}]}}"`;
    setCurrentTripPlace(formData.place);
    setIsLoading(true);
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const url = `${apiUrl}/completions`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, maxTokens: 2000, temperature: 0.7 }),
      });
      const data = await response.json();
      const generatedTrip = JSON.parse(data.choices[0].text.trim());

      saveGeneratedTrip(generatedTrip.trip);
    } catch (error) {
      console.error("Error generating trip:", error);
      setModalIcon("alert-circle-outline");
      setModalMessage("Failed to generate trip");
      setOnModalConfirm(() => () => setModalVisible(false));
      setModalVisible(true);
      setIsLoading(false);
    }
  };

  const saveGeneratedTrip = async (generatedTrip) => {
    try {
      const trip = await createTripFromAPIResponse(userId, generatedTrip);
      setModalIcon("checkmark-circle-outline");
      setModalMessage("Trip generated and saved successfully");
      setOnModalConfirm(
        () => () =>
          navigation.navigate("TripPlanningOptions", {
            screen: "TripPlanningOptions",
          })
      );
      setModalVisible(true);
    } catch (error) {
      setModalIcon("alert-circle-outline");
      setModalMessage("Failed to save generated trip");
      setOnModalConfirm(() => () => setModalVisible(false));
      setModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <LoadingOverlay
          message={`Your wish is my command!\n\nFinding best attractions in ${currentTripPlace}`}
        />
      )}
      {!isLoading && (
        <>
          <Text style={styles.header}>Tell us more about your trip</Text>
          <AITripForm onSubmit={handleFormSubmit} />
        </>
      )}
      <ModalWindow
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        iconType={modalIcon}
        message={modalMessage}
        onConfirm={onModalConfirm}
      />
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
