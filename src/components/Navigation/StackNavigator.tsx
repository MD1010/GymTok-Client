import { createStackNavigator } from "@react-navigation/stack";

import { PublishNewVideoScreen } from "../Camera/PublishNewVideo";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabs } from "./BottomTabs";
import { AddButton } from "../Camera/AddButton";
import { RegisterScreen } from "../Register/register";

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
        <Stack.Screen name="Publish" component={PublishNewVideoScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
