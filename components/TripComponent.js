import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Colors from "../styles/colors";
import formatDate from "../utils/DateFormatter";

function TripComponent({ trip }) {
  return (
    <View style={styles.tripCard}>
      <Image source={trip.image} style={styles.tripImage} />
      <View style={styles.tripInfo}>
        <Text style={styles.tripDestination}>{trip.title}</Text>
        <Text style={styles.tripDateRange}>{`${formatDate(
          trip.dateRange.start
        )} - ${formatDate(trip.dateRange.end)}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tripCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  tripImage: {
    width: "100%",
    height: 200,
  },
  tripInfo: {
    padding: 16,
  },
  tripDestination: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#161717",
  },
  tripDateRange: {
    fontSize: 14,
    color: "#A0A0A0",
  },
});

export default TripComponent;
