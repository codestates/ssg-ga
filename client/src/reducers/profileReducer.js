import {
  SET_PROFILE_IMAGE,
  CHANGE_PROFILE_IMAGE,
  DELETE_PROFILE_IMAGE,
} from "../actions/index";

const profileImageInit = {
  image:
    "https://user-images.githubusercontent.com/79234473/128624502-0f889d24-4bcf-4f1f-a27e-0544b6b2e6bc.jpeg",
  //'https://user-images.githubusercontent.com/79234473/128624536-2b4e4171-fb5f-4377-bcc8-2a52eb642215.jpeg'
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
