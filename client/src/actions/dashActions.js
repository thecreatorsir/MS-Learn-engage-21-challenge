import {
  GET_ERRORS,
  GET_CURRENT_USER_SUBJECTS,
  GET_CURRENT_SUBJECT,
  GET_CURRENT_ASSIGNMENT,
  GET_RESPONSES,
} from "./Types";
import axios from "axios";
//get all subjects for the login users : for both the users
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
//get a perticular subject : for both the users
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

//action for uploading assignment : for teacher
export const uploadAssignment = (id, assignData) => (dispatch) => {
  axios
    .post(`/api/dashboard/subject/${id}`, assignData)
    .then((res) => window.location.reload(false))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//action for deleting assignment : for teacher
export const deleteAssignment = (id, aid) => (dispatch) => {
  axios
    .delete(`/api/dashboard/subject/${id}/assignment/${aid}`)
    .then((res) => window.location.reload(false))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//action for updating assignment status : for teacher
export const updateAssignmentStatus = (id, aid) => (dispatch) => {
  axios
    .put(`/api/dashboard/subject/${id}/assignment/${aid}`)
    .then((res) => window.location.reload(false))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//action for getting the responses : for teacher
export const getResponses = (id, aid) => (dispatch) => {
  axios
    .get(`/api/dashboard/subject/${id}/assignment/${aid}/responses`)
    .then((res) =>
      dispatch({
        type: GET_RESPONSES,
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

//action for awarding grades: for teacher
export const postGrade = (id, aid, res_id, grade, history) => (dispatch) => {
  axios
    .post(
      `/api/dashboard/subject/${id}/assignment/${aid}/responses/${res_id}`,
      grade
    )
    .then((res) =>
      history.push(`/dashboard/subject/${id}/assignment/${aid}/responses`)
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//action to get a perticular assigment : for student
export const getAssignment = (id, aid) => (dispatch) => {
  axios
    .get(`/api/dashboard/subject/${id}/assignment/${aid}`)
    .then((res) =>
      dispatch({
        type: GET_CURRENT_ASSIGNMENT,
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

//action to submit the assignment : for student
export const submitAssignment = (id, aid, response, history) => (dispatch) => {
  axios
    .post(`/api/dashboard/subject/${id}/assignment/${aid}`, response)
    .then((res) => history.push(`/dashboard/subject/${id}`))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
