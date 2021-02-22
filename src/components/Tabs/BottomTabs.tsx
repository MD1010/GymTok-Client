import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HomeContainer as Home } from "../Home/HomeContainer";
import { LoginScreen } from "../Login/Login";
import { Colors, UIConsts } from "../shared/styles/variables";
import { VideoContainer as VideoScreen } from "../Camera/VideoContainer";
import { View, Text } from "react-native";
import { PublishNewVideoScreen } from "../Camera/PublishNewVideo";

interface BottomTabsProps {}

export const BottomTabs: React.FC<BottomTabsProps> = ({}) => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const myTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="challenges"
        tabBarOptions={{
          activeTintColor: "#4e22ee",
          style: { paddingBottom: 3 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="challenges"
          component={ChallengesScreen}
          options={{
            tabBarLabel: "My Challenges",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="controller-classic" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="camera"
          component={VideoScreen}
          options={{
            tabBarLabel: "take video",
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="camera" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    );
  };

  const MyStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="tabs"
          component={myTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Publish" component={PublishNewVideoScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer independent={true}>
      <MyStack />
    </NavigationContainer>
  );
};
