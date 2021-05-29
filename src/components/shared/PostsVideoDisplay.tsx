import React, { useEffect, useState } from "react";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/stack";
import { PostsList } from "../Posts/PostsList";
import { useSelector } from "react-redux";
import { postsSelector } from "../../store/posts/postsSlice";

export const PostsVideoDisplay: React.FC = () => {
  const route = useRoute<any>();
  // useEffect(() => {
  //   console.log("new posts in post video display", route.params.posts[1].likes.length ?? 0);
  // }, [route.params.posts[1].likes.length]);

  // todo Dov modify postlist to display correct index
  return (
    <View style={styles.modalView}>
      <PostsList
        isFeed={false}
        currentPosts={route.params.posts}
        isLoadMore={false}
        initialPostIndex={route.params?.initialIndex}
        isOriginal={route.params?.isOriginal}
        // updateAllPosts={route.params?.updateAllPosts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: Dimensions.get("window").height,
  },
});
