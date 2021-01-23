import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Expo from "expo";
import * as React from "react";
import { Text, View } from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import HomeScreen from "./components/Home/home";
import LoginScreen from "./components/Login/login";
import { setNavigator } from "./navigationRef";
import RegisterScreen from "./screens/RegisterScreen";
import store from "./store";

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      >
        <Stack.Navigator>
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Expo.registerRootComponent(App);
