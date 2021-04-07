import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, StatusBar, Text, View } from "react-native";
import { IPost } from "../../interfaces";
import { Loader } from "../shared";
import { Colors, UIConsts } from "../shared/styles/variables";
import { Post } from "./Post";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { postsSelector } from "../../store/posts/postsSlice";
import { authSelector } from "../../store/auth/authSlice";
import { getLatestPosts, getMostRecommended, getUserPosts } from "../../store/posts/actions";
import isEmpty from "lodash/isEmpty";

interface PostsListProps {
  /**
   *  in home page isFeed is true, else it is false
   */
  isFeed?: boolean;
}

export const PostsList: React.FC<PostsListProps> = memo(({ isFeed }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [navigatedOutOfScreen, setNavigatedOutOfScreen] = useState(false);
  const { loggedUser } = useSelector(authSelector);
  const scrollEnded = useRef<boolean>(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [showFooter, setShowFooter] = useState(false);
  const { hasMoreToFetch, error, latestFetchedPosts, userPosts } = useSelector(postsSelector);
  const posts = isFeed ? latestFetchedPosts : userPosts;

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
      dispatch(getLatestPosts());
    }
  };
  useEffect(() => {
    // check if user was loaded - undefinded means the store has not been updated yet.
    if (loggedUser !== undefined) {
      isEmpty(posts) && getPosts();
    }
  }, [loggedUser]);

  // todo Dov
  // useEffect(() => {
  //   if (challenges.length > 0) {
  //     goIndex(currentIndexVideo);
  //   }
  // }, [challenges, currentIndexVideo]);

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
          onScrollToIndexFailed={() => alert("no such index")}
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
