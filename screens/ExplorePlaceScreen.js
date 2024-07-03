import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  Pressable,
} from "react-native";
import Colors from "../styles/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../components/UI";
import axios from "axios";
import ModalWindow from "../components/UI/ModalWindow";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import iconGenerator from "../utils/IconGenerator";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const googleApiKey = "AIzaSyDj8oH1DULLrIzJ8a35YL72tnTRDfTnEjE";

const dayAbbreviations = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ExplorePlaceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { place } = route.params;

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [placeDetails, setPlaceDetails] = useState(null);
  const currentDay = new Date().getDay();

  useEffect(() => {
    fetchTrips();
    fetchPlaceDetails(place.place_id);
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get(`${apiUrl}/trips`);
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaceDetails = async (placeId) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleApiKey}`
      );
      setPlaceDetails(response.data.result);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  const handleAddStop = () => {
    const activeTrip = trips.find((trip) => trip.status === "active");
    if (activeTrip) {
      navigation.navigate("AddAStopScreen", { place });
    } else {
      setModalMessage("You currently do not have an active trip.");
      setModalVisible(true);
    }
  };

  const handleOpenInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      place.vicinity
    )}`;
    Linking.openURL(url);
  };

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleOpenWebsite = (website) => {
    Linking.openURL(website);
  };

  const renderPhotos = () => {
    if (place.photos && place.photos.length > 0) {
      return place.photos.map((photo, index) => {
        const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${googleApiKey}`;
        return (
          <View key={index} style={styles.photoContainer}>
            <Image source={{ uri: imageUrl }} style={styles.photo} />
            <LinearGradient
              colors={["#232F2F22", "#232F2Fbb"]}
              style={styles.linearGradient}
            >
              <View style={styles.photoOverlay}>
                <Text style={styles.statusText}>
                  {place.opening_hours?.open_now ? "Open Now" : "Closed Now"}
                </Text>
                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={handleOpenInMaps}
                >
                  <Ionicons
                    name="map-outline"
                    size={24}
                    color={Colors.background}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        );
      });
    }
    return null;
  };

  const formatType = (type) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderTypes = () => {
    if (place.types && place.types.length > 0) {
      return place.types.map((type, index) => (
        <View key={index} style={styles.typeTag}>
          <Text style={styles.typeText}>{formatType(type)}</Text>
        </View>
      ));
    }
    return null;
  };

  const renderOpeningHours = () => {
    if (
      placeDetails &&
      placeDetails.opening_hours &&
      placeDetails.opening_hours.weekday_text
    ) {
      return placeDetails.opening_hours.weekday_text.map((day, index) => (
        <View key={index} style={styles.openingHoursRow}>
          <Text
            style={[
              styles.dayAbbreviations,
              currentDay - 1 === index ? styles.boldText : null,
            ]}
          >
            {dayAbbreviations[index]}
          </Text>
          <Text
            style={[
              styles.workingHoursData,
              currentDay - 1 === index ? styles.boldText : null,
            ]}
          >
            {day.split(": ")[1]}
          </Text>
        </View>
      ));
    }
    return null;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{place.name}</Text>
      <View>{renderPhotos()}</View>
      <View style={styles.infoCard}>
        <Ionicons name="location-outline" size={24} color={Colors.accent} />
        <Text style={styles.infoText}>{place.vicinity}</Text>
      </View>
      {place.rating && (
        <View style={styles.infoCard}>
          <Ionicons name="star-outline" size={24} color={Colors.accent} />
          <Text style={styles.infoText}>
            {place.rating}/5 ({place.user_ratings_total} ratings)
          </Text>
        </View>
      )}
      {placeDetails && (
        <>
          {placeDetails.formatted_phone_number && (
            <TouchableOpacity
              style={styles.infoCard}
              onPress={() => handleCall(placeDetails.formatted_phone_number)}
            >
              <Ionicons name="call-outline" size={24} color={Colors.accent} />
              <Text style={styles.infoText}>
                {placeDetails.formatted_phone_number}
              </Text>
            </TouchableOpacity>
          )}
          {placeDetails.opening_hours &&
            placeDetails.opening_hours.weekday_text && (
              <View style={styles.infoCard}>
                <View>
                  <View style={styles.openingHoursTitle}>
                    {iconGenerator("calendar-outline", 24, Colors.accent)}
                    <Text style={styles.infoText}>Working hours</Text>
                  </View>

                  {renderOpeningHours()}
                </View>
              </View>
            )}
          {placeDetails.website && (
            <TouchableOpacity
              style={styles.infoCard}
              onPress={() => handleOpenWebsite(placeDetails.website)}
            >
              <Ionicons name="globe-outline" size={24} color={Colors.accent} />
              <Text style={styles.infoText}>{placeDetails.website}</Text>
            </TouchableOpacity>
          )}
        </>
      )}
      <View style={styles.infoCard}>
        <Ionicons name="pricetags-outline" size={24} color={Colors.accent} />
        <View style={styles.typesContainer}>{renderTypes()}</View>
      </View>
      <View style={styles.submitButton}>
        <Button title="Add to Current Trip" onPress={handleAddStop}>
          <Text>Add stop to current trip</Text>
        </Button>
      </View>
      <ModalWindow
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        iconType="alert-circle-outline"
        message={modalMessage}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 28,
    color: Colors.textDark1,
    fontFamily: "Quicksand-Bold",
    marginBottom: 16,
  },
  photoContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 30,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  photoOverlay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  statusText: {
    fontSize: 18,
    color: Colors.textLight,
    fontFamily: "Quicksand-Bold",
  },
  mapButton: {
    borderRadius: 20,
    padding: 10,
  },
  infoCard: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    marginBottom: 10,
    paddingLeft: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    color: Colors.textDark1,
    marginLeft: 10,
    fontFamily: "Quicksand-SemiBold",
    paddingRight: 30,
  },
  openingHoursRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
  },
  openingHoursTitle: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 3,
    marginBottom: 10,
  },
  dayAbbreviations: {
    fontFamily: "Quicksand-SemiBold",
    marginLeft: 6,
    fontSize: 16,
    color: Colors.accent,
  },
  workingHoursData: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 18,
  },
  boldText: {
    fontFamily: "Quicksand-Bold",
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingRight: 20,
  },
  typeTag: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  typeText: {
    fontSize: 14,
    color: Colors.textDark1,
    fontFamily: "Quicksand-SemiBold",
  },
  buttonContainer: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: Colors.accent,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  loadingText: {
    fontSize: 20,
    color: Colors.textDark1,
    fontFamily: "Quicksand-Bold",
  },
});

export default ExplorePlaceScreen;
