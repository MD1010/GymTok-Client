import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, Platform } from "react-native";
import { Avatar, SearchBar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { IPopularHashtags, IPost } from "../../interfaces";
import { formatDate } from "../../utils/date";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { GenericComponent } from "../Profile/genericComponent";
import { Colors, Loader } from "../shared/";
import { PopularHashtag } from "./PopularHashtag";

import { SearchResults } from "./SearchResult";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface MainDiscoverProps {}

const POPULAR_HASHTAGS_COUNT = 4;

export const MainDiscover: React.FC<MainDiscoverProps> = ({}) => {
  const navigation = useNavigation();
  const [popularHashtags, setPopularHashtags] = useState<IPopularHashtags>({});

  const [search, setSearch] = useState("");
  const [masterDataSource, setMasterDataSource] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [relvantItems, setRelavantItems] = useState<IPost[] | undefined>(undefined);
  const route = useRoute<any>();

  const loadPopularHashtags = async () => {
    const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/hashtags/popular?popularCount=${POPULAR_HASHTAGS_COUNT}`;
    const { res } = await fetchAPI(RequestMethod.GET, challengesEndpoint);

    res && setPopularHashtags(res);
  };
  useEffect(() => {
    loadPopularHashtags();

    return () => navigation.removeListener("blur", null);
  }, []);

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

  const handleSubmit = async (hashtagId: string) => {
    setIsLoading(true);
    const { res } = await fetchAPI(RequestMethod.GET, `${process.env.BASE_API_ENPOINT}/posts/hashtag/${hashtagId}`);

    setIsLoading(false);

    // res.map((challenge) => {
    //   challenge.component = <Text style={{ color: Colors.white }}>{challenge.description}</Text>;
    // });

    setRelavantItems(res);
  };

  const handleSelectItem = (hashtag) => {
    setSearch(hashtag.hashtag);

    setIsModalVisible(false);
    handleSubmit(hashtag._id);
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
            marginTop: 5,
          }}
        >
          <View style={{ flexDirection: "row", paddingHorizontal: 5, marginBottom: 10 }}>
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
            {formatDate(item?.publishDate)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.exploreContainer}>
      <View style={{ flex: 1 }}>
        <SearchBar
          platform={Platform.OS === "android" ? "android" : "ios"}
          containerStyle={{ backgroundColor: Colors.darkBlue }}
          inputContainerStyle={{ backgroundColor: Colors.darkBlueOpaque }}
          inputStyle={{ color: Colors.weakGrey }}
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
          onCancel={() => setIsModalVisible(false)}
          onClear={() => setIsModalVisible(false)}
        />
      </View>

      <View style={{ flex: 11 }}>
        {isModalVisible && <SearchResults dataSource={masterDataSource} handleSelectItem={handleSelectItem} />}
        {relvantItems !== undefined && search.length > 0 ? (
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, padding: 10, color: Colors.white }}>Videos</Text>
            <GenericComponent
              items={relvantItems}
              numColumns={2}
              pictureHeight={300}
              renderFooter={(item: IPost) => renderFooter(item)}
              renderBottomVideo={(item: IPost) => renderBottomVideo(item, 300)}
              gifStyle={{ margin: 5 }}
              containerStyle={{ paddingBottom: 30 }}
            />
          </View>
        ) : (
          <ScrollView>
            {Object.keys(popularHashtags).map((hashtag, key) => {
              return (
                // <View key={key} style={styles.hashtagContainer}>
                <PopularHashtag key={key} hashtag={hashtag} posts={popularHashtags[hashtag]} />
                // </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  exploreContainer: {
    flex: 4,
    backgroundColor: Colors.darkBlueOpaque,
  },
  hashtagContainer: {},
});
