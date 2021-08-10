import { combineReducers } from "redux";
import articleListReducer from "./articleListReducer";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  articleListReducer,
  userReducer,
  profileReducer,
});

export default rootReducer;
