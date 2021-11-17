import { GET_CURRENT_USER_SUBJECTS } from "../actions/Types";

const initialstate = {
  loading: true,
  subjects: {},
};

const dashReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_SUBJECTS:
      return {
        ...state,
        loading: false,
        subjects: action.payload,
      };
    default:
      return state;
  }
};

export default dashReducer;
