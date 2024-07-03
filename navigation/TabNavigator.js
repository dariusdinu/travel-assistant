import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserScreen from "../screens/UserScreen";
import { DashboardScreen, ExploreScreen } from "../screens";
import ProfileScreen from "../screens/ProfileScreen";
import TripPlanner from "../screens/TripPlannerScreen";
import iconGenerator from "../utils/IconGenerator";
import Colors from "../styles/colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const TabArr = [
  {
    route: "UserScreen",
    label: " Trips ",
    iconName: "compass",
    component: UserScreen,
  },
  {
    route: "DashboardScreen",
    label: " Statistics ",
    iconName: "stats-chart",
    component: DashboardScreen,
  },
  {
    route: "TripPlanner",
    label: " New trip ",
    iconName: "add-circle",
    component: TripPlanner,
  },
  {
    route: "ExploreScreen",
    label: " Explore ",
    iconName: "search",
    component: ExploreScreen,
  },
  {
    route: "ProfileScreen",
    label: "Profile",
    iconName: "person",
    component: ProfileScreen,
  },
];

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.container}>
        <View style={styles.btn}>
          {iconGenerator(
            item.iconName,
            27,
            focused ? Colors.accent : Colors.textLight2
          )}
        </View>
        <Text style={!focused ? styles.text : styles.activeText}>
          {item.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderRadius: 50,
          bottom: 10,
          left: 10,
          right: 10,
          height: 60,
          paddingTop: 9,
          paddingHorizontal: 6,
          position: "absolute",
          backgroundColor: Colors.background,
        },
        tabBarItemStyle: {
          marginVertical: 10,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  btn: {
    justifyContent: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
  },
  text: {
    fontSize: 11,
    fontFamily: "Quicksand-Regular",
  },
  activeText: {
    fontSize: 11,
    color: Colors.accent,
    fontFamily: "Quicksand-Bold",
  },
});
