import { createStackNavigator } from "@react-navigation/stack";

import { PublishNewVideoScreen } from "../Camera/PublishNewVideo";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabs } from "./BottomTabs";
import { AddButton } from "../Camera/AddButton";
import { UIConsts } from "../shared/styles/variables";
import { Colors } from "../shared/styles/variables";

interface StackNavigatorProps {}

export const StackNavigator: React.FC<StackNavigatorProps> = ({}) => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="tabs"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Publish"
          component={PublishNewVideoScreen}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: Colors.darkBlue,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
