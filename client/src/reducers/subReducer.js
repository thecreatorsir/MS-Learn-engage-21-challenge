import { GET_CURRENT_SUBJECT } from "../actions/Types";

const initialstate = {
  loading: true,
  subject: {},
};

const subReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_CURRENT_SUBJECT:
      return {
        ...state,
        loading: false,
        subject: action.payload,
      };
    default:
      return state;
  }
};

export default subReducer;
