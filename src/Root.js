import React from "react";
import { Provider } from "react-redux";
import store from "store";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

let history;
export default ({children}) => {
    return (
        <Provider store={store}>
          <Router basename="/" history={history}>
          {children}
          </Router>
          </Provider>
      );
}
