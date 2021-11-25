import { SET_CURRENT_USER, GET_NOTIFICATIONS } from "../actions/Types";
import isEmpty from "../validator/is-empty";
const initialstate = {
  isAuthenticated: false,
  user: {},
  notifications: [],
};

const authReducer = (state = initialstate, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
