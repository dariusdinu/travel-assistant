import { useContext, useState } from "react";
import { Alert } from "react-native";
import { AuthContent } from "../components/Auth";
import { LoadingOverlay } from "../components/UI";
import { AuthContext } from "../store/AuthContext";
import { signUp } from "../utils/Auth";

function SignUpScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const auth = useContext(AuthContext);

  async function handleSignUp({
    firstName,
    lastName,
    birthDate,
    email,
    password,
  }) {
    setIsAuthenticating(true);
    try {
      const { token, user } = await signUp({
        firstName,
        lastName,
        birthDate,
        email,
        password,
      });
      await auth.authenticate(token, user);
    } catch (error) {
      Alert.alert("Înregistrare eșuată", error.message);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creare cont în curs..." />;
  }

  return (
    <AuthContent onAuthenticate={(credentials) => handleSignUp(credentials)} />
  );
}

export default SignUpScreen;
