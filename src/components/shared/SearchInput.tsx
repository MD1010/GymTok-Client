import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef, useState } from "react";
import { TextInput, View } from "react-native";
import { Colors } from "../shared";
interface SearchInputProps {
  placeholder: string;
  onSearch?: (searchValue) => any;
  // setInputValue?: (value) => any;
}
// type TextInputProps = React.HTMLProps<TextInput>;

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onSearch }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1, padding: 5 }}>
        <Ionicons name="search" color={Colors.white} size={23} />
        <TextInput
          autoFocus
          // onResponderRelease={() => console.log("onRelease")}
          // onResponderStart={() => console.log("onStart")}
          // onTouchStart={() => console.log("onStart")}
          placeholder={placeholder}
          placeholderTextColor={Colors.lightGrey2}
          style={{ marginLeft: 10, fontSize: 16, color: Colors.weakGrey, flex: 1 }}
          blurOnSubmit={false}
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            // setInputValue && setInputValue(text);
            onSearch && onSearch(text);
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

// export const SearchInput: React.FC<SearchInputProps> = forwardRef<TextInput, SearchInputProps>(
//   ({ placeholder, onSearch }, ref) => {
//     const [searchText, setSearchText] = useState("");

//     return (
//       <View style={{ flex: 1, flexDirection: "row" }}>
//         <View style={{ flexDirection: "row", alignItems: "center", flex: 1, padding: 5 }}>
//           <Ionicons name="search" color={Colors.white} size={23} />
//           <TextInput
//             autoFocus
//             placeholder={placeholder}
//             placeholderTextColor={Colors.lightGrey2}
//             style={{ marginLeft: 10, fontSize: 16, color: Colors.weakGrey, flex: 1 }}
//             blurOnSubmit={false}
//             value={searchText}
//             onChangeText={(text) => {
//               setSearchText(text);
//               onSearch();
//             }}
//           ></TextInput>
//           {searchText.length ? (
//             <Ionicons
//               name="close-circle"
//               color={Colors.lightGrey}
//               size={22}
//               onPress={() => setSearchText("")}
//               style={{ marginLeft: 5 }}
//             />
//           ) : null}
//         </View>
//       </View>
//     );
//   }
// );
