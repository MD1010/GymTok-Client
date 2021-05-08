import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import postReducer from "./posts/postsSlice";
import notificationsReducer from "./notifications/notificationsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  notifications: notificationsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
