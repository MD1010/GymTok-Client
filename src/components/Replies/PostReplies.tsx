import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { IPost } from "../../interfaces";
import { authSelector } from "../../store/auth/authSlice";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { ProfileScreen } from "../Profile/ProfileScreen";
import { VideoSkeleton } from "../shared/skeletons/VideoSkeleton";
import { Colors } from "../shared/styles/variables";
import { Player } from "../shared/VideoPlayer";

interface PostRepliesProps {
  // post: IPost;
  route: any;
}

export const PostReplies: React.FC<PostRepliesProps> = ({ }) => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const [challengeReplies, setChallengeReplies] = useState<any[]>([]);
  const [streaminServerUrl, setStreaminServerUrl] = useState<string>('');
  const { loggedUser } = useSelector(authSelector);
  const [post, setPost] = useState<IPost>();

  const getChallengeReplies = async () => {
    const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/challenges/${post._id}/replies`;
    const { res, error } = await fetchAPI(RequestMethod.GET, challengesEndpoint);

    res &&
      setChallengeReplies(
        res.map((reply, index) => {
          return {
            _id: index,
            url: reply.video
          };
        })
      );
  }


  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (e) => {
      // console.log(e.data.state.routes[0])
      setPost(e.data.state.routes[0].params["post"])
    })
    return unsubscribe;
  }, [])

  // console.log("!@?#!@#")

  useEffect(() => {
    if (post) {
      getChallengeReplies();
      setStreaminServerUrl(`${process.env.VIDEO_SERVER_ENDPOINT}/${post.video}`);
    }
  }, [post]);

  return (
    <View style={{
      flex: 1, backgroundColor: Colors.darkBlueOpaque, marginTop: 20,

    }}>
      <View style={styles.challengeVideoContainter}>
        <View style={styles.videoContianiter}>
          {
            // false ? 
            <Player style={styles.video} uri={streaminServerUrl} isPlaying={false} resizeMode="cover">
              <VideoSkeleton />
            </Player>
          }
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <ProfileScreen numColumns={2} items={challengeReplies} upperStyle={{}} />
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  videoContianiter: {
    flex: 1,
    width: '100%',
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkBlueOpaque,
  },
  challengeVideoContainter: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.darkBlueOpaque
  },
  challengeVideoDetails: {
    flex: 1,
    width: "50%",
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  }
});
