import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../styles/colors";
import StopCard from "./StopCard";
import axios from "axios";
import ModalWindow from "./UI/ModalWindow";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function StopList({ stops, onUpdate }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIcon, setModalIcon] = useState("");
  const [onModalConfirm, setOnModalConfirm] = useState(null);

  const handleDeleteStop = (id) => {
    setModalIcon("alert-circle-outline");
    setModalMessage("Are you sure you want to delete this stop?");
    setOnModalConfirm(() => async () => {
      try {
        await axios.delete(`${apiUrl}/stops/${id}`);
        const updatedStops = stops.filter((stop) => stop._id !== id);
        onUpdate(updatedStops);
        setModalVisible(false);
      } catch (error) {
        console.error("Error deleting stop:", error);
        setModalIcon("alert-circle-outline");
        setModalMessage("Failed to delete stop.");
        setOnModalConfirm(() => () => setModalVisible(false));
        setModalVisible(true);
      }
    });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {stops.length > 0 ? (
        stops.map((stop) => (
          <StopCard
            key={stop._id}
            stopInfo={stop}
            onDelete={handleDeleteStop}
          />
        ))
      ) : (
        <Text style={styles.noStopsText}>No stops added yet</Text>
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
  noStopsText: {
    fontFamily: "Quicksand-Regular",
    textAlign: "center",
    marginVertical: 120,
    fontSize: 24,
  },
});
