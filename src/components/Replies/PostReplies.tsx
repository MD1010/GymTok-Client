import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IPost } from "../../interfaces";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { GenericComponent } from "../Profile/genericComponent";
import { Loader } from "../shared";
import { Colors } from "../shared/styles/variables";
import { Player } from "../shared/VideoPlayer";

interface PostRepliesProps { }

type StackParamsList = {
  params: { newReply: IPost };
};

export const PostReplies: React.FC<PostRepliesProps> = ({ }) => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamsList, "params">>();
  const [challengeReplies, setChallengeReplies] = useState<IPost[]>([]);
  const [streaminServerUrl, setStreaminServerUrl] = useState<string>("");
  const [post, setPost] = useState<IPost>();
  const [isLoadingChallengeVideo, setIsLoadingChallengeVideo] = useState<boolean>(true);
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

  useFocusEffect(
    React.useCallback(() => {
      navigation.addListener("blur", (e) => {
        setIsVideoInViewPort(false);
      });
      setIsVideoInViewPort(true);
    }, [])
  );

  useEffect(() => {
    if (route.params?.newReply) {
      setChallengeReplies([
        ...challengeReplies,
        route.params?.newReply
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
      setStreaminServerUrl(`${process.env.VIDEO_SERVER_ENDPOINT}/${post.videoURI}`);
    }
  }, [post]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.darkBlueOpaque,
      }}
    >
      <View style={styles.challengeVideoContainter}>
        {isLoadingChallengeVideo && (
          <View style={styles.loader}>
            <Loader />
          </View>
        )}
        <View style={styles.videoContianiter}>
          <Player
            style={styles.video}
            uri={streaminServerUrl}
            resizeMode="cover"
            videoInViewPort={isVideoInViewPort}
            onVideoLoad={() => setIsLoadingChallengeVideo(false)}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {isLoadingReplies && <Loader />}
        <GenericComponent items={challengeReplies} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContianiter: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkBlueOpaque,
  },
  challengeVideoContainter: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.darkBlueOpaque,
  },
  loader: {},
  challengeVideoDetails: {
    flex: 1,
    width: "50%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  video: {
    flex: 0.9,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
