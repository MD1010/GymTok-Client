import { useFocusEffect, useNavigation } from "@react-navigation/native";
import isEmpty from "lodash/isEmpty";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, Text, View, ViewabilityConfig, RefreshControl, InteractionManager } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { IPost } from "../../interfaces/Post";
import { authSelector } from "../../store/auth/authSlice";
import { getLatestPosts, getMorePosts, getMostRecommended, getUserPosts } from "../../store/posts/actions";
import { postsSelector } from "../../store/posts/postsSlice";
import { Loader } from "../shared";
import { Colors, UIConsts } from "../shared/styles/variables";
import { Post } from "./Post";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

interface PostsListProps {
  /**
userPosts   *  in home page isFeed is true, else it is false
   */
  isFeed?: boolean;
  currentPosts?: IPost[];
  isLoadMore?: boolean;
  initialPostIndex?: number;
}

export const PostsList: React.FC<PostsListProps> = memo(({ isFeed, currentPosts, isLoadMore, initialPostIndex }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [navigatedOutOfScreen, setNavigatedOutOfScreen] = useState<boolean>(false);
  const { loggedUser } = useSelector(authSelector);
  const scrollEnded = useRef<boolean>(false);
  // const playingVideoIndex = useRef(0);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(initialPostIndex || 0);
  const flatListRef = useRef<FlatList>(null);
  const [showFooter, setShowFooter] = useState<boolean>(false);

  const { hasMoreToFetch, error, latestFetchedPosts, userPosts } = useSelector(postsSelector);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const posts: IPost[] = currentPosts ? currentPosts : isFeed ? latestFetchedPosts : userPosts;
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const loadMore: boolean = isLoadMore !== undefined ? isLoadMore : true;
  const bottomTabsHeight = useBottomTabBarHeight();

  useEffect(() => {
    error && alert(JSON.stringify(error));
  }, [error]);

  useEffect(() => {
    setPosts(currentPosts ? currentPosts : isFeed ? latestFetchedPosts : userPosts);
    setIsLoading(false);
  }, [currentPosts, isFeed, latestFetchedPosts, userPosts]);

  useEffect(() => {
    if (posts) {
      setShowFooter(false);
      setRefreshing(false);
    } else {
      setShowFooter(true);
    }
  }, [posts]);

  // useEffect(() => {
  //   console.log("first time");
  //   setShowFooter(true);
  // }, []);
  useEffect(() => {
    navigation.setParams({ post: posts[currentlyPlaying] });
  }, [currentlyPlaying, posts]);

  const onRefresh = React.useCallback(async () => {
    console.log("refreshing!!!!");
    setRefreshing(true);
    dispatch(getLatestPosts());
    //setRefreshing(false);
  }, [refreshing]);

  const getPosts = () => {
    if (loggedUser) {
      isFeed ? dispatch(getMostRecommended()) : dispatch(getUserPosts());
    } else {
      console.log("getting more posts because user is null");
      // loggedUser is null -> didnt log in yet
      dispatch(getMorePosts());
    }
  };
  useEffect(() => {
    // check if user was loaded - undefinded means the store has not been updated yet.
    if (loggedUser !== undefined) {
      console.log("loading...");
      setIsLoading(true);
      isEmpty(posts) && getPosts();
    }

    // getPosts();
  }, [loggedUser]);

  // useEffect(() => {
  //   if (currentPosts !== undefined) {
  //     for (let i = 0; i < posts.length; i++) {
  //       for (let j = 0; j < latestFetchedPosts.length; j++) {
  //         if (posts[i]._id === latestFetchedPosts[j]._id) {
  //           console.log("fount liked post!!!!");
  //           console.log(latestFetchedPosts[j]);
  //           posts[i] = latestFetchedPosts[j];
  //         }
  //       }
  //     }
  //   }
  // }, [currentPosts, latestFetchedPosts]);

  // useEffect(() => {
  //   if (currentPostID && posts.length > 0) {
  //     console.log("currentID: " + currentPostID);
  //     setPostIndex(posts.findIndex((post) => post._id === currentPostID));
  //     // console.log(posts[wantedIndex]);
  //     console.log("wnted index" + wantedIndex);
  //     // if (wantedIndex != -1) goIndex(wantedIndex);
  //   }
  // }, [posts, currentPostID]);

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

  const onViewRef = useRef(({ viewableItems, changed }) => {
    if (viewableItems[0]?.index === undefined) return;
    console.log("playing", viewableItems[0]?.index);
    changed[0].isViewable && setCurrentlyPlaying(viewableItems[0]?.index);
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
    () => (isFeed ? Dimensions.get("window").height - bottomTabsHeight : Dimensions.get("window").height),
    [isFeed, bottomTabsHeight]
  );
  const config = useRef<ViewabilityConfig>({
    itemVisiblePercentThreshold: 90,
    // minimumViewTime: 150,
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

  // const panResponder = PanResponder.create({
  //   onStartShouldSetPanResponderCapture: (evt, gestureState) => {
  //     return true;
  //   },
  //   onStartShouldSetPanResponder: () => false,
  // });
  return (
    <>
      <View
        // {...panResponder.panHandlers}
        style={{ height: viewHeight, backgroundColor: Colors.black }}
        // onStartShouldSetResponder={() => true}
        // onStartShouldSetResponderCapture={() => true}
        // onMoveShouldSetResponder={() => true}
        // onMoveShouldSetResponderCapture={() => true}
        // onResponderRelease={() => console.log(123123123)}
      >
        <FlatList
          refreshControl={
            isFeed && (
              <RefreshControl
                tintColor="red"
                colors={["#9Bd35A", "#689F38"]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            )
          }
          initialNumToRender={5}
          maxToRenderPerBatch={3}
          windowSize={5}
          initialScrollIndex={initialPostIndex}
          // removeClippedSubviews
          // updateCellsBatchingPeriod={5}
          data={posts}
          // snapToInterval={currentlyPlaying === posts.length - 1 ? null : viewHeight}
          pagingEnabled
          disableIntervalMomentum
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={itemLayout}
          snapToAlignment={"start"}
          decelerationRate={"fast"}
          ref={(ref) => {
            flatListRef.current = ref;
          }}
          onScrollToIndexFailed={(error) => {
            flatListRef.current.scrollToOffset({
              offset: error.averageItemLength * error.index,
              animated: true,
            });
            setTimeout(() => {
              if (posts.length !== 0 && flatListRef.current !== null) {
                flatListRef.current.scrollToIndex({
                  index: error.index,
                  animated: true,
                });
              }
            }, 0);
          }}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={config.current}
          onEndReached={loadMore ? handleLoadMore : null}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            showFooter ? (
              <Footer />
            ) : posts.length !== 0 ? (
              <Text style={{ color: Colors.white, fontSize: 15 }}>You have reached the end</Text>
            ) : null
          }
          ListFooterComponentStyle={{
            height: 80,
            backgroundColor: Colors.darkBlueOpaque,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></FlatList>
        {isLoading ? (
          <View style={{ paddingBottom: Dimensions.get("screen").height / 2.2 }}>
            <Loader />
          </View>
        ) : null}
      </View>
    </>
  );
});
