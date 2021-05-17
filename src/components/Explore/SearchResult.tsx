import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet, Button, Dimensions, FlatList, Platform } from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../shared";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { KeyboardAwareFlatList, KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import KeyboardSpacer from "react-native-keyboard-spacer";

interface Props {
  dataSource: any[];
  handleSelectItem: (text: string) => void;
}

export const SearchResults: React.FC<Props> = ({ dataSource, handleSelectItem }) => {
  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <TouchableWithoutFeedback onPress={() => getItem(item)}>
        <View style={styles.itemStyle}>
          <Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="search-outline" color={"white"} size={20} style={{ marginRight: 5 }} />
              <Text style={{ color: Colors.white }}>{item.hashtag.toUpperCase()}</Text>
            </View>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    // alert("Id : " + item.id + " Title : " + item.title);

    handleSelectItem(item);
  };

  return (
    <Animatable.View animation="fadeInUpBig" duration={500} style={{ height: Dimensions.get("screen").height }}>
      <KeyboardAwareFlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
      <KeyboardSpacer />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  tagFriends: {
    backgroundColor: Colors.black,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  itemStyle: {
    padding: 10,
  },
});
