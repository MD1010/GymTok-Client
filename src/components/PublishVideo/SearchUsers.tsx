import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { CommonActions } from "@react-navigation/native";
import debounce from "lodash/debounce";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { IUser } from "../../interfaces";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Colors } from "../shared";
import { SearchInput } from "../shared/SearchInput";
import { UserSkeletons } from "../shared/skeletons/UserSkeletons";
import { UserList } from "../shared/UserList";

export const SearchUsersScreen: React.FC = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const selectUser = (user) => {
    navigation.dispatch((state) => {
      // Remove the SearchUser route from the stack
      const routes = state.routes.filter((r) => r.name !== "SearchUser");

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });

    navigation.navigate("TagPeople", { selectedUser: user });
  };

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
        {isLoading ? <UserSkeletons /> : <UserList onUserSelect={selectUser} results={results} />}
      </View>
    </View>
  );
};
