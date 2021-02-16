import { useNavigation } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useLayoutEffect } from "react";
import { FlatList, StatusBar } from "react-native";
import styled from "styled-components/native";
import { IChallenge } from "../../interfaces/Challenge";
import { Challenge } from "./Challenge";

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
    <Container>
      <StatusBar barStyle={"light-content"} />
      <FlatList
        data={challenges}
        renderItem={(c) => <Challenge challenge={c.item} />}
        keyExtractor={(item) => item._id}
      ></FlatList>
    </Container>
  );
};
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding: 14px;
`;
