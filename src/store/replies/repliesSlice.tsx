import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ViewStyle } from "react-native";
import { IPost } from "../../interfaces";
import { getPostsAfterUserLikePost, getPostsAfterUserRemoveLikeFromPost } from "../../utils/updatePostLikes";
import { RootState } from "../configureStore";


export interface RepliesState {
  latestNewReply: IPost
}
export const initialState: RepliesState = {
  latestNewReply: null
};


const repliesSlice = createSlice({
  name: "replies",
  initialState,
  reducers: {
    addReplyToChallenge: (state, action: PayloadAction<IPost>) => {
      state.latestNewReply = action.payload
    }
  }
});



export const repliesActions = repliesSlice.actions;
export const repliesSelector = (state: RootState) => state.replies;

export default repliesSlice.reducer;
