import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Expo from "expo";
import * as React from "react";
import { Provider } from "react-redux";
import { BottomTabs } from "./components/Tabs/BottomTabs";
import { store } from "./store/configureStore";

const Stack = createStackNavigator();

function App() {
  return (
    <>
      {/* <GlobalResetStyles /> */}
      <Provider store={store}>
        <NavigationContainer>
          {/* <Stack.Navigator initialRouteName="challenges">
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
            <Stack.Screen name="challenges" component={ChallengesScreen} />
          </Stack.Navigator> */}
          <BottomTabs />
        </NavigationContainer>
      </Provider>
    </>
  );
}

export default Expo.registerRootComponent(App);
