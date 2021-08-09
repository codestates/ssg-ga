import { combineReducers } from "redux";
import articleListReducer from "./articleListReducer";
import tagRankingReducer from "./tagRankingReducer";

const rootReducer = combineReducers({
  articleListReducer,
  tagRankingReducer,
});

export default rootReducer;
