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
import Moment from "moment";

interface Props {
  items: IPost[];
  horizontal?: boolean;
  numColumns?: number;
  customStyle?: ViewStyle;
  pictureHeight?: number;
}

export const GenericComponent: React.FC<Props> = ({ items, horizontal, customStyle, numColumns, pictureHeight }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isHorizontal: boolean = horizontal ? horizontal : false;
  const numOfColumns: number = numColumns ? numColumns : 3;
  const picHeight: number = pictureHeight ? pictureHeight : styles.theImage.height;

  const showVideo = (postID) => {
    console.log("show post id::::::::::::: " + postID);
    navigation.navigate("UsersProfile", { postID: postID });
    // navigation.navigate("UsersProfile", { videoURL: `${STREAMING_SERVER_VIDEO_ENDPOINT}/${videoURL}` });
  };

  const renderItem = (item: IPost) => {
    return (
      <View
        style={{
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
              ...styles.theImage,
              height: picHeight,
              width: Dimensions.get("screen").width / numOfColumns - 10,
            }}
            imageStyle={{ borderRadius: 3 }}
            source={{ uri: `${STREAMING_SERVER_GIF_ENDPOINT}/${item.gif}` }}
          >
            <View style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", height: picHeight }}>
              <View style={[styles.rowContainer, { marginRight: 10 }]}>
                <Text style={{ color: Colors.white, fontWeight: "bold", fontSize: 12, margin: 3 }}>
                  {item?.publishDate?.toString().split("T")[0]}
                </Text>
                <FontAwesome name={"heart"} size={13} color={Colors.lightGrey} />
                <Text style={styles.amount}>{item.likes?.length}</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={{ color: Colors.white, marginTop: 3, margin: 5, fontWeight: "bold" }}>{item.description}</Text>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: Dimensions.get("screen").width / numOfColumns - 10,
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", margin: 5 }}>
            <Avatar
              source={
                item.createdBy?.image ? { uri: item.createdBy.image } : require("../../../assets/avatar/user.png")
              }
              rounded
            />
            <Text style={{ color: Colors.darkGrey, alignSelf: "center", marginLeft: 5 }}>
              {item?.createdBy?.username}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <FontAwesome style={{ alignSelf: "center" }} name={"heart-o"} size={13} color={Colors.darkGrey} />
            <Text style={{ ...styles.amount, color: Colors.darkGrey }}>{item.likes?.length}</Text>
          </View>
        </View>
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
