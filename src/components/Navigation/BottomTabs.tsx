import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";
import { Portal, Provider } from "react-native-paper";
import { AddButton } from "../Camera/AddButton";
import { HomeContainer as Home } from "../Home/HomeContainer";
import { LoginContainer as LoginScreen } from "../Login/LoginContainer";
import { Colors, UIConsts } from "../shared/styles/variables";

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

      <Portal>
        <AddButton />
      </Portal>
    </Provider>
  );
};
