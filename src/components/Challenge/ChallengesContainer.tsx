import React, { createContext, useEffect, useState } from "react";
import { ViewStyle } from "react-native";
import { useSelector } from "react-redux";
import { useIsMount } from "../../hooks/useIsMount";
import { authSelector } from "../../store/auth/authSlice";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { challengeContext } from "./ChallengeContext";
import { ChallengesListDisplay } from "./ChallengesListDisplay";

interface ChallengesContainerProps {
  getOnlyUserChallenges?: boolean; // the id
  containerStyle?: ViewStyle;
}

export const ChallengesContainer: React.FC<ChallengesContainerProps> = ({ getOnlyUserChallenges, containerStyle }) => {
  const { Provider } = challengeContext;
  const [challenges, setChallenges] = useState([]);
  const { loggedUser } = useSelector(authSelector);
  const [error, setError] = useState<string | null>();
  const isMounted = useIsMount();
  const itemsToLoad = 10;
  const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/challenges`;

  const getRecommendedChallenges = async () => {
    const { res, error } = await fetchAPI(
      RequestMethod.GET,
      `${process.env.BASE_API_ENPOINT}/users/${loggedUser?.username}/recommendedChallenges`,
      null,
      {
        size: itemsToLoad,
        page: challenges.length / itemsToLoad,
      }
    );
    if (isMounted.current) {
      res && setChallenges([...challenges, ...res]);
      error && setError(error);
    }
  };

  const getExistChallenges = async () => {
    console.log("fetching more.....", challengesEndpoint);
    const { res, error } = await fetchAPI(RequestMethod.GET, challengesEndpoint, null, {
      size: itemsToLoad,
      page: challenges.length / itemsToLoad,
    });
    console.log(error);
    if (isMounted.current) {
      res && setChallenges([...challenges, ...res]);
      error && setError(error);
    }
  };

  useEffect(() => {
    error && alert(error);
  }, [error]);

  const getChallenges = () => {
    if (getOnlyUserChallenges) {
      // todo fetch only challenges that belong to user
    }
    if (!loggedUser) {
      getExistChallenges();
    } else {
      getRecommendedChallenges();
    }
  };

  useEffect(() => {
    getChallenges();
  }, []);
  return (
    <Provider value={{ containerStyle }}>
      <ChallengesListDisplay challenges={challenges} getChallenges={getChallenges}></ChallengesListDisplay>
    </Provider>
  );
};
