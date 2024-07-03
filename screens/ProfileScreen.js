import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInput,
  Switch,
  ScrollView,
  StatusBar,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../store/AuthContext";
import ImagePickerComponent from "../components/ImagePickerComponent";
import { Button } from "../components/UI";
import Colors from "../styles/colors";
import axios from "axios";
import iconGenerator from "../utils/IconGenerator";
import ModalWindow from "../components/UI/ModalWindow";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

async function fetchUserDetails(userId) {
  try {
    const response = await axios.get(`${apiUrl}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    throw error;
  }
}

async function updateUserPassword(userId, newPassword) {
  try {
    const response = await axios.put(`${apiUrl}/users/${userId}/password`, {
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update password:", error);
    throw error;
  }
}

async function updateUserNotifications(userId, notificationsEnabled) {
  try {
    const response = await axios.put(`${apiUrl}/users/${userId}`, {
      notificationsEnabled,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update notifications:", error);
    throw error;
  }
}

function ProfileScreen() {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIcon, setModalIcon] = useState("");
  const [onModalConfirm, setOnModalConfirm] = useState(null);

  const loadUserDetails = async () => {
    try {
      const userId = auth.user;
      const userData = await fetchUserDetails(userId);
      setUserDetails(userData);
      setNotificationsEnabled(userData.notificationsEnabled);
    } catch (error) {
      console.error("Error loading user details:", error);
      Alert.alert("Error", "Failed to load user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.user) {
      loadUserDetails();
    }
  }, [auth.user]);

  const handleImagePicked = async (imageUrl) => {
    try {
      const userId = auth.user;
      const existingUserDetails = await fetchUserDetails(userId);
      const updatedDetails = {
        ...existingUserDetails,
        profilePicture: imageUrl,
      };

      await axios.put(`${apiUrl}/users/${userId}`, updatedDetails);
      setUserDetails(updatedDetails);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      Alert.alert("Error", "Failed to update profile picture");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await updateUserPassword(auth.user, newPassword);
      Alert.alert("Success", "Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      Alert.alert("Error", "Failed to update password");
    }
  };

  const handleToggleNotifications = async () => {
    try {
      const userId = auth.user;
      await updateUserNotifications(userId, !notificationsEnabled);
      setNotificationsEnabled((prev) => !prev);
    } catch (error) {
      console.error("Error updating notifications:", error);
      Alert.alert("Error", "Failed to update notifications");
    }
  };

  const handleLogout = () => {
    setModalIcon("alert-circle-outline");
    setModalMessage("Are you sure you want to log out?");
    setOnModalConfirm(() => () => {
      setModalVisible(false);
      auth.signOut();
    });
    setModalVisible(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor(Colors.accent);

      return () => {
        StatusBar.setBarStyle("dark-content");
        StatusBar.setBackgroundColor(Colors.primary);
      };
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={modalVisible ? "#e5c8b9" : Colors.accent} />
      <ModalWindow
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        iconType={modalIcon}
        message={modalMessage}
        onConfirm={onModalConfirm}
        backdropColor={Colors.accent}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile </Text>
      </View>
      <View style={styles.profileContainer}>
        <ImagePickerComponent
          type="profile"
          defaultImage={
            userDetails && userDetails.profilePicture
              ? { uri: userDetails.profilePicture }
              : require("../assets/empty-profile-picture.png")
          }
          onImagePicked={handleImagePicked}
        />
        {userDetails && (
          <Text style={styles.profileName}>
            {userDetails.firstName} {userDetails.lastName}
          </Text>
        )}
      </View>
      <View style={styles.infoSection}>
        <View style={[styles.infoItem, styles.emailContainer]}>
          {iconGenerator("mail-outline", 24, Colors.textDark2)}
          <Text style={styles.infoText}>Email</Text>
          <Text style={styles.infoDetail}>
            {userDetails?.emailAddress || "N/A"}
          </Text>
        </View>
        <View style={[styles.infoItem, styles.notificationsContainer]}>
          {iconGenerator("notifications-outline", 24, Colors.textDark2)}
          <Text style={styles.infoText}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleToggleNotifications}
            thumbColor={notificationsEnabled ? Colors.accent : Colors.textLight}
            trackColor={{ false: Colors.primary, true: Colors.primary }}
          />
        </View>
      </View>
      <View style={styles.passwordSection}>
        <Text style={styles.passwordTitle}>Change Password</Text>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button onPress={handleChangePassword} color={Colors.accent}>
          Update Password
        </Button>
        <View style={styles.logOutContainer}>
          <Button onPress={handleLogout} color={Colors.danger}>
            Log Out
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 200,
    backgroundColor: Colors.accent,
    borderBottomLeftRadius: 140,
    borderBottomRightRadius: 140,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: "Quicksand-Bold",
    color: Colors.textLight,
    marginLeft: 10,
    position: "absolute",
    top: 40,
    left: 20,
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: -50,
  },
  profileName: {
    fontSize: 24,
    fontFamily: "Quicksand-Bold",
    color: Colors.textDark2,
    marginTop: -16,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: Colors.background,
    borderRadius: 20,
  },
  emailContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  notificationsContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Quicksand-SemiBold",
    color: Colors.textDark2,
    marginLeft: 10,
    flex: 1,
  },
  infoDetail: {
    fontSize: 16,
    fontFamily: "Quicksand-Regular",
    color: Colors.textDark2,
  },
  passwordSection: {
    paddingHorizontal: 20,
  },
  passwordTitle: {
    fontSize: 18,
    fontFamily: "Quicksand-Bold",
    color: Colors.textDark2,
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 25,
    padding: 14,
    fontSize: 16,
    fontFamily: "Quicksand-Regular",
    marginBottom: 10,
  },
  logOutContainer: {
    marginTop: 40,
  },
});
