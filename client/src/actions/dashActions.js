import {
  GET_ERRORS,
  GET_CURRENT_USER_SUBJECTS,
  GET_CURRENT_SUBJECT,
} from "./Types";
import axios from "axios";
//get all subjects for the login users
export const getSubjects = () => (dispatch) => {
  axios
    .get("/api/dashboard")
    .then((res) =>
      dispatch({
        type: GET_CURRENT_USER_SUBJECTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getSubject = (id) => (dispatch) => {
  axios
    .get(`/api/dashboard/subject/${id}`)
    .then((res) =>
      dispatch({
        type: GET_CURRENT_SUBJECT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const uploadAssignment = (id, assignData, history) => (dispatch) => {
  axios
    .post(`/api/dashboard/subject/${id}`, assignData)
    .then((res) => console.log(res.data))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
