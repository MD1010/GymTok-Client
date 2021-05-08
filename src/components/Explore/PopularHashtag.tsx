import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { IPost } from "../../interfaces";
import { GenericComponent } from "../Profile/genericComponent";
import { Colors } from "../shared";

interface PopularHashtagProps {
    hashtag: string;
    posts: IPost[]
}

export const PopularHashtag: React.FC<PopularHashtagProps> = ({ hashtag, posts }) => {
    return (
        <View style={styles.hashtagContainer}>
            <View style={styles.hashtagDetails}>
                <Text style={styles.hashtagName}>
                    # {hashtag}
                </Text>
                <Text style={styles.postsCount}>
                    {posts.length}
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <GenericComponent items={posts} horizontal={true} />
            </View>
        </View>);
};

const styles = StyleSheet.create({
    hashtagContainer: {
        position: "relative",
        marginBottom: 30,
    },
    hashtagDetails: {
        marginLeft: 10,
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    hashtagName: {
        color: Colors.white,
        fontSize: 20
    },
    postsCount: {
        color: Colors.white,
        marginRight: 15
    }
});
