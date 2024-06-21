import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../styles/colors";
import iconGenerator from "../utils/IconGenerator";
import { formatDate, formatTime } from "../utils/DateFormatter";
import { useNavigation } from "@react-navigation/native";

export default function StopCard({ stopInfo, onDelete }) {
  const navigation = useNavigation();
  return (
    <View style={styles.stopContainer}>
      <View style={styles.timelineBar}>
        <View style={styles.dot}>
          {iconGenerator("ellipse", 12, Colors.accent)}
        </View>
        <>
          {Array(7)
            .fill("remove")
            .map((icon, index) => (
              <View style={styles.rotate} key={index}>
                {iconGenerator(icon, 20, Colors.textLight2)}
              </View>
            ))}
        </>
      </View>
      <TouchableOpacity
        style={styles.stopInfoContainer}
        onPress={() => navigation.navigate("EditStop", { stopInfo })}
      >
        <Text style={styles.stopName}>{stopInfo.place}</Text>
        <View style={styles.infoAddress}>
          <View>{iconGenerator("pin", 16, Colors.textLight2)}</View>
          <Text style={styles.stopAddress}>{stopInfo.address}</Text>
        </View>
        <View style={styles.infoArrival}>
          <View style={styles.dateTimeContainerLeft}>
            {iconGenerator("calendar-outline", 16, Colors.textLight2)}
            <Text style={styles.stopArrivalDate}>
              {formatDate(stopInfo.arrivalTime)}
            </Text>
          </View>
          <View style={styles.dateTimeContainerRight}>
            {iconGenerator("time-outline", 16, Colors.textLight2)}
            <Text style={styles.stopArrivalTime}>
              {formatTime(stopInfo.arrivalTime)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(stopInfo._id)}
        >
          {iconGenerator("close-outline", 16, Colors.textLight2)}
        </TouchableOpacity>
      </TouchableOpacity>
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
    position: "relative",
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
  stopArrivalDate: {
    fontSize: 14,
    paddingTop: 10,
    color: "#555",
    fontFamily: "Quicksand-Regular",
  },
  stopArrivalTime: {
    fontSize: 14,
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
  infoArrival: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
  },
  deleteButton: {
    position: "absolute",
    right: 18,
    top: 20,
  },
  dateTimeContainerLeft: {
    flex: 1,
    flexDirection: "row",
    gap: 3,
    alignItems: "flex-end",
  },
  dateTimeContainerRight: {
    flex: 1,
    gap: 3,
    alignItems: "flex-end",
    flexDirection: "row-reverse",
  },
});
