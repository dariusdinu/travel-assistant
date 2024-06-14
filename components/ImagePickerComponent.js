import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import Colors from "../styles/colors";

export default function ImagePickerComponent({
  type,
  onImagePicked,
  defaultImage,
}) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permission to upload images."
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        const pickedImage = result.assets[0].uri;
        setFile(pickedImage);
        const imageUrl = await uploadImageToSpaces(pickedImage);
        onImagePicked(imageUrl);
      }
    }
  };

  const uploadImageToSpaces = async (uri) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", {
        uri,
        name: `photo_${Date.now()}.jpg`,
        type: "image/jpeg",
      });

      const apiUrl = process.env.EXPO_PUBLIC_API_URL; // Ensure this is set in your .env file
      const response = await axios.post(`${apiUrl}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = response.data.url;
      setFile(imageUrl);
      Alert.alert("Upload Success", "Image uploaded successfully!");
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload Failed", "Failed to upload image.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return (
    <TouchableOpacity
      style={
        type === "profile"
          ? styles.imagePlaceholderProfile
          : styles.imagePlaceholder
      }
      onPress={pickImage}
    >
      {file ? (
        <Image source={{ uri: file }} style={styles.image} />
      ) : (
        <Image
          source={
            defaultImage
              ? defaultImage
              : type === "profile"
              ? require("../assets/empty-profile-picture.png")
              : require("../assets/empty-picture.png")
          }
          style={type === "profile" ? styles.profile : styles.image}
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
    borderRadius: 20,
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
    borderRadius: 50,
  },
  profile: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
});
