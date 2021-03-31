import { useNavigation } from "@react-navigation/core";
import React, { createRef, useLayoutEffect, useState } from "react";
import { View, Text, Platform, TextInput } from "react-native";
import { Avatar, colors, SearchBar } from "react-native-elements";
import { Colors } from "../shared";
import { Ionicons, FontAwesome, Fontisto } from "@expo/vector-icons";
import { StackNavigationOptions } from "@react-navigation/stack";
import { SearchInput } from "../shared/SearchInput";

import { Card, ListItem, Button, Icon } from "react-native-elements";
import { Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Dimensions, StyleSheet } from "react-native";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={600}
    height={200}
    viewBox="0 0 600 200"
    backgroundColor={colors.grey1}
    foregroundColor={colors.grey2}
    {...props}
  >
    <Rect x="60" y="8" rx="3" ry="3" width="88" height="10" />
    <Rect x="60" y="26" rx="3" ry="3" width="52" height="8" />
    <Circle cx="25" cy="25" r="25" />
  </ContentLoader>
);
interface SearchUserScreenProps {}

export const SearchUserScreen: React.FC<SearchUserScreenProps> = ({}) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.darkBlueOpaque,
          paddingVertical: 5,
        }}
      >
        <Ionicons
          name="close"
          color={Colors.white}
          size={23}
          style={{ marginHorizontal: 5 }}
          onPress={() => navigation.goBack()}
        />
        <SearchInput placeholder={"Search a user"} />
      </View>
      <View style={{ flex: 1, margin: 15 }}>
        <MyLoader />

        {/* <Avatar source={require("../../../assets/avatar/01.jpg")} rounded size={40}></Avatar>
          <Text style={styles.creator}>@{"asdasdasd"}</Text> */}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  creator: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
