import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ChallengesContainer as ChallengesScreen } from "../Challenges/ChallengesContainer";
import { HomeScreen } from "../Home/Home";

interface BottomTabsProps {}

export const BottomTabs: React.FC<BottomTabsProps> = ({}) => {
  const Tab = createBottomTabNavigator();

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
    </Tab.Navigator>
  );
};
