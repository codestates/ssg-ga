import { combineReducers } from "redux";
import articleListReducer from "./articleListReducer";

const rootReducer = combineReducers({
  articleListReducer,
});

export default rootReducer;
