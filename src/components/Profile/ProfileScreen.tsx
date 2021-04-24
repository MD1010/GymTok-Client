import React, { useState } from "react";
import { Item } from "./interfaces";
import { GenericComponent } from "./genericComponent";
import { Button, Image, View, Text } from "react-native";
import { Colors } from "../shared";
// import { Icon } from "expo";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { MainNavigator } from "../Navigation/StackNavigator";

const Home = () => {
  return <Text>Home</Text>;
};
const Settings = () => {
  return <Text>Settings</Text>;
};
const challenges = [
  {
    _id: 1,
    video: "cf6bec6b-fd03-492f-a8ec-ae3c132e9063.mp4",
    gif: "662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
  {
    _id: 2,
    video: "cda641c5-b707-4511-bbf0-7801e9e2177f.mp4",
    gif: "662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
  {
    _id: 3,
    video: "cda641c5-b707-4511-bbf0-7801e9e2177f.mp4",
    gif: "662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
    component: <Text>Flying #tennis{"\n"} #tennisgirl</Text>,
  },
  {
    _id: 4,
    video: "cda641c5-b707-4511-bbf0-7801e9e2177f.mp4",
    gif: "662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
  {
    _id: 5,
    video: "cda641c5-b707-4511-bbf0-7801e9e2177f.mp4",
    gif: "662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
];
const replies = [
  {
    _id: 1,
    video: "cda641c5-b707-4511-bbf0-7801e9e2177f.mp4",
    gif: "662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
  {
    _id: 2,
    video: "cda641c5-b707-4511-bbf0-7801e9e2177f.mp4",
    gif: "662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
  {
    _id: 3,
    video: "cda641c5-b707-4511-bbf0-7801e9e2177f.mp4",
    gif: "662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
    component: <Text>Flying #tennis{"\n"} #tennisgirl</Text>,
  },
  {
    _id: 4,
    video: "cda641c5-b707-4511-bbf0-7801e9e2177f.mp4",
    gif: "662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
  {
    _id: 5,
    video: "cda641c5-b707-4511-bbf0-7801e9e2177f.mp4",
    gif: "662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
];
function ProfileTabs() {
  const Tabs = createMaterialTopTabNavigator();

  return (
    <NavigationContainer independent={true}>
      <Tabs.Navigator
        sceneContainerStyle={{ backgroundColor: Colors.black }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Challanges") {
              iconName = "ios-apps";
            } else if (route.name === "Replies") {
              iconName = "person-circle";
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={25} color={focused ? Colors.white : Colors.darkGrey} />;
          },
        })}
        tabBarOptions={{
          style: { backgroundColor: Colors.black },
          showIcon: true,
          showLabel: true,
          activeTintColor: Colors.white,
          labelStyle: { fontSize: 8 },
          indicatorStyle: { backgroundColor: "transparent" },
        }}
      >
        <Tabs.Screen
          name="Challanges"
          // component={Home}
          children={() => <GenericComponent items={challenges} />}
        />
        <Tabs.Screen
          name="Replies"
          children={() => <GenericComponent items={replies} />}
          // component={Settings}
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
    <View style={{ paddingTop: 40, paddingLeft: 5 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={require("../../../assets/avatar/01.jpg")}
            style={{ width: 75, height: 75, borderRadius: 37.5 }}
          />
        </View>
        <View
          style={{
            flex: 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
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
              <Text style={{ fontSize: 10, color: Colors.lightGrey }}>Challenges</Text>
            </View>
            <View style={{ alignItems: "center", marginLeft: 45 }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                35
              </Text>
              <Text style={{ fontSize: 10, color: Colors.lightGrey }}>Replies</Text>
            </View>
            <View style={{ alignItems: "center", marginLeft: 45 }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                217
              </Text>
              <Text style={{ fontSize: 10, color: Colors.lightGrey }}>Likes</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ margin: 10, marginTop: 15 }}>
        <Text style={{ fontWeight: "bold", color: Colors.white }}>Moris Angus</Text>
        <Text style={{ color: Colors.white }}>Basketball player | Runner | Swimmer </Text>
        <Text style={{ color: Colors.white }}>www.mysite.com</Text>
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
