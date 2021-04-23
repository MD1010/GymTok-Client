import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useRef, useCallback } from "react";

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, Dimensions, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import { SearchResults } from "./SearchResult2";
import Spinner from "react-native-loading-spinner-overlay";
import { GenericComponent } from "../Profile/genericComponent";
import { Item } from "../Profile/interfaces";
import debounce from "lodash/debounce";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";

const challenges: Item[] = [
  {
    _id: 1,
    url: "http://10.0.0.44:8000/cda641c5-b707-4511-bbf0-7801e9e2177f.mp4",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
  {
    _id: 2,
    url: "http://10.0.0.44:8000/7b910ff9-7f85-4fb5-a0e3-bc13f05ae732.mp4",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
  {
    _id: 3,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
    component: <Text>Flying #tennis{"\n"} #tennisgirl</Text>,
  },
  {
    _id: 4,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
];

export const CustomSearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [masterDataSource, setMasterDataSource] = useState([]);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [relvantItems, setRelavantItems] = useState<Item[] | undefined>(undefined);
  const route = useRoute<any>();

  useEffect(() => {
    fetchHashtags('');
  }, []);

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

    console.log("hashtag" + hashtag);
    
    setSearch(hashtag.hashtag);
    setIsModalVisible(false);
    handleSubmit(hashtag._id);
  };

  const handleSubmit = async (hashtagId: string) => {
    setIsLoading(true);
    const { res } = await fetchAPI(RequestMethod.GET, `${process.env.BASE_API_ENPOINT}/challenges/hashtag/${hashtagId}`);
    setIsLoading(false);
    setRelavantItems(res);
  };

  return (
    <SafeAreaView style={{ flex: 1, height: Dimensions.get("screen").height, width: Dimensions.get("screen").width }}>
      <View style={styles.container}>
        <Spinner visible={isLoading} textLoading={"Loading..."} textStyle={{ color: "#FFF" }} />

        <SearchBar
          style={{ height: 40 }}
          onFocus={() => setIsModalVisible(true)}
          onSubmitEditing={(event) => handleSubmit(event.nativeEvent.text)}
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => {
            setSearch(text);
            fetchHashtags(text)
          }}
          placeholder="Type Here..."
          value={search}
        />

        {isModalVisible && (
          <SearchResults dataSource={masterDataSource} handleSelectItem={handleSelectItem} />
        )}
        {relvantItems !== undefined && (
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, margin: 5 }}>Videos</Text>
            <GenericComponent
              items={relvantItems}
              numColumns={2}
              pictureHeight={200}
              //customStyle={{ height: Dimensions.get("screen").height - UIConsts.bottomNavbarHeight }}
            />
          </View>
        )}

        {/* <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
  },
  itemStyle: {
    padding: 10,
  },
});
