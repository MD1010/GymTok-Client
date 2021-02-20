import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { HomeContainer as Home } from "../Home/HomeContainer";
import { Colors, UIConsts } from "../shared/styles/variables";

interface BottomTabsProps {}

export const BottomTabs: React.FC<BottomTabsProps> = ({}) => {
  const Tab = createBottomTabNavigator();

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
        component={Home}
        options={{
          tabBarLabel: "Leaderboards",
          tabBarIcon: ({ color, size }) => <Ionicons name="trophy" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={"Upload"}
        component={Home}
        options={{
          tabBarIcon: ({ size }) => (
            <AntDesign
              name="plus"
              color={"white"}
              size={30}
              style={{
                left: 5,
                backgroundColor: Colors.lightPurpule,
                borderRadius: 7,
                padding: 15,
              }}
            />
          ),
          tabBarLabel: () => null,
        }}
      />

      <Tab.Screen
        name="Inbox"
        component={Home}
        options={{
          tabBarLabel: "Inbox",
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="envelope" color={color} size={size} />,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Me"
        component={Home}
        options={{
          tabBarLabel: "Me",
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-alt" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
