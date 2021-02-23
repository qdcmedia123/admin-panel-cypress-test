import React, { Component } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginWithEmailUser } from "actions/authActions";
import Footer from "components/layout/common/Clientfooter";
import service from "components/Service/service";
import PropTypes from "prop-types";
import { endPoints } from "config/appConfig";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      reqCode: "",
      loading: true,
      passwordVisible: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showPassword = this.showPassword.bind(this);
  }
  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit(e) {
    e.preventDefault();
    service
      .get(endPoints.auth.getLoginCode, {}, (response) => {
        this.setState({ reqCode: response.data.data.code });
      })
      .then((code) => {
        this.props.loginWithEmailUser(this.state, this.props.history);
      });
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
  }
  
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  
  componentWillUnmount() {
    return null;
  }
  
  showPassword() {
    this.setState((prevState) => ({
      passwordVisible: !prevState.passwordVisible,
    }));
  }
  
  render() {
    const { errors } = this.state;
  
    return (
      <div>
        <Header />
        <div>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Sign in</h4>
              </div>
              <br />
              {errors.message && (
                <div className="alert alert-danger"> {errors.message}</div>
              )}
              <form onSubmit={this.onSubmit}>
                <div className="form-group col-md-12">
                  <input
                    className="form-control"
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    required
                    aria-label = "email"
                  />
                </div>
                {!this.state.passwordVisible && (
                  <div className="form-group col-md-12">
                    <input
                      type="password"
                      id="defaultForm-pass"
                      className="form-control validate"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChange}
                      name="password"
                      required
                      aria-label = "password"
                    />
                    <i
                      className="fa fa-eye-slash eyes-open"
                      onClick={() => this.showPassword()}
                    ></i>
                  </div>
                )}
                {this.state.passwordVisible && (
                  <div className="form-group col-md-12">
                    <input
                      type="input"
                      id="defaultForm-pass"
                      className="form-control validate"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChange}
                      name="password"
                      required
                    />
                    <i
                      className="fa fa-eye eyes-open"
                      onClick={() => this.showPassword()}
                    ></i>
                  </div>
                )}
                <div className="modal-footer d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary waves-effect waves-light"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
Login.propTypes = {
  loginWithEmailUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginWithEmailUser })(
  withRouter(Login)
);
