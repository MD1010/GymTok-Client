import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, FlatList, SafeAreaView, StyleSheet, Text, View, ViewStyle } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useIsMount } from "../../hooks/useIsMount";
import { generateThumbnail } from "../../utils/generateThumbnail";
import { Colors } from "../shared/styles/variables";
import { Item } from "./interfaces";
import { ChallangeSkeleton } from "../shared/skeletons/ChallangeSkeleton";
import { render } from "react-dom";
import Spinner from "react-native-loading-spinner-overlay";

interface Props {
  items: Item[];
  horizontal?: boolean;
  numColumns?: number;
  customStyle?: ViewStyle;
  pictureHeight?: number;
}

export const GenericComponent: React.FC<Props> = ({ items, horizontal, customStyle, numColumns, pictureHeight }) => {
  const [thumbnailItems, setThumbnailItems] = useState<any[]>([]);
  const isMounted = useIsMount();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isHorizontal: boolean = horizontal ? horizontal : false;
  const numOfColumns: number = numColumns ? numColumns : 3;
  const picHeight: number = pictureHeight ? pictureHeight : styles.theImage.height;

  useEffect(() => {
    (async () => {
      const asyncRes = await Promise.all(
        items.map(async (item) => {
          const imageURI = await generateThumbnail(item.url);
          return Object.assign({ image: imageURI }, { ...item });
        })
      );
      setIsLoading(false);
      isMounted.current && setThumbnailItems(asyncRes);
    })();
  }, []);

  const showVideo = (videoURL) => {
    navigation.navigate("UsersProfile", { videoURL: videoURL });
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          margin: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            showVideo(item.url);
          }}
        >
          <ImageBackground
            style={{ ...styles.theImage, height: picHeight, width: Dimensions.get("screen").width / numOfColumns }}
            source={{ uri: item.image }}
          >
            <View style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", height: picHeight }}>
              <View style={[styles.rowContainer, { marginRight: 10 }]}>
                <FontAwesome name={"heart"} size={13} color={Colors.lightGrey} />
                <Text style={styles.amount}>{item.numOfLikes}</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        {item.component}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: isHorizontal ? "row" : "column" }}>
      <Spinner visible={isLoading} textLoading={"Loading..."} textStyle={{ color: "#FFF" }} />
      <FlatList
        data={thumbnailItems}
        keyExtractor={(item, index) => index.toString()}
        horizontal={isHorizontal}
        numColumns={!isHorizontal ? numOfColumns : 0}
        renderItem={renderItem}
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
