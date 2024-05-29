import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import Colors from "../styles/colors";

export default function ImagePickerComponent({ isProfile }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera roll permission to upload images.`
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false, // Disable editing to prevent cropping
        quality: 1,
      });

      if (!result.canceled) {
        setFile(result.assets[0].uri);
        setError(null);
      }
    }
  };

  return (
    <TouchableOpacity
      style={
        isProfile ? styles.imagePlaceholderProfile : styles.imagePlaceholder
      }
      onPress={pickImage}
    >
      {file ? (
        <Image source={{ uri: file }} style={styles.image} />
      ) : (
        <Image
          source={
            isProfile
              ? require("../assets/empty-profile-picture.png")
              : require("../assets/empty-picture.png")
          }
          style={isProfile ? styles.profile : styles.image}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: "#FFFAF6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  imagePlaceholderProfile: {
    width: 80,
    height: 80,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  profile: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
});
