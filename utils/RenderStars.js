import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../styles/colors";

export const renderStars = (rating) => {
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
