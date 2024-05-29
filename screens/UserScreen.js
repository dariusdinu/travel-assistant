import React, { useContext, useState } from "react";
import { Text, View, Image, Pressable, ScrollView } from "react-native";
import { AuthContext } from "../store/AuthContext";
import ImagePickerComponent from "../components/ImagePickerComponent";
import { FlatButton } from "../components/UI";
import { StyleSheet } from "react-native";
import Colors from "../styles/colors";
import iconGenerator from "../utils/IconGenerator";

const trips = [
  {
    id: "1",
    destination: "Florence",
    dateRange: "Jul 5 - Jul 9",
    image: require("../assets/empty-picture.png"), // Replace with your image path
  },
  {
    id: "2",
    destination: "Vienna",
    dateRange: "Aug 13 - Aug 26",
    image: require("../assets/empty-picture.png"), // Replace with your image path
  },
  {
    id: "3",
    destination: "Madrid",
    dateRange: "Sep 13 - Sep 17",
    image: require("../assets/empty-picture.png"), // Replace with your image path
  },
];

function UserScreen() {
  const auth = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("Upcoming");

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.profileSection}>
          <View style={styles.rounded}>
            <ImagePickerComponent
              isProfile={true}
              defaultImage={require("../assets/empty-profile-picture.png")}
            />
          </View>
        </View>
        <Text style={styles.profileName}>John Example</Text>
        <FlatButton>
          <Text onPress={auth.signOut}>
            {iconGenerator(true, "exit-outline")} Exit
          </Text>
        </FlatButton>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Pressable onPress={() => setActiveTab("Active")}>
          <Text
            style={
              activeTab === "Active" ? styles.activeTab : styles.inactiveTab
            }
          >
            Active
          </Text>
        </Pressable>
        <Pressable onPress={() => setActiveTab("Upcoming")}>
          <Text
            style={
              activeTab === "Upcoming" ? styles.activeTab : styles.inactiveTab
            }
          >
            Upcoming
          </Text>
        </Pressable>
        <Pressable onPress={() => setActiveTab("Past")}>
          <Text
            style={activeTab === "Past" ? styles.activeTab : styles.inactiveTab}
          >
            Past
          </Text>
        </Pressable>
      </View>

      {/* Trip Cards */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {trips.map((trip) => (
          <View key={trip.id} style={styles.tripCard}>
            <Image source={trip.image} style={styles.tripImage} />
            <View style={styles.tripInfo}>
              <Text style={styles.tripDestination}>{trip.destination}</Text>
              <Text style={styles.tripDateRange}>{trip.dateRange}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default UserScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  profileImage: {
    width: 10,
    height: 10,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#161717",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  activeTab: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#161717",
    borderBottomWidth: 2,
    borderBottomColor: "#161717",
  },
  inactiveTab: {
    fontSize: 16,
    color: "#A0A0A0",
  },
  scrollContainer: {
    paddingBottom: 80, // Add padding to ensure content is above the TabBar
  },
  tripCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  tripImage: {
    width: "100%",
    height: 200,
  },
  tripInfo: {
    padding: 16,
  },
  tripDestination: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#161717",
  },
  tripDateRange: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  rounded: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "transparent",
  },
});
