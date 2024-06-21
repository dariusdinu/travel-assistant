import React from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import Colors from "../styles/colors";
import StopCard from "./StopCard";
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function StopList({ stops, onUpdate }) {
  const handleDeleteStop = async (id) => {
    Alert.alert(
      "Delete Stop",
      "Are you sure you want to delete this stop?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`${apiUrl}/stops/${id}`);
              const updatedStops = stops.filter((stop) => stop._id !== id);
              onUpdate(updatedStops);
            } catch (error) {
              console.error("Error deleting stop:", error);
              Alert.alert("Error", "Failed to delete stop.");
            }
          },
        },
      ],
      { cancelable: true }
    );
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
