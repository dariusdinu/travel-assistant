import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Location from "expo-location";
import Colors from "../styles/colors";

function ExploreScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("restaurant");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      fetchPlaces();
    }
  }, [location, selectedCategory]);

  const fetchPlaces = async () => {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=1500&type=${selectedCategory}&key=AIzaSyDj8oH1DULLrIzJ8a35YL72tnTRDfTnEjE`;

    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      if (result.status === "OK") {
        setPlaces(result.results);
      } else {
        console.error(`Error fetching places: ${result.error_message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderPlace = ({ item }) => (
    <View style={styles.placeContainer}>
      {item.photos && item.photos.length > 0 ? (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=AIzaSyDj8oH1DULLrIzJ8a35YL72tnTRDfTnEjE`,
          }}
          style={styles.placePhoto}
        />
      ) : (
        <Image source={{ uri: item.icon }} style={styles.placeIcon} />
      )}
      <View style={styles.placeDetails}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeVicinity}>{item.vicinity}</Text>
        {item.rating && (
          <Text style={styles.placeRating}>Rating: {item.rating}</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore your surroundings</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Type here in order to search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.categoryContainer}>
        {[
          "restaurant",
          "hotel",
          "shopping_mall",
          "bar",
          "tourist_attraction",
        ].map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={
                selectedCategory === category
                  ? styles.selectedCategory
                  : styles.category
              }
            >
              {category.charAt(0).toUpperCase() +
                category.slice(1).replace("_", " ")}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={places}
        renderItem={renderPlace}
        keyExtractor={(item) => item.place_id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: "#FFE5D9",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  category: {
    fontSize: 16,
    color: "#A0A0A0",
  },
  selectedCategory: {
    fontSize: 16,
    color: "#FF6347",
    fontWeight: "bold",
  },
  placeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D0D0D0",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  placeIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  placePhoto: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 10,
  },
  placeDetails: {
    flex: 1,
  },
  placeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  placeVicinity: {
    fontSize: 14,
    color: "#888",
  },
  placeRating: {
    fontSize: 14,
    color: "#444",
  },
});

export default ExploreScreen;
