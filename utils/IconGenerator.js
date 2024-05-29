import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../styles/colors";

const iconGenerator = (focused, iconName) => {
  return (
    <View>
      <Ionicons
        name={iconName}
        size={27}
        color={focused ? Colors.accent : Colors.textLight2}
      />
    </View>
  );
};

export default iconGenerator;
