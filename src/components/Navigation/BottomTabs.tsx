import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, Image } from "react-native";
import { Portal, Provider } from "react-native-paper";
import { AddButton } from "../Camera/AddButton";
import { HomeContainer as Home } from "../Home/HomeContainer";
import { LoginScreen } from "../Login/Login";
import { Colors, UIConsts } from "../shared/styles/variables";

interface BottomTabsProps {}

export const BottomTabs: React.FC<BottomTabsProps> = ({}) => {
  const Tab = createBottomTabNavigator();

  return (
    <Provider>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: Colors.cyan,
          activeBackgroundColor: Colors.darkBlue,
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
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Ionicons name="md-home-sharp" color={color} size={size} />
              ) : (
                <Ionicons name="md-home-outline" color={color} size={size} />
              ),
            // <Image
            //   style={{ width: 35, height: 35, tintColor: color }}
            //   resizeMode={"contain"}
            //   source={require("../../../assets/icons/home.png")}
            // ></Image>
          }}
        />
        <Tab.Screen
          name="Leaderboards"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Ionicons name="trophy-sharp" color={color} size={size} style={{ marginRight: 50 }} />
              ) : (
                <Ionicons name="trophy-outline" color={color} size={size} style={{ marginRight: 50 }} />
              ),
          }}
        />

        <Tab.Screen
          name="Notifications"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Ionicons
                  name={"notifications-sharp"}
                  color={color}
                  size={size}
                  style={{
                    marginLeft: 50,
                  }}
                />
              ) : (
                <Ionicons
                  name={"notifications-outline"}
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
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Ionicons name="person-sharp" color={color} size={size} />
              ) : (
                <Ionicons name="person-outline" color={color} size={size} />
              ),
          }}
        />
      </Tab.Navigator>

      <Portal>
        <AddButton />
      </Portal>
    </Provider>
  );
};
