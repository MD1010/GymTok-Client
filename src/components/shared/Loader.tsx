import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loader: React.FC = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator animating={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
