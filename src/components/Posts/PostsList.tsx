import { useFocusEffect, useNavigation } from "@react-navigation/native";
import isEmpty from "lodash/isEmpty";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, Text, View, ViewabilityConfig, RefreshControl, InteractionManager } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { IPost } from "../../interfaces/Post";
import { authSelector } from "../../store/auth/authSlice";
import {
  getLatestPosts,
  getMorePosts,
  getMostRecommended,
  getUserPosts,
  postsUpdated,
  updateUserLikePost,
} from "../../store/posts/actions";
import { postsActions, postsSelector } from "../../store/posts/postsSlice";
import { Loader } from "../shared";
import { Colors, UIConsts } from "../shared/styles/variables";
import { Post } from "./Post";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { userPressLikeOnPost } from "../../utils/updatePostLikes";

interface PostsListProps {
  /**
userPosts   *  in home page isFeed is true, else it is false
   */
  isFeed?: boolean;
  currentPosts?: IPost[];
  isLoadMore?: boolean;
  initialPostIndex?: number;
  isOriginal: boolean;
  // updateAllPosts?: (posts: IPost[]) => void;
}

export const PostsList: React.FC<PostsListProps> = memo(
  ({ isFeed, currentPosts, isLoadMore, initialPostIndex, isOriginal }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [navigatedOutOfScreen, setNavigatedOutOfScreen] = useState<boolean>(false);
    const { loggedUser } = useSelector(authSelector);
    const scrollEnded = useRef<boolean>(false);
    // const playingVideoIndex = useRef(0);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(initialPostIndex || 0);
    const flatListRef = useRef<FlatList>(null);
    const [showFooter, setShowFooter] = useState<boolean>(false);

    const { hasMoreToFetch, error, latestFetchedPosts, userPosts, lastUpdatedPosts } = useSelector(postsSelector);
    const [posts, setPosts] = useState<IPost[]>([]);
    // let posts = currentPosts ? currentPosts : isFeed ? latestFetchedPosts : userPosts;
    //const isLoading = useRef<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const posts: IPost[] = currentPosts ? currentPosts : isFeed ? latestFetchedPosts : userPosts;
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const loadMore: boolean = isLoadMore !== undefined ? isLoadMore : true;
    const bottomTabsHeight = isFeed ? useBottomTabBarHeight() : 0;

    useEffect(() => {
      error && alert(JSON.stringify(error));
    }, [error]);

    useEffect(() => {
      // if (currentPosts?.length) {
      //   console.log("setting current posts");
      //   setPosts(currentPosts);
      // } else if (isFeed) {
      //   console.log("setting latest fetched");
      //   setPosts(latestFetchedPosts);
      // } else {
      //   console.log("setting user posts");
      //   setPosts(userPosts);
      // }

      // !isEmpty(lastUpdatedPosts) && setPosts(lastUpdatedPosts);
      // setPosts(currentPosts?.length ? currentPosts : isFeed ? latestFetchedPosts : userPosts);
      //isLoading.current = false;
      setPosts(currentPosts ? currentPosts : isFeed ? latestFetchedPosts : userPosts);
      isLoading && setIsLoading(false);
    }, [currentPosts, isFeed, latestFetchedPosts, userPosts]);

    useEffect(() => {
      if (posts) {
        setShowFooter(false);
        setRefreshing(false);
      } else {
        setShowFooter(true);
      }
    }, [posts]);

    useEffect(() => {
      isOriginal && !isEmpty(lastUpdatedPosts) && setPosts(lastUpdatedPosts);
    }, [isOriginal]);
    // useEffect(() => {
    //   console.log("first time");
    //   setShowFooter(true);
    // }, []);
    useEffect(() => {
      navigation.setParams({ post: posts[currentlyPlaying] });
      //isLoading.current = false;
      isLoading && setIsLoading(false);
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
        //isLoading.current = true;
        setIsLoading(true);
        if (isEmpty(posts)) {
          getPosts();
        } else {
          //isLoading.current = false;
          setIsLoading(false);
        }
      }

      // getPosts();
    }, [loggedUser]);

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

    const loggedUserPressLike = async (post: IPost, isUserLikePost: boolean) => {
      const updatedPosts = userPressLikeOnPost(posts, post, loggedUser._id);
      // posts = updatedPosts;
      dispatch(updateUserLikePost(post, loggedUser._id));
      dispatch(postsUpdated(updatedPosts));
      setPosts(updatedPosts);
      // updateAllPosts && updateAllPosts(updatedPosts);

      let requestMethod: RequestMethod;
      const likesApi = `${process.env.BASE_API_ENPOINT}/users/${loggedUser._id}/posts/${post._id}/like`;
      if (!isUserLikePost) {
        requestMethod = RequestMethod.POST;
      } else {
        requestMethod = RequestMethod.DELETE;
      }
      const { res, error } = await fetchAPI(requestMethod, likesApi);

      if (error) {
        // posts = userPressLikeOnPost(posts, post, loggedUser._id);
        dispatch(postsUpdated(posts));
        dispatch(updateUserLikePost(post, loggedUser._id));
        setPosts(updatedPosts);
      } else {
        return res;
      }
    };

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
    });

    const itemLayout = useCallback(
      (_, index) => ({
        length: viewHeight,
        offset: viewHeight * index,
        index,
      }),
      [bottomTabsHeight]
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
          loggedUserPressLike={loggedUserPressLike}
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
      <View style={{ height: viewHeight, backgroundColor: Colors.black }}>
        {isLoading && isFeed ? (
          <Loader />
        ) : (
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
            extraData={lastUpdatedPosts}
            initialNumToRender={5}
            maxToRenderPerBatch={3}
            windowSize={5}
            initialScrollIndex={initialPostIndex}
            data={posts}
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
          />
        )}
      </View>
    );
  }
);
