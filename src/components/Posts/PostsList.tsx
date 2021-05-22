import { useFocusEffect, useNavigation } from "@react-navigation/native";
import isEmpty from "lodash/isEmpty";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, Text, View, ViewabilityConfig, RefreshControl, InteractionManager } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { IPost } from "../../interfaces/Post";
import { authSelector } from "../../store/auth/authSlice";
import {
  getLatestPosts,
  getMorePosts,
  getMostRecommended,
  getUserPosts,
  updateUserLikePost,
} from "../../store/posts/actions";
import { postsSelector } from "../../store/posts/postsSlice";
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
  updateAllPosts?: (posts: IPost[]) => void;
}

export const PostsList: React.FC<PostsListProps> = memo(
  ({ isFeed, currentPosts, isLoadMore, initialPostIndex, updateAllPosts }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [navigatedOutOfScreen, setNavigatedOutOfScreen] = useState<boolean>(false);
    const { loggedUser } = useSelector(authSelector);

    const [currentlyPlaying, setCurrentlyPlaying] = useState(initialPostIndex || 0);
    const flatListRef = useRef<FlatList>(null);
    const [showFooter, setShowFooter] = useState<boolean>(true);

    const { hasMoreToFetch, error, latestFetchedPosts, userPosts } = useSelector(postsSelector);
    const posts = useRef<IPost[]>([]);

    //const isLoading = useRef<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const loadMore: boolean = isLoadMore !== undefined ? isLoadMore : true;
    const bottomTabsHeight = isFeed ? useBottomTabBarHeight() : 0;

    useEffect(() => {
      error && alert(JSON.stringify(error));
    }, [error]);

    useEffect(() => {
      posts.current = currentPosts ? currentPosts : isFeed ? latestFetchedPosts : userPosts;

      setIsLoading(false);
    }, [currentPosts, isFeed, latestFetchedPosts, userPosts]);

    useEffect(() => {
      if (posts.current) {
        setShowFooter(false);
        setRefreshing(false);
      } else {
        setShowFooter(true);
      }
    }, [posts.current]);

    useEffect(() => {
      if (isFeed) {
        navigation.setParams({ post: posts.current[currentlyPlaying] });
        //isLoading.current = false;
        setIsLoading(false);
      }
    }, [currentlyPlaying /*posts.current*/]);

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
        if (isEmpty(posts.current)) {
          console.log("posts are emptyyy!!!!");
          getPosts();
        } else {
          console.log("posts are notttt emptyyy!!!!");
          //isLoading.current = false;
          setIsLoading(false);
        }
      }
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
      const updatedPosts = userPressLikeOnPost(posts.current, post, loggedUser._id);
      posts.current = updatedPosts;

      dispatch(updateUserLikePost(post, loggedUser._id));
      updateAllPosts && updateAllPosts(updatedPosts);

      let requestMethod: RequestMethod;
      const likesApi = `${process.env.BASE_API_ENPOINT}/users/${loggedUser._id}/posts/${post._id}/like`;
      if (!isUserLikePost) {
        requestMethod = RequestMethod.POST;
      } else {
        requestMethod = RequestMethod.DELETE;
      }
      const { res, error } = await fetchAPI(requestMethod, likesApi);

      if (error) {
        posts.current = userPressLikeOnPost(posts.current, post, loggedUser._id);
        dispatch(updateUserLikePost(post, loggedUser._id));
      } else {
        return res;
      }
    };

    const onViewRef = useRef(({ viewableItems, changed }) => {
      if (viewableItems[0]?.index === undefined) return;
      console.log("playing", viewableItems[0]?.index);
      changed[0].isViewable && setCurrentlyPlaying(viewableItems[0]?.index);
    });

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
      if (posts.current.length) {
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

    return (
      <View style={{ flex: 1, backgroundColor: Colors.black }}>
        {isLoading ? (
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
            initialNumToRender={5}
            maxToRenderPerBatch={3}
            windowSize={5}
            initialScrollIndex={initialPostIndex}
            data={posts.current}
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
                if (posts.current.length !== 0 && flatListRef.current !== null) {
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
              ) : posts.current.length !== 0 ? (
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
