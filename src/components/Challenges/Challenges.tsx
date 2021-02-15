import { useNavigation } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useLayoutEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { IChallenge } from "../../interfaces/Challenge";
import { Challenge } from "./Challenge";
import * as S from "./Challenges.style";
interface ChallengesProps {
  challenges: IChallenge[];
}

export const ChallengesScreen: React.FC<ChallengesProps> = ({ challenges }) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Challenges",
    } as StackNavigationOptions);
  }, [navigation]);

  return (
    <S.ChallengesList>
      <FlatList
        data={challenges}
        renderItem={(c) => <Challenge challenge={c.item} />}
        keyExtractor={(item) => item._id}
      ></FlatList>
    </S.ChallengesList>
  );
};
