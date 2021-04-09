import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet, Button, Dimensions, FlatList } from "react-native";
import * as Animatable from "react-native-animatable";

interface Props {
  filteredDataSource: any[];
  handleSelectItem: (text: string) => void;
}

export const SearchResults: React.FC<Props> = ({ filteredDataSource, handleSelectItem }) => {
  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {"."}
        {item.title.toUpperCase()}
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
  },
  itemStyle: {
    padding: 10,
  },
});
