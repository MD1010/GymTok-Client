import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import postReducer from "./posts/postsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
