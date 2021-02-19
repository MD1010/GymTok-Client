import React from "react";
import { Dimensions, FlatList, StatusBar } from "react-native";
import { IChallenge } from "../../interfaces/Challenge";
import { Challenge } from "../Challenges/Challenge";

interface ChallengesProps {
  challenges: IChallenge[];
}

const renderChallenge = (item) => {};

export const HomeScreen: React.FC<ChallengesProps> = ({ challenges }) => {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <FlatList
        data={challenges}
        renderItem={({ item }) => <Challenge challenge={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get("window").height}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
      ></FlatList>
    </>
  );
};
