import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { SignInScreen, SignUpScreen } from "../screens";
import { AuthContext } from "../store/AuthContext";

const Stack = createNativeStackNavigator();

export default function AuthenticationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
