import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import Service from "../components/Service/service";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  CURRENT_USER_DETAILS,
} from "./types";

export const loginWithEmailUser = (login_EmailUser, history) => (dispatch) => {
  Service.post("/api/v1/login", login_EmailUser)
    .then((res) => {
      if (res.data.code === 200) {
        const token = res.data.data.access_token;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userDetails", JSON.stringify(res.data));
        // Set token to auth header

        // Decod token
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
        dispatch(setUserDetails(res.data));
        setAuthToken(token);
        history.push("/dashboard");
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data,
        });
      }
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Setting all details of response for the purpose to accessing variable properties of user
export const setUserDetails = (data) => {
  return {
    type: CURRENT_USER_DETAILS,
    payload: data,
  };
};

export const Errors = (err) => {
  return {
    type: GET_ERRORS,
    payload: err.response.data,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const logout = (props) => (dispatch) => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userDetails");
  props.history.push("/");
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const logoutUser = () => {
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  //setAuthToken(false);
  window.location.replace("/");
};

export const logoutInvalidSession = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userDetails");
  // Remove auth header for future requests
  //setAuthToken(false);
  window.location.replace("/");
};
