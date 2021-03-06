import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, View, ViewStyle } from "react-native";
import Ripple from "react-native-material-ripple";
import { useSelector } from "react-redux";
import { IPost } from "../../interfaces";
import { postsSelector } from "../../store/posts/postsSlice";
import { STREAMING_SERVER_GIF_ENDPOINT } from "../../utils/consts";
import { Loader } from "../shared";
import { Colors } from "../shared/styles/variables";

interface Props {
  items: IPost[];
  loadMoreCallback: () => any;
  hasMoreToFetch: boolean;
  horizontal?: boolean;
  numColumns?: number;
  customStyle?: ViewStyle;
  gifStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  pictureHeight?: number;
  renderFooter?: (item: IPost) => JSX.Element;
  renderBottomVideo?: (item: IPost) => JSX.Element;
  pageHeader?: () => JSX.Element;
}

export const GenericComponent: React.FC<Props> = ({
  items,
  loadMoreCallback,
  hasMoreToFetch,
  horizontal,
  customStyle,
  numColumns,
  pictureHeight,
  pageHeader,
  containerStyle,
  renderBottomVideo,
  renderFooter,
  gifStyle,
}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showFooter, setShowFooter] = useState<boolean>(false);

  const isHorizontal: boolean = horizontal ? horizontal : false;
  const numOfColumns: number = numColumns ? numColumns : 3;
  const picHeight: number = pictureHeight ? pictureHeight : styles.theImage.height;
  const { error, latestFetchedPosts, userPosts } = useSelector(postsSelector);
  const [currentItems, setCurrentItems] = useState<any>();

  useEffect(() => {
    let tempArr = [...items];
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
  }, [items, latestFetchedPosts]);

  const Footer = () => {
    if (items.length) {
      if (hasMoreToFetch) {
        console.log(`has more to fetch?: ${hasMoreToFetch}`);
        return <Loader style={{ height: 100, width: 100 }} />;
      }
    }
    return null;
  };
  // const showVideo = (videoURL) => {
  //   navigation.navigate("UsersProfile", {
  //     videoURL: `${STREAMING_SERVER_VIDEO_ENDPOINT}/${videoURL}`,
  //   });
  // };
  const showVideo = (postID) => {
    const initialIndex = items.findIndex((post) => post._id === postID);
    navigation.navigate("VideoDisplay", { posts: items, initialIndex });
  };
  useEffect(() => {
    if (items) {
      setShowFooter(false);
    }
  }, [items]);

  useEffect(() => {
    loadMoreCallback && loadMoreCallback();
  }, []);

  const handleLoadMore = () => {
    items.length && setShowFooter(true);
    hasMoreToFetch && loadMoreCallback();
  };
  const renderItem = (item: IPost) => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width / numOfColumns,
          ...customStyle,
        }}
      >
        <Ripple
          onPress={() => {
            showVideo(item._id);
          }}
        >
          <ImageBackground
            style={{
              ...styles.theImage,
              height: picHeight,
              ...gifStyle,
            }}
            imageStyle={{ borderRadius: 3 }}
            source={{ uri: `${STREAMING_SERVER_GIF_ENDPOINT}/${item.gif}` }}
          >
            {renderBottomVideo ? (
              renderBottomVideo(item)
            ) : (
              <View
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginLeft: 3,
                  flexDirection: "column",
                  height: picHeight,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name={"heart"} size={13} color={Colors.lightGrey} />
                  <Text style={styles.amount}>{item?.likes?.length}</Text>
                </View>
              </View>
            )}
          </ImageBackground>
        </Ripple>

        {renderFooter && renderFooter(item)}
      </View>
    );
  };
  const d = () => console.log(123123);

  return (
    <SafeAreaView
      style={[{ flex: 1, flexDirection: isHorizontal ? "row" : "column", marginHorizontal: 5 }, containerStyle]}
    >
      <FlatList
        ListHeaderComponent={pageHeader}
        data={/*items*/ currentItems}
        keyExtractor={(item, index) => index.toString()}
        horizontal={isHorizontal}
        numColumns={!isHorizontal ? numOfColumns : 0}
        renderItem={({ item }) => renderItem(item)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={showFooter ? <Footer /> : null}
        onEndReached={handleLoadMore}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  image: {
    width: 200,
    height: 200,
  },

  theImage: {
    margin: 2,
    height: 120,
    resizeMode: "cover",
  },
  safeArea: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  amount: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 5,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
