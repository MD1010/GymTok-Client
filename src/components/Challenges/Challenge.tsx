import React from "react";
import { Text } from "react-native";
import { Card } from "react-native-elements";
import styled from "styled-components/native";
import { IChallenge } from "../../interfaces";

interface ChallengeProps {
  challenge: IChallenge;
}

export const Challenge: React.FC<ChallengeProps> = ({ challenge }) => {
  const { name, video, image, estimatedScore, description, creationTime, createdBy } = challenge;
  return (
    <Card>
      <Header>{name}</Header>
      <Card.Divider />
      <Text>{`created by  ${createdBy}`}</Text>
      <Text>{`creation time  ${creationTime}`}</Text>
      <Text>{`score ${estimatedScore}`}</Text>
      <Text>{`video ${video}`}</Text>
      <Text>{`description ${description}`}</Text>
    </Card>
  );
};

const Header = styled(Card.Title)`
  text-align: left;
`;
