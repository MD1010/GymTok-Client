import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { memo, useContext, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "../shared/styles/variables";
import { Player } from "../shared/VideoPlayer";
import { RouteProp, useRoute } from "@react-navigation/native";

type StackParamsList = {
  params: { videoURL: string; postId: string; isReply: boolean };
};

interface IUIContainer {
  goBack: () => void;
  goForward: () => void;
}

const UIContainer: React.FC<IUIContainer> = ({ goBack, goForward }) => {
  return (
    <>
      <View style={styles.uiContainer}>
        <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: "#fff", fontSize: 18 }}>Retake</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
          <TouchableOpacity onPress={() => goForward()}>
            <Text style={{ color: "#fff", fontSize: 16 }}>Use Video</Text>
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
    const navigationParams = { videoUri: videoURL };
    if (route.params && route.params.isReply) {
      navigationParams["isReply"] = route.params.isReply;
      navigationParams["postId"] = route.params.postId;
    }
    navigation.navigate("Publish", navigationParams);
  };

  return (
    <View style={styles.container}>
      <Player style={styles.video} uri={videoURL} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <UIContainer goBack={goBack} goForward={goForward} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("screen").height,
    flex: 1,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  uiContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: "red",
  },

  infoContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
  },
});
