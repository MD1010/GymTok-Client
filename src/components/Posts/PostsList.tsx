import { useFocusEffect, useNavigation } from "@react-navigation/native";
import isEmpty from "lodash/isEmpty";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { IPost } from "../../interfaces/Post";
import { authSelector } from "../../store/auth/authSlice";
import { getMorePosts, getMostRecommended, getUserPosts } from "../../store/posts/actions";
import { postsSelector } from "../../store/posts/postsSlice";
import { Loader } from "../shared";
import { Colors, UIConsts } from "../shared/styles/variables";
import { Post } from "./Post";

interface PostsListProps {
  /**
   *  in home page isFeed is true, else it is false
   */
  isFeed?: boolean;
  currentVideoID?: string;
}

export const PostsList: React.FC<PostsListProps> = memo(({ isFeed, currentVideoID }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [navigatedOutOfScreen, setNavigatedOutOfScreen] = useState<boolean>(false);
  const { loggedUser } = useSelector(authSelector);
  const scrollEnded = useRef<boolean>(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);
  const [showFooter, setShowFooter] = useState<boolean>(false);
  const { hasMoreToFetch, error, latestFetchedPosts, userPosts } = useSelector(postsSelector);
  const posts: IPost[] = isFeed ? latestFetchedPosts : userPosts;

  useEffect(() => {
    error && alert(JSON.stringify(error));
  }, [error]);

  useEffect(() => {
    posts && setShowFooter(false);
  }, [posts]);

  const getPosts = () => {
    if (loggedUser) {
      isFeed ? dispatch(getMostRecommended()) : dispatch(getUserPosts());
    } else {
      // loggedUser is null -> didnt log in yet
      dispatch(getMorePosts());
    }
  };
  useEffect(() => {
    // check if user was loaded - undefinded means the store has not been updated yet.
    if (loggedUser !== undefined) {
      isEmpty(posts) && getPosts();
    }
  }, [loggedUser]);

  // todo Dov
  useEffect(() => {
    if (currentVideoID && posts.length > 0) {
      // console.log("video idddddddddddddd: " + currentVideoID);
      // console.log("postssss lengthhhhhh: " + posts.length);
      let wantedIndex = posts.findIndex((post) => post.video === currentVideoID);
      // console.log("wanteddddd indexxxxx: " + wantedIndex);
      goIndex(wantedIndex);
    }
  }, [posts, currentVideoID]);

  useFocusEffect(
    React.useCallback(() => {
      navigation.addListener("blur", () => {
        setNavigatedOutOfScreen(true);
      });
      navigation.addListener("focus", () => {
        setNavigatedOutOfScreen(false);
      });

      return () => {
        navigation.removeListener("blur", null);
        navigation.removeListener("focus", null);
      };
    }, [])
  );

  const onViewRef = useRef(({ viewableItems }) => {
    scrollEnded.current && setCurrentlyPlaying(viewableItems[0]?.index);
  });

  const goIndex = (index: number) => {
    flatListRef.current.scrollToIndex({ animated: false, index: index });
  };

  const beginDarg = useCallback(() => (scrollEnded.current = false), []);
  const endDrag = useCallback(() => (scrollEnded.current = true), []);
  const keyExtractor = useCallback((challenge, i) => challenge._id, []);
  const snapToInterval = useMemo(
    () => (isFeed ? Dimensions.get("window").height - UIConsts.bottomNavbarHeight : Dimensions.get("window").height),
    [isFeed]
  );
  const config = useRef({
    viewAreaCoveragePercentThreshold: 100,
  });

  const Footer = () => {
    if (posts.length) {
      if (hasMoreToFetch) {
        return <Loader style={{ height: 100, width: 100 }} />;
      } else {
        return <Text style={{ color: Colors.lightGrey2, fontSize: 15 }}>You have reached the end</Text>;
      }
    }
    return null;
  };

  const handleLoadMore = () => {
    setShowFooter(true);
    hasMoreToFetch && getPosts();
  };

  const renderItem = ({ item, index }) => {
    return (
      <Post
        post={item}
        isVideoPlaying={index === currentlyPlaying && !navigatedOutOfScreen}
        containerStyle={isFeed && { height: Dimensions.get("window").height - UIConsts.bottomNavbarHeight }}
      />
    );
  };
  return (
    <>
      <View style={{ flex: 1 }}>
        <FlatList
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={7}
          data={posts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          snapToInterval={snapToInterval}
          snapToAlignment={"start"}
          decelerationRate={"fast"}
          ref={(ref) => {
            flatListRef.current = ref;
          }}
          onScrollToIndexFailed={(error) => {
            flatListRef.current.scrollToOffset({ offset: error.averageItemLength * error.index, animated: true });
            setTimeout(() => {
              if (posts.length !== 0 && flatListRef.current !== null) {
                flatListRef.current.scrollToIndex({ index: error.index, animated: true });
              }
            }, 0);
          }}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={config.current}
          onScrollEndDrag={endDrag}
          onScrollBeginDrag={beginDarg}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={showFooter ? <Footer /> : null}
          ListFooterComponentStyle={{
            height: 80,
            backgroundColor: Colors.darkBlueOpaque,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></FlatList>
      </View>
    </>
  );
});
