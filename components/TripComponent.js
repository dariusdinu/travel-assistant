import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Colors from "../styles/colors";
import { formatDate } from "../utils/DateFormatter";
import { LinearGradient } from "expo-linear-gradient";
import SparklesIcon from "../assets/sparkles.svg";

function TripComponent({ trip, onPress }) {
  return (
    <TouchableOpacity style={styles.tripCard} onPress={() => onPress(trip._id)}>
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
          {trip.type === "generated" && (
            <View style={styles.iconContainer}>
              <SparklesIcon width={24} height={24} fill={Colors.textLight} />
            </View>
          )}
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tripCard: {
    backgroundColor: Colors.background,
    height: 200,
    borderRadius: 40,
    marginBottom: 1,
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
  iconContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    borderRadius: 12,
    padding: 5,
  },
});

export default TripComponent;
