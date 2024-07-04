import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../styles/colors";

export default function DateInput({
  label,
  value,
  onChange,
  mode,
  minimumDate,
}) {
  const [show, setShow] = useState(false);

  const showDatepicker = () => {
    setShow(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    setShow(Platform.OS === "ios");
    onChange(currentDate);
  };

  const formatDateTime = (date, mode) => {
    if (!date || isNaN(date.getTime())) return "Select Date/Time";
    if (mode === "date") {
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
    if (mode === "time")
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    return date.toString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.dateInput}>
        <Text style={styles.dateText}>{formatDateTime(value, mode)}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value && !isNaN(value.getTime()) ? value : new Date()}
          mode={mode}
          display="default"
          onChange={onChangeDate}
          minimumDate={
            mode === "date"
              ? minimumDate
                ? minimumDate
                : new Date()
              : new Date()
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: "Quicksand-SemiBold",
    color: Colors.textDark1,
    marginBottom: 4,
  },
  dateInput: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
    fontFamily: "Quicksand-Regular",
    color: Colors.textDark1,
  },
});
