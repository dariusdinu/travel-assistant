import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Colors from "../styles/colors";

export default function DateInput() {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    selectedDate && setDate(selectedDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      display: "default",
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const time = date?.getTime();
  return (
    <>
      <Text>Your birthday</Text>
      <Pressable onPress={showDatepicker}>
        <View>
          <Text style={styles.buttonText}>{date.toDateString()}</Text>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    fontSize: 16,
    marginVertical: 8,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
  },
});
