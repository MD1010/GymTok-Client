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
                <Text style={styles.hastagName}>
                    # {hashtag}
                </Text>
            </View>
            <GenericComponent items={posts} horizontal={true} />
        </View>);
};

const styles = StyleSheet.create({
    hashtagContainer: {
        flex: 1
    },
    hashtagDetails: {
        marginLeft: 10
    },
    hastagName: {
        color: Colors.white,
        fontSize: 20
    }
});
