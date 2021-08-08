import { ADD_ARTICLE_LIST, GET_ARTICLE_LIST } from "../actions";
import { list } from "./initialState";

const articleListReducer = (state = list, action) => {
  switch (action.type) {
    case GET_ARTICLE_LIST:
      return action.payload;
    // Local test용
    case ADD_ARTICLE_LIST:
      return [...state, { ...action.payload }];
    default:
      return state;
  }
};

export default articleListReducer;
