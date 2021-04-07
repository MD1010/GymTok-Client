import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { CommonActions, RouteProp, useRoute } from "@react-navigation/native";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Colors } from "../shared";
import { HashtagsList } from "../shared/HashtagsList";
import { SearchInput } from "../shared/SearchInput";
import { UserSkeletons } from "../shared/skeletons/UserSkeletons";

type StackParamsList = {
  params: { excludedHashtagsToSearch: string[] };
};

export const SearchHashtagsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute<RouteProp<StackParamsList, "params">>();
  const excludedIdsToSearch = route.params?.excludedHashtagsToSearch?.map((hashtags) => hashtags) || [];

  const selectHashtag = (hashtag) => {
    navigation.dispatch((state) => {
      // Remove the SearchTags route from the stack
      const routes = state.routes.filter((r) => r.name !== "SearchHashtags");

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
    navigation.navigate("AddHashtag", { selectedHashtags: [hashtag] });
  };

  const fetchHashtags = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm) {
        const { res } = await fetchAPI(RequestMethod.GET, `${process.env.BASE_API_ENPOINT}/challenges/hashtags`, null, {
          searchTerm,
          excludedIds: excludedIdsToSearch,
        });
        res && setResults(res.hashtags);        
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
          placeholder={"Search a hashtags"}
          onSearch={(termToSearch) => {
            !isLoading && setIsLoading(true);
            fetchHashtags(termToSearch);
          }}
        />
      </View>
      <View style={{ flex: 1, margin: 10 }}>
        {isLoading ? <UserSkeletons /> : <HashtagsList onHashtagSelect={selectHashtag} results={results} />}
      </View>
    </View>
  );
};
