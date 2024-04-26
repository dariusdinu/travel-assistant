import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#EBEBD3 ",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },

  image: {
    marginTop: 100,
  },

  inputView: {
    backgroundColor: "#A44200",
    width: "70%",
    height: 45,
    marginBottom: 20,
    paddingLeft: 20,
    borderRadius: 50,
  },

  loginForm: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },

  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    textAlign: "left",
    color: "#EBEBD3",
  },

  loginBtn: {
    width: 200,
    borderRadius: 25,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#EBEBD3",
    backgroundColor: "#69140E",
  },
});

export { styles };
