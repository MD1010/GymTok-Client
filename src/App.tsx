import * as Expo from "expo";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { Provider, useDispatch } from "react-redux";
import { MainNavigator } from "./components/Navigation/StackNavigator";
import { loadLoggedUser } from "./store/auth/actions";
import { store } from "./store/configureStore";

function App() {
  useEffect(() => {
    store.dispatch(loadLoggedUser());
  }, []);
  return (
    <Provider store={store}>
      <StatusBar animated barStyle={"light-content"} />
      <MainNavigator />
    </Provider> 
  );
}

export default Expo.registerRootComponent(App);
