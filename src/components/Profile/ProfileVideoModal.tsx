import React, { useEffect, useState } from "react";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/stack";
import { PostsList } from "../Posts/PostsList";
import { useSelector } from "react-redux";
import { postsSelector } from "../../store/posts/postsSlice";

export const PostsVideoDisplay: React.FC = () => {
  const route = useRoute<any>();
  const headerHeight = useHeaderHeight();
  const { hasMoreToFetch, error, latestFetchedPosts, userPosts } = useSelector(postsSelector);
  const [currentItems, setCurrentItems] = useState<any>();

  useEffect(() => {
    let tempArr = [...route.params.posts];
    for (let i = 0; i < tempArr.length; i++) {
      for (let j = 0; j < latestFetchedPosts.length; j++) {
        if (tempArr[i]._id === latestFetchedPosts[j]._id) {
          console.log("fount liked post!!!!");
          console.log(tempArr[i].likes.length);
          console.log(latestFetchedPosts[j].likes.length);
          tempArr[i] = { ...latestFetchedPosts[j] };
          console.log(tempArr[i].likes.length);
        }
      }
    }
    setCurrentItems(tempArr);
  }, [route.params.posts, latestFetchedPosts]);

  // todo Dov modify postlist to display correct index
  return (
    <View style={styles.modalView}>
      <PostsList
        isFeed={false}
        currentPosts={currentItems}
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
