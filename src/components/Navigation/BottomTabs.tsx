import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HomeContainer as Home } from "../Home/HomeContainer";
import { LoginScreen } from "../Login/Login";
import { Colors, UIConsts } from "../shared/styles/variables";
import { View, Text } from "react-native";
import { PublishNewVideoScreen } from "../Camera/PublishNewVideo";
import { AddButton } from "../Camera/AddButton";
import { Screen } from "./Screen";

interface BottomTabsProps {}

export const BottomTabs: React.FC<BottomTabsProps> = ({}) => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const Screens = {
    home: () => <Screen name="Home" />,
    leaderboards: () => <Screen name="Leaderboards" />,
    notifications: () => <Screen name="Notifications" />,
    profile: () => <Screen name="Profile" />,
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: Colors.yellow,
          activeBackgroundColor: Colors.darkBlue,
          inactiveBackgroundColor: Colors.darkBlue,
          inactiveTintColor: Colors.white,
          labelStyle: { bottom: 8 },
          style: { height: UIConsts.bottomNavbarHeight, borderTopWidth: 0, backgroundColor: Colors.darkBlue },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Leaderboards"
          component={LoginScreen}
          options={{
            tabBarLabel: "Leaderboards",
            tabBarIcon: ({ color, size }) => <Ionicons name="trophy" color={color} size={size} />,
          }}
        />

        <Tab.Screen
          name="Inbox"
          component={LoginScreen}
          options={{
            tabBarLabel: "Inbox",
            tabBarIcon: ({ color, size }) => <FontAwesome5 name="envelope" color={color} size={size} />,
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Me"
          component={LoginScreen}
          options={{
            tabBarLabel: "Me",
            tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-alt" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
};
