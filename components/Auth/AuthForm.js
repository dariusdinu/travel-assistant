import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import DateInput from "../DateInput";
import { Button, Input } from "../UI";

function AuthForm({ credentialsInvalid, isLogin, onSubmit }) {
  const inputFirstNameRef = useRef(null);
  const inputLastNameRef = useRef(null);
  const inputBirthDateRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputConfirmEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const inputConfirmPasswordRef = useRef(null);

  const [enteredFirstName, setEnteredFirstName] = useState("Marius");
  const [enteredLastName, setEnteredLastName] = useState("Darius");
  const [enteredBirthDate, setEnteredBirthDate] = useState(new Date());
  const [enteredEmail, setEnteredEmail] = useState("marius.darius@email.com");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState(
    "marius.darius@email.com"
  );
  const [enteredPassword, setEnteredPassword] = useState("Qwertyuiop.1");
  const [enteredConfirmPassword, setEnteredConfirmPassword] =
    useState("Qwertyuiop.1");

  function handleInputValueUpdate(inputField, updatedValue) {
    switch (inputField) {
      case "firstName":
        setEnteredFirstName(updatedValue);
        break;
      case "lastName":
        setEnteredLastName(updatedValue);
        break;
      case "birthDate":
        setEnteredBirthDate(updatedValue);
        break;
      case "email":
        setEnteredEmail(updatedValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(updatedValue);
        break;
      case "password":
        setEnteredPassword(updatedValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(updatedValue);
        break;
      default:
        break;
    }
  }

  function handleFormSubmit() {
    onSubmit({
      firstName: enteredFirstName,
      lastName: enteredLastName,
      birthDate: enteredBirthDate,
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        {!isLogin && (
          <>
            <Input
              blurOnSubmit={false}
              isInvalid={credentialsInvalid.firstName}
              label="First Name"
              onSubmitEditing={() => {
                if (!isLogin) {
                  inputLastNameRef.current.focus();
                }
              }}
              onUpdateValue={(value) =>
                handleInputValueUpdate("firstName", value)
              }
              placeholder="First Name"
              ref={inputFirstNameRef}
              returnKeyType="next"
              value={enteredFirstName}
            />
            <Input
              blurOnSubmit={false}
              isInvalid={credentialsInvalid.lastName}
              label="Last Name"
              onSubmitEditing={() => {
                if (!isLogin) {
                  // TODO
                  // inputBirthDateRef.current.focus();
                  inputEmailRef.current.focus();
                }
              }}
              onUpdateValue={(value) =>
                handleInputValueUpdate("lastName", value)
              }
              placeholder="Last Name"
              ref={inputLastNameRef}
              returnKeyType="next"
              value={enteredLastName}
            />
            <DateInput
              label="When is your birthday?"
              enteredDate={enteredBirthDate.toDateString()}
            />
          </>
        )}
        <Input
          blurOnSubmit={false}
          isInvalid={credentialsInvalid.email}
          keyboardType="email-address"
          label="Adresă Email"
          onSubmitEditing={() => {
            if (!isLogin) {
              inputConfirmEmailRef.current.focus();
            } else {
              inputPasswordRef.current.focus();
            }
          }}
          onUpdateValue={(value) => handleInputValueUpdate("email", value)}
          placeholder="Adresă Email"
          ref={inputEmailRef}
          returnKeyType="next"
          value={enteredEmail}
        />
        {!isLogin && (
          <Input
            blurOnSubmit={false}
            isInvalid={credentialsInvalid.confirmEmail}
            keyboardType="email-address"
            label="Confirmă Email"
            onSubmitEditing={() => inputPasswordRef.current.focus()}
            onUpdateValue={(value) => {
              handleInputValueUpdate("confirmEmail", value);
            }}
            placeholder="Confirmă Email"
            ref={inputConfirmEmailRef}
            returnKeyType="next"
            value={enteredConfirmEmail}
          />
        )}
        <Input
          blurOnSubmit={!!isLogin}
          isInvalid={credentialsInvalid.password}
          label="Parolă"
          onSubmitEditing={() => {
            if (!isLogin) {
              inputConfirmPasswordRef.current.focus();
            } else {
              handleFormSubmit();
            }
          }}
          onUpdateValue={(value) => handleInputValueUpdate("password", value)}
          placeholder="Parolă"
          ref={inputPasswordRef}
          returnKeyType={isLogin ? "done" : "next"}
          secure
          value={enteredPassword}
        />
        {!isLogin && (
          <Input
            isInvalid={credentialsInvalid.confirmPassword}
            label="Confirmă Parola"
            onSubmitEditing={() => handleFormSubmit()}
            onUpdateValue={(value) => {
              handleInputValueUpdate("confirmPassword", value);
            }}
            placeholder="Confirmă Parola"
            ref={inputConfirmPasswordRef}
            returnKeyType="done"
            secure
            value={enteredConfirmPassword}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={() => handleFormSubmit()}>
            {isLogin ? "Autentificare" : "Înregistrare"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  buttons: {
    marginTop: 12,
  },
});
