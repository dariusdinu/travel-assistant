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

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

async function fetchUserDetails(userId) {
  try {
    const response = await axios.get(`${apiUrl}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    return null;
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
      const userId = auth.user;
      const userData = await fetchUserDetails(userId);
      setUserDetails(userData);
    }

    async function loadTrips() {
      const userId = auth.user;
      try {
        const fetchedTrips = await fetchTripsByUserId(userId);
        setTrips(fetchedTrips);
      } catch (error) {
        console.error("Error loading trips:", error);
        Alert.alert("Error", "Failed to load trips");
      } finally {
        setLoading(false);
      }
    }

    loadUserDetails();
    loadTrips();
  }, [auth.user]);

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
            isProfile={true}
            defaultImage={require("../assets/empty-profile-picture.png")}
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

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Pressable onPress={() => setActiveTab("Active")}>
          <Text
            style={
              activeTab === "Active" ? styles.activeTab : styles.inactiveTab
            }
          >
            Active
          </Text>
        </Pressable>
        <Pressable onPress={() => setActiveTab("Upcoming")}>
          <Text
            style={
              activeTab === "Upcoming" ? styles.activeTab : styles.inactiveTab
            }
          >
            Upcoming
          </Text>
        </Pressable>
        <Pressable onPress={() => setActiveTab("Past")}>
          <Text
            style={activeTab === "Past" ? styles.activeTab : styles.inactiveTab}
          >
            Past
          </Text>
        </Pressable>
      </View>

      {/* Trip Cards */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {trips.length === 0 ? (
          <Text>No trips found</Text>
        ) : (
          trips.map((trip) => <TripComponent key={trip._id} trip={trip} />)
        )}
      </ScrollView>
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
