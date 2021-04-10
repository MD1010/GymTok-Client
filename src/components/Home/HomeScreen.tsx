import React, { useCallback, useEffect, useState } from "react";
import { IPost } from "../../interfaces";
import { PostsList } from '../Posts/PostsList'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { PostReplies } from "../Replies/PostReplies";
import { useFocusEffect, useNavigation } from "@react-navigation/core";

const Tab = createMaterialTopTabNavigator();
// const Stack = createStackNavigator();
const PostListComponent = props => {
  return <PostsList isFeed {...props} />
}

const PostRepliesComponent = props => {
  return <PostReplies {...props} />
}

export const HomeScreen: React.FC = () => {
  const Null = () => null;

  return (
    <Tab.Navigator tabBar={Null} >
      <Tab.Screen name="Home" component={PostListComponent} />
      <Tab.Screen name="Replies" component={PostRepliesComponent} />
    </Tab.Navigator >
  )
};
