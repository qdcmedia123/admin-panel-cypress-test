import React, { Fragment, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Headerserver from "components/layout/Headers/Headerserver";
import Footer from "components/layout/common/Footer";
import WelcomeUser from "components/common/WelcomeUser";
import { findGetParamater } from "functions/mis";
import * as Service from "components/Service/SimpleService";
import { endPoints } from "../../config/appConfig";

function App(props) {
  const getParamsStr = props.location.search.substr(1);
  let firstName = findGetParamater("firstName", getParamsStr);
  let lastName = findGetParamater("lastName", getParamsStr);
  let isIFAUser = findGetParamater("isIFAUser", getParamsStr);
  const { email } = props.match.params;

  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
  });
  const [errors, setErrors] = useState(false);
  const { details } = useSelector((state) => state.auth);
  const [formSuccessMsg, setFormSuccessMsg] = useState(false);

  const onchangeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const GetErrors = (properties) => {
    if (typeof errors !== "undefined") {
      if (Object.keys(errors).length > 0) {
        if (errors.hasOwnProperty(properties)) {
          return (
            <div className="invalid-feedback-custom">{errors[properties]}</div>
          );
        }
        return false;
      }

      return false;
    }

    return false;
  };

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      setErrors([]);
      setFormSuccessMsg(false);

      formData.fullname = formData.firstName + " " + formData.lastName;
      
      Service.post(
        isIFAUser && isIFAUser === "1"
          ? endPoints.IFA.resetPasswordIFA
          : "/api/v1/resetPasswordUser",
        formData
      )
        .then((response) => {
          if (response.data.success === true) {
            setFormSuccessMsg(true);
          }

          console.log(response);
        })
        .catch((error) => {
          console.log("Error occured");

          let modifyErrors = {};

          if (Object.keys(error.response.data).length > 0) {
            for (var i in error.response.data) {
              modifyErrors[i] = error.response.data[i].join(" ");
            }

            setErrors(modifyErrors);
          }
        });
    },
    [formData, isIFAUser]
  );

  return (
    <Fragment>
      <Headerserver />
      <WelcomeUser details={details} text="Change Password" users={true} />
      <div className="page__section">
        <div className="page__section-item">
          <div className="filter__container">
            <div className="filter__item">
              <div className="page__section-info-text">
                <h5> Change Password</h5>
              </div>
            </div>
          </div>
          <div className="filter__item"></div>
          <form onSubmit={submitForm} className="user-info">
            <div className="">
              {formSuccessMsg && (
                <div className="alert alert-success">
                  Changes saved sucessfully.
                </div>
              )}

              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-1  custom-label">
                  Full Name
                </label>
                <div className="col-sm-2">
                  <input
                    type="text"
                    className={
                      !GetErrors("firstName")
                        ? "form-control"
                        : "is-invalid form-control"
                    }
                    id="firstName"
                    value={formData.firstName || ""}
                    onChange={onchangeHandle}
                    name="firstName"
                    title="Please enter your name."
                    pattern="[A-Za-z ]{2,225}"
                    required
                  />
                  {GetErrors("firstName")}
                </div>

                <div className="col-sm-2">
                  <input
                    type="text"
                    className={
                      !GetErrors("lastName")
                        ? "form-control"
                        : "is-invalid form-control"
                    }
                    id="lastName"
                    value={formData.lastName || ""}
                    onChange={onchangeHandle}
                    name="lastName"
                    title="Please enter your last name."
                    pattern="[A-Za-z ]{2,225}"
                    required
                  />
                  {GetErrors("lastName")}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="email" className="col-sm-1  custom-label">
                  Email
                </label>
                <div className="col-sm-4">
                  <input
                    type="email"
                    className={
                      !GetErrors("email")
                        ? "form-control"
                        : "is-invalid form-control"
                    }
                    id="emial"
                    value={formData.email || ""}
                    onChange={onchangeHandle}
                    name="email"
                    title="Please enter your email."
                    required
                  />
                  {GetErrors("email")}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-1  custom-label">
                  Password
                </label>
                <div className="col-sm-4">
                  <input
                    type="password"
                    className={
                      !GetErrors("password")
                        ? "form-control"
                        : "is-invalid form-control"
                    }
                    id="password"
                    value={formData.password || ""}
                    onChange={onchangeHandle}
                    name="password"
                    title="Please enter your password."
                    required
                  />
                  {GetErrors("password")}
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="confirm_password"
                  className="col-sm-1  custom-label"
                >
                  Confirm Password
                </label>
                <div className="col-sm-4">
                  <input
                    type="password"
                    className={
                      !GetErrors("confirm_password")
                        ? "form-control"
                        : "is-invalid form-control"
                    }
                    id="confirm_password"
                    value={formData.confirm_password || ""}
                    onChange={onchangeHandle}
                    name="confirm_password"
                    title="Please enter same password"
                    required
                  />
                  {GetErrors("confirm_password")}
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-1  custom-label"
                ></label>

                <button type="submit" className="btn btn-primary">
                  {" "}
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
