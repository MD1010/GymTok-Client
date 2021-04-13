import React, { useState } from "react";
import { Item } from "./interfaces";
import { GenericComponent } from "./genericComponent";
import { Button, Image, View, Text } from "react-native";
import { Colors } from "../shared";
// import { Icon } from "expo";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const Home = () => {
  return <Text>Home</Text>;
};
const Settings = () => {
  return <Text>Settings</Text>;
};
const challenges = [
  {
    _id: 1,
    url: "http://193.106.55.109:8000/cda641c5-b707-4511-bbf0-7801e9e2177f.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 2,
    url: "http://193.106.55.109:8000/7b910ff9-7f85-4fb5-a0e3-bc13f05ae732.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 3,
    url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
];
const replies = [
  {
    _id: 4,
    url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 5,
    url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 6,
    url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
];
function ProfileTabs() {
  const Tabs = createMaterialTopTabNavigator();

  return (
    <NavigationContainer independent={true}>
      <Tabs.Navigator
        tabBarOptions={{
          style: { backgroundColor: Colors.darkBlueOpaque },
          // activeTintColor: Colors.white,
        }}
      >
        <Tabs.Screen
          name="Challanges"
          component={Home}
          options={{
            tabBarLabel: ({ focused }) => (
              <Icon
                name={"ios-apps"}
                color={focused ? Colors.white : Colors.weakGrey}
                size={30}
              />
            ),
          }}

          // children={() => <GenericComponent items={challenges} />}
        />
        <Tabs.Screen
          name="Replies"
          // children={() => <GenericComponent items={replies} />}
          component={Settings}
          options={{
            tabBarLabel: ({ focused }) => (
              <Icon
                name={"person-circle"}
                color={focused ? Colors.white : Colors.weakGrey}
                size={30}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
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

  return (
    <>
      <ProfileHeader />
      <ProfileTabs />
    </>
  );
};
