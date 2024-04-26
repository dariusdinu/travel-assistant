import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import WelcomeScreen from "../screens/Welcome";

const Stack = createStackNavigator();

export default function StackNavigator() {
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ cardStyleInterpolator: forFade }}
      />
    </Stack.Navigator>
  );
}
