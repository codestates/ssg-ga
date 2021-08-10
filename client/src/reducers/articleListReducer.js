import { SET_ARTICLE_LIST, SET_TAG_LIST, ADD_ARTICLE_LIST } from "../actions";

const initial = {
  articleList: [],
  tags: [],
  ingredients: [],
};

const articleListReducer = (state = initial, { type, payload }) => {
  switch (type) {
    case SET_ARTICLE_LIST:
      return {
        ...state,
        articleList: payload,
      };
    case SET_TAG_LIST:
      console.log(payload);

      return {
        ...state,
        tags: payload.tags,
        ingredients: payload.ingredients,
      };
    case ADD_ARTICLE_LIST:
      console.log(payload);

      return {
        ...state,
        articleList: [...state.articleList, ...payload],
      };
    default:
      return state;
  }
};

export default articleListReducer;
