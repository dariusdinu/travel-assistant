import { View } from "react-native";
import { styles } from "../styles/WelcomeStyle";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import TabNavigator from "../navigation/TabNavigator";

export default function MainScreen() {
  return (
    <TabNavigator>
      <View style={styles.container}></View>
    </TabNavigator>
  );
}
