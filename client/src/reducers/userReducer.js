import {
  SET_LOGIN_STATE,
  SET_LOGOUT_STATE,
  CHANGE_USERNAME,
  DELETE_USER,
  CANCEL_EDIT,
  SET_PROFILE_IMAGE,
  CHANGE_PROFILE_IMAGE,
  DELETE_PROFILE_IMAGE,
} from "../actions/index";

const userInit = {
  userData: {
    id: 0,
    username: "",
    email: "",
  },
  isLogin: false,
  token: "",
};

const profileImageInit = {
  profileImage:
    "https://user-images.githubusercontent.com/79234473/128624502-0f889d24-4bcf-4f1f-a27e-0544b6b2e6bc.jpeg",
  //'https://user-images.githubusercontent.com/79234473/128624536-2b4e4171-fb5f-4377-bcc8-2a52eb642215.jpeg'
};

export const loginReducer = (state = userInit, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return {
        ...state,
        userData: action.userData,
        isLogin: action.isLogin,
        token: action.token,
      };
    case SET_LOGOUT_STATE:
      return {
        userInit,
      };

    case CHANGE_USERNAME:
      return {
        ...state,
        userData: action.userData,
      };

    case DELETE_USER:
      return {
        userInit,
      };

    case CANCEL_EDIT:
      return {
        ...state,
        userData: action.userData,
      };

    default:
      return state;
  }
};

export const profileReducer = (state = profileImageInit, action) => {
  switch (action.type) {
    case SET_PROFILE_IMAGE:
      return {
        ...state,
        image: action.image,
      };

    case CHANGE_PROFILE_IMAGE:
      return {
        ...state,
        image: action.image,
      };
    case DELETE_PROFILE_IMAGE:
      return {
        ...state,
        image: "",
      };
    default:
      return state;
  }
};
