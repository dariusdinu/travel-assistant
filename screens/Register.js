import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/LoginStyle";
import DateInput from "../components/DateInput";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.loginForm}>
        <View style={styles.inputView}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor={"#fff"}
            style={styles.textInput}
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Last Name"
            placeholderTextColor={"#fff"}
            style={styles.textInput}
          ></TextInput>
        </View>
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
        <View style={styles.inputView}>
          <DateInput />
        </View>
      </View>
      <TouchableOpacity styles={styles.loginBtn}>
        <Text style={styles.loginBtn}>Register </Text>
      </TouchableOpacity>
    </View>
  );
}
