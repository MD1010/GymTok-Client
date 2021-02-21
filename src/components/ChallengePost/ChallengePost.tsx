import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IChallenge } from "../../interfaces";
import { Colors, UIConsts } from "../shared/styles/variables";
import { VideoPlayer } from "../shared/VideoPlayer";

interface ChallengePostProps {
  challenge: IChallenge;
  videoIndex: number;
  isVideoPlaying: boolean;
}

export const ChallengePost: React.FC<ChallengePostProps> = ({ challenge, videoIndex, isVideoPlaying }) => {
  const { name, video: videoURL, image, estimatedScore, description, creationTime, createdBy, _id } = challenge;
  const tags = ["balistic", "tilaba", "imayad"];
  return (
    <View style={styles.container}>
      <VideoPlayer style={styles.video} uri={videoURL} isPlaying={isVideoPlaying} resizeMode="cover" />

      <View style={styles.uiContainer}>
        <View style={styles.rightContainer}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => {
                console.log("like!");
              }}
            >
              <FontAwesome name="heart" size={40} color={Colors.white} />
            </TouchableOpacity>
            <Text style={styles.iconText}>123</Text>
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="comment-dots" size={40} color={Colors.white} />
            <Text style={styles.iconText}>123</Text>
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="running" size={40} color={Colors.white} />
            <Text style={styles.iconText}>Try</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.creator}>@{createdBy}</Text>
            <Text style={styles.info}>{name}</Text>
            <View style={styles.tagsContainer}>
              {tags.map((tag, i) => (
                <Text key={i} style={styles.tag}>{`#${tag}`}</Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height - UIConsts.bottomNavbarHeight,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  uiContainer: {
    height: "100%",
    justifyContent: "flex-end",
  },
  rightContainer: {
    alignSelf: "flex-end",
    height: 300,
    marginRight: 10,
    marginBottom: 10,
  },
  infoContainer: {
    alignSelf: "flex-start",
    width: "80%",
    marginLeft: 5,
    bottom: 15,
    padding: 10,
  },

  creator: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: "bold",
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  info: {
    marginTop: 7,
    color: Colors.white,
  },
  challengeScore: {
    color: Colors.white,
    alignSelf: "flex-end",
    fontWeight: "bold",
    marginRight: 5,
    fontSize: 20,
  },
  tag: {
    color: Colors.white,
    fontWeight: "bold",
    marginRight: 6,
    fontSize: 15,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  iconText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 12,
  },
});
