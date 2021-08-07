import { GET_ARTICLE_LIST } from "../actions";
import { list } from "./initialState";

const articleListReducer = (state = list, action) => {
  switch (action.type) {
    case GET_ARTICLE_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default articleListReducer;
