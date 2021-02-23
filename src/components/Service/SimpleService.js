import axios from "axios";
import { logoutInvalidSession } from "../../actions/authActions";

/*
export const gets = (url) => {
// declare a response interceptor
axios.interceptors.response.use((response) => {
    // do something with the response data
    console.log('Response was received');
  
    return response;
  }, error => {
    // handle the response error
    return Promise.reject(error);
  });
  


}
*/

const handleSuccess = (response) => {
  return response;
};

const handleError = (error) => {
  return Promise.reject(error);
};

// Get method
export const get = (path, params, callback) => {
  // change to get token from redux store ( if not take it from local storage, )

  const token = localStorage.getItem("jwtToken");

  // Set header auth
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  // Create service
  let service = axios.create({});

  // Interceptor response
  service.interceptors.response.use(handleSuccess, handleError);

  return service.get(path).then((response) => {
    if (response.data.code === 401 || response.data.code === 402) {
      return logoutInvalidSession();
    } else {
      callback(response);
    }
  });
};

export const post = (path, payload, callback) => {
  const token = localStorage.getItem("jwtToken");
  // Set header auth
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  // Create service
  let service = axios.create({});
  // Interceptor response
  service.interceptors.response.use(handleSuccess, handleError);

  return service
    .request({
      method: "POST",
      url: path,
      responseType: "json",
      data: payload,
    })
    .then(function (response) {
      if (response.data.code === 401 || response.data.code === 402) {
        return logoutInvalidSession();
      } else {
        return response;
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
