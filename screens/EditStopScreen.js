import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import StopForm from "../components/StopForm";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../styles/colors";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

async function updateStopDetails(stopId, details) {
  const url = `${apiUrl}/stops/${stopId}`;
  try {
    const response = await axios.put(url, details);
    return response.data;
  } catch (error) {
    console.error("Error updating stop details:", error);
    throw error;
  }
}

export default function EditStopScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { stopInfo } = route.params;

  const handleFormSubmit = async (updatedStopInfo) => {
    try {
      await updateStopDetails(stopInfo._id, updatedStopInfo);
      Alert.alert("Success", "Stop details updated successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to update stop details");
    }
  };

  return (
    <View style={styles.container}>
      <StopForm
        onSubmit={handleFormSubmit}
        initialData={stopInfo}
        buttonText="Save changes"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: Colors.primary,
  },
});
