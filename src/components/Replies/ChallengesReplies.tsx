import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/auth/authSlice";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { ProfileScreen } from "../Profile/ProfileScreen";
import { VideoSkeleton } from "../shared/skeletons/VideoSkeleton";
import { Colors } from "../shared/styles/variables";
import { Player } from "../shared/VideoPlayer";

interface ChallengeRepliesProps { }

export const ChallengeReplies: React.FC<ChallengeRepliesProps> = ({ }) => {
  const route = useRoute<any>();
  const [challengeReplies, setChallengeReplies] = useState<any[]>([]);
  const { loggedUser } = useSelector(authSelector);

  const getChallengeReplies = async () => {
    const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/challenges/${route.params.post._id}/replies`;
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
    getChallengeReplies();
  }, []);


  const streaminServerUrl = `${process.env.VIDEO_SERVER_ENDPOINT}/${route.params.post.video}`;

  return (
    <View style={{
      flex: 1, backgroundColor: Colors.darkBlueOpaque, marginTop: 20,

    }}>
      <View style={styles.challengeVideoContainter}>
        <View style={styles.videoContianiter}>
          {
            // false ? 
            <Player style={styles.video} uri={streaminServerUrl} isPlaying={true} resizeMode="cover">
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
