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
import { AddButton } from "./AddButton";

interface BottomTabsProps {}

export const BottomTabs: React.FC<BottomTabsProps> = ({}) => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const myTabs = () => {
    return (
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
          name={"Upload"}
          component={LoginScreen}
          options={{
            tabBarIcon: ({ size }) => (
              <View style={{ marginTop: 115, marginLeft: 120 }}>
                <AddButton />
              </View>
            ),
            tabBarLabel: () => null,
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
