// action types
export const GET_ARTICLE_LIST = "GET_ARTICLE_LIST";
export const GET_TAGS_LIST = "GET_TAGS_LIST";

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
