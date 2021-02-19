import React, { useEffect, useState } from "react";
import { IChallenge } from "../../interfaces/Challenge";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { HomeScreen } from "./HomeScreen";

interface HomeContainerProps {}

export const HomeContainer: React.FC<HomeContainerProps> = ({}) => {
  const [challenges, setChallenges] = useState<IChallenge[]>([]);
  const [error, setError] = useState<string | null>();
  const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/challenges`;
  const fetchChallenges = async () => {
    const { res, error } = await fetchAPI(RequestMethod.GET, challengesEndpoint);
    res && setChallenges(res);
    error && setError(error);
  };
  useEffect(() => {
    error && alert(error);
  }, [error]);

  useEffect(() => {
    fetchChallenges();
  }, []);
  return <HomeScreen challenges={challenges} />;
};
