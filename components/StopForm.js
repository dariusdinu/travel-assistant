import React, { useRef, useState } from "react";
import { Button, Input } from "./UI";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import DateInput from "./DateInput";
import ImagePickerComponent from "./ImagePickerComponent";
import Colors from "../styles/colors";
import FilePickerComponent from "./FilePickerComponent";

function StopForm({ onSubmit }) {
  const inputPlaceRef = useRef(null);
  const inputAddressRef = useRef(null);
  const inputWebsiteRef = useRef(null);
  const inputNotesRef = useRef(null);

  const [enteredPlace, setEnteredPlace] = useState(
    "https://www.google.com/maps/place/Teatro+alla+Scala"
  );
  const [enteredAddress, setEnteredAddress] = useState(
    "V. Filodrammatici, 2, 20121"
  );
  const [enteredArrivalDate, setEnteredArrivalDate] = useState(new Date());
  const [enteredArrivalTime, setEnteredArrivalTime] = useState(new Date());
  const [enteredWebsite, setEnteredWebsite] = useState(
    "https://www.teatroallascala.org"
  );
  const [enteredNotes, setEnteredNotes] = useState("These are my notes");
  const [enteredImages, setEnteredImages] = useState([]);
  const [enteredFiles, setEnteredFiles] = useState([]);

  function handleFormSubmit() {
    const combinedDateTime = new Date(enteredArrivalDate);
    combinedDateTime.setHours(enteredArrivalTime.getHours());
    combinedDateTime.setMinutes(enteredArrivalTime.getMinutes());

    onSubmit({
      place: enteredPlace,
      address: enteredAddress,
      arrivalTime: enteredArrivalTime,
      website: enteredWebsite,
      notes: enteredNotes,
      images: enteredImages,
      additionalFiles: enteredFiles,
    });
  }

  const handleImagePicked = (index, imageUri) => {
    const newImages = [...enteredImages];
    newImages[index] = imageUri;
    setEnteredImages(newImages);
  };

  const handleLocationSelect = (location) => {
    setEnteredPlace(
      `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
    );
  };

  const handleFilePicked = (file) => {
    setEnteredFiles([...enteredFiles, file]);
  };

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
      <DateInput
        label="Arrival time"
        value={enteredArrivalTime}
        onChange={setEnteredArrivalTime}
        mode="date"
      />
      <DateInput
        label="Arrival Date"
        value={enteredArrivalDate}
        onChange={setEnteredArrivalDate}
        mode="time"
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
        multiline={true}
        numberOfLines={4}
        value={enteredNotes}
        onChangeText={(text) => setEnteredNotes(text)}
        placeholder="Enter your notes here"
        ref={inputNotesRef}
      />
      <Text style={styles.label}>Images</Text>
      <View style={styles.imagesContainer}>
        {[0, 1, 2, 3].map((index) => (
          <ImagePickerComponent
            key={index}
            isProfile={false}
            onImagePicked={(imageUri) => handleImagePicked(index, imageUri)}
          />
        ))}
      </View>
      <View style={styles.filesContainer}>
        <FilePickerComponent onFilePicked={handleFilePicked} />
        {enteredFiles.map((file, index) => (
          <Text key={index} style={styles.fileName}>
            {file.name}
          </Text>
        ))}
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
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Quicksand-SemiBold",
    color: Colors.textDark1,
    marginBottom: 8,
  },
  notesInput: {
    backgroundColor: Colors.background,
    borderRadius: 25,
    padding: 10,
    marginBottom: 16,
    fontFamily: "Quicksand-Regular",
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  filesContainer: {
    marginBottom: 16,
  },
  fileName: {
    fontSize: 14,
    color: Colors.textDark1,
  },
  submitButton: {
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    fontSize: 16,
    color: Colors.textLight,
  },
});
