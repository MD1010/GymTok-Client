import { FontAwesome } from "@expo/vector-icons";
import { Dimensions, Text, View } from "react-native";
import React, { memo, useState } from "react";
import { Avatar } from "react-native-elements";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { IChallenge } from "../../interfaces";
import { authSelector } from "../../store/auth/authSlice";
import { AuthModal } from "../shared/AuthModal";
import { Colors } from "../shared/styles/variables";
import { Player } from "../shared/VideoPlayer";
import { styles } from "./Challenge.style";

interface ChallengeProps {
  challenge: IChallenge;
  isVideoPlaying: boolean;
}

interface IUIContainer {
  numberOfLikes: number;
  numberOfComments: number;
  onLikeButtonPress: () => void;
  onCommentButtonPress: () => void;
}

const Heading = ({ createdBy }) => {
  const { loggedUser } = useSelector(authSelector);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  const onCammeraPressed = () => {
    if (loggedUser) {
      console.log("user:" + loggedUser?.fullName + " click on like button.");
      // todo: fetch here
    } else {
      setShowAuthModal(true);
      console.log("guest click on like button, need to log-in");
    }
  };
  return (
    <>
      {showAuthModal && !loggedUser ? (
        <View
          style={{ height: Dimensions.get("window").height - 50, width: Dimensions.get("window").width, zIndex: 100 }}
        >
          <AuthModal close={() => setShowAuthModal(false)} />
        </View>
      ) : (
        <View style={[styles.rowContainer, { marginVertical: 10, justifyContent: "space-between" }]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableWithoutFeedback onPress={() => console.log("avatar clicked!")}>
              <Avatar source={require("../../../assets/avatar/01.jpg")} rounded></Avatar>
            </TouchableWithoutFeedback>
            <Text style={styles.creator}>@{createdBy}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => onCammeraPressed()}>
              <FontAwesome name={"camera"} size={22} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const UIContainer: React.FC<IUIContainer> = ({
  numberOfComments,
  numberOfLikes,
  onLikeButtonPress,
  onCommentButtonPress,
}) => {
  return (
    <>
      <View style={styles.uiContainer}>
        <View style={[styles.rowContainer, { width: 60, justifyContent: "space-between" }]}>
          <TouchableOpacity onPress={() => onLikeButtonPress()}>
            <FontAwesome name={"heart"} size={22} color={Colors.lightGrey} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onCommentButtonPress()}>
            <FontAwesome name={"comment"} size={22} color={Colors.lightGrey} />
          </TouchableOpacity>
        </View>

        <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
          <View style={[styles.rowContainer, { marginRight: 10 }]}>
            <FontAwesome name={"heart"} size={13} color={Colors.lightGrey} />

            <Text style={styles.amount}>{numberOfLikes}</Text>
          </View>
          <View style={styles.rowContainer}>
            <FontAwesome name={"comment"} size={13} color={Colors.lightGrey} />
            <Text style={styles.amount}>{numberOfComments}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export const Challenge: React.FC<ChallengeProps> = memo(({ challenge, isVideoPlaying }) => {
  const { video: videoURL, createdBy, likes, replies } = challenge;
  const { loggedUser } = useSelector(authSelector);

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  const onLikeButtonPress = () => {
    if (loggedUser) {
      console.log("user:" + loggedUser?.fullName + " click on like button.");
      // todo: fetch here
    } else {
      setShowAuthModal(true);
      console.log("guest click on like button, need to log-in");
    }
  };

  const onCommentButtonPress = () => {
    if (loggedUser) {
      console.log("user:" + loggedUser?.fullName + " click on comment button.");
      // todo: fetch here
    } else {
      setShowAuthModal(true);
      console.log("guest click on comment button, need to login");
    }
  };

  const streaminServerUrl = `http://193.106.55.109:8000/${videoURL}`;
  return (
    <View style={styles.container}>
      {showAuthModal && !loggedUser && <AuthModal close={() => setShowAuthModal(false)} />}
      <Player style={styles.video} uri={streaminServerUrl} isPlaying={isVideoPlaying} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <Heading createdBy={createdBy.username} />

        <View style={styles.rowContainer}>
          <Text style={styles.info}>{challenge.description}</Text>
        </View>

        <UIContainer
          numberOfLikes={likes ? likes.length : 0}
          numberOfComments={replies ? replies.length : 0}
          onLikeButtonPress={() => onLikeButtonPress()}
          onCommentButtonPress={() => onCommentButtonPress()}
        />
      </View>
    </View>
  );
});
