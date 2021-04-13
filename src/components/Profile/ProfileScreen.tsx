import React, { useState } from "react";
import { Item } from "./interfaces";
import { GenericComponent } from "./genericComponent";
import { Button, Image, View } from "react-native";
import { Colors } from "../shared";
import { Icon } from "expo";

interface ProfileProps {
  items: Item[];
}
const ProfileHeader: React.FC = () => {
  return (
    <View style={{ paddingTop: 20 }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../../assets/avatar/01.jpg")}
          style={{ width: 75, height: 75, borderRadius: 37.5 }}
        />
      </View>
    </View>
  );
};

export const ProfileScreen: React.FC<ProfileProps> = ({ items }) => {
  // return <GenericComponent items={items} />;

  return <ProfileHeader />;
};
