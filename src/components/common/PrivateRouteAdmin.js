import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const whoIsPermittedForRoute = (routePermission, mypermission) => {
  let routePermitted = false;
  let whoIsPermitted = [];
  for (var i in routePermission) {
    if (mypermission[routePermission[i]] === true) {
      routePermitted = true;
      whoIsPermitted.push(routePermission[i]);
      break;
    }
  }

  return routePermitted;
};

// mypermission
//auth.details.data.permission_mapping

// routePremission
// requiredPermission

const PrivateRoute = ({
  component: Component,
  auth,
  requiredPermission,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true &&
      whoIsPermittedForRoute(
        requiredPermission,
        auth.details.data.permission_mapping
      ) === true ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
