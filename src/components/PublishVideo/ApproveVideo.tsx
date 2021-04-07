import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { memo, useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "../shared/styles/variables";
import { Player } from "../shared/VideoPlayer";
import { styles } from "../Challenge/Challenge.style";
import { RouteProp, useRoute } from "@react-navigation/native";

type StackParamsList = {
  params: { videoURL: string };
};

interface IUIContainer {
  goBack: () => void;
  goForward: () => void;
}

const UIContainer: React.FC<IUIContainer> = ({ goBack, goForward }) => {
  return (
    <>
      <View style={styles.uiContainer}>
        <View style={[styles.rowContainer, { width: 60, justifyContent: "space-between" }]}>
          <TouchableOpacity onPress={() => goBack()}>
            <Text>Retake</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
          <TouchableOpacity onPress={() => goForward()}>
            <Text>Use Video</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export const ApproveVideo: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamsList, "params">>();
  const videoURL = route.params.videoURL;

  const goBack = () => {
    navigation.goBack();
  };

  const goForward = () => {
    navigation.navigate("Publish", { videoUri: videoURL });
  };

  return (
    <View style={[styles.container]}>
      <Player style={styles.video} uri={videoURL} isPlaying={true} resizeMode="cover" />
      {/* <View style={styles.infoContainer}>
        <UIContainer goBack={goBack} goForward={goForward} />
      </View> */}
      <UIContainer goBack={goBack} goForward={goForward} />
    </View>
  );
};
