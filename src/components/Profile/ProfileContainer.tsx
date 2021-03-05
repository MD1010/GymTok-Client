import React, { useEffect, useState } from "react";
import { IChallenge } from "../../interfaces/Challenge";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { ProfileScreen } from "./ProfileScreen";

interface ProfileContainerProps {}

const challenges = [
  {
    _id: 1,
    url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    _id: 2,
    url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    _id: 3,
    url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    _id: 4,
    url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    _id: 5,
    url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    _id: 6,
    url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    _id: 7,
    url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    _id: 8,
    url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    _id: 9,
    url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    _id: 10,
    url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
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
  return <ProfileScreen challenges={challenges} numColumns={3} />;
};
