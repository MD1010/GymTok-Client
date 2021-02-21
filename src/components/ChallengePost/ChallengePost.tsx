import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { IChallenge } from "../../interfaces";
import { Colors } from "../shared/styles/variables";
import { VideoPlayer } from "../shared/VideoPlayer";
import { styles } from "./ChallengePosts.style";

interface ChallengePostProps {
  challenge: IChallenge;
  isVideoPlaying: boolean;
}

export const ChallengePost: React.FC<ChallengePostProps> = ({ challenge, isVideoPlaying }) => {
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
