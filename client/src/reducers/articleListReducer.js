import { SET_ARTICLE_LIST } from "../actions";

const articleListReducer = (state = { article: [] }, action) => {
  switch (action.type) {
    case SET_ARTICLE_LIST:
      return { article: action.payload };
    default:
      return state;
  }
};

export default articleListReducer;
