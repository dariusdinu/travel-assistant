import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../styles/colors";

function TripPlanningOptions({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Start a new adventure</Text>
      <View style={[styles.card, styles.topCard]}>
        <TouchableOpacity
          style={styles.cardContent}
          onPress={() => navigation.navigate("AITrip")}
        >
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Let us do our magic</Text>
            <Text style={styles.cardDescription}>
              It's going to take just a few minutes. All you have to do is
              answer a small number of questions
            </Text>
          </View>
          <View style={styles.bottomIcons}>
            <Ionicons
              name="arrow-forward"
              size={36}
              color={Colors.textLight}
              style={styles.arrowIcon}
            />
            <Ionicons name="flash-outline" size={36} color={Colors.textLight} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.card, styles.bottomCard]}>
        <TouchableOpacity
          style={styles.cardContent}
          onPress={() => navigation.navigate("ManualTrip")}
        >
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Trip Designer</Text>
            <Text style={styles.cardDescription}>
              We let you have control over every single detail. Use our
              extensive designer controls in order to fulfill what you imagine
              about your next trip
            </Text>
          </View>
          <View style={styles.bottomIcons}>
            <Ionicons
              name="arrow-forward"
              size={36}
              color={Colors.textLight}
              style={styles.arrowIcon}
            />
            <Ionicons
              name="hammer-outline"
              size={36}
              color={Colors.textLight}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingTop: 40,
    paddingBottom: 80,
  },
  header: {
    fontSize: 28,
    color: Colors.textDark1,
    fontFamily: "Quicksand-Bold",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.accent,
    marginBottom: 16,
    padding: 16,
    flexDirection: "row",
    height: 200,
  },
  cardContent: {
    flexDirection: "column",
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 28,
    color: Colors.textLight,
    fontFamily: "Quicksand-Bold",
  },
  cardDescription: {
    fontSize: 20,
    color: Colors.textLight,
    fontFamily: "Quicksand-Regular",
  },
  arrowIcon: {
    marginLeft: 16,
  },
  bottomIcons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 26,
  },
  topCard: {
    marginRight: 40,
    borderTopEndRadius: 40,
    borderBottomRightRadius: 40,
  },
  bottomCard: {
    marginLeft: 40,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
  },
});

export default TripPlanningOptions;
