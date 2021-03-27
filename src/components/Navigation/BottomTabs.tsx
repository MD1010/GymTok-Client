import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Portal, Provider } from "react-native-paper";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/auth/authSlice";
import { AddButton } from "../Camera/AddButton";
import { HomeScreen } from "../Home/HomeScreen";
import { NotLoggedInScreen } from "../Auth/NotLoggedIn";
import { ProfileContainer as Profile } from "../Profile/ProfileContainer";
import { NotLoggedInModal } from "../Auth/NotLoggedInModal";
import { Colors, UIConsts } from "../shared/styles/variables";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native-animatable";

interface BottomTabsProps {}

export const BottomTabs: React.FC<BottomTabsProps> = ({}) => {
  const RequiredAuthModal = () => {
    const navigation = useNavigation();
    useEffect(() => {
      navigation.navigate("NotLoggedIn");
      setIsAddButtonClicked(false);
    }, []);
    return <AddButton setIsAddButtonClicked={setIsAddButtonClicked} />;
  };

  const Tab = createBottomTabNavigator();
  const { loggedUser } = useSelector(authSelector);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState<boolean>(false);

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
          }}
        />
        <Tab.Screen
          name="Leaderboards"
          component={
            loggedUser ? () => <HomeScreen /> : () => <NotLoggedInScreen text={"Leaderboards"} icon={"sadasd"} />
          }
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
          component={
            loggedUser ? () => <HomeScreen /> : () => <NotLoggedInScreen text={"Notifications"} icon={"sadasd"} />
          }
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
          component={Profile}
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
          <RequiredAuthModal />
        ) : (
          <AddButton setIsAddButtonClicked={setIsAddButtonClicked} />
        )}
      </Portal>
    </Provider>
  );
};
