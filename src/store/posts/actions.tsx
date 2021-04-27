import { IPost } from "../../interfaces";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { AppDispatch, AppThunk } from "../configureStore";
import { RootState } from "../rootReducer";
import { itemsToFetch, postsActions } from "./postsSlice";

export const getMorePosts = (): AppThunk => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const endpoint = `${process.env.BASE_API_ENPOINT}/challenges`;
    const currentPosts = getState()?.posts?.latestFetchedPosts;

    const { res, error } = await fetchAPI<IPost[]>(
      RequestMethod.GET,
      endpoint,
      null,
      {
        size: itemsToFetch,
        page: Math.floor(currentPosts.length / itemsToFetch),
      }
    );

    if (res) {
      dispatch(postsActions.fetchMoreSuccess(res));
    } else {
      dispatch(postsActions.fetchFailed(error));
    }
  };
};

export const getUserPosts = (): AppThunk => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // todo https://www.goodday.work/t/RRaDG3
    // todo send param to this func if you want replies or real posts and send the relevant query params
    const endpoint = `${process.env.BASE_API_ENPOINT}/challenges`;
    const loggedUser = getState()?.auth?.loggedUser._id;

    const { res, error } = await fetchAPI<IPost[]>(
      RequestMethod.GET,
      endpoint,
      null,
      {
        size: itemsToFetch,
        page: Math.floor(
          getState().posts.latestFetchedPosts.length / itemsToFetch
        ),
        createdBy: loggedUser,
      }
    );

    if (res) {
      dispatch(postsActions.userPostsFetchSuccess(res));
    } else {
      dispatch(postsActions.fetchFailed(error));
    }
  };
};

export const getMostRecommended = (): AppThunk => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const loggedUser = getState()?.auth?.loggedUser?.username;

    const endpoint = `${process.env.BASE_API_ENPOINT}/users/${loggedUser}/recommendedChallenges`;
    console.log(endpoint);
    const currentPosts = getState().posts.latestFetchedPosts;
    const { res, error } = await fetchAPI<IPost[]>(
      RequestMethod.GET,
      endpoint,
      null,
      {
        size: itemsToFetch,
        page: Math.floor(currentPosts.length / itemsToFetch),
      }
    );

    if (res) {
      dispatch(postsActions.fetchMoreSuccess(res));
    } else {
      dispatch(postsActions.fetchFailed(error));
    }
  };
};

export const getLatestPosts = (): AppThunk => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const loggedUser = getState()?.auth?.loggedUser?.username;

    const recommendedEndpoint = `${process.env.BASE_API_ENPOINT}/users/${loggedUser}/recommendedChallenges`;
    const randomPostsEndpoint = `${process.env.BASE_API_ENPOINT}/challenges`;
    const endpoint = loggedUser ? recommendedEndpoint : randomPostsEndpoint;
    const currentPosts = getState().posts.latestFetchedPosts;
    const { res, error } = await fetchAPI<IPost[]>(
      RequestMethod.GET,
      endpoint,
      null,
      {
        size: itemsToFetch,
        page: Math.floor(currentPosts.length / itemsToFetch),
      }
    );

    if (res) {
      console.log("refreshing and getting newest posts!!");
      dispatch(postsActions.refreshSuccess(res));
    } else {
      dispatch(postsActions.fetchFailed(error));
    }
  };
};

export const updateUserLikePost = (post: IPost, userId: string): AppThunk => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    if (post.likes.includes(userId)) {
      dispatch(postsActions.userRemoveLikePost({ post, userId }));
    } else {
      dispatch(postsActions.userLikePost({ post, userId }));
    }
  };
};
