import { GET_TAGS_LIST } from "../actions";
import { res } from "./initialState";

const tagRankingReducer = (state = res, action) => {
  switch (action.type) {
    case GET_TAGS_LIST:
      return action.payload;
    default:
      return {
        tags: state.tags,
        ingredient: state.ingredient,
      };
  }
};

export default tagRankingReducer;
