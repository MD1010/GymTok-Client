import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IPost } from "../../interfaces";
import { STREAMING_SERVER_GIF_ENDPOINT } from "../../utils/consts";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { GenericComponent } from "../Profile/genericComponent";
import { Loader } from "../shared";
import { Colors } from "../shared/styles/variables";
import { Player } from "../shared/VideoPlayer";
import Ripple from "react-native-material-ripple";

interface PostRepliesProps {}

type StackParamsList = {
  params: { newReply: IPost };
};
export const PostReplies: React.FC<PostRepliesProps> = ({}) => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamsList, "params">>();
  const [challengeReplies, setChallengeReplies] = useState<any[]>([]);
  const [videoGif, setVideoGif] = useState<string>(null);
  const [post, setPost] = useState<IPost>();
  // const [isLoadingChallengeVideo, setIsLoadingChallengeVideo] = useState<boolean>(true);
  const [isLoadingReplies, setIsLoadingReplies] = useState<boolean>(true);
  const [isVideoInViewPort, setIsVideoInViewPort] = useState(false);

  const getChallengeReplies = async () => {
    setIsLoadingReplies(true);
    setChallengeReplies([]);
    const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/posts/${post._id}/replies`;
    const { res } = await fetchAPI(RequestMethod.GET, challengesEndpoint);

    res && setChallengeReplies(res);

    setIsLoadingReplies(false);
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     navigation.addListener("blur", (e) => {
  //       setIsVideoInViewPort(false);
  //     });
  //     setIsVideoInViewPort(true);
  //   }, [])
  // );

  useEffect(() => {
    if (route.params?.newReply) {
      setChallengeReplies([
        ...challengeReplies,
        {
          _id: challengeReplies.length,
          url: route.params.newReply.videoURI,
          gif: route.params.newReply.gif,
          numOfLikes: 0,
        },
      ]);
    }
  }, [route.params?.newReply]);

  useEffect(() => {
    navigation.addListener("state", (e) => {
      e.data?.state?.routes[0]?.params && setPost(e.data?.state?.routes[0]?.params["post"]);
    });
    return () => {
      navigation.removeListener("blur", null);
      navigation.removeListener("state", null);
    };
  }, []);

  useEffect(() => {
    if (post) {
      getChallengeReplies();
      setVideoGif(`${STREAMING_SERVER_GIF_ENDPOINT}/${post.gif}`);
    }
  }, [post]);

  const showOriginalVideo = () => {
    navigation.navigate("VideoDisplay", { posts: [post] });
  };

  const RepliesHeader = () =>
    videoGif && (
      <Ripple
        style={{ margin: 10, marginLeft: 2 }}
        onPress={() => {
          showOriginalVideo();
        }}
      >
        <Image
          source={{
            uri: videoGif,
          }}
          style={{ height: 220, width: 160, borderRadius: 5 }}
        />
        <Text
          style={{
            backgroundColor: Colors.lightPurpule,
            position: "absolute",
            left: 10,
            top: 10,
            padding: 4,
            borderRadius: 3,
          }}
        >
          Original
        </Text>
      </Ripple>
    );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.black,
        // padding: 5,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      {/* <View style={styles.originalVideoContainer}>
        <Player
            style={styles.video}
            uri={streaminServerUrl}
            resizeMode="cover"
            videoInViewPort={isVideoInViewPort}
            onVideoLoad={() => setIsLoadingChallengeVideo(false)}
          />
      </View> */}

      <GenericComponent items={challengeReplies} pageHeader={RepliesHeader} />
      {isLoadingReplies && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({});
