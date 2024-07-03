import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Colors from "../../styles/colors";
import iconGenerator from "../../utils/IconGenerator";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchBar = ({ searchQuery, setSearchQuery, onSubmit }) => {
  const handleSearchSubmit = () => {
    if (searchQuery.length > 2) {
      onSubmit(searchQuery);
    } else {
      onSubmit("");
    }
  };

  return (
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
        cursorColor={Colors.textDark2}
        placeholderTextColor={Colors.textDark2}
        selectionColor={Colors.textDark2}
      />
      <View>{iconGenerator("search", 16, Colors.accent)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 20,
    backgroundColor: Colors.background,
    paddingRight: 20,
    borderRadius: 25,
  },
  searchBar: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,

    marginRight: 10,
    fontFamily: "Quicksand-Regular",
  },
});

export default SearchBar;
