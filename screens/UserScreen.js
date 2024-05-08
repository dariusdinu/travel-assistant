import { Text, View, Pressable, Image } from "react-native";
import { styles } from "../styles/WelcomeStyle";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { FlatButton } from "../components/UI";

function UserScreen() {
  const auth = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/travel-icon.png")}
        style={styles.image}
      />
      <FlatButton>
        <Text onPress={auth.signOut}>Exit the app</Text>
      </FlatButton>
      <Text>Welcome back, traveler!</Text>
    </View>
  );
}

export default UserScreen;
