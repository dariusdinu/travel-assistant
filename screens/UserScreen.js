import React, { useContext, useEffect, useState, useCallback } from "react";
import { Text, View, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../store/AuthContext";
import ImagePickerComponent from "../components/ImagePickerComponent";
import { IconButton } from "../components/UI";
import Colors from "../styles/colors";
import axios from "axios";
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
  const navigation = useNavigation();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  const loadUserDetails = async () => {
    try {
      const userId = auth.user;
      const userData = await fetchUserDetails(userId);
      setUserDetails(userData);
    } catch (error) {
      console.error("Error loading user details:", error);
      Alert.alert("Error", "Failed to load user details");
    }
  };

  const loadTrips = async () => {
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
  };

  useEffect(() => {
    if (auth.user) {
      loadUserDetails();
      loadTrips();
    }
  }, [auth.user]);

  useFocusEffect(
    useCallback(() => {
      if (auth.user) {
        loadTrips();
      }
    }, [auth.user])
  );

  const handleTripPress = (tripId) => {
    navigation.navigate("EditTrip", { tripId });
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
      <TabBarTrips trips={trips} onTripPress={handleTripPress} />
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
    fontFamily: "Quicksand-Bold",
    color: Colors.textDark2,
  },
  rounded: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "transparent",
  },
});
