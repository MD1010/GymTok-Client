import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useRef, useCallback } from "react";

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, Dimensions, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import { SearchResults } from "./SearchResult";
import Spinner from "react-native-loading-spinner-overlay";
import { GenericComponent } from "../Profile/genericComponent";
import { Item } from "../Profile/interfaces";
import debounce from "lodash/debounce";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Colors, UIConsts } from "../shared";



export const CustomSearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [masterDataSource, setMasterDataSource] = useState([]);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [relvantItems, setRelavantItems] = useState<Item[] | undefined>(undefined);
  const route = useRoute<any>();


  useEffect(() => {
    if (route.params?.searchText) {
      console.log('innnn');
      
      setSearch(route.params?.searchText);
    }
  }, [route.params]);

  const fetchHashtags = useCallback(
    debounce(async (searchTerm: string) => {
      const { res } = await fetchAPI(RequestMethod.GET, `${process.env.BASE_API_ENPOINT}/hashtags`, null, {
        searchTerm,
      });
      res && setMasterDataSource(res);
      
      setIsLoading(false);
    }, 400),
    []
  );

  const handleSelectItem = (hashtag) => {
    setSearch(hashtag.hashtag);
    setIsModalVisible(false);
    handleSubmit(hashtag._id);
  };

  const handleSubmit = async (hashtagId: string) => {
    setIsLoading(true);
    const { res } = await fetchAPI(RequestMethod.GET, `${process.env.BASE_API_ENPOINT}/challenges/hashtag/${hashtagId}`);
    setIsLoading(false);

    res.map(challenge => {
      challenge.component = <Text style={{ color: Colors.white }}>{challenge.description}</Text>;
    });

    setRelavantItems(res);
  };

  return (
    <SafeAreaView style={{ flex: 1, height: Dimensions.get("screen").height, width: Dimensions.get("screen").width }}>
      <View style={styles.container}>
        <Spinner visible={isLoading} textLoading={"Loading..."} textStyle={{ color: "#FFF" }} />

        <SearchBar
          style={{ height: 40 }}
          onFocus={() => {
            fetchHashtags('');
            setIsModalVisible(true)
          }}
          onSubmitEditing={(event) => handleSubmit(event.nativeEvent.text)}
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => {
            setSearch(text);
            fetchHashtags(text);
          }}
          placeholder="Type Here..."
          value={search}
        />

        {isModalVisible && (
          <SearchResults dataSource={masterDataSource} handleSelectItem={handleSelectItem} />
        )}
        {relvantItems !== undefined && (
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, margin: 5, color: Colors.white }}>Videos</Text>
            <GenericComponent items={relvantItems} numColumns={2} pictureHeight={200} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    flexDirection: "column",
  },
  itemStyle: {
    padding: 10,
  },
});
