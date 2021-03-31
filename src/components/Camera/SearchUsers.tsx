import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import { colors } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { Circle, Rect } from "react-native-svg";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Colors } from "../shared";
import { SearchInput } from "../shared/SearchInput";
import debounce from "lodash/debounce";

const Skeltons = () => (
  <FlatList
    keyExtractor={(item, i) => i.toString()}
    data={new Array(Math.round(Dimensions.get("window").height / 60))}
    renderItem={({ index }) => (
      <View style={{ height: 50, marginBottom: 15 }}>
        <SvgAnimatedLinearGradient primaryColor={colors.grey1} secondaryColor={colors.grey2}>
          <Rect x="60" y="8" rx="3" ry="3" width="88" height="10" />
          <Rect x="60" y="26" rx="3" ry="3" width="52" height="8" />
          <Circle cx="25" cy="25" r="25" />
        </SvgAnimatedLinearGradient>
      </View>
    )}
  ></FlatList>
);

interface SearchUsersScreenProps {}

export const SearchUsersScreen: React.FC<SearchUsersScreenProps> = ({}) => {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm) {
        console.log("search!!");
        const { res } = await fetchAPI(RequestMethod.GET, `${process.env.BASE_API_ENPOINT}/users`, null, {
          searchTerm,
        });
        res && setResults(res);
      }
      setIsLoading(false);
    }, 500),
    []
  );

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
        <SearchInput
          debounceTime={2}
          placeholder={"Search a user"}
          onSearch={(termToSearch) => {
            // console.log("term=-", termToSearch);
            !isLoading && setIsLoading(true);
            fetchUsers(termToSearch);
          }}
        />
      </View>
      <View style={{ flex: 1, margin: 10 }}>
        {/* <MyLoader /> */}
        {isLoading ? <Skeltons /> : null}

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
