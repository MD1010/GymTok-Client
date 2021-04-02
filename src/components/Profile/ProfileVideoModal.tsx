import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ChallengesContainer } from "../Challenge/ChallengesContainer";
import { useRoute } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/stack";

export const ProfileVideoModal: React.FC = () => {
  const route = useRoute<any>();
  const headerHeight = useHeaderHeight();

  return (
    <View style={styles.modalView}>
      <ChallengesContainer
        currentVideoID={route.params.videoURL?.split("/")[3]}
        getOnlyUserChallenges={true}
        containerStyle={{ height: Dimensions.get("screen").height - headerHeight }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: Dimensions.get("screen").height,
  },
});
