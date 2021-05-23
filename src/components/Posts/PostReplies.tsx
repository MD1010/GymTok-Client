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
import { formatDate } from "../../utils/date";

interface PostRepliesProps {}

type StackParamsList = {
  params: { newReply: IPost };
};
export const PostReplies: React.FC<PostRepliesProps> = ({}) => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<StackParamsList, "params">>();
  const [challengeReplies, setChallengeReplies] = useState<IPost[]>([]);
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
      setChallengeReplies([...challengeReplies, route.params?.newReply]);
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

  useEffect(() => {
    post && console.log(post?.publishDate?.toString());
  }, [post]);

  const showOriginalVideo = () => {
    navigation.navigate("VideoDisplay", { posts: [post] });
  };

  const OriginalVideoPreview = () =>
    videoGif && (
      <Ripple
        style={{ flex: 1 }}
        onPress={() => {
          showOriginalVideo();
        }}
      >
        <Image
          source={{
            uri: videoGif,
          }}
          style={{ height: 200, borderRadius: 5 }}
        />
        <Text style={styles.originalLabel}>Original</Text>
      </Ripple>
    );

  const Header = () =>
    challengeReplies ? (
      <View style={styles.headerStyle}>
        <OriginalVideoPreview />
        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontSize: 18, marginBottom: 15 }]}>{post?.createdBy?.username}</Text>
          <Text style={{ fontWeight: "bold", fontSize: 13, marginBottom: 5, color: Colors.lightGrey2 }}>
            Posted By {post?.createdBy?.username}
          </Text>
          <Text style={[styles.text, { fontSize: 13, marginBottom: 20, color: Colors.lightGrey2 }]}>
            {formatDate(post?.publishDate)}
          </Text>
          <Text style={styles.text}>{post?.replies?.length} replies</Text>
        </View>
      </View>
    ) : null;
  return (
    <View style={{ flex: 1, backgroundColor: Colors.black }}>
      <GenericComponent items={challengeReplies} pageHeader={Header} setItems={setChallengeReplies} />

      {isLoadingReplies && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontWeight: "bold",
  },
  headerStyle: {
    flexDirection: "row",
    // padding: 10,
    marginLeft: 2,
    marginVertical: 10,
  },
  infoContainer: {
    padding: 15,
    paddingTop: 0,
    flex: 1.5,
  },
  originalLabel: {
    backgroundColor: Colors.lightPurpule,
    position: "absolute",
    left: 10,
    top: 10,
    padding: 3,
    borderRadius: 3,
    color: Colors.white,
    fontSize: 13,
    overflow: "hidden",
  },
});
