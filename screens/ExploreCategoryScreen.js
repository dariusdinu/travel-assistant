import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, Image } from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../styles/colors";

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

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons
          key={`full-${i}`}
          name="star-sharp"
          size={14}
          color={Colors.textDark1}
        />
      );
    }

    if (halfStar) {
      stars.push(
        <Ionicons
          key="half"
          name="star-half-sharp"
          size={14}
          color={Colors.textDark1}
        />
      );
    }

    return stars;
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
          <View style={styles.ratingContainer}>
            {renderStars(item.rating)}
            <Text style={styles.ratingText}>{item.rating}/5</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
    padding: 20,
    backgroundColor: Colors.primary,
  },
  searchBar: {
    backgroundColor: "#FFE5D9",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    fontFamily: "Quicksand-Regular",
  },
  placeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D0D0D0",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
  },
  placeIcon: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  placePhoto: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 16,
  },
  placeDetails: {
    flex: 1,
    gap: 6,
  },
  placeName: {
    fontSize: 18,
    fontFamily: "Quicksand-Bold",
  },
  placeVicinity: {
    fontSize: 14,
    color: "#888",
    fontFamily: "Quicksand-SemiBold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    color: "#444",
    fontFamily: "Quicksand-SemiBold",
    marginLeft: 5,
  },
});

export default ExploreCategoryScreen;
