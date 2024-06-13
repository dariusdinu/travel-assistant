import { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AuthContent } from "../components/Auth";
import { LoadingOverlay } from "../components/UI";
import { AuthContext } from "../store/AuthContext";
import { signInWithPassword } from "../utils/Auth";
import Modal from "react-native-modal";
import Colors from "../styles/colors";
import iconGenerator from "../utils/IconGenerator";

function SignInScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useContext(AuthContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  async function handleSignIn({ email, password }) {
    setIsAuthenticating(true);
    try {
      const { token, user } = await signInWithPassword(email, password);
      await auth.authenticate(token, user);
    } catch (error) {
      setErrorMessage(error.message);
      setIsAuthenticating(false);
      setModalVisible(true);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Autentificare în curs... " />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        animationIn={"slideInDown"}
        animationInTiming={500}
        animationOutTiming={600}
        animationOut={"slideOutUp"}
      >
        <View style={styles.modalContainer}>
          <View>
            {iconGenerator("alert-circle-outline", 13, Colors.textDark1)}
          </View>
          <Text style={styles.modalText}>{errorMessage}</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.modalButtonText}>CLOSE </Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
