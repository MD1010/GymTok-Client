import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { memo, useEffect, useState } from "react";
import { Text, View, ViewStyle } from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../interfaces";
import { IHashtag } from "../../interfaces/Hashtag";
import { IPost } from "../../interfaces/Post";
import { authSelector } from "../../store/auth/authSlice";
import { updateUserLikePost } from "../../store/posts/actions";
import { STREAMING_SERVER_VIDEO_ENDPOINT } from "../../utils/consts";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Colors } from "../shared/styles/variables";
import { Player } from "../shared/VideoPlayer";
import { styles } from "./Posts.style";
// import { challengeContext } from "./ChallengesContainer";

interface PostProps {
  post: IPost;
  isVisible: boolean;
  containerStyle?: ViewStyle;
}

interface IUIContainer {
  numberOfLikes: number;
  numberOfComments: number;
  isUserLikeChallenge: boolean;
  onLikeButtonPress: () => void;
  onCommentButtonPress: () => void;
}

const Heading = ({ createdBy, onCameraPress }) => {
  const navigation = useNavigation();
  const showProfile = (createdBy: IUser) => {
    navigation.navigate("ProfileDisplay", { user: createdBy });
  };
  return (
    <View style={[styles.rowContainer, { marginVertical: 20, justifyContent: "space-between" }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableWithoutFeedback onPress={() => showProfile(createdBy)}>
          <Avatar
            source={createdBy?.image ? { uri: createdBy?.image } : require("../../../assets/avatar/user.png")}
            rounded
          ></Avatar>
        </TouchableWithoutFeedback>
        <Text style={styles.creator}>@{createdBy?.username}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => onCameraPress()}>
          <FontAwesome name={"camera"} size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TagsContainer: React.FC<{ hashtags: IHashtag[] }> = ({ hashtags }) => (
  <View style={[styles.rowContainer, { flex: 2, flexWrap: "wrap" }]}>
    {hashtags?.map((tag, i) => (
      <Text key={i} style={styles.hashtag}>
        #{tag.hashtag}
      </Text>
    ))}
  </View>
);

const LikesComments: React.FC<IUIContainer> = ({
  numberOfComments,
  numberOfLikes,
  onLikeButtonPress,
  onCommentButtonPress,
  isUserLikeChallenge,
}) => {
  return (
    <View style={styles.likeCommentsContainer}>
      <TouchableWithoutFeedback onPress={() => onLikeButtonPress()}>
        <View style={[styles.rowContainer, { alignItems: "center" }]}>
          <FontAwesome name={"heart"} size={22} color={isUserLikeChallenge ? Colors.red : Colors.lightGrey} />
          <Text style={styles.amount}>{numberOfLikes}</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => onCommentButtonPress()}>
        <View style={[styles.rowContainer, { marginLeft: 15, alignItems: "center" }]}>
          <FontAwesome name={"comment"} size={22} color={Colors.lightGrey} />
          <Text style={styles.amount}>{numberOfComments}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const Post: React.FC<PostProps> = memo(({ post, isVisible, containerStyle }) => {
  const { videoURI, createdBy, likes, replies } = post;
  const { loggedUser } = useSelector(authSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isUserLikePost, setÌsUserLikePost] = useState<boolean>(false);
  const streaminServerUrl = `${process.env.VIDEO_SERVER_ENDPOINT}/video/${videoURI}`;

  useEffect(() => {
    loggedUser && setÌsUserLikePost(post.likes.includes(loggedUser?._id));
  }, [post, loggedUser]);

  const onLikeButtonPress = async () => {
    if (loggedUser) {
      console.log("user:" + loggedUser?.fullName + " click on like button.");

      setÌsUserLikePost(!isUserLikePost);
      dispatch(updateUserLikePost(post, loggedUser._id));

      let requestMethod: RequestMethod;
      const likesApi = `${process.env.BASE_API_ENPOINT}/users/${loggedUser._id}/posts/${post._id}/like`;
      if (!isUserLikePost) {
        requestMethod = RequestMethod.POST;
      } else {
        requestMethod = RequestMethod.DELETE;
      }
      const { res, error } = await fetchAPI(requestMethod, likesApi);

      if (error) {
        setÌsUserLikePost(isUserLikePost);
        dispatch(updateUserLikePost(post, loggedUser._id));
      }
    }
    // todo: fetch here
    else {
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

  const onCameraPress = async () => {
    if (loggedUser) {
      console.log("user:" + loggedUser?.fullName + " click on camera button.");
      navigation.navigate("Camera", { postId: post._id, isReply: true });
    } else {
      navigation.navigate("NotLoggedIn");
      console.log("guest click on comment button, need to login");
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* <Player style={styles.video} uri={streaminServerUrl} videoInViewPort={isVisible} resizeMode="cover" /> */}
      <View style={styles.infoContainer}>
        <Heading createdBy={createdBy} onCameraPress={() => onCameraPress()} />

        <Text style={styles.info}>{post.description}</Text>

        <View style={[styles.rowContainer, { marginVertical: 10 }]}>
          <TagsContainer hashtags={post.hashtags} />
          <LikesComments
            numberOfLikes={likes ? likes.length : 0}
            isUserLikeChallenge={isUserLikePost}
            numberOfComments={replies ? replies.length : 0}
            onLikeButtonPress={() => onLikeButtonPress()}
            onCommentButtonPress={() => onCommentButtonPress()}
          />
        </View>
      </View>
    </View>
  );
});
