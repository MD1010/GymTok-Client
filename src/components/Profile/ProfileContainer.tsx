import React, { useEffect, useState } from "react";
import { IPost } from "../../interfaces/Post";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { ProfileScreen } from "./ProfileScreen";
import { SafeAreaView, Text, StyleSheet, View, FlatList, Dimensions, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { authSelector } from "../../store/auth/authSlice";
import { Colors } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NotLoggedInScreen } from "../Auth/NotLoggedInScreen";

interface ProfileContainerProps {}

const challenges = [
  {
    _id: 1,
    url: "http://10.0.0.44:8000/cda641c5-b707-4511-bbf0-7801e9e2177f.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 2,
    url: "http://10.0.0.44:8000/7b910ff9-7f85-4fb5-a0e3-bc13f05ae732.mp4",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
  {
    _id: 3,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
    component: <Text>fdfdff</Text>,
  },
  {
    _id: 4,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 5,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 6,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 7,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 8,
    url: "http://10.0.0.44:8000:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 9,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 10,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 11,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 12,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 13,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 14,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 15,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 16,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 17,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 18,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 19,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 20,
    url: "http://10.0.0.44:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "600K",
  },
  // {
  //   _id: 4,
  //   url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
  //   numOfLikes: "100K",
  // },
  // {
  //   _id: 5,
  //   url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
  //   numOfLikes: "100K",
  // },
  // {
  //   _id: 6,
  //   url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
  //   numOfLikes: "100K",
  // },
  // {
  //   _id: 7,
  //   url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
  //   numOfLikes: "100K",
  // },
  // {
  //   _id: 8,
  //   url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
  //   numOfLikes: "100K",
  // },
  // {
  //   _id: 9,
  //   url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
  //   numOfLikes: "100K",
  // },
  // {
  //   _id: 10,
  //   url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
  //   numOfLikes: "100K",
  // },
];

export const ProfileContainer: React.FC<ProfileContainerProps> = ({}) => {

  const { loggedUser } = useSelector(authSelector);

  //   const [challenges, setChallenges] = useState<IChallenge[]>([]);
  //   const [error, setError] = useState<string | null>();
  //   const challengesEndpoint = `http://10.0.0.43:8080/challenges`;

  //   const fetchChallenges = async () => {
  //     const { res, error } = await fetchAPI(RequestMethod.GET, challengesEndpoint);
  //     res && setChallenges(res);
  //     error && setError(error);
  //   };
  //   useEffect(() => {
  //     error && alert(error);
  //   }, [error]);

  //   useEffect(() => {
  //     fetchChallenges();
  //   }, []);
  return loggedUser 
        ? <ProfileScreen items={challenges} user={loggedUser}/> :
          <NotLoggedInScreen
              text={"Profile"}
              description={"Sign up for an account"}
              icon={() => <Ionicons name="md-person-outline" color={Colors.white} size={56} />}
          />;
};
