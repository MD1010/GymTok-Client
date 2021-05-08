import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
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
                <GenericComponent
                    customStyle={{ width: Dimensions.get("window").width / 3 - 20 }}
                    items={posts}
                    horizontal={true} />
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
        flexDirection: "row",
        justifyContent: "center",
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: "center",
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
        fontSize: 18
    },
    postsCount: {
        borderRadius: 4,
        overflow: "hidden",
        borderWidth: 0.5,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: Colors.darkGrey,
        borderColor: Colors.darkGrey,
        color: Colors.white,
        marginRight: 15
    }
});
