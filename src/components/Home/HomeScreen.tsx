import React, { useCallback, useEffect, useRef, useState } from "react";
import { IPost } from "../../interfaces";
import { PostsList } from "../Posts/PostsList";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PostReplies } from "../Replies/PostReplies";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { postsSelector } from "../../store/posts/postsSlice";
import { displayNotificationPost } from "../../store/posts/actions";

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
  const dispatch = useDispatch();
  const posts = useSelector(postsSelector);
  const redirectedToNotification = useRef(false);
  // !! todo add logic to reset redirectedToNotification or the further notifications wont be displayed!!!!!
  useEffect(() => {
    // if (
    //   lastNotificationResponse &&
    //   posts.latestFetchedPosts.length &&
    //   lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER &&
    //   !redirectedToNotification.current
    // ) {
    //   console.log("from notification", lastNotificationResponse.notification);
    //   dispatch(displayNotificationPost(posts.latestFetchedPosts[3]));
    //   redirectedToNotification.current = true;
    // }
    if (
      lastNotificationResponse &&
      lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      console.log("!!", posts.latestFetchedPosts);

      let post: IPost = {
        _id: "123",
        createdBy: { _id: "123", email: "sad", fullName: "asd", image: "", username: "dorbuch" },
        description: "Nothing",
        gif: "asd",
        hashtags: [],
        isReply: false,
        likes: ["asdasd"],
        replies: ["123"],
        taggedUsers: [],
        videoURI: "fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
      };
      // navigation.navigate("Notifications");
      navigation.navigate("VideoDisplay", { posts: [post] });
      redirectedToNotification.current = true;
    }
  }, [posts]);

  const Null = () => null;
  return (
    <Tab.Navigator tabBar={Null}>
      <Tab.Screen name="Home" component={PostListComponent} />
      <Tab.Screen name="PostReplies" component={PostRepliesComponent} />
    </Tab.Navigator>
  );
};
