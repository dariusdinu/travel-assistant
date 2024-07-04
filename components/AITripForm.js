import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateInput from "../components/DateInput";
import { Button, Input } from "../components/UI";
import Colors from "../styles/colors";
import Select from "../components/Select";
import iconGenerator from "../utils/IconGenerator";
import ModalTravelStyleInfo from "../components/ModalTravelStyleInfo";

const travelStyles = [
  { label: "Explorer", value: "explorer" },
  { label: "Relaxed", value: "relaxed" },
  { label: "Adventurous", value: "adventurous" },
  { label: "Cultural Enthusiast", value: "cultural" },
  { label: "Gourmet", value: "gourmet" },
  { label: "Nature Lover", value: "nature" },
];

const interests = [
  "Popular attractions",
  "Trending restaurants",
  "Entertainment places",
  "Coffee shops",
  "Shopping centers",
  "Parks",
];

const AITripForm = ({ onSubmit }) => {
  const [place, setPlace] = useState("");
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [leaveDate, setLeaveDate] = useState(new Date());
  const [stops, setStops] = useState("");
  const [travelingStyle, setTravelingStyle] = useState("");
  const [mainInterests, setMainInterests] = useState([]);
  const [specialRequirements, setSpecialRequirements] = useState([]);
  const [outsidePlace, setOutsidePlace] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleInterest = (interest) => {
    if (mainInterests.includes(interest)) {
      setMainInterests(mainInterests.filter((item) => item !== interest));
    } else {
      setMainInterests([...mainInterests, interest]);
    }
  };

  const toggleRequirement = (requirement) => {
    if (specialRequirements.includes(requirement)) {
      setSpecialRequirements(
        specialRequirements.filter((item) => item !== requirement)
      );
    } else {
      setSpecialRequirements([...specialRequirements, requirement]);
    }
  };

  const handleFormSubmit = () => {
    onSubmit({
      place,
      arrivalDate,
      leaveDate,
      stops,
      travelingStyle,
      mainInterests,
      specialRequirements,
      outsidePlace,
    });
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.form}>
        <View style={styles.inputContainer}>
          <Input
            label="Place"
            style={styles.input}
            placeholder="Place"
            value={place}
            onChangeText={setPlace}
            onUpdateValue={(value) => setPlace(value)}
          />
        </View>
        <DateInput
          label="Arrival Date"
          value={arrivalDate}
          onChange={setArrivalDate}
          mode="date"
        />
        <DateInput
          label="Leave Date"
          value={leaveDate}
          onChange={setLeaveDate}
          mode="date"
          minimumDate={arrivalDate}
        />
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            blurOnSubmit={false}
            label="How many stops per day would be ideal?"
            placeholder="Choose the number of stops"
            keyboardType="numeric"
            value={stops}
            onUpdateValue={(value) => setStops(value)}
            onChangeText={setStops}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.travelingStyleLabel}>
            <Text>Choose your traveling style</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              {iconGenerator("information-circle", 20, Colors.textDark1)}
            </TouchableOpacity>
          </View>
          <Select
            selectedValue={travelingStyle}
            onValueChange={setTravelingStyle}
            items={travelStyles}
            errorText="Please select a traveling style"
          />
        </View>
        <Text style={styles.label}>
          What are your main interests? (Select all that apply)
        </Text>
        <View style={styles.interestsRow}>
          <View style={styles.interestsColumn}>
            {interests.slice(0, 3).map((interest) => (
              <TouchableOpacity
                key={interest}
                style={styles.checkbox}
                onPress={() => toggleInterest(interest)}
              >
                <Ionicons
                  name={
                    mainInterests.includes(interest)
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={24}
                  color={Colors.textDark1}
                />
                <Text style={styles.checkboxLabel}>{interest}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.interestsColumn}>
            {interests.slice(3).map((interest) => (
              <TouchableOpacity
                key={interest}
                style={styles.checkbox}
                onPress={() => toggleInterest(interest)}
              >
                <Ionicons
                  name={
                    mainInterests.includes(interest)
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={24}
                  color={Colors.textDark1}
                />
                <Text style={styles.checkboxLabel}>{interest}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Text style={styles.label}>Any special requirements?</Text>
        <View style={styles.checkboxContainer}>
          {["Wheelchair accessible", "Kid-friendly"].map((requirement) => (
            <TouchableOpacity
              key={requirement}
              style={styles.checkbox}
              onPress={() => toggleRequirement(requirement)}
            >
              {iconGenerator(
                specialRequirements.includes(requirement)
                  ? "checkmark-circle"
                  : "ellipse-outline",
                24,
                Colors.textDark1
              )}
              <Text style={styles.checkboxLabel}>{requirement}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setOutsidePlace(!outsidePlace)}
          >
            {iconGenerator(
              outsidePlace ? "checkmark-circle" : "ellipse-outline",
              24,
              Colors.textDark1
            )}
            <Text style={styles.checkboxLabel}>
              Can we suggest stops that are not located in the specified place?
            </Text>
          </TouchableOpacity>
        </View>
        <Button onPress={handleFormSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Watch the magic happen</Text>
        </Button>
      </ScrollView>
      <ModalTravelStyleInfo
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    paddingBottom: 100,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
  },
  header: {
    fontSize: 28,
    color: Colors.textDark1,
    fontFamily: "Quicksand-Bold",
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: Colors.primary,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 25,
    padding: 14,
    fontSize: 16,
    fontFamily: "Quicksand-Regular",
  },
  label: {
    fontSize: 14,
    fontFamily: "Quicksand-SemiBold",
    color: Colors.textDark1,
    marginVertical: 8,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%", // Two columns
    marginBottom: 10,
  },
  interestsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  interestsColumn: {
    flex: 1,
  },
  travelingStyleLabel: {
    flex: 1,
    marginBottom: 6,
    flexDirection: "row",
    gap: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    fontSize: 4,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    verticalAlign: "middle",
    marginRight: 10,
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 13,
    fontFamily: "Quicksand-Regular",
    marginLeft: 5,
    color: Colors.textDark1,
    marginBottom: 3,
  },
  submitButton: {
    backgroundColor: Colors.accent,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 16,
    color: Colors.textLight,
    fontFamily: "Quicksand-Bold",
  },
});

export default AITripForm;
