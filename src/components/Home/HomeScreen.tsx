import React, { useCallback, useEffect, useRef, useState } from "react";
import { IPost } from "../../interfaces";
import { PostsList } from "../Posts/PostsList";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PostReplies } from "../Replies/PostReplies";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { postsActions, postsSelector } from "../../store/posts/postsSlice";
import { displayNotificationPost } from "../../store/posts/actions";
import { notificationsActions } from "../../store/notifications/notificationsSlice";
import { INotification } from "../../interfaces/Notification";

const Tab = createMaterialTopTabNavigator();
// const Stack = createStackNavigator();
const PostListComponent = (props) => {
  return <PostsList isFeed {...props} />;
};

const PostRepliesComponent = (props) => {
  return <PostReplies {...props} />;
};

export const HomeScreen: React.FC = () => {
  // const lastNotificationResponse = Notifications.useLastNotificationResponse();
  // const dispatch = useDispatch();
  // const posts = useSelector(postsSelector);
  // const receivedPushNotification = useRef(false);
  // useEffect(() => {
  //   if (
  //     lastNotificationResponse &&
  //     posts.latestFetchedPosts.length &&
  //     !receivedPushNotification.current &&
  //     lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
  //   ) {
  //     const {
  //       notification: { request },
  //     } = lastNotificationResponse;
  //     const post: any = request.content.data;
  //     const { data, body, title } = request.content;
  //     const { _id, date, sender, ...props } = data as any;
  //     const notificationReceived: INotification = {
  //       _id,
  //       body,
  //       title,
  //       data: props,
  //       date,
  //       sender,
  //       isRead: false,
  //     };
  //     dispatch(notificationsActions.markNotificationReadSuccess(notificationReceived));
  //     dispatch(postsActions.displayNotificationPost(post));
  //     receivedPushNotification.current = true;
  //   }
  // }, [posts.latestFetchedPosts]);

  const Null = () => null;
  return (
    <Tab.Navigator tabBar={Null}>
      <Tab.Screen name="Home" component={PostListComponent} />
      <Tab.Screen name="PostReplies" component={PostRepliesComponent} />
    </Tab.Navigator>
  );
};
