import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import { Button, FlatButton, IconButton } from "../components/UI";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ImagePickerComponent from "../components/ImagePickerComponent";
import axios from "axios";
import Colors from "../styles/colors";
import iconGenerator from "../utils/IconGenerator";
import StopCard from "../components/StopCard";

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

function ManualTripScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [stops, setStops] = useState([]);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [image, setImage] = useState(null);
  const [tripId, setTripId] = useState(null);
  const userId = "662c10a64930323931685a36";

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

  // useEffect(() => {
  //   if (route.params.stopId) {
  //     loadStops();
  //   }
  // }, [route.params.stopId]);

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
        image,
      };
      await updateTripDetails(tripId, details);
      Alert.alert("Success", "Trip details updated successfully");
      navigation.navigate("TripPlanningOptions", {
        screen: "TripPlanningOptions",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to update trip details");
    }
  };

  const renderStop = ({ item, index }) => (
    <StopCard item={item} index={index} />
  );

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
      {stops.length !== 0 ? (
        <Text style={styles.header}>Start by adding a stop</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.stopListContainer}>
          {/* <FlatList
            data={stops}
            renderItem={renderStop}
            keyExtractor={(item) => item._id}
          /> */}
          <StopCard />
          <StopCard />
          <StopCard />
          <StopCard />
          <StopCard />
          <StopCard />
          <Pressable
            onPress={() => navigation.navigate("AddAStop", { tripId })}
            style={styles.button}
          >
            {iconGenerator("add-circle", 40, Colors.accent)}
            <Text style={styles.addButtonText}>Add a stop</Text>
          </Pressable>
          <Button onPress={handleSaveTrip} color={Colors.accent} size={27}>
            Save trip
          </Button>
          <FlatButton
            onPress={() => navigation.navigate("TripPlanningOptions")}
            style={styles.button}
          >
            <Text>Cancel</Text>
          </FlatButton>
        </ScrollView>
      )}
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
});

export default ManualTripScreen;
