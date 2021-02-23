import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer.js";

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('../mocks/browser');
  worker.start();
}

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
});
