import React from "react";
import { Text } from "react-native";
import { IChallenge } from "../../interfaces";
import * as S from "./Challenges.style";

interface ChallengeProps {
  challenge: IChallenge;
}

export const Challenge: React.FC<ChallengeProps> = ({ challenge }) => {
  const { name, video, image, estimatedScore, description, creationTime, createdBy } = challenge;
  return (
    <S.ChallengeCard>
      <S.ChallengeCard.Title>{name}</S.ChallengeCard.Title>
      <Text>{`created by  ${createdBy}`}</Text>
      <Text>{`creation time  ${creationTime}`}</Text>
      <Text>{`score ${estimatedScore}`}</Text>
      <Text>{`image  ${image}`}</Text>
      <Text>{`video ${video}`}</Text>
      <Text>Here will be the description of the challenge</Text>
      {/* <Text>{description}</Text> */}
    </S.ChallengeCard>
  );
};
