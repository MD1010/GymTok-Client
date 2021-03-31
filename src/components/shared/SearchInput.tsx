import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { Colors } from "../shared";
interface SearchInputProps {
  placeholder: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
  const navigation = useNavigation();

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
            setSearchText(text);
            console.log(text);
          }}
        ></TextInput>
        {searchText.length ? (
          <Ionicons name="close-circle" color={Colors.lightGrey} size={22} onPress={() => setSearchText("")} />
        ) : null}
      </View>
    </View>
  );
};
