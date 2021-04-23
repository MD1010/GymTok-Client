import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, Dimensions, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import { SearchResults } from "./SearchResult2";
import Spinner from "react-native-loading-spinner-overlay";
import { GenericComponent } from "../Profile/genericComponent";
import { Item } from "../Profile/interfaces";
import { UIConsts } from "../shared";

const ITEMS = [
  {
    id: 1,
    title: "fgfgfg",
  },
  {
    id: 2,
    title: "fgfgfg",
  },
  {
    id: 3,
    title: "fgfgfg",
  },
];

const challenges: Item[] = [
  {
    _id: 1,
    video: "http://193.106.55.109:8000/video/cda641c5-b707-4511-bbf0-7801e9e2177f.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
  {
    _id: 2,
    video: "http://193.106.55.109:8000/video/7b910ff9-7f85-4fb5-a0e3-bc13f05ae732.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
  {
    _id: 3,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
    component: <Text>Flying #tennis{"\n"} #tennisgirl</Text>,
  },
  {
    _id: 4,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
  {
    _id: 5,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
  {
    _id: 6,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
  },
  {
    _id: 7,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
  },
  {
    _id: 8,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
  },
  {
    _id: 9,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
  },
  {
    _id: 10,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "300K",
  },
  {
    _id: 11,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
  },
  {
    _id: 12,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
  },
  {
    _id: 13,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
  },
  {
    _id: 14,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
  },
  {
    _id: 15,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
  },
  {
    _id: 16,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
  },
  {
    _id: 17,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
  },
  {
    _id: 18,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
  },
  {
    _id: 19,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
  },
  {
    _id: 20,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "100K",
  },
  {
    _id: 21,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "200K",
  },
  {
    _id: 22,
    video: "http://193.106.55.109:8000/video/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    gif: "http://193.106.55.109:8000/gif/662de7eb-7ec8-41a9-b58d-b657b6fec985.gif",
    numOfLikes: "300K",
  },
];

export const CustomSearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const navigation = useNavigation();
  const route = useRoute<any>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [relvantItems, setRelavantItems] = useState<Item[] | undefined>(undefined);

  useEffect(() => {
    setFilteredDataSource(ITEMS);
    setMasterDataSource(ITEMS);
  }, []);

  useEffect(() => {
    if (route.params?.searchText) {
      setSearch(route.params?.searchText);
    }
  }, [route.params]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const handleSelectItem = (title) => {
    setSearch(title);
    setIsModalVisible(false);
    handleSubmit(title);
  };

  const handleSubmit = async (title: string) => {
    setIsLoading(true);
    // need to be fetch
    await delay(5000);
    console.log("finish delay!!!!!!!!!!!");
    setIsLoading(false);
    setRelavantItems(challenges);
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={() => searchFilterFunction("")}
          placeholder="Type Here..."
          value={search}
        />
        {isModalVisible && (
          <SearchResults filteredDataSource={filteredDataSource} handleSelectItem={handleSelectItem} />
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
