import React, { useCallback, useEffect, useState } from "react";
import { IPost } from "../../interfaces";
import { PostsList } from "../Posts/PostsList";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PostReplies } from "../Replies/PostReplies";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";

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
    lastNotificationResponse && navigation.navigate("Me");
  }, [lastNotificationResponse]);

  const Null = () => null;

  return (
    <Tab.Navigator tabBar={Null}>
      <Tab.Screen name="Home" component={PostListComponent} />
      <Tab.Screen name="PostReplies" component={PostRepliesComponent} />
    </Tab.Navigator>
  );
};
