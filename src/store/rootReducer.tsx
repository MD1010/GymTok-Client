import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import postReducer from "./posts/postsSlice";
import repliesReducer from "./replies/repliesSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  replies: repliesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
