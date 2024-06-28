import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../styles/colors";
import StopCard from "./StopCard";
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
    paddingBottom: 100,
    paddingTop: 20,
    backgroundColor: Colors.primary,
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
