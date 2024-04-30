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
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    elevation: 12,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 12, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 16,
  },
  pressed: { opacity: 0.6 },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
