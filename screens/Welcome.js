import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from "react-native";
import { styles } from "../styles/WelcomeStyle";
import { Link, useLinkProps, useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/travel-icon.png")}
        style={styles.image}
      />
      <TouchableOpacity
        styles={styles.loginBtn}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.loginBtn}>LOGIN </Text>
      </TouchableOpacity>
      <TouchableOpacity
        styles={styles.loginBtn}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.loginBtn}>REGISTER </Text>
      </TouchableOpacity>
      <Pressable>
        <Text onPress={auth.signOut}>Logout</Text>
      </Pressable>
    </View>
  );
}
