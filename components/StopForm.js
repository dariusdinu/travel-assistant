import React, { useRef, useState } from "react";
import { Button, Input } from "./UI";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import DateInput from "./DateInput";
import ImagePickerComponent from "./ImagePickerComponent";

function StopForm({ onSubmit }) {
  const inputPlaceRef = useRef(null);
  const inputAddressRef = useRef(null);
  const inputArrivalTimeRef = useRef(null);
  const inputWebsiteRef = useRef(null);
  const inputNotesRef = useRef(null);

  const [enteredPlace, setEnteredPlace] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredArrivalTime, setEnteredArrivalTime] = useState("");
  const [enteredWebsite, setEnteredWebsite] = useState("");
  const [enteredNotes, setEnteredNotes] = useState("");

  function handleFormSubmit() {
    onSubmit({
      place: enteredPlace,
      address: enteredAddress,
      arrivalTime: enteredArrivalTime,
      website: enteredWebsite,
      notes: enteredNotes,
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.form}>
      <Input
        label="Place"
        value={enteredPlace}
        onChangeText={(text) => setEnteredPlace(text)}
        placeholder="Teatro alla Scala"
        ref={inputPlaceRef}
      />
      <Input
        label="Address"
        value={enteredAddress}
        onChangeText={(text) => setEnteredAddress(text)}
        placeholder="V. Filodrammatici, 2, 20121"
        ref={inputAddressRef}
      />
      <Input
        label="Arrival time"
        value={enteredArrivalTime}
        onChangeText={(text) => setEnteredArrivalTime(text)}
        placeholder="14:00"
        ref={inputArrivalTimeRef}
      />
      <Input
        label="Website"
        value={enteredWebsite}
        onChangeText={(text) => setEnteredWebsite(text)}
        placeholder="teatroallascala.org"
        ref={inputWebsiteRef}
      />
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.notesInput}
        multiline
        numberOfLines={4}
        value={enteredNotes}
        onChangeText={(text) => setEnteredNotes(text)}
        placeholder="We need to get there around 20 minutes earlier so that we may skip the line. Take an umbrella (likely to rain). Remember to bring water (the show takes 2h). Make sure to get lunch beforehand."
      />
      <Text style={styles.label}>Images</Text>
      <View style={styles.imagesContainer}>
        <ImagePickerComponent isProfile={false} />
        <ImagePickerComponent isProfile={false} />
        <ImagePickerComponent isProfile={false} />
        <ImagePickerComponent isProfile={false} />
      </View>
      <Button onPress={handleFormSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Add stop to current trip</Text>
      </Button>
    </ScrollView>
  );
}

export default StopForm;

const styles = StyleSheet.create({
  form: {
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  notesInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    height: 100,
    marginBottom: 16,
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#FFCC99",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#161717",
  },
});
