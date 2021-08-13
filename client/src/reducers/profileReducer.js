import {
  SET_PROFILE_IMAGE,
  CHANGE_PROFILE_IMAGE,
  DELETE_PROFILE_IMAGE,
} from "../actions/index";

const profileImageInit = {
  image: "cocktail111.jpg",
};

const profileReducer = (state = profileImageInit, action) => {
  switch (action.type) {
    case SET_PROFILE_IMAGE:
      return {
        ...state,
        image: action.image === null ? profileImageInit.image : action.image,
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

export default profileReducer;
