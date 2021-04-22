import { IPost } from "../../interfaces";
import { AppDispatch, AppThunk } from "../configureStore";
import { RootState } from "../rootReducer";
import { repliesActions } from "./repliesSlice";

export const addReplyToChallenge = (reply: IPost): AppThunk => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(repliesActions.addReplyToChallenge(reply));
  };
};
