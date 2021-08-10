import { SET_ARTICLE_LIST, ADD_ARTICLE_LIST, SET_TAGS_LIST } from "../actions";

const initial = {
  article: [],
  tag: ["해시태그1", "해시태그2", "해시태그3", "해시태그4", "해시태그5"],
  ingredient: ["재료1", "재료2", "재료3", "재료4", "재료5"],
};

const articleListReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_ARTICLE_LIST:
      return { ...state, article: action.payload };
    case SET_TAGS_LIST:
      return { ...state, tag: action.payload };
    case ADD_ARTICLE_LIST:
      return { ...state, article: [...state.article, ...action.payload] };
    default:
      return state;
  }
};

export default articleListReducer;
