import * as Expo from "expo";
import * as React from "react";
import { Provider } from "react-redux";
import { StackNavigator } from "./components/Navigation/StackNavigator";
import { store } from "./store/configureStore";

function App() {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}

export default Expo.registerRootComponent(App);
