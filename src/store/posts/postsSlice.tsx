import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { indexOf } from "lodash";
import { ViewStyle } from "react-native";
import { IPost } from "../../interfaces";
import { getPostsAfterUserLikePost, getPostsAfterUserRemoveLikeFromPost } from "../../utils/updatePostLikes";
import { RootState } from "../configureStore";
import { getLatestPosts } from "./actions";

export const itemsToFetch = 10; // how many posts are fetched on each get

export interface PostsState {
  error: string | null;
  latestFetchedPosts: IPost[]; // last itemsToFetch that are displayed
  userPosts: IPost[];
  hasMoreToFetch: boolean;
}
export const initialState: PostsState = {
  error: null,
  latestFetchedPosts: [],
  userPosts: [],
  hasMoreToFetch: true,
};

interface LikePayload {
  post: IPost;
  userId: string;
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchMoreSuccess: (state, action: PayloadAction<IPost[]>) => {
      if (action.payload.length < itemsToFetch) state.hasMoreToFetch = false;
      state.latestFetchedPosts = [...state.latestFetchedPosts, ...action.payload];
      // state.latestFetchedPosts.sort((a,b) => new Date(a.publishDate) - new Date(b.publishDate) );
      // state.latestFetchedPosts = [...action.payload,...state.latestFetchedPosts];
      state.error = null;
    },
    userPostsFetchSuccess: (state, action: PayloadAction<IPost[]>) => {
      if (action.payload.length < itemsToFetch) state.hasMoreToFetch = false;
      state.userPosts = [...state.userPosts, ...action.payload];
      state.error = null;
    },
    refreshSuccess: (state, action: PayloadAction<IPost[]>) => {
      state.latestFetchedPosts = action.payload;
    },
    fetchFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetFetchFailedError: (state) => {
      state.error = null;
    },
    userLikePost: (state, action: PayloadAction<LikePayload>) => {
      const updatedLatestFetchedPosts = getPostsAfterUserLikePost(
        state.latestFetchedPosts,
        action.payload.post._id,
        action.payload.userId
      );

      if (updatedLatestFetchedPosts) {
        state.latestFetchedPosts = updatedLatestFetchedPosts;
      }

      const updatedUserPosts = getPostsAfterUserLikePost(
        state.userPosts,
        action.payload.post._id,
        action.payload.userId
      );

      if (updatedUserPosts) {
        state.userPosts = updatedUserPosts;
      }
    },
    userRemoveLikePost: (state, action: PayloadAction<LikePayload>) => {
      const updatedLatestFetchedPosts = getPostsAfterUserRemoveLikeFromPost(
        state.latestFetchedPosts,
        action.payload.post._id,
        action.payload.userId
      );

      if (updatedLatestFetchedPosts) {
        state.latestFetchedPosts = updatedLatestFetchedPosts;
      }

      const updatedUserPosts = getPostsAfterUserRemoveLikeFromPost(
        state.userPosts,
        action.payload.post._id,
        action.payload.userId
      );

      if (updatedUserPosts) {
        state.userPosts = updatedUserPosts;
      }
    },

    displayNotificationPost: (state, action: PayloadAction<IPost>) => {
      state.latestFetchedPosts.splice(state.latestFetchedPosts.indexOf(action.payload), 1);
      state.latestFetchedPosts.unshift(action.payload);
    },
  },
});

export const postsActions = postsSlice.actions;
export const postsSelector = (state: RootState) => state.posts;

export default postsSlice.reducer;
