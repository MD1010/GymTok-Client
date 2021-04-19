import { Ionicons } from "@expo/vector-icons";
import React, { createRef, forwardRef, useEffect, useRef, useState } from "react";
import { SafeAreaView, StatusBar, TextInput, View } from "react-native";
import { Colors } from "../shared";
import debounce from "lodash/debounce";
import { useNavigation } from "@react-navigation/native";

interface SearchInputProps {
  placeholder: string;
  onSearch?: (searchValue) => any;
  onResetSearch?: () => any;
}

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onSearch, onResetSearch }) => {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>();

  useEffect(() => {
    if (!searchText) onResetSearch();
  }, [searchText]);

  useEffect(() => {
    navigation.addListener("blur", () => {
      setSearchText("");
    });

    navigation.addListener("focus", () => {
      inputRef.current?.focus();
    });

    return () => {
      navigation.removeListener("blur", null);
      navigation.removeListener("focus", null);
    };
  }, [navigation]);

  return (
    <SafeAreaView style={{ flexDirection: "row", alignItems: "center", flex: 1, justifyContent: "center", height: 45 }}>
      <Ionicons name="search" color={Colors.white} size={23} />
      <TextInput
        autoFocus
        ref={inputRef}
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
          onPress={() => {
            setSearchText("");
            onResetSearch();
          }}
          style={{ marginHorizontal: 5 }}
        />
      ) : null}
    </SafeAreaView>
  );
};
