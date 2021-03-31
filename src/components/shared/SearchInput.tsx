import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef, useState } from "react";
import { TextInput, View } from "react-native";
import { Colors } from "../shared";
import debounce from "lodash/debounce";

interface SearchInputProps {
  placeholder: string;
  onSearch?: (searchValue) => any;
}

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onSearch }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1, padding: 5 }}>
        <Ionicons name="search" color={Colors.white} size={23} />
        <TextInput
          autoFocus
          placeholder={placeholder}
          placeholderTextColor={Colors.lightGrey2}
          style={{ marginLeft: 10, fontSize: 16, color: Colors.weakGrey, flex: 1 }}
          blurOnSubmit={false}
          value={searchText}
          onChangeText={(text) => {
            onSearch && onSearch(text);
            setSearchText(text);
          }}
        ></TextInput>
        {searchText.length ? (
          <Ionicons
            name="close-circle"
            color={Colors.lightGrey}
            size={22}
            onPress={() => setSearchText("")}
            style={{ marginLeft: 5 }}
          />
        ) : null}
      </View>
    </View>
  );
};
