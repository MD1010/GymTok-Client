import { useNavigation } from "@react-navigation/core";
import React, { createRef, useLayoutEffect, useState } from "react";
import { View, Text, Platform, TextInput } from "react-native";
import { SearchBar } from "react-native-elements";
import { Colors } from "../shared";
import { Ionicons, FontAwesome, Fontisto } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import { StackNavigationOptions } from "@react-navigation/stack";
import { SearchInput } from "../shared/SearchInput";

interface SearchUserScreenProps {}

export const SearchUserScreen: React.FC<SearchUserScreenProps> = ({}) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: 10,
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
    </View>
  );
};
