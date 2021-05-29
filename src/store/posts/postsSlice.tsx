import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../interfaces";
import { IProfileDetails } from "../../interfaces/Profile";
import { addReplyToPost } from "../../utils/addReplyToPost";
import { userLikePost, userDislikePost } from "../../utils/updatePostLikes";
import { RootState } from "../configureStore";
import cloneDeep from "lodash/cloneDeep";
import { PostType } from "../../utils/postTypeEnum";

export const itemsToFetch = 12; // how many posts are fetched on each get

export interface PostsState {
  error: string | null;
  latestFetchedPosts: IPost[]; // last itemsToFetch that are displayed
  userPosts: IPost[];
  userChallenges: IPost[];
  userReplies: IPost[];
  numOfUserChallenges: number | string;
  numOfUserReplies: number | string;
  hasMoreToFetch: boolean;
  hasMoreChallengesToFetch: boolean;
  hasMoreRepliesToFetch: boolean;
  posts: IPost[];
}
export const initialState: PostsState = {
  error: null,
  latestFetchedPosts: [],
  userPosts: [],
  userChallenges: [],
  userReplies: [],
  numOfUserChallenges: "-",
  numOfUserReplies: "-",
  hasMoreToFetch: true,
  hasMoreChallengesToFetch: true,
  hasMoreRepliesToFetch: true,
  posts: [],
};

interface PostPayload {
  postType: PostType;
  newPosts: IPost[];
}

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
    userProfileChallengesFetchSuccess: (state, action: PayloadAction<IPost[]>) => {
      console.log("setting more challenges!");
      if (action.payload.length < itemsToFetch) state.hasMoreChallengesToFetch = false;
      state.userChallenges = [...state.userChallenges, ...action.payload];
      console.log(`new challenges lenght: ${state.userChallenges.length}`);
    },
    userProfileRepliesFetchSuccess: (state, action: PayloadAction<IPost[]>) => {
      console.log("setting more replies!");

      if (action.payload.length < itemsToFetch) state.hasMoreRepliesToFetch = false;
      state.userReplies = [...state.userReplies, ...action.payload];
      console.log(`new replies lenght: ${state.userReplies.length}`);
    },
    setProfileDetails: (state, action: PayloadAction<IProfileDetails>) => {
      console.log("hereeeee");
      state.numOfUserChallenges = action.payload.numOfChallenges;
      state.numOfUserReplies = action.payload.numOfReplies;
    },
    increaseNumOfChallenges: (state) => {
      console.log("in increas func");
      typeof state.numOfUserChallenges == "number" ? (state.numOfUserChallenges = state.numOfUserChallenges + 1) : null;
    },
    increaseNumOfReplies: (state) => {
      typeof state.numOfUserReplies == "number" ? (state.numOfUserReplies = state.numOfUserReplies + 1) : null;
    },
    setUserChallenges: (state, action: PayloadAction<IPost[]>) => {
      state.userChallenges = action.payload;
    },
    setUserReplies: (state, action: PayloadAction<IPost[]>) => {
      state.userReplies = action.payload;
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

      const updatedUserPosts = userLikePost(state.userPosts, action.payload.post._id, action.payload.userId);

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

      const updatedUserPosts = userDislikePost(state.userPosts, action.payload.post._id, action.payload.userId);

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

      const updatedUserPosts = addReplyToPost(state.userPosts, action.payload.postId, action.payload.reply);

      if (updatedLatestFetchedPosts) {
        state.userPosts = updatedUserPosts;
      }
    },
    clearDataBeforeLogOut: (state) => initialState,

    fetchNewPosts: (state, action: PayloadAction<PostPayload>) => {
      for (const newPost of action.payload.newPosts) {
        const post = state.posts.find((existPost) => existPost._id === newPost._id);

        if (post) {
          post.types.push(action.payload.postType);
        } else {
          state.posts.push({ ...newPost, types: [action.payload.postType] });
        }
      }
    },
  },
});

export const postsActions = postsSlice.actions;
export const postsSelector = (state: RootState) => state.posts;
export const challengesSelector = (state: RootState) => state.posts.userChallenges;
export const repliesSelector = (state: RootState) => state.posts.userReplies;
export const numOfChallengesSelector = (state: RootState) => state.posts.numOfUserChallenges;
export const numOfRepliesSelector = (state: RootState) => state.posts.numOfUserReplies;

export default postsSlice.reducer;
