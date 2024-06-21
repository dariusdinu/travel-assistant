import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import TripComponent from "../components/TripComponent";
import Colors from "../styles/colors";

export default function TripList({ trips, onTripPress, emptyMessage }) {
  return (
    <View style={styles.tabContainer}>
      {trips.length === 0 ? (
        <View style={styles.noTripsInfoContainer}>
          <Text style={styles.message}>{emptyMessage}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {trips.map((trip) => (
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
    paddingBottom: 100,
  },
});
