import React, { useEffect } from "react";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/stack";
import { PostsList } from "../Posts/PostsList";

export const PostsVideoDisplay: React.FC = () => {
  const route = useRoute<any>();
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    if (route.params.postID) {
      console.log("video dov 123: " + route.params.postID);
    }
  }, [route.params]);
  // todo Dov modify postlist to display correct index
  return (
    <View style={styles.modalView}>
      <PostsList
        isFeed={false}
        currentPosts={route.params?.posts}
        isLoadMore={false}
        initialPostIndex={route.params?.initialIndex}
      />
      {/* <ChallengesContainer
        currentVideoID={route.params.videoURL?.split("/")[3]}
        getOnlyUserChallenges={true}
        containerStyle={{ height: Dimensions.get("window").height }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: Dimensions.get("window").height,
  },
});
