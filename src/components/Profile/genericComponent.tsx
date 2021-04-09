import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useIsMount } from "../../hooks/useIsMount";
import { generateThumbnail } from "../../utils/generateThumbnail";
import { Colors } from "../shared/styles/variables";
import { Item } from "./interfaces";

interface Props {
  items: Item[];
  horizontal?: boolean;
  component?: React.ReactNode;
}

export const GenericComponent: React.FC<Props> = ({ items, horizontal, component }) => {
  const [thumbnailItems, setThumbnailItems] = useState<any[]>([]);
  const isMounted = useIsMount();
  const navigation = useNavigation();
  const isHorizontal: boolean = horizontal ? horizontal : false;

  useEffect(() => {
    (async () => {
      const asyncRes = await Promise.all(
        items.map(async (item) => {
          const imageURI = await generateThumbnail(item.url);
          return Object.assign({ image: imageURI }, { ...item });
        })
      );
      isMounted.current && setThumbnailItems(asyncRes);
    })();
  }, []);

  const showVideo = (videoURL) => {
    navigation.navigate("UsersProfile", { videoURL: videoURL });
  };

  const renderItem = (item, index) => {
    return (
      <View key={index} style={{ margin: 2, width: Dimensions.get("window").width / 3 }}>
        <TouchableOpacity
          onPress={() => {
            showVideo(item.url);
          }}
        >
          <ImageBackground
            style={{ ...styles.theImage, width: Dimensions.get("window").width / 3 /*numColumns*/ }}
            source={{ uri: item.image }}
          >
            <View style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", height: 120 }}>
              <View style={[styles.rowContainer, { marginRight: 10 }]}>
                <FontAwesome name={"heart"} size={13} color={Colors.lightGrey} />
                <Text style={styles.amount}>{item.numOfLikes}</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        {component}
      </View>
    );
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" horizontal={isHorizontal}>
      <SafeAreaView style={{ ...styles.safeArea, flexDirection: isHorizontal ? "row" : "column" }}>
        {thumbnailItems.map((item, index) => {
          return renderItem(item, index);
        })}
      </SafeAreaView>
    </ScrollView>
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
    height: Dimensions.get("screen").height,
    display: "flex",
    flexWrap: "wrap",
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