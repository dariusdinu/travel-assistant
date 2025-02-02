import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import axios from "axios";
import { formatDate } from "../utils/DateFormatter";
import Colors from "../styles/colors";
import * as Progress from "react-native-progress";
import {
  differenceInDays,
  endOfYear,
  compareAsc,
  differenceInCalendarDays,
} from "date-fns";
import { Card } from "react-native-paper";
import { LoadingOverlay } from "../components/UI";

const screenWidth = Dimensions.get("window").width;

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

function DashboardScreen() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateXAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    async function fetchTrips() {
      try {
        const response = await axios.get(`${apiUrl}/trips`);
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
        animateCards();
      }
    }

    fetchTrips();
  }, []);

  const animateCards = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.sin,
        useNativeDriver: true,
      }),
      Animated.timing(translateXAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.sin,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (loading) {
    return <LoadingOverlay message="Loading your dashboard..." />;
  }

  const totalTrips = trips.length;
  const manualTrips = trips.filter((trip) => trip.type === "manual").length;
  const generatedTrips = trips.filter(
    (trip) => trip.type === "generated"
  ).length;

  const totalStops = trips.reduce(
    (acc, trip) => acc + (trip.numberOfStops || 0),
    0
  );
  const averageStops =
    totalTrips > 0 ? (totalStops / totalTrips).toFixed(2) : 0;

  const totalDaysTraveled = trips.reduce((acc, trip) => {
    const startDate = new Date(trip.dateRange.start);
    const endDate = new Date(trip.dateRange.end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return acc + diffDays;
  }, 0);
  const averageDaysTraveled =
    totalTrips > 0 ? (totalDaysTraveled / totalTrips).toFixed(2) : 0;

  const mostRecentTrip = trips
    .filter((trip) => new Date(trip.dateRange.start) <= new Date())
    .sort((a, b) =>
      compareAsc(new Date(b.dateRange.end), new Date(a.dateRange.end))
    )[0];

  const currentTrip = trips.find((trip) => {
    const startDate = new Date(trip.dateRange.start);
    const endDate = new Date(trip.dateRange.end);
    const today = new Date();
    return today >= startDate && today <= endDate;
  });

  const daysLeftInCurrentTrip = currentTrip
    ? differenceInCalendarDays(new Date(currentTrip.dateRange.end), new Date())
    : 0;

  const totalDaysInCurrentTrip = currentTrip
    ? differenceInCalendarDays(
        new Date(currentTrip.dateRange.end),
        new Date(currentTrip.dateRange.start)
      ) + 1
    : 1;

  const daysPassedInCurrentTrip = currentTrip
    ? differenceInCalendarDays(
        new Date(),
        new Date(currentTrip.dateRange.start)
      )
    : 0;

  const tripsLeftInYear = trips.filter(
    (trip) => new Date(trip.dateRange.start) > new Date()
  ).length;

  const daysLeftInYear = differenceInDays(endOfYear(new Date()), new Date());

  const tripTypesData = [
    {
      name: "Manual",
      count: manualTrips,
      color: Colors.textDark2,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Generated",
      count: generatedTrips,
      color: Colors.accent,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const barData = {
    labels: ["Total", "Manual", "Generated"],
    datasets: [
      {
        data: [totalTrips, manualTrips, generatedTrips],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFF",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#FFF",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    barRadius: 10,
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <Animated.View
        style={[
          styles.dashboard,
          { opacity: opacityAnim, transform: [{ translateY: translateXAnim }] },
        ]}
      >
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statText}>Total Trips</Text>
            <Text style={styles.statValue}>{totalTrips}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statText}>Total Stops</Text>
            <Text style={styles.statValue}>{totalStops}</Text>
          </View>
        </View>
        <View style={styles.statCardFull}>
          <Text style={styles.statText}>Average Stops per Trip</Text>
          <Text style={styles.statValue}>{averageStops}</Text>
        </View>
        <View style={styles.statCardFull}>
          <Text style={styles.statText}>Average Days Traveled per Trip</Text>
          <Text style={styles.statValue}>{averageDaysTraveled}</Text>
        </View>

        <View style={styles.pieChart}>
          <Text style={styles.chartTitle}>Trips Breakdown</Text>
          <PieChart
            data={tripTypesData}
            width={screenWidth - 30} // Adjusted for padding inside the card
            height={220}
            chartConfig={chartConfig}
            accessor={"count"}
            backgroundColor={"transparent"}
            absolute
          />
        </View>

        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>Trips Count</Text>
          <BarChart
            data={barData}
            width={screenWidth - 80} // Adjusted for padding inside the card
            height={240}
            chartConfig={chartConfig}
            withInnerLines={false}
          />
        </Card>

        {mostRecentTrip && (
          <View style={styles.mostRecentTripContainer}>
            <Text style={styles.mostRecentTripTitle}>Most Recent Trip</Text>
            <Text style={styles.statText}>{mostRecentTrip.title}</Text>
            <Text style={styles.statText}>{`${formatDate(
              mostRecentTrip.dateRange.start
            )} - ${formatDate(mostRecentTrip.dateRange.end)}`}</Text>
          </View>
        )}

        <View style={styles.chartCard}>
          <Text style={styles.progressTitle}>
            Days Left in Current Trip: {daysLeftInCurrentTrip}
          </Text>
          <Progress.Circle
            size={150}
            progress={daysPassedInCurrentTrip / totalDaysInCurrentTrip}
            showsText={true}
            formatText={() =>
              ` ${daysPassedInCurrentTrip}/${totalDaysInCurrentTrip} `
            }
            color={Colors.accent}
            thickness={10}
          />
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.progressTitle}>
            Trips Left This Year: {tripsLeftInYear}
          </Text>
          <Progress.Circle
            size={150}
            progress={
              tripsLeftInYear /
              (tripsLeftInYear + (totalTrips - tripsLeftInYear))
            }
            showsText={true}
            formatText={() =>
              ` ${tripsLeftInYear}/${
                tripsLeftInYear + (totalTrips - tripsLeftInYear)
              } `
            }
            color={Colors.accent}
            thickness={10}
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.primary,
  },
  dashboard: {
    paddingBottom: 200,
  },
  header: {
    fontSize: 32,
    fontFamily: "Quicksand-Bold",
    marginBottom: 20,
    paddingTop: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  statCardFull: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  statText: {
    fontSize: 18,
    fontFamily: "Quicksand-SemiBold",
    color: Colors.textDark1,
  },
  statValue: {
    fontSize: 24,
    fontFamily: "Quicksand-Bold",
    color: Colors.accent,
    marginTop: 5,
  },
  chartCard: {
    flex: 1,
    alignItems: "center",
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  chartTitle: {
    fontSize: 24,
    fontFamily: "Quicksand-Bold",
    marginBottom: 10,
  },
  mostRecentTripContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  mostRecentTripTitle: {
    fontSize: 24,
    fontFamily: "Quicksand-Bold",
    marginBottom: 10,
  },
  progressRingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontFamily: "Quicksand-Bold",
    marginBottom: 10,
  },
  pieChart: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
  },
});

export default DashboardScreen;
