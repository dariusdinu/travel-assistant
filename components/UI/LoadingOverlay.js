import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "../../styles/colors";
import AnimatedLottieView from "lottie-react-native";

function LoadingOverlay({ message }) {
  return (
    <View style={styles.rootContainer}>
      <AnimatedLottieView
        source={require("../../assets/loading-animation.json")}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 32,
  },
  message: {
    fontSize: 24,
    color: Colors.textDark1,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Quicksand-Bold",
  },
  animation: {
    width: 150,
    height: 150,
  },
});
