import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Button } from "react-native";
import TabBarExplore from "../navigation/TabBarExplore";
import Colors from "../styles/colors";

function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const handleSearchSubmit = () => {
    if (searchQuery.length > 2) {
      setSubmittedQuery(searchQuery);
    } else {
      setSubmittedQuery("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore your surroundings</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Type here in order to search..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            handleSearchSubmit();
          }}
          onSubmitEditing={handleSearchSubmit}
        />
      </View>
      <TabBarExplore searchQuery={submittedQuery} />
    </View>
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
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#FFE5D9",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    fontFamily: "Quicksand-Regular",
  },
});

export default ExploreScreen;
