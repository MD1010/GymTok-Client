import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const Screen = ({ name }) => (
  <View style={styles.container}>
    <Text style={styles.text}>This is the "{name}" screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bbbbbb",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 28, color: "#222222", textAlign: "center" },
});

export default Screen;
