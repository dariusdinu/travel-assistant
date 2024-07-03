import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabBarExplore from "../navigation/TabBarExplore";
import Colors from "../styles/colors";
import SearchBar from "../components/UI/SearchBar";
import ExploreCategoryScreen from "./ExploreCategoryScreen";
import ExplorePlaceScreen from "./ExplorePlaceScreen";
import AddAStopScreen from "./AddAStopScreen";

const Stack = createStackNavigator();

function ExploreScreenContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const handleSearchSubmit = (query) => {
    setSubmittedQuery(query);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore your surroundings</Text>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSubmit={handleSearchSubmit}
      />
      <TabBarExplore searchQuery={submittedQuery} />
    </View>
  );
}

export default function ExploreScreen() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="ExploreCategoryScreen"
          component={ExploreScreenContent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExplorePlaceScreen"
          component={ExplorePlaceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddAStopScreen"
          component={AddAStopScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.primary,
  },
  header: {
    fontSize: 24,
    fontFamily: "Quicksand-Bold",
    margin: 20,
  },
});
