import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Expo from "expo";
import * as React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { AddButton } from "./components/Camera/AddButton";
import { BottomTabs } from "./components/Navigation/BottomTabs";
import { StackNavigator } from "./components/Navigation/StackNavigator";
import { store } from "./store/configureStore";

function App() {
  return (
    <>
      {/* <GlobalResetStyles /> */}
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </>
  );
}

export default Expo.registerRootComponent(App);
