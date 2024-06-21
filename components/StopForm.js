import React, { useRef, useState, useEffect } from "react";
import { Button, Input } from "./UI";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import DateInput from "./DateInput";
import ImagePickerComponent from "./ImagePickerComponent";
import Colors from "../styles/colors";
import FilePickerComponent from "./FilePickerComponent";

function StopForm({ onSubmit, initialData, buttonText }) {
  const inputPlaceRef = useRef(null);
  const inputAddressRef = useRef(null);
  const inputWebsiteRef = useRef(null);
  const inputNotesRef = useRef(null);

  const [enteredPlace, setEnteredPlace] = useState(initialData?.place || "");
  const [enteredAddress, setEnteredAddress] = useState(
    initialData?.address || ""
  );
  const [enteredArrivalDate, setEnteredArrivalDate] = useState(
    initialData?.arrivalDate ? new Date(initialData.arrivalDate) : new Date()
  );
  const [enteredArrivalTime, setEnteredArrivalTime] = useState(
    initialData?.arrivalTime ? new Date(initialData.arrivalTime) : new Date()
  );
  const [enteredWebsite, setEnteredWebsite] = useState(
    initialData?.website || ""
  );
  const [enteredNotes, setEnteredNotes] = useState(initialData?.notes || "");
  const [enteredImages, setEnteredImages] = useState(initialData?.images || []);
  const [enteredFiles, setEnteredFiles] = useState(
    initialData?.additionalFiles || []
  );

  useEffect(() => {
    if (initialData) {
      setEnteredPlace(initialData.place);
      setEnteredAddress(initialData.address);
      setEnteredArrivalDate(new Date(initialData.arrivalTime));
      setEnteredArrivalTime(new Date(initialData.arrivalTime));
      setEnteredWebsite(initialData.website);
      setEnteredNotes(initialData.notes);
      setEnteredImages(initialData.images || []);
      setEnteredFiles(initialData.additionalFiles || []);
    }
  }, [initialData]);

  function handleInputValueUpdate(inputField, updatedValue) {
    switch (inputField) {
      case "place":
        setEnteredPlace(updatedValue);
        break;
      case "address":
        setEnteredAddress(updatedValue);
        break;
      case "website":
        setEnteredWebsite(updatedValue);
        break;
      case "notes":
        setEnteredNotes(updatedValue);
        break;
      default:
        break;
    }
  }

  function handleFormSubmit() {
    const combinedDateTime = new Date(enteredArrivalDate);
    combinedDateTime.setHours(enteredArrivalTime.getHours());
    combinedDateTime.setMinutes(enteredArrivalTime.getMinutes());

    onSubmit({
      place: enteredPlace,
      address: enteredAddress,
      arrivalTime: combinedDateTime.toISOString(),
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
        onUpdateValue={(value) => handleInputValueUpdate("place", value)}
        placeholder="Choose a place"
        ref={inputPlaceRef}
      />
      <Input
        label="Address"
        value={enteredAddress}
        onUpdateValue={(value) => handleInputValueUpdate("address", value)}
        placeholder="What is the address?"
        ref={inputAddressRef}
      />
      <DateInput
        label="Arrival Date"
        value={enteredArrivalDate}
        onChange={setEnteredArrivalDate}
        mode="date"
      />
      <DateInput
        label="Arrival Time"
        value={enteredArrivalTime}
        onChange={setEnteredArrivalTime}
        mode="time"
      />
      <Input
        label="Website"
        value={enteredWebsite}
        onUpdateValue={(value) => handleInputValueUpdate("website", value)}
        placeholder="Specify the website"
        ref={inputWebsiteRef}
      />
      <Input
        label="Notes"
        numberOfLines={4}
        value={enteredNotes}
        multiline={true}
        onUpdateValue={(value) => handleInputValueUpdate("notes", value)}
        placeholder="Add important notes"
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
        <Text style={styles.submitButtonText}>
          {buttonText || "Add stop to current trip"}
        </Text>
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
