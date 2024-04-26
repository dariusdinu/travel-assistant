import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { styles } from "../styles/LoginStyle";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/travel-icon.png")}
        style={styles.image}
      />
      <View style={styles.loginForm}>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={"#fff"}
            style={styles.textInput}
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={"#fff"}
            secureTextEntry={true}
            style={styles.textInput}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity styles={styles.loginBtn}>
        <Text style={styles.loginBtn}>LOGIN </Text>
      </TouchableOpacity>
    </View>
  );
}
