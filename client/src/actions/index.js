// action index.js
export const SET_LOGIN_STATE = "SET_LOGIN_STATE";
export const SET_LOGOUT_STATE = "SET_LOGOUT_STATE";
export const CHANGE_USERNAME = "CHANGE_USERNAME";
export const DELETE_USER = "DELETE_USER";
export const CANCEL_EDIT = "CANCEL_EDIT";

export const SET_PROFILE_IMAGE = "SET_PROFILE_IMAGE";
export const CHANGE_PROFILE_IMAGE = "CHANGE_PROFILE_IMAGE";
export const DELETE_PROFILE_IMAGE = "DELETE_PROFILE_IMAGE";

export const RECIPE_LIST = "RECIPE_LIST";
// action creator function
export const setLogin = (userData, isLogin, token) => {
  return {
    type: SET_LOGIN_STATE,
    userData,
    isLogin,
    token,
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

export const setProfileImage = (profileImage) => {
  return {
    type: SET_PROFILE_IMAGE,
    profileImage,
  };
};

export const changeProfileImage = (profileImage) => {
  return {
    type: CHANGE_PROFILE_IMAGE,
    profileImage,
  };
};

export const deleteProfileImage = (profileImage) => {
  return {
    type: DELETE_PROFILE_IMAGE,
    profileImage,
  };
};
