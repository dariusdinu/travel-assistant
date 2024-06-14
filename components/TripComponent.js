import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import Colors from "../styles/colors";
import formatDate from "../utils/DateFormatter";
import { LinearGradient } from "expo-linear-gradient";

function TripComponent({ trip }) {
  return (
    <View style={styles.tripCard}>
      <ImageBackground
        source={{ uri: trip.coverPhoto }}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <LinearGradient
          colors={["#232F2F22", "#232F2Fbb"]}
          style={styles.linearGradient}
        >
          <View style={styles.tripInfo}>
            <Text style={styles.tripDestination}>{trip.title}</Text>
            <Text style={styles.tripDateRange}>{`${formatDate(
              trip.dateRange.start
            )} - ${formatDate(trip.dateRange.end)}`}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  tripCard: {
    backgroundColor: Colors.background,
    height: 200,
    borderRadius: 40,
    marginBottom: 16,
    overflow: "hidden",
    marginVertical: 20,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  linearGradient: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  tripInfo: {
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingBottom: 10,
  },
  tripDestination: {
    fontSize: 24,
    fontFamily: "Quicksand-SemiBold",
    color: Colors.textLight,
  },
  tripDateRange: {
    fontSize: 14,
    color: Colors.textLight,
    fontFamily: "Quicksand-SemiBold",
  },
});

export default TripComponent;
