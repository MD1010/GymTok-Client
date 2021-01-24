import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Expo from "expo";
import * as React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { HomeScreen } from "./components/Home/home";
import { LoginContainer } from "./components/Login/login.container";
import { RegisterScreen } from "./components/Register/register";
import { store } from "./store/configureStore";

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="login" component={LoginContainer} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Expo.registerRootComponent(App);
