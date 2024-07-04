import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import TripComponent from "../components/TripComponent";
import Colors from "../styles/colors";

export default function TripList({ trips, onTripPress, emptyMessage }) {
  const sortedTrips = trips.sort((a, b) => {
    const startDateA = new Date(a.dateRange.start);
    const startDateB = new Date(b.dateRange.start);
    return startDateA - startDateB;
  });

  return (
    <View style={styles.tabContainer}>
      {sortedTrips.length === 0 ? (
        <View style={styles.noTripsInfoContainer}>
          <Text style={styles.message}>{emptyMessage}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {sortedTrips.map((trip) => (
            <TripComponent key={trip._id} trip={trip} onPress={onTripPress} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  noTripsInfoContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 30,
  },
  message: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 20,
    textAlign: "center",
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 5,
    paddingBottom: 100,
  },
});
