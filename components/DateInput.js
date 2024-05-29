import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Colors from "../styles/colors";

export default function DateInput({ label, enteredDate }) {
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

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Pressable onPress={showDatepicker}>
        <View>
          <Text style={styles.buttonText}>{enteredDate}</Text>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Quicksand-Regular",
    backgroundColor: Colors.background,
    borderRadius: 50,
    marginVertical: 8,
    color: Colors.textLight2,
  },
  label: {
    fontFamily: "Quicksand-Medium",
    marginTop: 4,
  },
});
