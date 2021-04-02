import React, { useEffect, useState } from "react";
import { IChallenge } from "../../interfaces/Challenge";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { ProfileScreen } from "./ProfileScreen";

interface ProfileContainerProps {}

const challenges = [
  {
    _id: 1,
    url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 2,
    url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 3,
    url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 4,
    url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 5,
    url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 6,
    url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 7,
    url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 8,
    url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 9,
    url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
  {
    _id: 10,
    url: "http://193.106.55.109:8000/fdfe5570-de14-4e53-a680-cc3c3994210b.mp4",
    numOfLikes: "100K",
  },
];

export const ProfileContainer: React.FC<ProfileContainerProps> = ({}) => {
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
  return <ProfileScreen items={challenges} numColumns={3} />;
};
