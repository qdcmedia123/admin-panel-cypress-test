import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.interceptors.response.use(
      (response) => {
        // do something with the response data
        // Check response code
        if (response.data.code === 401 || response.data.code === 402) {
          //return logoutInvalidSession();
        }

        return response;
      },
      (error) => {
        // handle the response error
        return Promise.reject(error);
      }
    );

    // Apply to every request
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
