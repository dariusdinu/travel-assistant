import { useNavigation } from "@react-navigation/native";
import { isValid } from "date-fns";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import Colors from "../../styles/colors";
import { FlatButton } from "../UI";
import AuthForm from "./AuthForm";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

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
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <AuthForm
        credentialsInvalid={credentialsInvalid}
        isLogin={isLogin}
        onSubmit={(credentials) => submitHandler(credentials)}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={() => switchAuthModeHandler()}>
          {isLogin ? "Creează un cont nou" : "Autentifică-te"}
        </FlatButton>
      </View>
    </ScrollView>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.background,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
