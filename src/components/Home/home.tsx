import React from "react";
import { Text, View } from "react-native";

interface HomeProps {
  username: string;
  fullName: string;
}

export const HomeScreen: React.FC<HomeProps> = ({ username, fullName }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
        Home {username} ({fullName})
      </Text>
    </View>
  );
};
