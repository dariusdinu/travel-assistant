import * as React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../styles/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { parseISO, isBefore, isAfter, isWithinInterval } from "date-fns";
import TripComponent from "../components/TripComponent";

function TripList({ trips }) {
  return (
    <FlatList
      data={trips}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <TripComponent trip={item} />}
    />
  );
}

function Active({ trips }) {
  const now = new Date();
  const activeTrips = trips.filter((trip) =>
    isWithinInterval(now, {
      start: parseISO(trip.dateRange.start),
      end: parseISO(trip.dateRange.end),
    })
  );

  return (
    <View style={styles.tabContainer}>
      <TripList trips={activeTrips} />
    </View>
  );
}

function Upcoming({ trips }) {
  const now = new Date();
  const upcomingTrips = trips.filter((trip) =>
    isAfter(parseISO(trip.dateRange.start), now)
  );

  return (
    <View style={styles.tabContainer}>
      <TripList trips={upcomingTrips} />
    </View>
  );
}

function Past({ trips }) {
  const now = new Date();
  const pastTrips = trips.filter((trip) =>
    isBefore(parseISO(trip.dateRange.end), now)
  );

  return (
    <View style={styles.tabContainer}>
      <TripList trips={pastTrips} />
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs({ trips }) {
  return (
    <Tab.Navigator
      initialRouteName="Active"
      screenOptions={{
        tabBarActiveTintColor: Colors.accent,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Quicksand-SemiBold",
        },
        tabBarStyle: {
          backgroundColor: Colors.primary,
          elevation: 0,
        },
        tabBarInactiveTintColor: {
          color: Colors.background,
        },
        tabBarPressColor: "transparent",
        tabBarIndicatorStyle: {
          backgroundColor: "rgb(214, 121, 63)",
          height: "100%",
          opacity: 0.2,
          borderRadius: 50,
        },
      }}
    >
      <Tab.Screen name="Active">{() => <Active trips={trips} />}</Tab.Screen>
      <Tab.Screen name="Upcoming">
        {() => <Upcoming trips={trips} />}
      </Tab.Screen>
      <Tab.Screen name="Past ">{() => <Past trips={trips} />}</Tab.Screen>
    </Tab.Navigator>
  );
}

export default function TabBarTrips({ trips }) {
  return (
    <NavigationContainer independent={true} style={styles.bgred}>
      <MyTabs trips={trips} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabContainer: { backgroundColor: Colors.primary, flex: 1 },
});
