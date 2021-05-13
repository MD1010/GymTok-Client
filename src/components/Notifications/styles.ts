import { Colors } from "../shared";
import { StyleSheet, Text, View } from "react-native";

export const styles = StyleSheet.create({
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  pageTitle: {
    fontSize: 17,
    color: Colors.white,
    fontWeight: "bold",
  },
  content: {
    fontSize: 14,
    color: Colors.white,
  },

  username: {
    fontSize: 15,
    color: Colors.white,
  },

  postTime: {
    fontSize: 12,
    color: Colors.lightGrey2,
    marginTop: 3,
  },

  notRead: {
    backgroundColor: Colors.cyan,
    height: 5,
    width: 5,
    overflow: "hidden",
    borderRadius: 50,
    marginRight: 15,
  },
  leftAction: {
    // alignItems: "center",
    flex: 1,
    // wid: "100%",
    justifyContent: "center",
    // height: 75,
    backgroundColor: "red",
  },
  actionText: {
    color: Colors.white,
    fontWeight: "bold",
    padding: 20,
  },
});
