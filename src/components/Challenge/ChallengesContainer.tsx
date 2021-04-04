import React, { createContext, useEffect, useState } from "react";
import { ViewStyle } from "react-native";
import { useSelector } from "react-redux";
import { useIsMount } from "../../hooks/useIsMount";
import { IChallenge } from "../../interfaces";
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
  // console.log("logged as ", loggedUser);
  const [error, setError] = useState<string | null>();
  const isMounted = useIsMount();
  const itemsToLoad = 40;
  const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/challenges`;
  const [currentIndexVideo, setCurrentIndexVideo] = useState<number>(0);

  useEffect(() => {
    console.log(`challenges`, challenges.length);
  }, [challenges]);

  const getRecommendedChallenges = async () => {
    console.log("getting recomended");
    const { res, error } = await fetchAPI(
      RequestMethod.GET,
      `${process.env.BASE_API_ENPOINT}/users/${loggedUser?.username}/recommendedChallenges`,
      null,
      {
        size: itemsToLoad,
        page: Math.floor(challenges.length / itemsToLoad),
      }
    );
    // console.log("challenges", Math.floor(challenges.length / itemsToLoad));
    if (isMounted.current) {
      res && setChallenges([...challenges, ...res]);
      error && setError(error);
    }
    // const { res: res2 } = await fetchAPI(
    //   RequestMethod.GET,
    //   `${process.env.BASE_API_ENPOINT}/users/${loggedUser?.username}/recommendedChallenges`,
    //   null,
    //   {
    //     size: itemsToLoad,
    //     page: Math.floor(challenges.length / itemsToLoad),
    //   }
    // );
    // if (isMounted.current) {
    //   console.log("setting state!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!#!@");
    //   res && setChallenges((res as IChallenge[]).slice(5, 10));

    //   error && setError(error);
    // }
  };

  const getExistChallenges = async () => {
    const { res, error } = await fetchAPI(RequestMethod.GET, challengesEndpoint, null, {
      size: itemsToLoad,
      page: challenges.length / itemsToLoad,
    });

    if (isMounted.current) {
      // res && setChallenges([...challenges, ...res]);
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
      setCurrentIndexVideo(challenges.findIndex((challenge) => challenge.video === currentVideoID));
    }
  }, [challenges, currentVideoID]);

  const getChallenges = () => {
    if (getOnlyUserChallenges) {
      getUserChallenges();
    }
    if (!loggedUser) {
      console.log("WHY here!?!!");
      getExistChallenges();
    } else {
      console.log("gettting recommended!?!!");
      getRecommendedChallenges();
    }
  };

  useEffect(() => {
    getChallenges();
  }, [getOnlyUserChallenges, loggedUser]);

  return (
    <Provider value={{ containerStyle }}>
      <ChallengesListDisplay
        challenges={challenges}
        // getChallenges={getChallenges}
        // currentIndexVideo={currentIndexVideo}
      />
    </Provider>
  );
};
