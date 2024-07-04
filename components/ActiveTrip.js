import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Colors from "../styles/colors";
import StopCard from "./StopCard";
import { LinearGradient } from "expo-linear-gradient";
import { formatDate } from "../utils/DateFormatter";
import iconGenerator from "../utils/IconGenerator";
import axios from "axios";
import ModalWindow from "./UI/ModalWindow";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function ActiveTrip({ activeTrips, emptyMessage, onTripPress }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIcon, setModalIcon] = useState("");
  const [onModalConfirm, setOnModalConfirm] = useState(null);

  if (activeTrips.length === 0) {
    return (
      <View style={styles.noTripsInfoContainer}>
        <Text style={styles.message}>{emptyMessage}</Text>
      </View>
    );
  }

  const activeTrip = activeTrips[0];
  const now = new Date();

  const sortedStops = [...activeTrip.stops].sort(
    (a, b) => new Date(a.arrivalTime) - new Date(b.arrivalTime)
  );

  const isActiveStop = (arrivalTime, nextArrivalTime) => {
    const arrival = new Date(arrivalTime);
    const nextArrival = nextArrivalTime ? new Date(nextArrivalTime) : null;
    return nextArrival ? now >= arrival && now < nextArrival : now >= arrival;
  };

  const handleDeleteStop = (id) => {
    setModalIcon("alert-circle-outline");
    setModalMessage("Are you sure you want to delete this stop?");
    setOnModalConfirm(() => async () => {
      try {
        await axios.delete(`${apiUrl}/stops/${id}`);
        const updatedStops = sortedStops.filter((stop) => stop._id !== id);
        activeTrip.stops = updatedStops;
        setModalVisible(false);
      } catch (error) {
        console.error("Error deleting stop:", error);
        setModalIcon("alert-circle-outline");
        setModalMessage("Failed to delete stop.");
        setOnModalConfirm(() => () => setModalVisible(false));
        setModalVisible(true);
      }
    });
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => onTripPress(activeTrip._id)}
          style={styles.editButton}
        >
          {iconGenerator("pencil", 24, Colors.background)}
        </TouchableOpacity>
        <ImageBackground
          source={{ uri: activeTrip.coverPhoto }}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <LinearGradient
            colors={["#232F2F22", "#232F2Fbb"]}
            style={styles.linearGradient}
          >
            <View style={styles.tripInfo}>
              <Text style={styles.tripTitle}>{activeTrip.title}</Text>
              <Text style={styles.tripDateRange}>{`${formatDate(
                activeTrip.dateRange.start
              )} - ${formatDate(activeTrip.dateRange.end)}`}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      {sortedStops.map((stop, index) => (
        <StopCard
          key={stop._id}
          stopInfo={stop}
          isActive={isActiveStop(
            stop.arrivalTime,
            sortedStops[index + 1]?.arrivalTime
          )}
          onDelete={handleDeleteStop}
        />
      ))}
      <View style={styles.finalDot}>
        {iconGenerator("ellipse", 20, Colors.accent)}
      </View>
      <ModalWindow
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        iconType={modalIcon}
        message={modalMessage}
        onConfirm={onModalConfirm}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 300,
    backgroundColor: Colors.primary,
  },
  imageContainer: {
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 20,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  editButton: {
    position: "absolute",
    right: 20,
    top: 20,
    zIndex: 1,
  },
  linearGradient: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    height: "100%",
    justifyContent: "flex-end",
  },
  tripInfo: {
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingBottom: 10,
  },
  tripTitle: {
    fontSize: 26,
    fontFamily: "Quicksand-SemiBold",
    color: Colors.textLight,
  },
  tripDateRange: {
    fontSize: 14,
    color: Colors.textLight,
    fontFamily: "Quicksand-SemiBold",
  },
  noTripsInfoContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
  },
  message: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 20,
    textAlign: "center",
  },
  finalDot: {
    zIndex: 1,
    marginTop: 10,
    marginLeft: 11,
  },
});
