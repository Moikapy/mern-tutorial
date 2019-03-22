import axios from "axios";
import jwt_decode from 'jwt-decode'
// Utils
import setAuthToken from "../utils/setAuthToken";
//Types
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
// Register USer
export const registerUser = (userData, history) => dispatch => {
  // Posts User Information
  axios
    .post("/api/auth/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get USer Toke
export const loginUser = userData => dispatch => {
  axios
    .post("/api/auth/login", userData)
    .then(res => {
      // Save to Local Storage
      const { token } = res.data;
      //set TOke to Local storage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth Header
      setAuthToken(token);
      // Decode Toke for User data
      const decoded = jwt_decode(token)
      // set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log uer out
export const logoutUser = () => dispatch => {
  // Remove Token and Localstorage
  localStorage.removeItem('jwtToken')
  // Remove auth Header for future requests
  setAuthToken(false);
  //set Current user to {} which will est isAuthenticated to false
  dispatch(setCurrentUser({}));
}