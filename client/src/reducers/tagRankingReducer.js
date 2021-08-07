import { GET_TAGS_LIST } from "../actions";
import { tags } from "./initialState";

const tagRankingReducer = (state = tags, action) => {
  switch (action.type) {
    case GET_TAGS_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default tagRankingReducer;
