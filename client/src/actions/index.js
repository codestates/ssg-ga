// action types
export const GET_ARTICLE_LIST = "GET_ARTICLE_LIST";
export const GET_TAGS_LIST = "GET_TAGS_LIST";
export const ADD_ARTICLE_LIST = "ADD_ARTICLE_LIST"; // Local test용

// action creator functions
export const getArticleList = (list) => {
  return {
    type: GET_ARTICLE_LIST,
    payload: list,
  };
};

export const getTagsList = (tags) => {
  return {
    type: GET_TAGS_LIST,
    payload: tags,
  };
};

// Local test용
export const addArticleList = (post) => {
  return {
    type: ADD_ARTICLE_LIST,
    payload: post,
  };
};
