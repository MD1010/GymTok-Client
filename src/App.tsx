import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Expo from "expo";
import * as React from "react";
import { Provider } from "react-redux";
import { ChallengesContainer as ChallengesScreen } from "./components/Challenges/ChallengesContainer";
import { HomeScreen } from "./components/Home/Home";
import { LoginContainer as LoginScreen } from "./components/Login/LoginContainer";
import { RegisterScreen } from "./components/Register/Register";
import { store } from "./store/configureStore";

const Stack = createStackNavigator();

function App() {
  return (
    <>
      {/* <S.GlobalResetStyles /> */}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="challenges">
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
            <Stack.Screen name="challenges" component={ChallengesScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

export default Expo.registerRootComponent(App);
