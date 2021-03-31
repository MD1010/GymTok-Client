import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Dimensions } from "react-native";
import { LoginContainer as LoginScreen } from "../Auth/LoginContainer";
import { NotLoggedInModal } from "../Auth/NotLoggedInModal";
import { RegisterContainer as RegisterScreen } from "../Auth/RegisterContainer";
import { PublishNewVideoScreen } from "../Camera/PublishNewVideo";
import { Colors } from "../shared/styles/variables";
import { BottomTabs } from "./BottomTabs";

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
            borderWidth: 0,
          },
          headerStyle: {
            backgroundColor: Colors.darkBlueOpaque,
            borderBottomWidth: 0.3,
            // elevation: 0,
          },
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureResponseDistance: { vertical: Dimensions.get("screen").width },
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
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Sign up" }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Log in" }} />
        <Stack.Screen
          name="NotLoggedIn"
          component={NotLoggedInModal}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: "transparent" },
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            safeAreaInsets: { top: Dimensions.get("screen").width / 2 },
            gestureResponseDistance: { vertical: Dimensions.get("screen").height },
            gestureDirection: "vertical",
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
