import { FontAwesome } from "@expo/vector-icons";
import React, { memo } from "react";
import { Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { IChallenge } from "../../interfaces";
import { Colors } from "../shared/styles/variables";
import { Player } from "../shared/VideoPlayer";
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
            <FontAwesome name={"heart"} size={22} color={Colors.lightGrey} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("comment!")}>
            <FontAwesome name={"comment"} size={22} color={Colors.lightGrey} />
          </TouchableOpacity>
        </View>

        <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
          <View style={[styles.rowContainer, { marginRight: 10 }]}>
            <FontAwesome name={"heart"} size={13} color={Colors.lightGrey} />

            <Text style={styles.amount}>138k</Text>
          </View>
          <View style={styles.rowContainer}>
            <FontAwesome name={"comment"} size={13} color={Colors.lightGrey} />
            <Text style={styles.amount}>289</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export const Challenge: React.FC<any> = memo(({ challenge, isVideoPlaying }) => {
  const { name, video: videoURL, image, estimatedScore, description, creationTime, createdBy, _id } = challenge;
  console.log("render challenge!");

  const streaminServerUrl = `http://193.106.55.109:8000/${videoURL}`;
  // const streaminServerUrl = `http://192.168.0.107:8000/${videoURL}`;
  return (
    <View style={styles.container}>
      <Player style={styles.video} uri={streaminServerUrl} isPlaying={isVideoPlaying} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <Heading createdBy={createdBy} />

        <View style={styles.rowContainer}>
          <Text style={styles.info}>{"My Challenge"}</Text>
        </View>

        <UIContainer />
      </View>
    </View>
  );
});
