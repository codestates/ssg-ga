import {
  SET_LOGIN_STATE,
  SET_LOGOUT_STATE,
  CHANGE_USERNAME,
  DELETE_USER,
  CANCEL_EDIT,
} from "../actions/index";

const userInit = {
  userData: {
    id: 0,
    username: "",
    email: "",
  },
  isLogin: false,
  token: "",
  isSetModal: false,
};

export const loginReducer = (state = userInit, action) => {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        isSetModal: true,
      };

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
