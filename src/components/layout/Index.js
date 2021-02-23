import React, { Component } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Footer from "./common/Clientfooter";
import PropTypes from "prop-types";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // If props auth set then push the location
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillUnmount() {
    return null;
  }

  render() {
    return (
      <div>
        <Header />

        <div className="container">
          <div className="row">
            <div className="col-md-12">Welcom to Wealthface.</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Index.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Index));
