import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StatusBar, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IChallenge } from "../../interfaces/Challenge";
import { VideoPlayer } from "../shared/VideoPlayer";
import { FontAwesome } from "@expo/vector-icons";
import { Colors, UIConsts } from "../shared/styles/variables";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
interface ChallengesProps {
  challenges: IChallenge[];
}

export const HomeScreen: React.FC<ChallengesProps> = ({ challenges }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(0);
  const scrollEnded = useRef<boolean>(false);
  const navigation = useNavigation();
  const [isPausedVideo, setPausedVideo] = useState(false);

  useEffect(() => {
    navigation.addListener("blur", () => {
      setPausedVideo(true);
    });
    return () => {
      navigation.removeListener("blur", null);
    };
  }, [navigation]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      setPausedVideo(false);
    });
    return () => {
      navigation.removeListener("focus", null);
    };
  }, [navigation]);

  const renderChallengeVideo = (challenge: IChallenge, videoIndex: number) => {
    const { name, video: videoURL, image, estimatedScore, description, creationTime, createdBy, _id } = challenge;
    const tags = ["balistic", "tilaba", "imayad"];
    return (
      <View style={styles.container}>
        <VideoPlayer
          style={styles.video}
          uri={videoURL}
          isPlaying={videoIndex === currentlyPlaying && !isPausedVideo}
          resizeMode="cover"
        />

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

  // track view changes in order to control when video is starting to play
  const onViewRef = useRef(({ viewableItems }) => {
    // change playing video only after user stop dragging
    scrollEnded.current && setCurrentlyPlaying(viewableItems[0]?.index);
  });

  return (
    <SafeAreaView>
      <StatusBar barStyle={"light-content"} />
      <FlatList
        data={challenges}
        renderItem={({ item, index }) => renderChallengeVideo(item, index)}
        keyExtractor={(challenge) => challenge._id}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get("window").height}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        onViewableItemsChanged={onViewRef.current}
        onScrollEndDrag={() => (scrollEnded.current = true)}
        onScrollBeginDrag={() => (scrollEnded.current = false)}
      ></FlatList>
    </SafeAreaView>
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
