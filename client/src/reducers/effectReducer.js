import { SET_HEADER_ACTIVE, SET_TOP_BUTTON, SET_PAGE_INIT } from "../actions";

const init = {
  topButton: false,
  header: false,
};

const effectReducer = (state = init, { type, payload }) => {
  switch (type) {
    case SET_TOP_BUTTON:
      return {
        ...state,
        topButton: payload,
      };
    case SET_HEADER_ACTIVE:
      return {
        ...state,
        header: payload,
      };
    case SET_PAGE_INIT:
      document.documentElement.scrollTop = 0;
      return {
        ...state,
        header: false,
      };
    default:
      return state;
  }
};

export default effectReducer;
