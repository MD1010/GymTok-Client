import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../interfaces";
import { addReplyToPost } from "../../utils/addReplyToPost";
import { userLikePost, userDislikePost } from "../../utils/updatePostLikes";
import { RootState } from "../configureStore";
import isEqual from "lodash/isEqual";

export const itemsToFetch = 10; // how many posts are fetched on each get

export interface PostsState {
  error: string | null;
  latestFetchedPosts: IPost[]; // last itemsToFetch that are displayed
  userPosts: IPost[];
  hasMoreToFetch: boolean;
  lastUpdatedPosts: IPost[];
}
export const initialState: PostsState = {
  error: null,
  latestFetchedPosts: [],
  userPosts: [],
  hasMoreToFetch: true,
  lastUpdatedPosts: [],
};

interface LikePayload {
  post: IPost;
  userId: string;
}

interface ReplyPayload {
  postId: string;
  reply: IPost;
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
      const updatedLatestFetchedPosts = userLikePost(
        state.latestFetchedPosts,
        action.payload.post._id,
        action.payload.userId
      );

      if (!isEqual(state.latestFetchedPosts, updatedLatestFetchedPosts)) {
        state.latestFetchedPosts = updatedLatestFetchedPosts;
      }

      const updatedUserPosts = userLikePost(state.userPosts, action.payload.post._id, action.payload.userId);

      if (!isEqual(state.userPosts, updatedUserPosts)) {
        state.userPosts = updatedUserPosts;
      }
    },
    userRemoveLikePost: (state, action: PayloadAction<LikePayload>) => {
      const updatedLatestFetchedPosts = userDislikePost(
        state.latestFetchedPosts,
        action.payload.post._id,
        action.payload.userId
      );

      if (!isEqual(state.latestFetchedPosts, updatedLatestFetchedPosts)) {
        state.latestFetchedPosts = updatedLatestFetchedPosts;
      }

      const updatedUserPosts = userDislikePost(state.userPosts, action.payload.post._id, action.payload.userId);

      if (!isEqual(state.userPosts, updatedUserPosts)) {
        state.userPosts = updatedUserPosts;
      }
    },
    addReplyToPost: (state, action: PayloadAction<ReplyPayload>) => {
      const updatedLatestFetchedPosts = addReplyToPost(
        state.latestFetchedPosts,
        action.payload.postId,
        action.payload.reply
      );

      if (!isEqual(state.latestFetchedPosts, updatedLatestFetchedPosts)) {
        state.latestFetchedPosts = updatedLatestFetchedPosts;
      }

      const updatedUserPosts = addReplyToPost(state.userPosts, action.payload.postId, action.payload.reply);

      if (!isEqual(state.userPosts, updatedUserPosts)) {
        state.userPosts = updatedUserPosts;
      }
    },
    postsUpdated: (state, action: PayloadAction<IPost[]>) => {
      state.lastUpdatedPosts = action.payload;
    },
    // resetPostsUpdated: (state, action: PayloadAction) => {
    //   state.lastUpdatedPosts = [];
    // },
  },
});

export const postsActions = postsSlice.actions;
export const postsSelector = (state: RootState) => state.posts;

export default postsSlice.reducer;
