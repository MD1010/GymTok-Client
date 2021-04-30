import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IPost } from "../../interfaces";
import {
  STREAMING_SERVER_GIF_ENDPOINT,
  STREAMING_SERVER_VIDEO_ENDPOINT,
} from "../../utils/consts";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Loader } from "../shared";
import { Colors } from "../shared/styles/variables";
import { Item } from "./interfaces";

interface Props {
  items: IPost[];
  loadMoreCallback: () => any;
  hasMoreToFetch: boolean;
  horizontal?: boolean;
  numColumns?: number;
  customStyle?: ViewStyle;
  pictureHeight?: number;
}

export const GenericComponent: React.FC<Props> = ({
  items,
  loadMoreCallback,
  hasMoreToFetch,
  horizontal,
  customStyle,
  numColumns,
  pictureHeight,
}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showFooter, setShowFooter] = useState<boolean>(false);

  const isHorizontal: boolean = horizontal ? horizontal : false;
  const numOfColumns: number = numColumns ? numColumns : 3;

  const picHeight: number = pictureHeight
    ? pictureHeight
    : styles.theImage.height;

  const Footer = () => {
    if (items.length) {
      if (hasMoreToFetch) {
        return <Loader style={{ height: 100, width: 100 }} />;
      } else {
        return (
          <Text style={{ color: Colors.lightGrey2, fontSize: 15 }}>
            You have reached the end
          </Text>
        );
      }
    }
    return null;
  };
  const showVideo = (videoURL) => {
    navigation.navigate("UsersProfile", {
      videoURL: `${STREAMING_SERVER_VIDEO_ENDPOINT}/${videoURL}`,
    });
  };
  useEffect(() => {
    if (items) {
      setShowFooter(false);
      // setRefreshing(false);
    }
  }, [items]);
  // useEffect(() => {
  //   console.log(123123123, loadMoreCallback);

  //   console.log(items.length);
  //   async function loadMore() {
  //     loadMoreCallback && (await loadMoreCallback());
  //   }
  //   loadMore();
  // }, []);
  useEffect(() => {
    console.log(123123123, loadMoreCallback);
    console.log(items.length);
    // async function loadMore() {
    //   loadMoreCallback && (await loadMoreCallback());
    // }
    loadMoreCallback && loadMoreCallback();
  }, []);
  console.log("render!@#!@#!@#!@..");
  const handleLoadMore = () => {
    console.log(
      `itemsLenght: ${items.length},hasMoreToFetch: ${hasMoreToFetch}`
    );
    items.length && setShowFooter(true);
    hasMoreToFetch && loadMoreCallback();
  };
  const renderItem = (item: IPost) => {
    return (
      <View
        style={{
          margin: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            showVideo(item.videoURI);
          }}
        >
          <ImageBackground
            style={{
              ...styles.theImage,
              height: picHeight,
              width: Dimensions.get("screen").width / numOfColumns,
            }}
            source={{ uri: `${STREAMING_SERVER_GIF_ENDPOINT}/${item.gif}` }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "column",
                height: picHeight,
              }}
            >
              <View style={[styles.rowContainer, { marginRight: 10 }]}>
                <FontAwesome
                  name={"heart"}
                  size={13}
                  color={Colors.lightGrey}
                />
                {/* <Text style={styles.amount}>{item.likes}</Text> */}
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        {/* {item.component} */}
      </View>
    );
  };
  const d = () => console.log(123123);

  return (
    <SafeAreaView
      style={{ flex: 1, flexDirection: isHorizontal ? "row" : "column" }}
    >
      {/* <Spinner visible={isLoading} textLoading={"Loading..."} textStyle={{ color: "#FFF" }} /> */}
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        horizontal={isHorizontal}
        numColumns={!isHorizontal ? numOfColumns : 0}
        renderItem={({ item }) => renderItem(item)}
        onEndReachedThreshold={0}
        ListFooterComponent={showFooter ? <Footer /> : null}
        onEndReached={handleLoadMore}
      />
      {/* {isLoading ? (
        <ChallangeSkeleton isHorizontal={isHorizontal} numOfColumns={numOfColumns} />
      ) : (
        <FlatList
          data={thumbnailItems}
          keyExtractor={(item, index) => index.toString()}
          horizontal={isHorizontal}
          numColumns={!isHorizontal ? numOfColumns : 0}
          renderItem={renderItem}
        />
      )} */}
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
