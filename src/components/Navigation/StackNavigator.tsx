import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoginContainer as LoginScreen } from "../Auth/LoginContainer";
import { NotLoggedInModal } from "../Auth/NotLoggedInModal";
import { RegisterContainer as RegisterScreen } from "../Auth/RegisterContainer";
import { ProfileScreen } from "../Profile/ProfileScreen";
import { ApproveVideo } from "../PublishVideo/ApproveVideo";
import { CameraScreen } from "../PublishVideo/CameraScreen";
import { postChallengeScreens } from "../PublishVideo/publishScreens";
import { PostsVideoDisplay } from "../shared/PostsVideoDisplay";
import { BottomTabs } from "./BottomTabs";
import { config } from "./stackNavigationConfig";

interface StackNavigatorProps {}

export const MainNavigator: React.FC<StackNavigatorProps> = ({}) => {
  const Stack = createStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={config}>
          <Stack.Screen
            name="tabs"
            component={BottomTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Sign up" }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Log in" }} />
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={{
              animationEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              headerTransparent: true,
              gestureEnabled: false,
            }}
          />

          <Stack.Screen
            name="NotLoggedIn"
            component={NotLoggedInModal}
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: "transparent" },
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              gestureResponseDistance: {
                vertical: Dimensions.get("screen").height,
              },
              gestureDirection: "vertical",
              gestureEnabled: true,
            }}
          />
          {/* <Stack.Screen name="PostReplies" component={PostReplies} options={{
          headerShown: false,
        }} /> */}

          <Stack.Screen
            name="VideoDisplay"
            component={PostsVideoDisplay}
            options={{
              headerShown: true,
              headerTitle: "",
              headerTransparent: true,
              cardStyle: { backgroundColor: "transparent" },
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="ProfileDisplay"
            component={ProfileScreen}
            options={{
              headerShown: true,
              headerTitle: "",
              headerTransparent: true,
              // cardStyle: { backgroundColor: Colors.darkBlue },
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureEnabled: false,
            }}
          />

          <Stack.Screen
            name="ApproveVideo"
            component={ApproveVideo}
            options={{
              headerShown: true,
              headerTitle: "",
              headerTransparent: true,
              cardStyle: { backgroundColor: "transparent" },
              cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
              gestureEnabled: false,
            }}
          />
          {postChallengeScreens.map(({ name, options, screen }) => (
            <Stack.Screen key={name} name={name} component={screen} options={{ gestureEnabled: false, ...options }} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
