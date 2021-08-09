import { ADD_ARTICLE_LIST, GET_ARTICLE_LIST } from "../actions";
import { res } from "./initialState";

const articleListReducer = (state = res.article, action) => {
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
