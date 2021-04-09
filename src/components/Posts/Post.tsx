import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { memo, useEffect } from "react";
import { Text, View, ViewStyle } from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { IPost } from "../../interfaces";
import { authSelector } from "../../store/auth/authSlice";
import { Colors } from "../shared/styles/variables";
import { Player } from "../shared/VideoPlayer";
import { styles } from "./Posts.style";
// import { challengeContext } from "./ChallengesContainer";

interface PostProps {
  post: IPost;
  isVideoPlaying: boolean;
  containerStyle?: ViewStyle;
}

interface IUIContainer {
  numberOfLikes: number;
  numberOfComments: number;
  onLikeButtonPress: () => void;
  onCommentButtonPress: () => void;
}

const Heading = ({ createdBy, onCameraPress }) => {
  return (
    <View style={[styles.rowContainer, { marginVertical: 20, justifyContent: "space-between" }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableWithoutFeedback onPress={() => console.log("avatar clicked!")}>
          <Avatar source={require("../../../assets/avatar/01.jpg")} rounded></Avatar>
        </TouchableWithoutFeedback>
        <Text style={styles.creator}>@{createdBy}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => onCameraPress()}>
          <FontAwesome name={"camera"} size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
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

export const Post: React.FC<PostProps> = memo(({ post, isVideoPlaying, containerStyle }) => {
  const { video: videoURL, createdBy, likes, replies } = post;
  const { loggedUser } = useSelector(authSelector);
  const navigation = useNavigation();
  const streaminServerUrl = `${process.env.VIDEO_SERVER_ENDPOINT}/${videoURL}`;
  useEffect(() => {
    // console.log("video::::::" + videoURL);
  }, [videoURL]);

  // console.log("challenge rendered!!");

  const onLikeButtonPress = () => {
    if (loggedUser) {
      console.log("user:" + loggedUser?.fullName + " click on like button.");
      // todo: fetch here
    } else {
      navigation.navigate("NotLoggedIn");
      console.log("guest click on like button, need to log-in");
    }
  };

  const onCommentButtonPress = () => {
    if (loggedUser) {
      console.log("user:" + loggedUser?.fullName + " click on comment button.");
      // todo: fetch here
    } else {
      navigation.navigate("NotLoggedIn");
      console.log("guest click on comment button, need to login");
    }
  };

  const takeReplyVideo = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    await ImagePicker.getMediaLibraryPermissionsAsync(true);
    if (status === "granted") {
      const replyVideo: any = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      });
      if (!replyVideo.cancelled) {
        navigation.navigate("Publish", { videoUri: replyVideo.uri, challengeId: post._id });
      }
    } else {
      alert("no access to camera");
    }
  };

  const onCameraPress = async () => {
    if (loggedUser) {
      console.log("user:" + loggedUser?.fullName + " click on camera button.");
      // navigation.navigate("NewChallengePreview");
      await takeReplyVideo();
      // todo: fetch here
    } else {
      navigation.navigate("NotLoggedIn");
      console.log("guest click on comment button, need to login");
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Player style={styles.video} uri={streaminServerUrl} isPlaying={isVideoPlaying} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <Heading createdBy={createdBy.username} onCameraPress={() => onCameraPress()} />

        <View style={styles.rowContainer}>
          <Text style={styles.info}>{post.description}</Text>
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
