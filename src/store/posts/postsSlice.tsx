import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ViewStyle } from "react-native";
import { IPost } from "../../interfaces";
import { RootState } from "../configureStore";

export const itemsToFetch = 40; // how many posts are fetched on each get

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
  post: IPost,
  userId: string;
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchMoreSuccess: (state, action: PayloadAction<IPost[]>) => {
      if (action.payload.length < itemsToFetch) state.hasMoreToFetch = false;
      state.latestFetchedPosts = [...state.latestFetchedPosts, ...action.payload];
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
      const copiedLatestFetchedPosts = [...state.latestFetchedPosts];
      const updatedLatestFetchedPost = copiedLatestFetchedPosts.find(post => post._id === action.payload.post._id);
      if (updatedLatestFetchedPost) {
        updatedLatestFetchedPost.likes.push(action.payload.userId);
        state.latestFetchedPosts = copiedLatestFetchedPosts;
      }

      const copiedUserPosts = [...state.userPosts];
      const updatedUserPost = copiedUserPosts.find(post => post._id === action.payload.post._id);
      if (updatedUserPost) {
        updatedUserPost.likes.push(action.payload.userId);
        state.userPosts = copiedUserPosts;
      }
    },
    userRemoveLikePost: (state, action: PayloadAction<LikePayload>) => {
      const copiedLatestFetchedPosts = [...state.latestFetchedPosts];
      const updatedLatestFetchedPost = copiedLatestFetchedPosts.find(post => post._id === action.payload.post._id);
      if (updatedLatestFetchedPost) {
        updatedLatestFetchedPost.likes = updatedLatestFetchedPost.likes.filter(likedUser => likedUser !== action.payload.userId);
        state.latestFetchedPosts = copiedLatestFetchedPosts;
      }

      const copiedUserPosts = [...state.userPosts];
      const updatedUserPost = copiedUserPosts.find(post => post._id === action.payload.post._id);
      if (updatedUserPost) {
        updatedUserPost.likes = updatedUserPost.likes.filter(likedUser => likedUser !== action.payload.userId);
        state.userPosts = copiedUserPosts
      }
    }
  },
});



export const postsActions = postsSlice.actions;
export const postsSelector = (state: RootState) => state.posts;

export default postsSlice.reducer;
