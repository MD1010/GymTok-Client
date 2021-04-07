import { IPost } from "../../interfaces";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { AppDispatch, AppThunk } from "../configureStore";
import { RootState } from "../rootReducer";
import { itemsToFetch, postsActions } from "./postsSlice";

export const getLatestPosts = (): AppThunk => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/challenges`;
    const currentPosts = getState()?.posts?.latestFetchedPosts;

    const { res, error } = await fetchAPI<IPost[]>(RequestMethod.GET, challengesEndpoint, null, {
      size: itemsToFetch,
      page: Math.floor(currentPosts.length / itemsToFetch),
    });

    if (res) {
      dispatch(postsActions.latestPostsFetchSuccess(res));
    } else {
      dispatch(postsActions.postsFetchFailed(error));
    }
  };
};

export const getUserPosts = (): AppThunk => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // todo https://www.goodday.work/t/RRaDG3
    // todo send param to this func if you want replies or real posts and send the relevant query params
    const challengesEndpoint = `${process.env.BASE_API_ENPOINT}/challenges`;
    const loggedUser = getState()?.auth?.loggedUser._id;

    const { res, error } = await fetchAPI<IPost[]>(RequestMethod.GET, challengesEndpoint, null, {
      size: itemsToFetch,
      page: Math.floor(getState().posts.latestFetchedPosts.length / itemsToFetch),
      createdBy: loggedUser,
    });

    if (res) {
      dispatch(postsActions.userPostsFetchSuccess(res));
    } else {
      dispatch(postsActions.postsFetchFailed(error));
    }
  };
};

export const getMostRecommended = (): AppThunk => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const loggedUser = getState()?.auth?.loggedUser?.username;
    const endpoint = `${process.env.BASE_API_ENPOINT}/users/${loggedUser}/recommendedChallenges`;
    const currentPosts = getState().posts.latestFetchedPosts;
    const { res, error } = await fetchAPI<IPost[]>(RequestMethod.GET, endpoint, null, {
      size: itemsToFetch,
      page: Math.floor(currentPosts.length / itemsToFetch),
    });

    if (res) {
      dispatch(postsActions.latestPostsFetchSuccess(res));
    } else {
      dispatch(postsActions.postsFetchFailed(error));
    }
  };
};
