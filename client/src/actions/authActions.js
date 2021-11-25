import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, GET_NOTIFICATIONS, SET_CURRENT_USER } from "./Types";
import axios from "axios";
//register user action creator
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login get user info

export const loginUser = (userData) => async (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      const { token } = res.data;
      //set token to local storage
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      //decode the token to get the user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//get the notifications of current user
export const getNotifications = (id) => async (dispatch) => {
  axios
    .get(`/api/users/notifications/${id}`)
    .then((res) =>
      dispatch({
        type: GET_NOTIFICATIONS,
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

// clear notification for the current user
export const clearNotifications = (id) => (dispatch) => {
  axios
    .delete(`/api/users/notifications/${id}`)
    .then((res) => window.location.reload(false))
    .catch((err) => console.log(err.response.data));
};

//logout user
export const logoutUser = () => (dispatch) => {
  //remove token from local storage
  localStorage.removeItem("jwtToken");
  //remove token from header
  setAuthToken(false);
  //set current user to {}
  dispatch(setCurrentUser({}));
};
