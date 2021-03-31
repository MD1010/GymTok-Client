import { StyleSheet } from "react-native";
import { Colors } from "../shared/styles/variables";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    padding: 10,
  },
  form: {
    marginTop: 30,
    marginBottom: 20,
    marginRight: 25,
    marginLeft: 25,
  },
  inputRow: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.2,
  },

  buttonStyle: {
    borderWidth: 0,
    color: "#FFFFFF",
    marginRight: 25,
    marginLeft: 25,
    alignItems: "center",
    backgroundColor: Colors.lightPurpule,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 15,
  },
  registerTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 20,
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    marginLeft: 10,
    fontSize: 15,
  },
});
