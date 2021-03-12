import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { Platform, Image } from "react-native";
import { Portal, Provider } from "react-native-paper";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/auth/authSlice";
import { AddButton } from "../Camera/AddButton";
import { HomeScreen } from "../Home/HomeScreen";
import { LoginContainer as LoginScreen } from "../Login/LoginContainer";
import { NotLoggedInScreen } from "../NotLoggedIn/NotLoggedIn";
import { AuthModal } from "../shared/AuthModal";
import { Colors, UIConsts } from "../shared/styles/variables";

interface BottomTabsProps { }

export const BottomTabs: React.FC<BottomTabsProps> = ({ }) => {
  const Tab = createBottomTabNavigator();
  const { loggedUser } = useSelector(authSelector);
  const [isAddButtonClicked, setIsAddButtonCLicked] = useState<boolean>(false);

  return (
    <Provider>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: Colors.cyan,
          activeBackgroundColor: Colors.darkBlue,
          inactiveTintColor: Colors.white,
          showLabel: false,
          style: {
            height: UIConsts.bottomNavbarHeight,
            borderTopWidth: 0,
            backgroundColor: Colors.darkBlue,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Ionicons name="md-home-sharp" color={color} size={size} />
              ) : (
                  <Ionicons name="md-home-outline" color={color} size={size} />
                ),
            // <Image
            //   style={{ width: 35, height: 35, tintColor: color }}
            //   resizeMode={"contain"}
            //   source={require("../../../assets/icons/home.png")}
            // ></Image>
          }}
        />
        <Tab.Screen
          name="Leaderboards"
          component={loggedUser ? () => <HomeScreen /> : () => <NotLoggedInScreen text={"Leaderboards"} icon={"sadasd"} />}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Ionicons name="trophy-sharp" color={color} size={size} style={{ marginRight: 50 }} />
              ) : (
                  <Ionicons name="trophy-outline" color={color} size={size} style={{ marginRight: 50 }} />
                ),
          }}
        />

        <Tab.Screen
          name="Notifications"
          component={loggedUser ? () => <Home /> : () => <NotLoggedInScreen text={"Notifications"} icon={"sadasd"} />}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Ionicons
                  name={"notifications-sharp"}
                  color={color}
                  size={size}
                  style={{
                    marginLeft: 50,
                  }}
                />
              ) : (
                  <Ionicons
                    name={"notifications-outline"}
                    color={color}
                    size={size}
                    style={{
                      marginLeft: 50,
                    }}
                  />
                ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Me"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Ionicons name="person-sharp" color={color} size={size} />
              ) : (
                  <Ionicons name="person-outline" color={color} size={size} />
                ),
          }}
        />
      </Tab.Navigator>
      <Portal>
        {!loggedUser && isAddButtonClicked ? (
          <AuthModal close={() => setIsAddButtonCLicked(false)} />
        ) : (
            <AddButton isAddButtonClicked={isAddButtonClicked} setIsAddButtonCLicked={setIsAddButtonCLicked} />
          )}
      </Portal>
    </Provider>
  );
};
