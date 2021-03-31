import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef, useState } from "react";
import { TextInput, View } from "react-native";
import { Colors } from "../shared";
import debounce from "lodash/debounce";

interface SearchInputProps {
  placeholder: string;
  onSearch?: (searchValue) => any;

  /**
   * Time in seconds to wait after user stops typing before calling onSearch()
   */
  debounceTime?: number;
}

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onSearch, debounceTime = 0 }) => {
  const [searchText, setSearchText] = useState("");

  // let startTime: Date;
  // const checkIfDoneTyping = () => {
  //   const currentTime = new Date();
  //   const timeElapsed = (currentTime.valueOf() - startTime.valueOf()) / 1000;
  //   return timeElapsed >= debounceTime;
  // };

  // const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>()
  let typingTimeout: NodeJS.Timeout = null;
  // const debouncedOnSearch = debounce(onSearch, 700);

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1, padding: 5 }}>
        <Ionicons name="search" color={Colors.white} size={23} />
        <TextInput
          autoFocus
          onStartShouldSetResponder={(e) => {
            console.log(e);
            return true;
          }}
          onResponderRelease={(e) => {
            console.log("released", e);
            return true;
          }}
          // onEndEditing={() => console.log("123")}
          // onTouchEnd={() => console.log(123123123)}

          // onResponderRelease={() => console.log("onRelease")}
          // onResponderStart={() => console.log("onStart")}
          // onTouchStart={() => console.log("onStart")}
          placeholder={placeholder}
          placeholderTextColor={Colors.lightGrey2}
          style={{ marginLeft: 10, fontSize: 16, color: Colors.weakGrey, flex: 1 }}
          blurOnSubmit={false}
          value={searchText}
          onChangeText={(text) => {
            // if (typingTimeout) {
            //   console.log("cleared!!!@");
            //   clearTimeout(typingTimeout);
            // }
            // typingTimeout = setTimeout(() => , debounceTime * 1000);
            onSearch && onSearch(text);
            // startTime = new Date();
            setSearchText(text);
            // setInputValue && setInputValue(text);
            // console.log(checkIfDoneTyping());
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
