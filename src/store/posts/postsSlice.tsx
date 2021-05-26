import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../interfaces";
import { addReplyToPost } from "../../utils/addReplyToPost";
import { userLikePost, userDislikePost } from "../../utils/updatePostLikes";
import { RootState } from "../configureStore";

export const itemsToFetch = 10; // how many posts are fetched on each get

export interface PostsState {
  error: string | null;
  latestFetchedPosts: IPost[]; // last itemsToFetch that are displayed
  userPosts: IPost[];
  userChallenges: IPost[];
  userReplies: IPost[];
  hasMoreToFetch: boolean;
  hasMoreChallengesToFetch: boolean;
  hasMoreRepliesToFetch: boolean;
}
export const initialState: PostsState = {
  error: null,
  latestFetchedPosts: [],
  userPosts: [],
  userChallenges: [],
  userReplies: [],
  hasMoreToFetch: true,
  hasMoreChallengesToFetch: true,
  hasMoreRepliesToFetch: true,
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
      state.latestFetchedPosts = [
        ...state.latestFetchedPosts,
        ...action.payload,
      ];
      // state.latestFetchedPosts.sort((a,b) => new Date(a.publishDate) - new Date(b.publishDate) );
      // state.latestFetchedPosts = [...action.payload,...state.latestFetchedPosts];
      state.error = null;
    },
    userPostsFetchSuccess: (state, action: PayloadAction<IPost[]>) => {
      if (action.payload.length < itemsToFetch) state.hasMoreToFetch = false;
      state.userPosts = [...state.userPosts, ...action.payload];
      state.error = null;
    },
    userProfileChallengesFetchSuccess: (
      state,
      action: PayloadAction<IPost[]>
    ) => {
      console.log("setting more challenges!");
      if (action.payload.length < itemsToFetch)
        state.hasMoreChallengesToFetch = false;
      state.userChallenges = [...state.userChallenges, ...action.payload];
    },
    userProfileRepliesFetchSuccess: (state, action: PayloadAction<IPost[]>) => {
      console.log("setting more replies!");

      if (action.payload.length < itemsToFetch)
        state.hasMoreRepliesToFetch = false;
      state.userReplies = [...state.userReplies, ...action.payload];
    },
    setUserPosts: (state, action: PayloadAction<IPost[]>) => {
      state.userPosts = action.payload;
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

      if (updatedLatestFetchedPosts) {
        state.latestFetchedPosts = updatedLatestFetchedPosts;
      }

      const updatedUserPosts = userLikePost(
        state.userPosts,
        action.payload.post._id,
        action.payload.userId
      );

      if (updatedUserPosts) {
        state.userPosts = updatedUserPosts;
      }
    },
    userRemoveLikePost: (state, action: PayloadAction<LikePayload>) => {
      const updatedLatestFetchedPosts = userDislikePost(
        state.latestFetchedPosts,
        action.payload.post._id,
        action.payload.userId
      );

      if (updatedLatestFetchedPosts) {
        state.latestFetchedPosts = updatedLatestFetchedPosts;
      }

      const updatedUserPosts = userDislikePost(
        state.userPosts,
        action.payload.post._id,
        action.payload.userId
      );

      if (updatedUserPosts) {
        state.userPosts = updatedUserPosts;
      }
    },
    addReplyToPost: (state, action: PayloadAction<ReplyPayload>) => {
      const updatedLatestFetchedPosts = addReplyToPost(
        state.latestFetchedPosts,
        action.payload.postId,
        action.payload.reply
      );

      if (updatedLatestFetchedPosts) {
        state.latestFetchedPosts = updatedLatestFetchedPosts;
      }

      const updatedUserPosts = addReplyToPost(
        state.userPosts,
        action.payload.postId,
        action.payload.reply
      );

      if (updatedLatestFetchedPosts) {
        state.userPosts = updatedUserPosts;
      }
    },
  },
});

export const postsActions = postsSlice.actions;
export const postsSelector = (state: RootState) => state.posts;
export const challengesSelector = (state: RootState) =>
  state.posts.userChallenges;
export const repliesSelector = (state: RootState) => state.posts.userReplies;

export default postsSlice.reducer;
