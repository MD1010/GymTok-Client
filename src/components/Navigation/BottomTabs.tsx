import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, View } from "react-native";
import { Portal, Provider } from "react-native-paper";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/auth/authSlice";
import { NotLoggedInScreen } from "../Auth/NotLoggedInScreen";
import { CameraScreen } from "../PublishVideo/CameraScreen";
import { HomeScreen } from "../Home/HomeScreen";
import { ProfileContainer as Profile } from "../Profile/ProfileContainer";
import { Colors, UIConsts } from "../shared/styles/variables";

interface BottomTabsProps {}

export const BottomTabs: React.FC<BottomTabsProps> = ({}) => {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const { loggedUser } = useSelector(authSelector);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Home");
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

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
          // listeners={({ navigation, route }) => ({
          //   tabPress: (e) => {
          //     isHomeTabActive.current = true;
          //   },
          // })}
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Ionicons name="home-sharp" color={color} size={size} />
              ) : (
                <Ionicons name="home-outline" color={color} size={size} />
              ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={
            loggedUser
              ? () => <HomeScreen />
              : () => (
                  <NotLoggedInScreen
                    text={"Explore"}
                    description={"Discover Challenges By Categories"}
                    icon={() => <Ionicons name="search-outline" color={Colors.white} size={56} />}
                  />
                )
          }
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Ionicons name="search-sharp" color={color} size={size} style={{ marginRight: 50 }} />
              ) : (
                <Ionicons name="search-outline" color={color} size={size} style={{ marginRight: 50 }} />
              ),
          }}
        />

        <Tab.Screen
          name="New"
          component={
            loggedUser
              ? () => <CameraScreen />
              : () => (
                  <NotLoggedInScreen
                    text={"Explore"}
                    description={"Discover Challenges By Categories"}
                    icon={() => <Ionicons name="search-outline" color={Colors.white} size={56} />}
                  />
                )
          }
          options={{
            tabBarVisible: false,
            unmountOnBlur: true,
            tabBarIcon: ({ color, size, focused }) =>
              !focused && (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: color,
                    alignItems: "center",
                    justifyContent: "center",
                    width: 60,
                    height: 60,
                    backgroundColor: "#4B0082",
                    borderRadius: 50,
                  }}
                >
                  <Ionicons name="camera-outline" color={color} size={50} />
                </View>
              ),
          }}
        />

        <Tab.Screen
          name="Notifications"
          component={
            loggedUser
              ? () => <HomeScreen />
              : () => (
                  <NotLoggedInScreen
                    text={"Notifications"}
                    description={"See your activity and new challenges here"}
                    icon={() => <Ionicons name="notifications-sharp" color={Colors.white} size={56} />}
                  />
                )
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
          component={
            loggedUser
              ? () => <Profile />
              : () => (
                  <NotLoggedInScreen
                    text={"Profile"}
                    description={"Sign up for an account"}
                    icon={() => <Ionicons name="md-person-outline" color={Colors.white} size={56} />}
                  />
                )
          }
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
    </Provider>
  );
};
