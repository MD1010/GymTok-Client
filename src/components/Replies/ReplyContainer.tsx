import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { IReply } from "../../interfaces";
import { authSelector } from "../../store/auth/authSlice";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { Challenge } from "../Challenge/Challenge";
import { ProfileContainer } from "../Profile/ProfileContainer";
import { ProfileScreen } from "../Profile/ProfileScreen";
import { Player } from "../shared/VideoPlayer";

interface ChallengeRepliesProps {
}

export const ChallengeReplies: React.FC<ChallengeRepliesProps> = ({ }) => {
    const route = useRoute<any>();
    const [challengeReplies, setChallengeReplies] = useState<IReply[]>([]);
    const { loggedUser } = useSelector(authSelector);

    const getChallengeReplies = async () => {
        const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/challenges/${route.params.challenge._id}/replies`;
        const { res, error } = await fetchAPI(RequestMethod.GET, challengesEndpoint);

        // console.log("res", res)
        res && setChallengeReplies(res.map((reply, index) => {
            return {
                _id: index,
                url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
                // url: reply.video
            }
        }));
    }

    useEffect(() => {
        getChallengeReplies();
    }, [])

    const streaminServerUrl = `${process.env.VIDEO_SERVER_ENDPOINT}/${route.params.challenge.video}`;

    console.log("streaminServerUrl", streaminServerUrl)


    console.log("challengeReplies", challengeReplies)
    return (
        <View style={styles.container}>
            {/* <ProfileContainer /> */}
            <View style={styles.challengeVideo}>
                <Player style={{}} uri={streaminServerUrl} isPlaying={false} resizeMode="cover" />
            </View>
            <ProfileScreen numColumns={2} challenges={challengeReplies} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
    },
    challengeVideo: {
        height: '90%'
    }
});
