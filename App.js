import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import StackAuthentication from "./navigation/StackAuthentication";
import StackMain from "./navigation/StackMain";
import AuthContextProvider, { AuthContext } from "./store/AuthContext";
import { useFonts } from "expo-font";

function Navigation() {
  const auth = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!auth.isSignedIn && <StackAuthentication />}
      {auth.isSignedIn && <StackMain />}
    </NavigationContainer>
  );
}

SplashScreen.preventAutoHideAsync();

function Root() {
  const [appIsReady, setAppIsReady] = useState(false);
  const auth = useContext(AuthContext);
  const [fontsLoaded, fontError] = useFonts({
    "Quicksand-Regular": require("./assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Medium": require("./assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("./assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-SemiBold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          await auth.authenticate(token);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && (fontsLoaded || fontError)) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded, fontError]);

  if (!appIsReady || (!fontsLoaded && !fontError)) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Navigation />
    </View>
  );
}

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
