import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { PostsList } from "../Posts/PostsList";
import { PostReplies } from "../Replies/PostReplies";

const Tab = createMaterialTopTabNavigator();
// const Stack = createStackNavigator();
const PostListComponent = (props) => {
  return <PostsList isFeed {...props} />;
};

const PostRepliesComponent = (props) => {
  return <PostReplies {...props} />;
};

export const HomeScreen: React.FC = () => {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  const navigation = useNavigation();
  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      navigation.navigate("Notifications");
    }
  }, [lastNotificationResponse]);

  const Null = () => null;
  return (
    <Tab.Navigator tabBar={Null}>
      <Tab.Screen name="Home" component={PostListComponent} />
      <Tab.Screen name="PostReplies" component={PostRepliesComponent} />
    </Tab.Navigator>
  );
};
