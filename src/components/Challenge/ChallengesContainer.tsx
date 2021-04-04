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
  const itemsToLoad = 10;
  const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/challenges`;
  const [currentIndexVideo, setCurrentIndexVideo] = useState<number>(0);
  const [hasToLoadMore, setHasToLoadMore] = useState(true);
  // const [isNewDataFetched, setNewDataFetched] = useState(false);

  useEffect(() => {
    // console.log(`challenges`, challenges.length);
  }, [challenges]);

  const getRecommendedChallenges = async () => {
    // setNewDataFetched(false);
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
    if (isMounted.current) {
      console.log("after fetch", res.length);
      if (res.length < itemsToLoad) {
        console.log("there are no more to load!!");
        setHasToLoadMore(false);
      }
      res && setChallenges([...challenges, ...res]);
      // setNewDataFetched(true);
      error && setError(error);
    }
  };

  const getExistChallenges = async () => {
    // setNewDataFetched(false);
    const { res, error } = await fetchAPI(RequestMethod.GET, challengesEndpoint, null, {
      size: itemsToLoad,
      page: Math.floor(challenges.length / itemsToLoad),
    });

    if (isMounted.current) {
      if (res.length < itemsToLoad) {
        console.log("there are no more to load!!");
        setHasToLoadMore(false);
      }
      // setNewDataFetched(true);
      res && setChallenges([...challenges, ...res]);
      error && setError(error);
    }
  };

  const getUserChallenges = async () => {
    // setNewDataFetched(false);
    const { res, error } = await fetchAPI(RequestMethod.GET, challengesEndpoint, null, {
      size: itemsToLoad,
      page: Math.floor(challenges.length / itemsToLoad),
      uid: loggedUser._id,
    });
    if (isMounted.current) {
      if (res.length < itemsToLoad) {
        console.log("there are no more to load!!");
        setHasToLoadMore(false);
      }
      // setNewDataFetched(true);
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
      // console.log("WHY here!?!!");
      getExistChallenges();
    } else {
      // console.log("gettting recommended!?!!");
      // getRecommendedChallenges();
      getExistChallenges();
    }
  };

  useEffect(() => {
    getChallenges();
  }, [getOnlyUserChallenges]);

  return (
    <Provider value={{ containerStyle }}>
      <ChallengesListDisplay
        // isNewDataFetched={isNewDataFetched}
        hasToLoadMore={hasToLoadMore}
        challenges={challenges}
        getChallenges={getChallenges}
        // currentIndexVideo={currentIndexVideo}
      />
    </Provider>
  );
};
