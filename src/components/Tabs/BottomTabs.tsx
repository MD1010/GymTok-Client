import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { HomeContainer as Home } from "../Home/HomeContainer";

interface BottomTabsProps {}

export const BottomTabs: React.FC<BottomTabsProps> = ({}) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#ffd700",
        activeBackgroundColor: "#14192c",
        inactiveBackgroundColor: "#14192c",
        inactiveTintColor: "white",
        labelStyle: { bottom: 8 },
        style: { height: 60, borderTopWidth: 0, backgroundColor: "#14192c" },
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
              size={size}
              color={"white"}
              selectionColor={"white"}
              style={{ left: 5, backgroundColor: "#4F33FF", borderRadius: 5, padding: 15 }}
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
