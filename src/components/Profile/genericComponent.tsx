import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IPost } from "../../interfaces";
import { STREAMING_SERVER_GIF_ENDPOINT, STREAMING_SERVER_VIDEO_ENDPOINT } from "../../utils/consts";
import { Colors } from "../shared/styles/variables";
import { Item } from "./interfaces";
import { Avatar } from "react-native-elements";

interface Props {
  items: IPost[];
  horizontal?: boolean;
  numColumns?: number;
  customStyle?: ViewStyle;
  gifStyle?: ViewStyle;
  pictureHeight?: number;
  renderFooter?: (item: IPost) => void;
  isShowDate?: boolean;
}

export const GenericComponent: React.FC<Props> = ({
  items,
  horizontal,
  customStyle,
  gifStyle,
  numColumns,
  pictureHeight,
  renderFooter,
  isShowDate,
}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isHorizontal: boolean = horizontal ? horizontal : false;
  const numOfColumns: number = numColumns ? numColumns : 3;
  const picHeight: number = pictureHeight ? pictureHeight : styles.theImage.height;
  const showDate: boolean = isShowDate ? isShowDate : true;

  const showVideo = (postID) => {
    console.log("show post id::::::::::::: " + postID);
    navigation.navigate("UsersProfile", { postID: postID });
  };

  const renderItem = (item: IPost) => {
    return (
      <View
        style={{
          ...customStyle,
          margin: 5,
          width: Dimensions.get("screen").width / numOfColumns - 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            showVideo(item._id);
          }}
        >
          <ImageBackground
            style={{
              ...gifStyle,
              ...styles.theImage,
              height: picHeight,
              width: Dimensions.get("screen").width / numOfColumns - 10,
            }}
            imageStyle={{ borderRadius: 3 }}
            source={{ uri: `${STREAMING_SERVER_GIF_ENDPOINT}/${item.gif}` }}
          >
            {showDate && (
              <View style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", height: picHeight }}>
                <View style={[styles.rowContainer, { marginRight: 10 }]}>
                  <Text style={{ color: Colors.white, fontWeight: "bold", fontSize: 12, margin: 3 }}>
                    {item.publishDate.toString().split("T")[0]}
                  </Text>
                </View>
              </View>
            )}
          </ImageBackground>
        </TouchableOpacity>
        {renderFooter && renderFooter(item)}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: isHorizontal ? "row" : "column" }}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        horizontal={isHorizontal}
        numColumns={!isHorizontal ? numOfColumns : 0}
        renderItem={({ item }) => renderItem(item)}
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
