import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../styles/colors";
import ExploreCategoryScreen from "../screens/ExploreCategoryScreen";

const Tab = createMaterialTopTabNavigator();

function MyTabs({ searchQuery }) {
  return (
    <Tab.Navigator
      initialRouteName="Restaurant"
      screenOptions={{
        tabBarActiveTintColor: Colors.accent,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Quicksand-SemiBold",
        },
        tabBarStyle: {
          backgroundColor: Colors.primary,
          elevation: 0,
          marginHorizontal: 20,
        },
        tabBarInactiveTintColor: {
          color: Colors.background,
        },
        tabBarPressColor: "transparent",
        tabBarIndicatorStyle: {
          backgroundColor: "rgb(214, 121, 63)",
          height: "100%",
          opacity: 0.2,
          borderRadius: 50,
        },
        tabBarScrollEnabled: true,
      }}
    >
      <Tab.Screen name="Restaurant">
        {() => (
          <ExploreCategoryScreen
            category="restaurant"
            searchQuery={searchQuery}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Hotel">
        {() => (
          <ExploreCategoryScreen category="hotel" searchQuery={searchQuery} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Shopping Mall">
        {() => (
          <ExploreCategoryScreen
            category="shopping_mall"
            searchQuery={searchQuery}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Bar">
        {() => (
          <ExploreCategoryScreen category="bar" searchQuery={searchQuery} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Tourist Attraction">
        {() => (
          <ExploreCategoryScreen
            category="tourist_attraction"
            searchQuery={searchQuery}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function TabBarExplore({ searchQuery }) {
  return <MyTabs searchQuery={searchQuery} />;
}
