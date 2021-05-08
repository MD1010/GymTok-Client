import { IPost } from "../../interfaces";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { AppDispatch, AppThunk } from "../configureStore";
import { RootState } from "../rootReducer";
import { itemsToFetch, postsActions } from "./postsSlice";

export const getMorePosts = (): AppThunk => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const currentPosts = getState()?.posts?.latestFetchedPosts;
    const endpoint = `${process.env.BASE_API_ENPOINT}/posts`;
    const currentPosts = getState()?.posts?.latestFetchedPosts;
    console.log(endpoint);
    const { res, error } = await fetchAPI<IPost[]>(RequestMethod.GET, endpoint, null, {
      size: itemsToFetch,
      page: Math.floor(currentPosts.length / itemsToFetch),
    });

    if (res) {
      if (res.length > 0) {
        dispatch(postsActions.fetchMoreSuccess(res));
      } else {
        dispatch(postsActions.fetchMoreSuccess(currentPosts.slice()));
      }
    } else {
      dispatch(postsActions.fetchFailed(error));
    }
  };
};

export const getUserPosts = (): AppThunk => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // todo https://www.goodday.work/t/RRaDG3
    // todo send param to this func if you want replies or real posts and send the relevant query params
    const endpoint = `${process.env.BASE_API_ENPOINT}/posts`;
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
    console.log("fdfdfd");
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
    const endpoint = `${process.env.BASE_API_ENPOINT}/users/${loggedUser}/recommendedPosts`;
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

    const recommendedEndpoint = `${process.env.BASE_API_ENPOINT}/users/${loggedUser}/recommendedPosts`;
    const randomPostsEndpoint = `${process.env.BASE_API_ENPOINT}/posts`;
    const endpoint = loggedUser ? recommendedEndpoint : randomPostsEndpoint;
    const currentPosts = getState().posts.latestFetchedPosts;
    let maxDate = currentPosts[0].publishDate;
    currentPosts.map((post, index) => {
      if (maxDate < post.publishDate) {
        maxDate = post.publishDate;
      }
    });
    console.log("max dateeeeeee", maxDate);
    // const maxDate = currentPosts.slice().sort((a, b) => a.publishDate - b.publishDate);
    // sortedArr.map((item, i) => {
    //   console.log("sortedItemmmm", sortedArr[i].publishDate);
    // });

    const { res, error } = await fetchAPI<IPost[]>(RequestMethod.GET, endpoint, null, {
      size: itemsToFetch,
      page: Math.floor(currentPosts.length / itemsToFetch),
      currentMaxDate: maxDate,
    });

    if (res) {
      console.log("refreshing and getting newest posts!!");
      if (res.length > 0) {
        dispatch(postsActions.refreshSuccess(res));
      } else {
        dispatch(postsActions.refreshSuccess(currentPosts.slice()));
      }
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

export const addReplyToPost = (postId: string, reply: IPost): AppThunk => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(postsActions.addReplyToPost({ postId, reply }));
  };
};
