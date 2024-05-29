import React from "react";
import { Text, View, StyleSheet } from "react-native";
import StopForm from "../components/StopForm";
import Colors from "../styles/colors";

export default function AddAStopScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a stop</Text>
      <StopForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontFamily: "Quicksand-Bold",
    color: Colors.accent,
    marginBottom: 16,
    marginTop: 40,
  },
});
