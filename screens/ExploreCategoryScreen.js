import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import * as Location from "expo-location";
import Colors from "../styles/colors";
import ExplorePlace from "../components/ExplorePlace";

function ExploreCategoryScreen({ category, searchQuery }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces] = useState([]);

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
  }, [location, category, searchQuery]);

  const fetchPlaces = async () => {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=1500&type=${category}&key=AIzaSyDj8oH1DULLrIzJ8a35YL72tnTRDfTnEjE`;

    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      if (result.status === "OK") {
        const filteredResults = result.results.filter((place) =>
          place.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setPlaces(filteredResults);
      } else {
        console.error(`Error fetching places: ${result.error_message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : (
        <FlatList
          data={places}
          renderItem={({ item }) => <ExplorePlace place={item} />}
          keyExtractor={(item) => item.place_id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.primary,
  },
  errorText: {
    color: Colors.textLight2,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ExploreCategoryScreen;
