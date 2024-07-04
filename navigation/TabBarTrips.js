import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../styles/colors";
import { parseISO, isBefore, isAfter, isWithinInterval } from "date-fns";
import ActiveTrip from "../components/ActiveTrip";
import TripList from "../components/TripList";
import { formatDate } from "../utils/DateFormatter";

function Active({ trips, onTripPress }) {
  const now = new Date();
  const activeTrips = trips.filter((trip) =>
    isWithinInterval(now, {
      start: parseISO(trip.dateRange.start),
      end: parseISO(trip.dateRange.end),
    })
  );

  const upcomingTrips = trips.filter((trip) =>
    isAfter(parseISO(trip.dateRange.start), now)
  );

  const nextTripDate = upcomingTrips.length
    ? formatDate(upcomingTrips[0].dateRange.start)
    : null;

  const emptyMessage = nextTripDate
    ? `Your next trip is set for ${nextTripDate}`
    : "There aren't any active trips";

  return (
    <ActiveTrip
      activeTrips={activeTrips}
      emptyMessage={emptyMessage}
      onTripPress={onTripPress}
    />
  );
}

function Upcoming({ trips, onTripPress }) {
  const now = new Date();
  const upcomingTrips = trips.filter((trip) =>
    isAfter(parseISO(trip.dateRange.start), now)
  );

  const emptyMessage = upcomingTrips.length
    ? "Your next trip is on " + formatDate(upcomingTrips[0].dateRange.start)
    : "You have no upcoming trips. Start planning your new adventure";

  return (
    <TripList
      trips={upcomingTrips}
      onTripPress={onTripPress}
      emptyMessage={emptyMessage}
    />
  );
}

function Past({ trips, onTripPress }) {
  const now = new Date();
  const pastTrips = trips.filter((trip) =>
    isBefore(parseISO(trip.dateRange.end), now)
  );

  const emptyMessage =
    "There aren't any past trips. Start planning your new adventure";

  return (
    <TripList
      trips={pastTrips}
      onTripPress={onTripPress}
      emptyMessage={emptyMessage}
    />
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs({ trips, onTripPress }) {
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
      <Tab.Screen name="Active">
        {() => <Active trips={trips} onTripPress={onTripPress} />}
      </Tab.Screen>
      <Tab.Screen name="Upcoming">
        {() => <Upcoming trips={trips} onTripPress={onTripPress} />}
      </Tab.Screen>
      <Tab.Screen name="Past ">
        {() => <Past trips={trips} onTripPress={onTripPress} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function TabBarTrips({ trips, onTripPress }) {
  return (
    <NavigationContainer independent={true}>
      <MyTabs trips={trips} onTripPress={onTripPress} />
    </NavigationContainer>
  );
}
