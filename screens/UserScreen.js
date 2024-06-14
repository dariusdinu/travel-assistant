import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../store/AuthContext";
import ImagePickerComponent from "../components/ImagePickerComponent";
import { IconButton } from "../components/UI";
import { StyleSheet } from "react-native";
import Colors from "../styles/colors";
import axios from "axios";
import TripComponent from "../components/TripComponent";
import TabBarTrips from "../navigation/TabBarTrips";

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

async function fetchTripsByUserId(userId) {
  try {
    const response = await axios.get(`${apiUrl}/trips`);
    const userTrips = response.data.filter((trip) => trip.userId === userId);
    return userTrips;
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw error;
  }
}

function UserScreen() {
  const auth = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    async function loadUserDetails() {
      try {
        const userId = auth.user;
        const userData = await fetchUserDetails(userId);
        setUserDetails(userData);
      } catch (error) {
        console.error("Error loading user details:", error);
        Alert.alert("Error", "Failed to load user details");
      }
    }

    async function loadTrips() {
      try {
        const userId = auth.user;
        const fetchedTrips = await fetchTripsByUserId(userId);
        setTrips(fetchedTrips);
      } catch (error) {
        console.error("Error loading trips:", error);
        Alert.alert("Error", "Failed to load trips");
      } finally {
        setLoading(false);
      }
    }

    if (auth.user) {
      loadUserDetails();
      loadTrips();
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.rounded}>
          <ImagePickerComponent
            type="profile"
            defaultImage={
              userDetails && userDetails.profilePicture
                ? { uri: userDetails.profilePicture }
                : require("../assets/empty-profile-picture.png")
            }
            onImagePicked={handleImagePicked}
          />
        </View>
        {userDetails && (
          <Text style={styles.profileName}>
            {userDetails.firstName} {userDetails.lastName}
          </Text>
        )}
        <IconButton
          onPress={auth.signOut}
          icon={"exit-outline"}
          color={Colors.accent}
          size={27}
        />
      </View>

      <TabBarTrips trips={trips} />
    </View>
  );
}

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#161717",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  activeTab: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#161717",
    borderBottomWidth: 2,
    borderBottomColor: "#161717",
  },
  inactiveTab: {
    fontSize: 16,
    color: "#A0A0A0",
  },
  scrollContainer: {
    paddingBottom: 80, // Add padding to ensure content is above the TabBar
  },
  rounded: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "transparent",
  },
});
