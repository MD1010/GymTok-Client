import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { IconButton, Provider } from "react-native-paper";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/auth/authSlice";
import { NotLoggedInScreen } from "../Auth/NotLoggedInScreen";
import { HomeScreen } from "../Home/HomeScreen";
import { ExploreScreen } from "../Explore/ExploreScreen";
import { ProfileContainer as Profile } from "../Profile/ProfileContainer";
import { Colors, UIConsts } from "../shared/styles/variables";
import { colors } from "react-native-elements";

interface BottomTabsProps {}

const EmptyTab = () => null;

export const BottomTabs: React.FC<BottomTabsProps> = ({}) => {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const { loggedUser } = useSelector(authSelector);

  return (
    <Provider>
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior={"initialRoute"}
        sceneContainerStyle={{ backgroundColor: Colors.black }}
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
              ? () => <ExploreScreen />
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
                <Ionicons name="search-sharp" color={color} size={size} />
              ) : (
                <Ionicons name="search-outline" color={color} size={size} />
              ),
          }}
        />

        <Tab.Screen
          name="UploadPost"
          component={EmptyTab}
          options={({ navigation }) => {
            return {
              tabBarButton: () => (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    bottom: 20,
                  }}
                >
                  <IconButton
                    style={{ backgroundColor: Colors.lightPurpule }}
                    color={Colors.white}
                    size={40}
                    icon={() => <FontAwesome5 name="plus" size={20} color={Colors.white} />}
                    onPress={() => {
                      navigation.navigate("Camera");
                    }}
                  ></IconButton>
                </View>
              ),
            };
          }}
        />

        <Tab.Screen
          name="Notifications"
          component={
            loggedUser
              ? () => <View></View>
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
                <Ionicons name={"notifications-sharp"} color={color} size={size} />
              ) : (
                <Ionicons name={"notifications-outline"} color={color} size={size} />
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
    </Provider>
  );
};
