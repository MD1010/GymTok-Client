import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Card } from "react-native-elements";
import styled from "styled-components/native";
import { IChallenge } from "../../interfaces";
import { VideoPlayer } from "../shared/VideoPlayer";

interface ChallengeProps {
  challenge: IChallenge;
}

export const Challenge: React.FC<ChallengeProps> = ({ challenge }) => {
  const { name, video: videoURL, image, estimatedScore, description, creationTime, createdBy, _id } = challenge;
  return (
    <View style={styles.container}>
      <VideoPlayer style={styles.video} uri={videoURL} id={_id} />
    </View>
  );
};

const Header = styled(Card.Title)`
  text-align: left;
`;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
