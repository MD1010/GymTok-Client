import { Dimensions, StyleSheet } from "react-native";
import { Colors, UIConsts } from "../shared/styles/variables";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("screen").height,
    flex: 1,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  likeCommentsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
    alignItems: "flex-end",
    marginRight: 5,
    // marginBottom: 10,
  },
  amount: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 5,
  },
  rowContainer: {
    flexDirection: "row",
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
  hashtag: {
    color: Colors.white,
    marginRight: 5,
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
