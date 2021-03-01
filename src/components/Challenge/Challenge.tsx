import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { IChallenge } from "../../interfaces";
import { Colors } from "../shared/styles/variables";
import { VideoPlayer } from "../shared/VideoPlayer";
import { styles } from "./Challenge.style";

interface ChallengeProps {
  challenge: IChallenge;
  isVideoPlaying: boolean;
}

const Heading = ({ createdBy }) => {
  return (
    <>
      <View style={[styles.rowContainer, { marginVertical: 10, justifyContent: "space-between" }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableWithoutFeedback onPress={() => console.log("avatar clicked!")}>
            <Avatar source={require("../../../assets/avatar/01.jpg")} rounded></Avatar>
          </TouchableWithoutFeedback>
          <Text style={styles.creator}>@{createdBy}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => console.log("reply to video!")}>
            <FontAwesome name={"camera"} size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const UIContainer = () => {
  return (
    <>
      <View style={styles.uiContainer}>
        <View style={[styles.rowContainer, { width: 60, justifyContent: "space-between" }]}>
          <TouchableOpacity onPress={() => console.log("like!")}>
            <FontAwesome name={"heart"} size={22} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("comment!")}>
            <FontAwesome name={"comment"} size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
          <View style={[styles.rowContainer, { marginRight: 10 }]}>
            <FontAwesome name={"heart"} size={15} color={Colors.white} />

            <Text style={styles.amount}>138k</Text>
          </View>
          <View style={styles.rowContainer}>
            <FontAwesome name={"comment"} size={15} color={Colors.white} />
            <Text style={styles.amount}>289</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export const Challenge: React.FC<ChallengeProps> = ({ challenge, isVideoPlaying }) => {
  const { name, video: videoURL, image, estimatedScore, description, creationTime, createdBy, _id } = challenge;
  console.log(challenge);
  const streaminServerUrl = `${process.env.STREAMING_SERVER_ENPOINT}/${videoURL}`;
  return (
    <View style={styles.container}>
      <VideoPlayer style={styles.video} uri={streaminServerUrl} isPlaying={isVideoPlaying} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <Heading createdBy={createdBy} />

        <View style={styles.rowContainer}>
          <Text style={styles.info}>{"My Challenge"}</Text>
        </View>

        <UIContainer />
      </View>
    </View>
  );
};
