import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import debounce from "lodash/debounce";
import React, { FC, useCallback, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Avatar, colors } from "react-native-elements";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Circle, Rect } from "react-native-svg";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import { IUser } from "../../interfaces";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Colors } from "../shared";
import { SearchInput } from "../shared/SearchInput";

const UserWithAvatar: FC<{ username: string; fullName: string }> = ({ fullName, username }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Avatar source={require("../../../assets/avatar/user.png")} rounded size={48}></Avatar>
    <View>
      <Text style={styles.userFullName}>{fullName}</Text>
      <Text style={styles.username}>@{username}</Text>
    </View>
  </View>
);

interface IUserListProps {
  results: IUser[];
  onUserSelect?: (...args) => any;
  onUserRemove?: (index: number) => any;
}
export const UserList: FC<IUserListProps> = ({ results, onUserSelect, onUserRemove }) => (
  <FlatList
    keyExtractor={(_, i) => i.toString()}
    data={results}
    renderItem={({ item: { fullName, username }, index }) => (
      <TouchableWithoutFeedback onPress={() => (onUserSelect ? onUserSelect({ fullName, username }) : null)}>
        <View
          style={{
            // height: 50,
            marginBottom: 15,
            // paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // backgroundColor: "red",
            flex: 1,
          }}
        >
          <UserWithAvatar fullName={fullName} username={username} />
          {onUserRemove ? (
            <TouchableWithoutFeedback>
              <Ionicons name="close-outline" size={29} color={"white"} onPress={() => onUserRemove(index)} />
            </TouchableWithoutFeedback>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    )}
  ></FlatList>
);
interface SearchUsersScreenProps {}

export const SearchUsersScreen: React.FC<SearchUsersScreenProps> = ({}) => {
  const navigation = useNavigation();
  const [results, setResults] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const selectUser = (user) => {
    navigation.navigate("TagPeople", { selectedUser: user });
  };

  const Skeletons = () => (
    <FlatList
      keyExtractor={(_, i) => i.toString()}
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
    }, 400),
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
          onResetSearch={() => setResults([])}
          placeholder={"Search a user"}
          onSearch={(termToSearch) => {
            !isLoading && setIsLoading(true);
            fetchUsers(termToSearch);
          }}
        />
      </View>
      <View style={{ flex: 1, margin: 10 }}>
        {isLoading ? <Skeletons /> : <UserList onUserSelect={selectUser} results={results} />}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  userFullName: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: "bold",
    marginLeft: 10,
  },

  username: {
    fontSize: 13,
    color: Colors.white,
    marginLeft: 10,
  },
});
