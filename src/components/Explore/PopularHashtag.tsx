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
            <View style={styles.popularHashtagDetails}>
                <View style={styles.hashtagDetails}>
                    <View style={styles.circle}>
                        <Text style={styles.hashtag}>
                            #
                    </Text>
                    </View>
                    <Text style={styles.hashtagName}>
                        {hashtag}
                    </Text>
                </View>

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
    popularHashtagDetails: {
        marginLeft: 10,
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    hashtagDetails: {
        flexDirection: "row"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        textAlign: 'center',
        borderColor: Colors.darkGrey,
    },
    hashtag: {
        textAlign: "center",
        textAlignVertical: "center",
        color: Colors.white,
        fontSize: 20
    },
    hashtagName: {
        marginLeft: 5,
        color: Colors.white,
        fontSize: 20
    },
    postsCount: {
        color: Colors.white,
        marginRight: 15
    }
});
