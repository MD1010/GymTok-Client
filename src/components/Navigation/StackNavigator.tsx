import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import { PublishNewVideoScreen } from "../Camera/PublishNewVideo";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabs } from "./BottomTabs";
import { AddButton } from "../Camera/AddButton";
import { LoginContainer as LoginScreen } from "../Login/LoginContainer";
import { RegisterContainer as RegisterScreen } from "../Register/RegisterContainer";
import { UIConsts } from "../shared/styles/variables";
import { Colors } from "../shared/styles/variables";

interface StackNavigatorProps {}

export const StackNavigator: React.FC<StackNavigatorProps> = ({}) => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
          headerStyle: {
            backgroundColor: Colors.darkBlue,
          },
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen
          name="tabs"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Publish" component={PublishNewVideoScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Log in" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
