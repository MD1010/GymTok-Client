import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { IPopularHashtags } from "../../interfaces";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Colors, Loader } from "../shared/";
import { PopularHashtag } from "./PopularHashtag";

interface ExploreContainerProps { }

const POPULAR_HASHTAGS_COUNT = 4;

export const ExploreContainer: React.FC<ExploreContainerProps> = ({ }) => {
  const navigation = useNavigation();
  const [popularHashtags, setPopularHashtags] = useState<IPopularHashtags>({})
  const [isLoadingPopularHashtags, setIsLoadingPopularHashtags] = useState<boolean>(true);

  const loadPopularHashtags = async () => {
    const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/hashtags/popular?popularCount=${POPULAR_HASHTAGS_COUNT}`;
    const { res } = await fetchAPI(RequestMethod.GET, challengesEndpoint);

    // console.log("res", res);

    res && setPopularHashtags(res);

    setIsLoadingPopularHashtags(false);
  };
  useEffect(() => {
    console.log("popularHashtags", popularHashtags)
    loadPopularHashtags();

    return () => navigation.removeListener("blur", null);

  }, []);


  return (
    <View style={styles.exploreContainer}>
      {isLoadingPopularHashtags && <Loader />}
      {Object.keys(popularHashtags).map((hashtag, key) => {
        return (
          <PopularHashtag key={key} hashtag={hashtag} posts={popularHashtags[hashtag]} />
        );
      })}
    </View>);
};

const styles = StyleSheet.create({
  exploreContainer: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: Colors.darkBlueOpaque,
  },
  hashtagContainer: {

  }
});
