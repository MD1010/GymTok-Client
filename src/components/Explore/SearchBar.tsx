import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, Dimensions } from "react-native";
import { SearchBar } from "react-native-elements";
import { SearchResults } from "./SearchResult2";

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

export const CustomSearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const navigation = useNavigation();
  const route = useRoute<any>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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
  };

  return (
    <SafeAreaView style={{ flex: 1, height: Dimensions.get("screen").height, width: Dimensions.get("screen").width }}>
      <View style={styles.container}>
        <SearchBar
          style={{ height: 40 }}
          onFocus={() => setIsModalVisible(true)}
          onSubmitEditing={() => setIsModalVisible(false)}
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
          placeholder="Type Here..."
          value={search}
        />
        {isModalVisible && (
          <SearchResults filteredDataSource={filteredDataSource} handleSelectItem={handleSelectItem} />
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
