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
    <View style={{ height: Dimensions.get("window").height }}>
      <View style={{ flex: 1 }}>
        <Player uri={streaminServerUrl} isPlaying={false} resizeMode="cover" />
      </View>
      <View style={{ flex: 1 }}>
        <ProfileScreen numColumns={2} challenges={challengeReplies} />
      </View>
    </View>
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
  //   container: {
  //     flex: 1,
  //     padding: 25,
  //   },
  // challengeVideo: {
  //     height: '90%'
  // }
});
