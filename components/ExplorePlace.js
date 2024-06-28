import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../styles/colors";
import { LinearGradient } from "expo-linear-gradient";

const ExplorePlace = ({ place }) => {
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
          color={Colors.textLight}
        />
      );
    }

    if (halfStar) {
      stars.push(
        <Ionicons
          key="half"
          name="star-half-sharp"
          size={14}
          color={Colors.textLight}
        />
      );
    }

    return stars;
  };

  const photoReference =
    place.photos && place.photos.length > 0
      ? place.photos[0].photo_reference
      : null;
  const imageUrl = photoReference
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyDj8oH1DULLrIzJ8a35YL72tnTRDfTnEjE`
    : null;

  return (
    <TouchableOpacity style={styles.placeCard}>
      {imageUrl ? (
        <ImageBackground
          source={{ uri: imageUrl }}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <LinearGradient
            colors={["#232F2F22", "#232F2Fbb"]}
            style={styles.linearGradient}
          >
            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeVicinity}>{place.vicinity}</Text>
              {place.rating && (
                <View style={styles.ratingContainer}>
                  {renderStars(place.rating)}
                  <Text style={styles.ratingText}>{place.rating}/5</Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </ImageBackground>
      ) : (
        <View style={[styles.imageBackground, styles.noImageBackground]}>
          <View style={[styles.placeInfo, styles.linearGradient]}>
            <Text style={styles.placeName}>{place.name}</Text>
            <Text style={styles.placeVicinity}>{place.vicinity}</Text>
            {place.rating && (
              <View style={styles.ratingContainer}>
                {renderStars(place.rating)}
                <Text style={styles.ratingText}>{place.rating}/5</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeCard: {
    backgroundColor: Colors.background,
    height: 200,
    borderRadius: 40,
    overflow: "hidden",
    marginBottom: 16,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  noImageBackground: {
    backgroundColor: Colors.textLight2,
    paddingHorizontal: 15,
  },
  linearGradient: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  placeInfo: {
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  placeName: {
    fontSize: 24,
    fontFamily: "Quicksand-SemiBold",
    color: Colors.textLight,
    marginVertical: 10,
  },
  placeVicinity: {
    fontSize: 14,
    color: Colors.textLight,
    fontFamily: "Quicksand-SemiBold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    color: Colors.textLight,
    fontFamily: "Quicksand-SemiBold",
    marginLeft: 5,
  },
});

export default ExplorePlace;
