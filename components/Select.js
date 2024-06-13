import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../styles/colors";

export default function Select({
  selectedValue,
  onValueChange,
  items,
  errorText,
  isInvalid,
}) {
  return (
    <View>
      <View style={[styles.pickerContainer, isInvalid && styles.invalid]}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
              style={styles.pickerItem} // Apply the item style here
            />
          ))}
        </Picker>
      </View>
      {isInvalid && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    justifyContent: "center",
    height: 40,
    overflow: "hidden",
  },
  picker: {
    height: 40,
    color: Colors.textDark1,
  },
  pickerItem: {
    color: Colors.textDark1,
    fontFamily: "Quicksand-Regular",
    fontSize: 16,
  },
  invalid: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    marginTop: 8,
  },
});
