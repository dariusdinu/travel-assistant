import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import Colors from "../styles/colors";
import { Button, FlatButton, LoadingOverlay } from "../components/UI";
import ImagePickerComponent from "../components/ImagePickerComponent";
import StopList from "../components/StopList";
import ModalWindow from "../components/UI/ModalWindow";
import { formatDate } from "../utils/DateFormatter";
import iconGenerator from "../utils/IconGenerator";
import { schedulePushNotification } from "../utils/Notifications";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

async function fetchStopsByTripId(tripId) {
  const url = `${apiUrl}/stops/${tripId}/stops`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching stops:", error);
    throw error;
  }
}

async function fetchTripById(tripId) {
  const url = `${apiUrl}/trips/${tripId}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching trip:", error);
    throw error;
  }
}

async function updateTripDetails(tripId, details) {
  const url = `${apiUrl}/trips/${tripId}`;
  try {
    const response = await axios.put(url, details);
    return response.data;
  } catch (error) {
    console.error("Error updating trip details:", error);
    throw error;
  }
}

async function deleteTrip(tripId) {
  const url = `${apiUrl}/trips/${tripId}`;
  try {
    await axios.delete(url);
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw error;
  }
}

function EditTripScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { tripId } = route.params;

  const [stops, setStops] = useState([]);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIcon, setModalIcon] = useState("");
  const [onModalConfirm, setOnModalConfirm] = useState(null);

  useEffect(() => {
    async function loadTrip() {
      try {
        const trip = await fetchTripById(tripId);
        setTitle(trip.title);
        setStartDate(new Date(trip.dateRange.start));
        setEndDate(new Date(trip.dateRange.end));
        setImage(trip.coverPhoto);
        const fetchedStops = await fetchStopsByTripId(tripId);
        setStops(fetchedStops);
        scheduleNotifications(fetchedStops);
        setLoading(false);
      } catch (error) {
        console.error("Error loading trip:", error);
      }
    }
    loadTrip();
  }, [tripId]);

  const scheduleNotifications = (stops) => {
    stops.forEach((stop) => {
      const arrivalTime = new Date(stop.arrivalTime);
      schedulePushNotification(
        `Upcoming Stop: ${stop.place}`,
        `You have an upcoming stop at ${stop.place} on ${formatDate(
          arrivalTime
        )}`,
        arrivalTime
      );
    });
  };

  const handleDateChange = (event, selectedDate, type) => {
    if (type === "start") {
      setShowStartDatePicker(false);
      setStartDate(selectedDate || startDate);
    } else {
      setShowEndDatePicker(false);
      setEndDate(selectedDate || endDate);
    }
  };

  const handleSaveTrip = async () => {
    try {
      const dateRange = { start: startDate, end: endDate };
      const details = {
        title,
        dateRange,
        coverPhoto: image,
      };
      await updateTripDetails(tripId, details);
      setModalIcon("checkmark-circle-outline");
      setModalMessage("Trip details updated successfully");
      setOnModalConfirm(() => () => navigation.goBack());
      setModalVisible(true);
    } catch (error) {
      setModalIcon("alert-circle-outline");
      setModalMessage("Failed to update trip details");
      setModalVisible(true);
    }
  };

  const handleDeleteTrip = () => {
    setModalIcon("alert-circle-outline");
    setModalMessage("Are you sure you want to delete this trip?");
    setOnModalConfirm(() => async () => {
      try {
        await deleteTrip(tripId);
        setModalIcon("checkmark-circle-outline");
        setModalMessage("Trip deleted successfully");
        setOnModalConfirm(() => () => navigation.navigate("UserScreen"));
        setModalVisible(true);
      } catch (error) {
        setModalIcon("alert-circle-outline");
        setModalMessage("Failed to delete trip");
        setModalVisible(true);
      }
    });
    setModalVisible(true);
  };

  const handleImagePicked = async (imageUrl) => {
    setImage(imageUrl);
    try {
      await updateTripDetails(tripId, { coverPhoto: imageUrl });
    } catch (error) {
      console.error("Error updating trip cover photo:", error);
      setModalIcon("alert-circle-outline");
      setModalMessage("Failed to update trip cover photo");
      setModalVisible(true);
    }
  };

  const handleUpdateStops = (updatedStops) => {
    setStops(updatedStops);
  };

  if (loading) {
    return <LoadingOverlay message="Loading trip details..." />;
  }

  return (
    <View style={styles.container}>
      <ModalWindow
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        iconType={modalIcon}
        message={modalMessage}
        onConfirm={onModalConfirm}
      />
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
        placeholder="Trip Title"
      />
      <View style={styles.headerContainer}>
        <ImagePickerComponent
          type="trip"
          defaultImage={
            image ? { uri: image } : require("../assets/empty-picture.png")
          }
          onImagePicked={handleImagePicked}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.dateLabel}>Start Date</Text>
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            style={styles.datePicker}
          >
            <View>{iconGenerator("calendar", 16, Colors.accent)}</View>
            <Text
              style={styles.dateText}
            >{`  ${startDate.toDateString()}`}</Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(e, date) => handleDateChange(e, date, "start")}
            />
          )}
          <Text style={styles.dateLabel}>End Date</Text>
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            style={styles.datePicker}
          >
            <View>{iconGenerator("calendar", 16, Colors.accent)}</View>
            <Text style={styles.dateText}>{`  ${endDate.toDateString()}`}</Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(e, date) => handleDateChange(e, date, "end")}
            />
          )}
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.stopListContainer}>
        <StopList stops={stops} onUpdate={handleUpdateStops} />
        <Pressable
          onPress={() =>
            navigation.navigate("AddAStopScreen", { tripId, mode: "edit" })
          }
          style={styles.button}
        >
          {iconGenerator("add-circle", 40, Colors.accent)}
          <Text style={styles.addButtonText}>Add a stop</Text>
        </Pressable>
        <View style={styles.buttonContainer}>
          <Button onPress={handleSaveTrip} color={Colors.accent} size={27}>
            Save edits
          </Button>
          <Button onPress={handleDeleteTrip} color={Colors.danger} size={27}>
            Delete trip
          </Button>
          <FlatButton onPress={() => navigation.goBack()} style={styles.button}>
            <Text>Cancel</Text>
          </FlatButton>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: Colors.primary,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 10,
    height: 140,
  },
  titleInput: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.textDark1,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  datePicker: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    marginVertical: 5,
    flex: 1,
    alignItems: "center",
    paddingLeft: 10,
    flexDirection: "row",
    flexGrow: 1,
  },
  dateText: {
    fontSize: 16,
    color: Colors.textDark1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
    paddingHorizontal: 20,
    color: Colors.textDark1,
    textAlign: "center",
  },
  stopListContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
    paddingBottom: 100,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 2,
    gap: 9,
    backgroundColor: Colors.primary,
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 22,
    fontFamily: "Quicksand-SemiBold",
  },
  dateLabel: {
    fontSize: 16,
    fontFamily: "Quicksand-SemiBold",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 20,
    gap: 10,
    justifyContent: "space-around",
  },
  noStopsText: {
    fontFamily: "Quicksand-Regular",
    textAlign: "center",
    marginVertical: 120,
    fontSize: 24,
  },
});

export default EditTripScreen;
