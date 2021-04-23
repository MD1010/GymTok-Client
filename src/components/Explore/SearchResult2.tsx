import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet, Button, Dimensions, FlatList } from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  dataSource: any[];
  handleSelectItem: (text: string) => void;
}

export const SearchResults: React.FC<Props> = ({ dataSource, handleSelectItem }) => {
  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View style={styles.itemStyle}>
        <Text onPress={() => getItem(item)}>
          <View style={{ marginRight: 5 }}>
            <Ionicons name="search-outline" color={"black"} size={25} />
          </View>
          <View>
            <Text>{item.hashtag.toUpperCase()}</Text>
          </View>
        </Text>
      </View>

      // <Text style={styles.itemStyle} onPress={() => getItem(item)}>
      //   {/* <Ionicons name="search-outline" color={"black"} size={15} />
      //   <Text>{item.title.toUpperCase()}</Text> */}
      //   <View style={{}}>
      //     <Ionicons name="search-outline" color={"black"} size={25} />
      //   </View>
      //   <Text>{item.title.toUpperCase()}</Text>
      // </Text>
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
    <Animatable.View animation="fadeInUpBig" duration={500} style={styles.tagFriends}>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  tagFriends: {
    backgroundColor: "#F0F0F0",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  itemStyle: {
    padding: 10,
  },
});
