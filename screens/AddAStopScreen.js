import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import StopForm from "../components/StopForm";
import Colors from "../styles/colors";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import ModalWindow from "../components/UI/ModalWindow";

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
  const { tripId, mode, googlePlace } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIcon, setModalIcon] = useState("");
  const [onModalConfirm, setOnModalConfirm] = useState(null);

  const initialData =
    mode === "Google Place"
      ? {
          place: googlePlace.name,
          address: googlePlace.vicinity,
          website: googlePlace.website || "",
          arrivalTime: new Date(),
        }
      : {};

  async function submitHandler(stopDetails) {
    console.log(stopDetails);
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

      if (mode === "edit") {
        navigation.navigate("EditTrip", { tripId });
      } else if (mode === "Google Place") {
        navigation.navigate("ExploreCategoryScreen");
      } else {
        navigation.navigate("ManualTrip", { stopId });
      }
    } catch (error) {
      setModalIcon("alert-circle-outline");
      setModalMessage(`Failed to add stop: ${error.message}`);
      setOnModalConfirm(() => () => setModalVisible(false));
      setModalVisible(true);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a stop</Text>
      <StopForm
        onSubmit={(stopDetails) => submitHandler(stopDetails)}
        initialData={initialData}
      />
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
