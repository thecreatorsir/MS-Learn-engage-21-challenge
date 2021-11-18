import {
  GET_CURRENT_SUBJECT,
  GET_CURRENT_ASSIGNMENT,
  GET_RESPONSES,
} from "../actions/Types";

const initialstate = {
  loading: true,
  subject: {},
  assignment: {},
  responses: [],
};

const subReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_CURRENT_SUBJECT:
      return {
        ...state,
        loading: false,
        subject: action.payload,
      };
    case GET_CURRENT_ASSIGNMENT:
      return {
        ...state,
        loading: false,
        assignment: action.payload,
      };
    case GET_RESPONSES:
      return {
        ...state,
        loading: false,
        responses: action.payload,
      };
    default:
      return state;
  }
};

export default subReducer;
