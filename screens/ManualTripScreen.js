import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Button, FlatButton } from "../components/UI";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ImagePickerComponent from "../components/ImagePickerComponent";
import axios from "axios";
import Colors from "../styles/colors";
import iconGenerator from "../utils/IconGenerator";
import StopCard from "../components/StopCard";
import { AuthContext } from "../store/AuthContext";
import ModalWindow from "../components/UI/ModalWindow";

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

async function createTrip(userId) {
  const url = `${apiUrl}/trips`;
  try {
    const response = await axios.post(url, {
      userId,
      type: "manual",
    });
    return response.data;
  } catch (error) {
    console.error("Error creating trip:", error);
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

function ManualTripScreen() {
  const navigation = useNavigation();
  const [stops, setStops] = useState([]);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [image, setImage] = useState(null);
  const [tripId, setTripId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIcon, setModalIcon] = useState("");
  const [onModalConfirm, setOnModalConfirm] = useState(null);
  const auth = useContext(AuthContext);
  const userId = auth.user;

  useEffect(() => {
    async function createAndLoadTrip() {
      try {
        const trip = await createTrip(userId);
        setTripId(trip._id);
        const fetchedStops = await fetchStopsByTripId(trip._id);
        setStops(fetchedStops);
      } catch (error) {
        console.error("Error initializing trip:", error);
      }
    }
    createAndLoadTrip();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (tripId) {
        loadStops();
      }
    }, [tripId])
  );

  const loadStops = async () => {
    if (tripId) {
      try {
        const fetchedStops = await fetchStopsByTripId(tripId);
        setStops(fetchedStops);
      } catch (error) {
        console.error("Error loading stops:", error);
      }
    }
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
      setModalMessage("Trip details saved successfully");
      setOnModalConfirm(
        () => () =>
          navigation.navigate("TripPlanningOptions", {
            screen: "TripPlanningOptions",
          })
      );
      setModalVisible(true);
    } catch (error) {
      setModalIcon("alert-circle-outline");
      setModalMessage("Failed to update trip details");
      setOnModalConfirm(() => () => setModalVisible(false));
      setModalVisible(true);
    }
  };

  const handleCancel = () => {
    setModalIcon("alert-circle-outline");
    setModalMessage(
      "Are you sure you want to cancel? This will delete the current trip."
    );
    setOnModalConfirm(() => async () => {
      try {
        await deleteTrip(tripId);
        navigation.navigate("TripPlanningOptions");
      } catch (error) {
        setModalIcon("alert-circle-outline");
        setModalMessage("Failed to delete trip");
        setOnModalConfirm(() => () => setModalVisible(false));
        setModalVisible(true);
      }
    });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
        placeholder="Trip Title"
      />
      <View style={styles.headerContainer}>
        <ImagePickerComponent isProfile={false} onImagePicked={setImage} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.dateLabel}>Start Date</Text>
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            style={styles.datePicker}
          >
            <View>{iconGenerator("calendar", 16, Colors.accent)}</View>
            <Text style={styles.dateText}>
              {`  ${startDate.toDateString()}`}
            </Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(e, date) => handleDateChange(e, date, "start")}
              minimumDate={new Date()}
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
              minimumDate={startDate}
            />
          )}
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.stopListContainer}>
        {stops.length > 0 ? (
          stops.map((stop) => <StopCard key={stop._id} stopInfo={stop} />)
        ) : (
          <Text style={styles.noStopsText}>No stops added yet</Text>
        )}
        <Pressable
          onPress={() => navigation.navigate("AddAStop", { tripId })}
          style={styles.button}
        >
          {iconGenerator("add-circle", 40, Colors.accent)}
          <Text style={styles.addButtonText}>Add a stop</Text>
        </Pressable>
        <View style={styles.buttonContainer}>
          <Button onPress={handleSaveTrip} color={Colors.accent} size={27}>
            Save trip
          </Button>
          <FlatButton onPress={handleCancel} style={styles.button}>
            <Text>Cancel</Text>
          </FlatButton>
        </View>
      </ScrollView>
      <ModalWindow
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        iconType={modalIcon}
        message={modalMessage}
        onConfirm={onModalConfirm}
      />
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
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textDark1,
    marginBottom: 10,
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
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 20,
    gap: 10,
  },
  noStopsText: {
    fontFamily: "Quicksand-Regular",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 24,
  },
});

export default ManualTripScreen;
