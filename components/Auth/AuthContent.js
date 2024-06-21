import { useNavigation } from "@react-navigation/native";
import { isValid } from "date-fns";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "../../styles/colors";
import { FlatButton } from "../UI";
import AuthForm from "./AuthForm";
import iconGenerator from "../../utils/IconGenerator";

const image = {
  uri: "https://images.unsplash.com/photo-1668622456973-bc2753d8cd62?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  const iconNames = ["logo-facebook", "logo-instagram", "logo-twitter"];

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    firstName: false,
    lastName: false,
    birthDate: false,
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("SignUp");
    } else {
      navigation.replace("SignIn");
    }
  }

  function submitHandler(credentials) {
    let {
      firstName,
      lastName,
      birthDate,
      email,
      confirmEmail,
      password,
      confirmPassword,
    } = credentials;

    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    confirmEmail = confirmEmail.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    const firstNameIsValid = firstName.length >= 3;
    const lastNameIsValid = lastName.length >= 3;
    const birthDateIsValid = isValid(birthDate);
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !firstNameIsValid ||
      !lastNameIsValid ||
      !birthDateIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Date invalide", "Verificați datele introduse.");
      setCredentialsInvalid({
        firstName: !firstNameIsValid,
        lastName: !lastNameIsValid,
        birthDate: !birthDateIsValid,
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({
      firstName,
      lastName,
      birthDate,
      email,
      password,
    });
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} resizeMode="repeat" source={image}>
        <ScrollView
          contentContainerStyle={
            !isLogin ? styles.fullHeightForm : styles.contentContainer
          }
        >
          <AuthForm
            credentialsInvalid={credentialsInvalid}
            isLogin={isLogin}
            onSubmit={(credentials) => submitHandler(credentials)}
          />
          <View style={styles.buttons}>
            {isLogin && (
              <Text style={styles.smallText}>Don't have an account? </Text>
            )}
            <FlatButton onPress={() => switchAuthModeHandler()}>
              {isLogin ? "Register now " : "Go back to log in"}
            </FlatButton>
          </View>
          {isLogin && (
            <View style={styles.socialMediaContainer}>
              {iconNames.map((item) => {
                return (
                  <View key={item} style={styles.socialMediaIcon}>
                    {iconGenerator(item, 27, Colors.accent)}
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 8,
    backgroundColor: Colors.primary,
    position: "absolute",
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  smallText: {
    color: Colors.textLight2,
    fontFamily: "Quicksand-Regular",
    fontSize: 12,
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  fullHeightForm: {
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 25,
    backgroundColor: Colors.primary,
  },
  socialMediaContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    marginBottom: 25,
  },
});
