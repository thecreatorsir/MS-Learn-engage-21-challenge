import axios from "axios";

// for setting the auth token for every api request
const setAuthToken = (token) => {
  if (token) {
    //apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete the auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
