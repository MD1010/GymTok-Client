import React from "react";
import { Text, View } from "react-native";

interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Page</Text>
    </View>
  );
};
