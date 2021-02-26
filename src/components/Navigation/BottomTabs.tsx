import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HomeContainer as Home } from "../Home/HomeContainer";
import { LoginScreen } from "../Login/Login";
import { Colors, UIConsts } from "../shared/styles/variables";
import { View, Text, Platform } from "react-native";
import { PublishNewVideoScreen } from "../Camera/PublishNewVideo";
import { AddButton } from "../Camera/AddButton";
import { Portal, FAB, Provider } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";

interface BottomTabsProps {}

export const BottomTabs: React.FC<BottomTabsProps> = ({}) => {
  const Tab = createBottomTabNavigator();

  return (
    <Provider>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: Colors.yellow,
          activeBackgroundColor: Colors.darkBlue,
          inactiveBackgroundColor: Colors.darkBlue,
          inactiveTintColor: Colors.white,
          showLabel: false,
          style: {
            height: UIConsts.bottomNavbarHeight,
            borderTopWidth: 0,
            backgroundColor: Colors.darkBlue,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Leaderboards"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="trophy" color={color} size={size} style={{ marginRight: 50 }} />
            ),
          }}
        />

        <Tab.Screen
          name="Upload"
          component={() => {
            return null;
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="trophy" color={color} size={size} style={{ marginRight: 50 }} />
            ),
          }}
        />

        <Tab.Screen
          name="Notifications"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-notifications" : "ios-notifications"}
                color={color}
                size={size}
                style={{
                  marginLeft: 50,
                }}
              />
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Me"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-alt" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
      <TouchableWithoutFeedback style={{ marginRight: 200 }}>
        <Portal>
          {/* <FAB
          visible={true}
          icon={"feather"}
          style={{
            position: "absolute",
            bottom: 100,
            right: 16,
          }}
          onPress={() => alert("fdfdfd")}
          color="white"
        /> */}
          <AddButton />
        </Portal>
      </TouchableWithoutFeedback>
    </Provider>
  );
};
