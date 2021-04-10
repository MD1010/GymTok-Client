import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet, Button, Dimensions, FlatList } from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  filteredDataSource: any[];
  handleSelectItem: (text: string) => void;
}

export const SearchResults: React.FC<Props> = ({ filteredDataSource, handleSelectItem }) => {
  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        <View style={{ marginRight: 10, alignSelf: "center" }}>
          <Ionicons name="search-outline" color={"black"} size={25} />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text>{item.title.toUpperCase()}</Text>
        </View>
      </Text>
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
    handleSelectItem(item.title);
  };
  return (
    <Animatable.View animation="fadeInUpBig" duration={500} style={styles.tagFriends}>
      <FlatList
        data={filteredDataSource}
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
