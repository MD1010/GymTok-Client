import { Dimensions, StyleSheet } from "react-native";
import { Colors, UIConsts } from "../shared/styles/variables";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height - 60,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  rightContainer: {
    right: 12,
    bottom: 150,
    position: "absolute",
  },
  infoContainer: {
    alignSelf: "flex-start",
    width: "80%",
    position: "absolute",
    left: 5,
    bottom: 15,
    padding: 10,
  },

  creator: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: "bold",
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  info: {
    marginTop: 7,
    color: Colors.white,
  },
  challengeScore: {
    color: Colors.white,
    alignSelf: "flex-end",
    fontWeight: "bold",
    marginRight: 5,
    fontSize: 20,
  },
  tag: {
    color: Colors.white,
    fontWeight: "bold",
    marginRight: 6,
    fontSize: 15,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  iconText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 12,
  },
});
