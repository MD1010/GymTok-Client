import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { IReply } from "../../interfaces";
import { authSelector } from "../../store/auth/authSlice";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Challenge } from "../Challenge/Challenge";
import { ProfileContainer } from "../Profile/ProfileContainer";
import { ProfileScreen } from "../Profile/ProfileScreen";
import { Colors } from "../shared/styles/variables";
import { Player } from "../shared/VideoPlayer";

interface ChallengeRepliesProps { }

export const ChallengeReplies: React.FC<ChallengeRepliesProps> = ({ }) => {
  const route = useRoute<any>();
  const [challengeReplies, setChallengeReplies] = useState<any[]>([]);
  const { loggedUser } = useSelector(authSelector);

  const getChallengeReplies = async () => {
    const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/challenges/${route.params.challenge._id}/replies`;
    const { res, error } = await fetchAPI(RequestMethod.GET, challengesEndpoint);

    // console.log("res", res)
    // res &&
    //   setChallengeReplies(
    //     res.map((reply, index) => {
    //       return {
    //         _id: index,
    //         // url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    //         url: reply.video
    //       };
    //     })
    //   );

    res && setChallengeReplies([{
      _id: 1,
      url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    },
    {
      _id: 2,
      url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    },
    {
      _id: 3,
      url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    },
    {
      _id: 4,
      url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    },
    {
      _id: 5,
      url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    },])
  };

  useEffect(() => {
    getChallengeReplies();
  }, []);

  const streaminServerUrl = `${process.env.VIDEO_SERVER_ENDPOINT}/${route.params.challenge.video}`;

  console.log("challengeReplies", challengeReplies);

  return (
    <View style={{
      height: Dimensions.get("window").height, backgroundColor: "black", marginTop: 20,

    }}>
      <View style={styles.challengeVideoContainter}>
        {/* <View style={{
          flexDirection: "row-reverse"
        }}> */}
        <Player style={styles.video} uri={streaminServerUrl} isPlaying={false} resizeMode="cover" />
        <View style={styles.challengeVideoDetails}>
          <View style={styles.likesView}>
            <Text style={styles.likesText}>likes:</Text>
            <Text style={styles.likesText}>{route.params.challenge.likes.length}</Text>
          </View>
          <View style={styles.commentsView}>
            <Text style={styles.commentsText}>comments:</Text>
            <Text style={styles.commentsText}>{route.params.challenge.replies.length}</Text>
          </View>
          {/* </View> */}
        </View>
      </View>
      <View style={{ flex: 4 }}>
        <ProfileScreen numColumns={2} challenges={challengeReplies} />
      </View>
    </View >
    // <View style={{ backgroundColor: "red" }}>
    //   {/* <ProfileContainer /> */}
    //   {/* <View style={styles.challengeVideo}> */}
    //   {/* </View> */}
    //   <View style={{ width: "100%", height: "50%" }}>
    //     <Player uri={"http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"} isPlaying={false} resizeMode="cover" />

    //     {/* <Challenge challenge={route.params.challenge} isVideoPlaying /> */}
    //     {/* <Text>asdasdasdsd</Text> */}
    //   </View>
    //   <View style={{ backgroundColor: "red" }}>
    //     <ProfileScreen numColumns={2} challenges={challengeReplies} />
    //   </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  challengeVideoContainter: {
    flex: 3,
    flexDirection: 'row'
  },
  challengeVideoDetails: {
  },
  likesView: {

  },
  likesText: {
    color: Colors.white
  },
  commentsView: {
  },
  commentsText: {
    color: Colors.white
  },
  video: {
    position: "absolute",
    top: 10,
    left: 5,
    bottom: 0,
    right: 0,
    height: "80%",
    width: "50%"
  }
});
