import axios from "axios";
//import store from '../../store';
//import {logout } from '../../actions/authActions';
/*
const a = store.subscribe(function(item){
      const state = store.getState();
      // Get the token 
      
      if(typeof state.auth.details.data !== 'undefined' ) {
        access_token = state.auth.details.data.access_token;
      }
       
     // console.log(access_token);

      return access_token;
      
    })
*/

class Service {
  constructor() {
    // Get the token
    // change to get token from redux store ( if not take it from local storage, )
    const token = localStorage.getItem("jwtToken");

    // Set header auth
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    // Create service
    let service = axios.create({});

    // Interceptor response
    service.interceptors.response.use(this.handleSuccess, this.handleError);

    // Set service to the class object
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  // Handle errors
  handleError = (error) => {
    /* 
    // change to check the response.data.code ( virtual protocol applies for all the apis)
    // if this code is ( 402 or 401 do trigger the log out)
		switch (error.response.status) {
			case 401:
				this.redirectTo(document, '/');
				break;

			case 404:
				this.redirectTo(document, '/404');
				break;

			default:
				this.redirectTo(document, '/500');
				break;
		}
    */

    return Promise.reject(error);
  };

  // Redirect
  redirectTo = (document, path) => {
    document.location = path;
  };

  get(path, params, callback) {
    return this.service.get(path).then((response) => callback(response));
  }

  post(path, payload, callback) {
    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then(function (response) {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export default new Service();
