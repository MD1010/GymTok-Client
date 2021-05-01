import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesome } from "@expo/vector-icons";
// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, Dimensions, ScrollView } from "react-native";
import { Avatar, SearchBar } from "react-native-elements";
import { SearchResults } from "./SearchResult";
import Spinner from "react-native-loading-spinner-overlay";
import { GenericComponent } from "../Profile/genericComponent";
import { Item } from "../Profile/interfaces";
import debounce from "lodash/debounce";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Colors, UIConsts } from "../shared";
import { IPost } from "../../interfaces";

export const CustomSearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [masterDataSource, setMasterDataSource] = useState([]);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [relvantItems, setRelavantItems] = useState<IPost[] | undefined>(undefined);
  const route = useRoute<any>();

  // useEffect(() => {
  //   if (route.params?.searchText) {
  //     console.log("innnn");
  //     console.log("search text dovvvv", route.params?.searchText);

  //     setSearch(route.params?.searchText);
  //   }
  // }, [route.params]);

  useEffect(() => {
    console.log("search text dovvvv", search);
  }, [search]);

  const fetchHashtags = useCallback(
    debounce(async (searchTerm?: string) => {
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
    const { res } = await fetchAPI(RequestMethod.GET, `${process.env.BASE_API_ENPOINT}/posts/hashtag/${hashtagId}`);

    setIsLoading(false);

    // res.map((challenge) => {
    //   challenge.component = <Text style={{ color: Colors.white }}>{challenge.description}</Text>;
    // });

    setRelavantItems(res);
  };

  const renderFooter = (item: IPost) => {
    return (
      <View>
        <Text style={{ color: Colors.white, marginTop: 3, margin: 5, fontWeight: "bold" }}>{item?.description}</Text>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: Dimensions.get("screen").width / 2 - 10,
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", margin: 5 }}>
            <Avatar
              source={
                item?.createdBy?.image ? { uri: item?.createdBy?.image } : require("../../../assets/avatar/user.png")
              }
              rounded
            />
            <Text style={{ color: Colors.darkGrey, alignSelf: "center", marginLeft: 5 }}>
              {item?.createdBy?.username}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <FontAwesome style={{ alignSelf: "center" }} name={"heart-o"} size={13} color={Colors.darkGrey} />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "bold",
                marginLeft: 5,
                color: Colors.darkGrey,
              }}
            >
              {item?.likes?.length}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderBottomVideo = (item: IPost, picHeight: number) => {
    return (
      <View style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", height: picHeight }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
          <Text style={{ color: Colors.white, fontWeight: "bold", fontSize: 12, margin: 3 }}>
            {item.publishDate.toString().split("T")[0]}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, height: Dimensions.get("screen").height, width: Dimensions.get("screen").width }}>
      <View style={styles.container}>
        <Spinner visible={isLoading} textLoading={"Loading..."} textStyle={{ color: "#FFF" }} />

        <SearchBar
          containerStyle={{ backgroundColor: Colors.black }}
          style={{ height: 40 }}
          onFocus={() => {
            fetchHashtags();
            setIsModalVisible(true);
          }}
          onSubmitEditing={(event) => handleSubmit(event.nativeEvent.text)}
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => {
            console.log("on change text ", text);

            setSearch(text);
            fetchHashtags(text);
          }}
          placeholder="Type Here..."
          value={search}
        />

        {isModalVisible && <SearchResults dataSource={masterDataSource} handleSelectItem={handleSelectItem} />}
        {relvantItems !== undefined && (
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, margin: 5, color: Colors.white }}>Videos</Text>
            <GenericComponent
              items={relvantItems}
              numColumns={2}
              pictureHeight={300}
              renderFooter={(item: IPost) => renderFooter(item)}
              renderBottomVideo={(item: IPost) => renderBottomVideo(item, 300)}
              gifStyle={{ width: Dimensions.get("screen").width / 2 - 10 }}
              customStyle={{ margin: 5, width: Dimensions.get("screen").width / 2 - 10 }}
            />
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
