import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../styles/colors";

export default function DateInput({ label, value, onChange, mode = "date" }) {
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    setShow(Platform.OS === "ios");
    onChange(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.dateText} onPress={showMode}>
        {mode === "date" ? value.toDateString() : value.toLocaleTimeString()}
      </Text>
      {show && (
        <DateTimePicker
          value={value}
          mode={mode}
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontFamily: "Quicksand-SemiBold",
    color: Colors.textDark1,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    fontFamily: "Quicksand-Regular",
    color: Colors.textLight2,
    backgroundColor: Colors.background,
  },
});
