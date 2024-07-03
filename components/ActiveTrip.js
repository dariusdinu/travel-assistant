import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import Colors from "../styles/colors";
import StopCard from "./StopCard";
import { LinearGradient } from "expo-linear-gradient";
import { formatDate } from "../utils/DateFormatter";
import iconGenerator from "../utils/IconGenerator";

export default function ActiveTrip({ activeTrips, emptyMessage }) {
  if (activeTrips.length === 0) {
    return (
      <View style={styles.noTripsInfoContainer}>
        <Text style={styles.message}>{emptyMessage}</Text>
      </View>
    );
  }

  const activeTrip = activeTrips[0];
  const now = new Date();

  const isActiveStop = (arrivalTime, nextArrivalTime) => {
    const arrival = new Date(arrivalTime);
    const nextArrival = nextArrivalTime ? new Date(nextArrivalTime) : null;
    return nextArrival ? now >= arrival && now < nextArrival : now >= arrival;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
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
      {activeTrip.stops.map((stop, index) => (
        <StopCard
          key={stop._id}
          stopInfo={stop}
          isActive={isActiveStop(
            stop.arrivalTime,
            activeTrip.stops[index + 1]?.arrivalTime
          )}
        />
      ))}
      <View style={styles.finalDot}>
        {iconGenerator("ellipse", 20, Colors.accent)}
      </View>
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
