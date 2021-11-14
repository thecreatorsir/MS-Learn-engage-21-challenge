import { SET_CURRENT_USER } from "../actions/Types";
import isEmpty from "../validator/is-empty";
const initialstate = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = initialstate, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
