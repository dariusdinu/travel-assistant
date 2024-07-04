import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../styles/colors";

const Input = forwardRef(
  (
    {
      blurOnSubmit = true,
      isInvalid,
      keyboardType = "default",
      label,
      onFocus,
      onSubmitEditing,
      onUpdateValue,
      placeholder,
      returnKeyType,
      secure = false,
      value,
      multiline,
      numberOfLines,
      defaultValue,
    },
    ref
  ) => {
    const [isSecureEntry, setIsSecureEntry] = useState(secure);

    return (
      <View style={styles.inputContainer}>
        <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
          {label}
        </Text>
        <View style={styles.inputSection}>
          <TextInput
            autoCapitalize="none"
            blurOnSubmit={blurOnSubmit}
            keyboardType={keyboardType}
            onChangeText={onUpdateValue}
            onFocus={onFocus}
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            ref={ref}
            returnKeyType={returnKeyType}
            secureTextEntry={isSecureEntry}
            style={[styles.input, isInvalid && styles.inputInvalid]}
            value={value}
            placeholderTextColor={"lightgrey"}
            multiline={multiline}
            numberOfLines={numberOfLines}
            defaultValue={defaultValue}
          />
          {secure && (
            <TouchableOpacity
              onPress={() => setIsSecureEntry((prev) => !prev)}
              style={styles.icon}
            >
              <Ionicons
                name={isSecureEntry ? "eye-off" : "eye"}
                size={24}
                color={Colors.textLight2}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
    fontFamily: "Quicksand-SemiBold",
    fontSize: 14,
  },
  labelInvalid: {
    color: Colors.error,
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 50,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Quicksand-Regular",
    color: Colors.textLight2,
  },
  inputInvalid: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.error,
  },
  icon: {
    padding: 10,
  },
});
