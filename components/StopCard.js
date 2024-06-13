import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../styles/colors";
import iconGenerator from "../utils/IconGenerator";

const iconsArray = Array(7).fill("remove");

export default function StopCard({ stopInfo }) {
  return (
    <View style={styles.stopContainer}>
      <View style={styles.timelineBar}>
        <View style={styles.dot}>
          {iconGenerator("ellipse", 12, Colors.accent)}
        </View>
        <>
          {iconsArray.map((icon, index) => (
            <View style={styles.rotate} key={index}>
              {iconGenerator(icon, 20, Colors.textLight2)}
            </View>
          ))}
        </>
      </View>

      <View style={styles.stopInfoContainer}>
        <Text style={styles.stopName}>Place</Text>
        <View style={styles.infoAddress}>
          <View>{iconGenerator("pin", 16, Colors.textLight2)}</View>
          <Text style={styles.stopAddress}>Address</Text>
        </View>
        <View style={styles.infoArrivalTime}>
          <View>{iconGenerator("time", 16, Colors.textLight2)}</View>
          <Text style={styles.stopArrivalTime}>Arrival time</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stopInfoContainer: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  stopContainer: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 10,
  },
  timelineBar: {
    alignItems: "center",
    transform: [{ translateY: 50 }, { scale: 1.5 }],
    gap: -12,
    paddingHorizontal: 10,
  },
  stopArrivalTime: {
    fontSize: 14,
    paddingTop: 10,
    color: "#555",
    fontFamily: "Quicksand-Regular",
    textAlign: "right",
  },
  stopName: {
    fontSize: 24,
    fontFamily: "Quicksand-SemiBold",
  },
  stopAddress: {
    fontSize: 16,
    flex: 1,
    fontFamily: "Quicksand-Regular",
    color: "#888",
  },
  rotate: {
    transform: [{ rotate: "90deg" }],
  },
  dot: { zIndex: 1 },
  infoAddress: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  infoArrivalTime: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    gap: 5,
  },
});
