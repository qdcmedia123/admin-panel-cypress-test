import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER, CURRENT_USER_DETAILS } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  details: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case CURRENT_USER_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    default:
      return state;
  }
}
