import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import StopForm from "../components/StopForm";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../styles/colors";
import ModalWindow from "../components/UI/ModalWindow"; // Import ModalWindow

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

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIcon, setModalIcon] = useState("information-circle-outline");
  const [onModalConfirm, setOnModalConfirm] = useState(null);

  const handleFormSubmit = async (updatedStopInfo) => {
    try {
      await updateStopDetails(stopInfo._id, updatedStopInfo);
      setModalIcon("checkmark-circle-outline");
      setModalMessage("Stop details updated successfully");
      setOnModalConfirm(() => () => {
        setModalVisible(false);
        navigation.goBack();
      });
      setModalVisible(true);
    } catch (error) {
      setModalIcon("close-circle-outline");
      setModalMessage("Failed to update stop details");
      setOnModalConfirm(() => () => {
        setModalVisible(false);
      });
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <ModalWindow
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        iconType={modalIcon}
        message={modalMessage}
        onConfirm={onModalConfirm}
      />
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
