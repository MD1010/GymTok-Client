import { Dimensions, StyleSheet } from "react-native";
import { Colors, UIConsts } from "../shared/styles/variables";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: "100%",
    // height: Dimensions.get("window").height - UIConsts.bottomNavbarHeight,
  },
  video: {
    flex: 1,
    width: Dimensions.get("window").width,

    // position: "absolute",
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
  uiContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  amount: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 5,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
  },

  creator: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: "bold",
    marginLeft: 10,
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
