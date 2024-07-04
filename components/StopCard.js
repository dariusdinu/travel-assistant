import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Animated,
} from "react-native";
import Colors from "../styles/colors";
import iconGenerator from "../utils/IconGenerator";
import { formatDate, formatTime } from "../utils/DateFormatter";
import { useNavigation } from "@react-navigation/native";
import ModalWindow from "../components/UI/ModalWindow";
import ModalStopAction from "../components/ModalStopAction";

export default function StopCard({ stopInfo, onDelete, isActive }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleOpenInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      stopInfo.address
    )}`;
    Linking.openURL(url);
  };

  const handleCardPress = () => {
    setModalVisible(true);
  };

  const handleEdit = () => {
    setActionModalVisible(false);
    navigation.navigate("EditStopScreen", { stopInfo });
  };

  const handleModalConfirm = () => {
    setModalVisible(false);
    handleOpenInMaps();
  };

  const handleDelete = () => {
    setActionModalVisible(false);
    onDelete(stopInfo._id);
  };

  return (
    <>
      <View style={styles.stopContainer}>
        <View style={styles.timelineBar}>
          <View style={styles.dot}>
            {iconGenerator("ellipse", 16, Colors.accent)}
          </View>
          <View style={styles.line}></View>
        </View>
        <Animated.View
          style={[
            styles.stopInfoContainer,
            isActive && styles.activeStop,
            { opacity: opacityAnim },
          ]}
        >
          <TouchableOpacity onPress={handleCardPress}>
            {isActive && <Text style={styles.activeText}>Current Stop</Text>}
            <Text
              style={styles.stopName}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {stopInfo.place}
            </Text>
            <View style={styles.infoAddress}>
              <Text
                style={styles.stopAddress}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {stopInfo.address}
              </Text>
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
              style={styles.ellipsisButton}
              onPress={() => setActionModalVisible(true)}
            >
              {iconGenerator("ellipsis-vertical-outline", 16, Colors.accent)}
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <ModalWindow
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        iconType="alert-circle-outline"
        message="Do you want to view this stop in Google Maps?"
        onConfirm={handleModalConfirm}
      />
      <ModalStopAction
        isVisible={actionModalVisible}
        onClose={() => setActionModalVisible(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
    transform: [{ scaleY: 1.25 }, { translateY: 16 }],
  },
  stopInfoContainer: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: "relative",
  },
  activeStop: {
    borderColor: Colors.accent,
    borderWidth: 2,
  },
  activeText: {
    color: Colors.accent,
    fontSize: 12,
    fontFamily: "Quicksand-Regular",
    marginBottom: 5,
  },
  stopName: {
    fontSize: 22,
    fontFamily: "Quicksand-SemiBold",
    width: 200,
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
    marginBottom: 10,
    width: 200,
  },
  infoArrival: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
    marginBottom: 5,
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
  ellipsisButton: {
    position: "absolute",
    right: 16,
    top: 18,
  },
});
