import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../styles/colors";
import iconGenerator from "../utils/IconGenerator";
import { formatDate, formatTime } from "../utils/DateFormatter";
import { useNavigation } from "@react-navigation/native";

export default function StopCard({ stopInfo, onDelete, isActive }) {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.stopContainer}>
        <View style={styles.timelineBar}>
          <View style={styles.dot}>
            {iconGenerator("ellipse", 16, Colors.accent)}
          </View>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity
          style={[styles.stopInfoContainer, isActive && styles.activeStop]}
          onPress={() => navigation.navigate("EditStop", { stopInfo })}
        >
          {isActive && <Text style={styles.activeText}>Current Stop</Text>}
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
            {stopInfo.isWheelchairAccessible && (
              <View>
                {iconGenerator("body-outline", 16, Colors.textLight2)}
              </View>
            )}
            {stopInfo.isKidFriendly && (
              <View>
                {iconGenerator("happy-outline", 16, Colors.textLight2)}
              </View>
            )}
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
    </>
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
  activeStop: {
    borderColor: "rgba(214, 121, 63, 0.5)",
    borderWidth: 2,
  },
  activeText: {
    color: Colors.accent,
    fontSize: 12,
    fontFamily: "Quicksand-Regular",
  },
  stopContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  timelineBar: {
    alignItems: "center",
    position: "relative",
    paddingHorizontal: 10,
    marginLeft: 2,
  },
  dot: {
    zIndex: 1,
    marginTop: 22,
  },
  line: {
    position: "absolute",
    top: 20,
    bottom: 0,
    width: 2,
    backgroundColor: Colors.textLight2,
    transform: [{ scaleY: 1.3 }, { translateY: 16 }],
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
