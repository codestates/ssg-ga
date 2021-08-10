// action index.js
export const SET_LOGIN_STATE = "SET_LOGIN_STATE";
export const SET_LOGOUT_STATE = "SET_LOGOUT_STATE";
export const CHANGE_USERNAME = "CHANGE_USERNAME";
export const DELETE_USER = "DELETE_USER";
export const CANCEL_EDIT = "CANCEL_EDIT";
export const SET_LOGIN_MODAL = "SET_LOGIN_MODAL";
export const SHOW_MODAL = "SHOW_MODAL";
export const SET_PROFILE_IMAGE = "SET_PROFILE_IMAGE";
export const CHANGE_PROFILE_IMAGE = "CHANGE_PROFILE_IMAGE";
export const DELETE_PROFILE_IMAGE = "DELETE_PROFILE_IMAGE";
export const SET_ARTICLE_LIST = "SET_ARTICLE_LIST";
export const ADD_ARTICLE_LIST = "ADD_ARTICLE_LIST";
export const SET_TAG_LIST = "SET_TAG_LIST";

// action creator function
export const setModal = (value) => {
  return {
    type: SET_LOGIN_MODAL,
    value,
  };
};

export const showModal = (value) => {
  return {
    type: SHOW_MODAL,
    value,
  };
};

export const setLogin = (userData, isLogin, token) => {
  return {
    type: SET_LOGIN_STATE,
    payload: { userData, isLogin, token },
  };
};
export const setLogout = (userData, isLogin, token) => {
  return {
    type: SET_LOGOUT_STATE,
    userData,
    isLogin,
    token,
  };
};

export const changeUsername = (userData, isLogin, token) => {
  return {
    type: CHANGE_USERNAME,
    userData,
    isLogin,
    token,
  };
};

export const deleteUser = (userData, isLogin, token) => {
  return {
    type: DELETE_USER,
    userData,
    isLogin,
    token,
  };
};

//NOTE 유저네임만 비우면 된다.
export const cancelEdit = (userData, isLogin, token) => {
  return {
    type: CANCEL_EDIT,
    userData,
    isLogin,
    token,
  };
};

export const setProfileImage = (image) => {
  return {
    type: SET_PROFILE_IMAGE,
    image,
  };
};

export const changeProfileImage = (image) => {
  return {
    type: CHANGE_PROFILE_IMAGE,
    image,
  };
};

export const deleteProfileImage = (image) => {
  return {
    type: DELETE_PROFILE_IMAGE,

    image,
  };
};

export const setArticleList = (list) => {
  return {
    type: SET_ARTICLE_LIST,
    payload: list,
  };
};

export const addArticleList = (list) => {
  return {
    type: ADD_ARTICLE_LIST,
    payload: list,
  };
};

export const setTagList = ({ tags, ingredients }) => {
  console.log(tags);
  return {
    type: SET_TAG_LIST,
    payload: { tags, ingredients },
  };
};
