import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/colors";

function Button({ children, onPress }) {
  return (
    <>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <View>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.accent,
  },
  pressed: { opacity: 0.8 },
  buttonText: {
    textAlign: "center",
    color: Colors.textLight,
    fontSize: 20,
    fontFamily: "Quicksand-Bold",
  },
});
