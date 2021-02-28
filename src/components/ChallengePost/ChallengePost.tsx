import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements";
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
  const streaminServerUrl = `${process.env.STREAMING_SERVER_ENPOINT}/${videoURL}`;
  const tags = ["balistic", "tilaba", "imayad"];
  return (
    <View style={styles.container}>
      <VideoPlayer style={styles.video} uri={streaminServerUrl} isPlaying={isVideoPlaying} resizeMode="cover" />

      <View style={styles.rightContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              console.log("like!");
            }}
          >
            <FontAwesome name="heart" size={32} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.iconText}>123</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image
            style={{ width: 32, height: 32 }}
            resizeMode={"contain"}
            source={require("../../../assets/icons/comment.png")}
          ></Image>
          {/* <FontAwesome name={"commenting"} size={35} color="white" /> */}
          <Text style={styles.iconText}>123</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image
            style={{ width: 32, height: 32 }}
            resizeMode={"contain"}
            source={require("../../../assets/icons/share.png")}
          ></Image>
          {/* <FontAwesome5 name="running" size={35} color={Colors.white} /> */}
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
  );
};
