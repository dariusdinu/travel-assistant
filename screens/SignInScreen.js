import { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AuthContent } from "../components/Auth";
import { LoadingOverlay } from "../components/UI";
import { AuthContext } from "../store/AuthContext";
import { signInWithPassword } from "../utils/Auth";
import Colors from "../styles/colors";
import ModalWindow from "../components/UI/ModalWindow";

function SignInScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalIcon, setModalIcon] = useState("");
  const auth = useContext(AuthContext);

  async function handleSignIn({ email, password }) {
    setIsAuthenticating(true);
    try {
      const { token, user } = await signInWithPassword(email, password);
      await auth.authenticate(token, user);
    } catch (error) {
      setModalMessage(error.message);
      setModalIcon("alert-circle-outline");
      setIsAuthenticating(false);
      setModalVisible(true);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Autentificare în curs... " />;
  }

  return (
    <View style={{ flex: 1 }}>
      <AuthContent
        isLogin
        onAuthenticate={(credentials) => handleSignIn(credentials)}
      />
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.background,
    height: 200,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalButton: {
    borderRadius: 50,
    color: Colors.accent,
  },
  modalText: {
    fontFamily: "Quicksand-Regular",
    fontSize: 20,
    marginBottom: 32,
    color: Colors.textDark1,
    textAlign: "center",
  },
  modalButtonText: {
    color: Colors.accent,
    fontFamily: "Quicksand-Bold",
    fontSize: 20,
  },
});
