import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IPopularHashtags } from "../../interfaces";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Colors, Loader } from "../shared/";
import { PopularHashtag } from "./PopularHashtag";

interface MainDiscoverProps { }

const POPULAR_HASHTAGS_COUNT = 4;

export const MainDiscover: React.FC<MainDiscoverProps> = ({ }) => {
    const navigation = useNavigation();
    const [popularHashtags, setPopularHashtags] = useState<IPopularHashtags>({})

    const loadPopularHashtags = async () => {
        const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/hashtags/popular?popularCount=${POPULAR_HASHTAGS_COUNT}`;
        const { res } = await fetchAPI(RequestMethod.GET, challengesEndpoint);

        res && setPopularHashtags(res);

    };
    useEffect(() => {
        loadPopularHashtags();

        return () => navigation.removeListener("blur", null);

    }, []);


    return (
        <View style={styles.exploreContainer}>
            <ScrollView>
                {Object.keys(popularHashtags).map((hashtag, key) => {
                    return (
                        // <View key={key} style={styles.hashtagContainer}>
                        <PopularHashtag key={key} hashtag={hashtag} posts={popularHashtags[hashtag]} />
                        // </View>
                    );
                })}
            </ScrollView>
        </View>);
};

const styles = StyleSheet.create({
    exploreContainer: {
        flex: 4,
        paddingTop: 25,
        backgroundColor: Colors.darkBlueOpaque,

    },
    hashtagContainer: {
    }
});
