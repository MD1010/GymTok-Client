import { useFocusEffect, useNavigation } from "@react-navigation/native";
import isEmpty from "lodash/isEmpty";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, StatusBar, Text, View, ViewabilityConfig, RefreshControl } from "react-native";
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
  // const playingVideoIndex = useRef(0);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [showFooter, setShowFooter] = useState<boolean>(false);
  const { hasMoreToFetch, error, latestFetchedPosts, userPosts } = useSelector(postsSelector);
  const posts: IPost[] = isFeed ? latestFetchedPosts : userPosts;
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  useEffect(() => {
    error && alert(JSON.stringify(error));
  }, [error]);

  useEffect(() => {
    if (posts) {
      setShowFooter(false);
      setRefreshing(false);
    }
  }, [posts]);

  useEffect(() => {
    navigation.setParams({ post: posts[currentlyPlaying] });
  }, [currentlyPlaying, posts]);

  const onRefresh = React.useCallback(async () => {
    console.log("refreshing!!!!");
    setRefreshing(true);
    getPosts();
  }, [refreshing]);

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

  useEffect(() => {
    if (currentVideoID && posts.length > 0) {
      console.log("currentID: " + currentVideoID);
      console.log("postfdfdfdf: " + posts);
      let wantedIndex = posts.findIndex((post) => post.video === currentVideoID);
      console.log("wnted index" + wantedIndex);
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
    }, [])
  );

  useEffect(() => {
    return () => {
      navigation.removeListener("blur", null);
      navigation.removeListener("focus", null);
    };
  }, []);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems[0]?.index === undefined) return;
    // playingVideoIndex.current = viewableItems[0]?.index;
    console.log("playing", viewableItems[0]?.index);
    scrollEnded.current && setCurrentlyPlaying(viewableItems[0]?.index);
  });

  const goIndex = (index: number) => {
    flatListRef.current.scrollToIndex({ animated: false, index: index });
  };

  const beginDarg = useCallback(() => (scrollEnded.current = false), []);
  const endDrag = useCallback(() => {
    scrollEnded.current = true;
  }, []);
  const keyExtractor = useCallback((challenge, i) => i.toString(), []);
  const viewHeight = useMemo(
    () => (isFeed ? Dimensions.get("window").height - UIConsts.bottomNavbarHeight : Dimensions.get("window").height),
    [isFeed]
  );
  const config = useRef<ViewabilityConfig>({
    itemVisiblePercentThreshold: 90,
    minimumViewTime: 150,
  });

  const itemLayout = useCallback(
    (_, index) => ({
      length: viewHeight,
      offset: viewHeight * index,
      index,
    }),
    []
  );

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
        isVisible={index === currentlyPlaying && !navigatedOutOfScreen}
        containerStyle={{ height: viewHeight }}
      />
    );
  };
  return (
    <>
      <View style={{ height: viewHeight, backgroundColor: Colors.black }}>
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          initialNumToRender={5}
          maxToRenderPerBatch={7}
          windowSize={7}
          data={posts}
          // snapToInterval={currentlyPlaying === posts.length - 1 ? null : viewHeight}
          pagingEnabled
          disableIntervalMomentum
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          getItemLayout={itemLayout}
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
          onScrollBeginDrag={beginDarg}
          onScrollEndDrag={endDrag}
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
