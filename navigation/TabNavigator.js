import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TripPlanningOptions from "../screens/TripPlanningOptionsScreen";
import UserScreen from "../screens/UserScreen";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DashboardScreen, ExploreScreen } from "../screens";
import HelpScreen from "../screens/HelpScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const TabBarButtonsStyle = {
    tabBarShowLabel: true,
    tabBarActiveTintColor: "orange",
    tabBarLabelStyle: {
      width: "100%",
    },
    headerShown: false,
  };

  const tabBarIconGenerator = (focused, iconName) => {
    return (
      <View>
        <Ionicons
          name={iconName}
          size={24}
          color={focused ? "orange" : "black"}
        />
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderRadius: 50,
          marginBottom: 10,
          marginHorizontal: 10,
          height: 60,
          overflow: "hidden",
        },
        tabBarItemStyle: {
          marginVertical: 10,
        },
      }}
    >
      <Tab.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          ...TabBarButtonsStyle,
          tabBarLabel: "profile",
          tabBarIcon: ({ focused }) => tabBarIconGenerator(focused, "person"),
        }}
      />
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          ...TabBarButtonsStyle,
          tabBarLabel: "stats",
          tabBarIcon: ({ focused }) =>
            tabBarIconGenerator(focused, "stats-chart"),
        }}
      />
      <Tab.Screen
        name="TripPlanningOptions"
        component={TripPlanningOptions}
        options={{
          ...TabBarButtonsStyle,
          tabBarLabel: "plan a trip",
          tabBarIcon: ({ focused }) =>
            tabBarIconGenerator(focused, "add-circle"),
        }}
      />
      <Tab.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          ...TabBarButtonsStyle,
          tabBarLabel: "explore",
          tabBarIcon: ({ focused }) => tabBarIconGenerator(focused, "search"),
        }}
      />
      <Tab.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{
          ...TabBarButtonsStyle,
          tabBarLabel: "help",
          tabBarIcon: ({ focused }) => tabBarIconGenerator(focused, "help"),
        }}
      />
    </Tab.Navigator>
  );
}
