import { combineReducers } from "redux";
import articleListReducer from "./articleListReducer";
import tagRankingReducer from "./tagRankingReducer";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  articleListReducer,
  tagRankingReducer,
  userReducer,
  profileReducer,
});

export default rootReducer;
