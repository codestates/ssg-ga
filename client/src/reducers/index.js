import { combineReducers } from "redux";
import articleListReducer from "./articleListReducer";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import effectReducer from "./effectReducer";

const rootReducer = combineReducers({
  articleListReducer,
  userReducer,
  profileReducer,
  effectReducer,
});

export default rootReducer;
