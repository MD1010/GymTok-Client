import React, { useState } from "react";
import { Item } from "./interfaces";
import { GenericComponent } from "./genericComponent";
import { Button, Image, View, Text } from "react-native";
import { Colors } from "../shared";
import { Icon } from "expo";

interface ProfileProps {
  items: Item[];
}
const ProfileHeader: React.FC = () => {
  return (
    <View style={{ paddingTop: 40 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={require("../../../assets/avatar/01.jpg")}
            style={{ width: 75, height: 75, borderRadius: 37.5 }}
          />
        </View>
        <View style={{ flex: 3, paddingTop: 15 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                20
              </Text>
              <Text style={{ fontSize: 10, color: Colors.lightGrey }}>
                Challenges
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                35
              </Text>
              <Text style={{ fontSize: 10, color: Colors.lightGrey }}>
                Replies
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                217
              </Text>
              <Text style={{ fontSize: 10, color: Colors.lightGrey }}>
                Likes
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingTop: 10 }}>
            {/* <Button
              dark
              style={{
                flex: 3,
                marginLeft: 10,
                justifyContent: "center",
                height: 30,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <Text style={{ color: "black" }}>Edit Profile</Text>
            </Button> */}
          </View>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <Text></Text>
        <Text style={{ fontWeight: "bold", color: Colors.white }}>
          Moris Angus
        </Text>
        <Text style={{ color: Colors.white }}>
          Basketball player | Runner | Swimmer{" "}
        </Text>
        <Text style={{ color: Colors.white }}>www.mysite.com</Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            borderTopWidth: 1,
            borderTopColor: "grey",
          }}
        ></View>
      </View>
    </View>
  );
};

export const ProfileScreen: React.FC<ProfileProps> = ({ items }) => {
  // return <GenericComponent items={items} />;

  return <ProfileHeader />;
};
