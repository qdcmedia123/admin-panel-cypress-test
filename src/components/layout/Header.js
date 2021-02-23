import React from "react";
import Header from "components/layout/Headers/Header";
import Headerserver from "components/layout/Headers/Headerserver";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

function App(props) {
  const role = () => {
    if (typeof props.auth.user !== "undefined") {
      if (props.auth.isAuthenticated === true) {
        return <Headerserver />;
      } else {
        return <Header />;
      }
    }

    return <Header />;
  };
  return role();
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(App));
