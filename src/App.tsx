import * as Expo from "expo";
import React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { StackNavigator } from "./components/Navigation/StackNavigator";
import { store } from "./store/configureStore";

function App() {
  return (
    <Provider store={store}>
      <StatusBar animated />
      <StackNavigator />
    </Provider>
  );
}

export default Expo.registerRootComponent(App);
