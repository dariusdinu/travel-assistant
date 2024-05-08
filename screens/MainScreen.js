import { Text, View, Pressable, Image } from "react-native";
import { styles } from "../styles/WelcomeStyle";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import TabNavigator from "../navigation/TabNavigator";
import { FlatButton } from "../components/UI";

export default function MainScreen() {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);

  return (
    <TabNavigator>
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
    </TabNavigator>
  );
}
