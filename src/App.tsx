import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Expo from "expo";
import * as React from "react";
import { createRef } from "react";
import { Provider } from "react-redux";
import { HomeScreen } from "./components/Home/home";
import { LoginContainer } from "./components/Login/login.container";
import { RegisterContainer } from "./components/Register/register.container";
import { store } from "./store/configureStore";

const Stack = createStackNavigator();
export const navigationRef = createRef<NavigationContainerRef>();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="login" component={LoginContainer} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="register" component={RegisterContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Expo.registerRootComponent(App);
