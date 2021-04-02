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
  currentVideoID?: string;
}

export const ChallengesContainer: React.FC<ChallengesContainerProps> = ({
  getOnlyUserChallenges,
  containerStyle,
  currentVideoID,
}) => {
  const { Provider } = challengeContext;
  const [challenges, setChallenges] = useState([]);
  const { loggedUser } = useSelector(authSelector);
  const [error, setError] = useState<string | null>();
  const isMounted = useIsMount();
  const itemsToLoad = 10;
  const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/challenges`;
  // const [currentIndexVideo, setCurrentIndexVideo] = useState<number>(0);
  let indexToRender = 0;

  const getRecommendedChallenges = async () => {
    console.log("getting recomended");
    const { res, error } = await fetchAPI(
      RequestMethod.GET,
      `${process.env.BASE_API_ENPOINT}/users/${loggedUser?.username}/recommendedChallenges`,
      null,
      {
        size: itemsToLoad,
        page: challenges.length / itemsToLoad,
      }
    );
    console.log("challenges", challenges.length / itemsToLoad);
    if (isMounted.current) {
      res && setChallenges([...challenges, ...res]);
      error && setError(error);
    }
  };

  const getExistChallenges = async () => {
    const { res, error } = await fetchAPI(RequestMethod.GET, challengesEndpoint, null, {
      size: itemsToLoad,
      page: challenges.length / itemsToLoad,
    });

    if (isMounted.current) {
      res && setChallenges([...challenges, ...res]);
      error && setError(error);
    }
  };

  const getUserChallenges = async () => {
    const { res, error } = await fetchAPI(RequestMethod.GET, challengesEndpoint, null, {
      size: itemsToLoad,
      page: challenges.length / itemsToLoad,
      uid: loggedUser._id,
    });
    if (isMounted.current) {
      res && setChallenges([...challenges, ...res]);
      error && setError(error);
    }
  };

  useEffect(() => {
    error && alert(JSON.stringify(error));
  }, [error]);

  useEffect(() => {
    if (currentVideoID && challenges.length > 0) {
      console.log("video idooooo " + currentVideoID);
      challenges.map;
      indexToRender = challenges.findIndex((challenge) => challenge.video === currentVideoID);
      console.log("mishoj index!!!!! " + indexToRender);
      // setCurrentIndexVideo(index);
    }
  }, [challenges, currentVideoID]);

  const getChallenges = () => {
    if (!loggedUser) {
      getExistChallenges();
    } else {
      getRecommendedChallenges();
    }
  };

  useEffect(() => {
    getChallenges();
  }, []);

  useEffect(() => {
    getOnlyUserChallenges && getUserChallenges();
  }, [getOnlyUserChallenges]);

  return (
    <Provider value={{ containerStyle }}>
      <ChallengesListDisplay challenges={challenges} getChallenges={getChallenges} currentIndexVideo={indexToRender} />
    </Provider>
  );
};
