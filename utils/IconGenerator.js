import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const iconGenerator = (iconName, size, color) => {
  return (
    <View>
      <Ionicons name={iconName} size={size} color={color} />
    </View>
  );
};

export default iconGenerator;
