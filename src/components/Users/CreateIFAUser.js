import React, { Fragment, useEffect, useState, useCallback } from "react";
import Headerserver from "components/layout/Headers/Headerserver";
import Footer from "components/layout/common/Footer";
import WelcomeUser from "components/common/WelcomeUser";
import { useSelector } from "react-redux";
import * as Service from "components/Service/SimpleService";
import {
  splitFirstNameAndLastName,
} from "functions/mis";
import {endPoints} from 'config/appConfig';
function App(props) {
  const { details } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState(false);
  const [formData, setFormData] = useState({ enabled: "off", fees_bps:40 });
  const [formSuccessMsg, setFormSuccessMsg] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { email } = props.match.params;
  const isInUpdatedMode = useCallback(() => {
    if (typeof email !== "undefined") {
      setIsUpdateMode(true);
      Service.post(endPoints.IFA.showIFAUser, { email: email })
        .then((response) => {
          const { fullname } = response.data.data.result;
          const firstAndLastName = splitFirstNameAndLastName(fullname);
          const { result } = response.data.data;
          const modifyedResponse = { ...firstAndLastName, ...result };
          setFormData(modifyedResponse);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else {
      setIsUpdateMode(false);
    }
  }, [email]);
  useEffect(() => {
    isInUpdatedMode();
  }, [isInUpdatedMode]);
  const onchangeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchOnChange = useCallback(
    (e) => {
      if (e.target.checked) {
        setFormData({ ...formData, [e.target.name]: 1 });
      } else {
        setFormData({ ...formData, [e.target.name]: 0 });
      }
    },
    [formData]
  );
  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      setErrors([]);
      if(formData.password !== formData.confirm_password) {
        setErrors({...errors, confirm_password: 'Both password did not matched.'});
        return;
      }
      formData.fullname = formData.firstName + " " + formData.lastName;
      Service.post(endPoints.IFA.newIFA, formData)
        .then((response) => {
          if (response.data.success === "ok" && response.status === 200) {
            setFormData({ enabled: 0 });
            setFormSuccessMsg("IFA User sucessfully created.");
            window.scrollTo(0, 0);
          }
        })
        .catch((error) => {
          console.log("Error occured");
          console.log(error.response.data);
          let modifyErrors = {};
          if (Object.keys(error.response.data).length > 0) {
            for (var i in error.response.data) {
              modifyErrors[i] = error.response.data[i].join(" ");
            }
            setErrors(modifyErrors);
          }
        });
    },
    [formData, errors]
  );
  const { history } = props;
  const updateForm = useCallback(
    (e) => {
      e.preventDefault();
      formData.fullname = formData.firstName + " " + formData.lastName;
      Service.post(endPoints.IFA.updateIFA, formData)
        .then((response) => {
          if (response.status === 200 && response.data.success === true) {
            history.push("/users/list_ifa?userUpdated=1");
          } else {
            console.log(
              "Something went wrong while updating user. Please check the below response"
            );
            if (response.data.errors.indexOf("error")) {
              setErrors(
                "Something went wrong while updating user. Please check the below response"
              );
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [formData, history]
  );
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
  return (
    <Fragment>
      <Headerserver />
        <Fragment>
          <WelcomeUser
            details={details}
            text={isUpdateMode ? "Update IFA User" : "Create IFA User"}
            users={true}
          />
          <div className="page__section">
            {errors !== false && errors === "error" ? (
              <div className="alert alert-danger">
                An Error Occured. Http request has been failed
              </div>
            ) : (
              <Fragment>
                {}
                {formSuccessMsg && (
                  <div className="alert alert-success">{formSuccessMsg}</div>
                )}
                <div className="page__section-item">
                  <div className="filter__container">
                    <div className="filter__item">
                      <div className="page__section-info-text">
                        <h5> {isUpdateMode ? "Update IFA User" : "Create IFA User"}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="filter__item"></div>
                  <div className="">
                    <form
                      onSubmit={isUpdateMode ? updateForm : submitForm}
                      className="user-info"
                    >
                      <div className="right__submit__btn text-right mt-15">
                        {isUpdateMode ? (
                          <button
                            type="submit"
                            className="shadow-none btn btn-primary"
                          >
                            {" "}
                            Save Changes{" "}
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="shadow-none btn btn-primary"
                          >
                            {" "}
                            Create IFA User{" "}
                          </button>
                        )}
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-1  custom-label"
                        >
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
                            title="Please enter your lastname."
                            pattern="[A-Za-z ]{2,225}"
                            required
                          />
                          {GetErrors("lastName")}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="job_title"
                          className="col-sm-1 custom-label"
                        >
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
                            id="email"
                            placeholder=""
                            name="email"
                            value={formData.email || ""}
                            onChange={onchangeHandle}
                            required
                            title="Please enter valid email address."
                          />
                          {GetErrors("email")}
                        </div>
                      </div>
                      {}
                      {isUpdateMode ? (
                        <div className="form-group row">
                          <label
                            htmlFor="password"
                            className="col-sm-1 custom-label"
                          >
                            Password
                          </label>
                          <div className="col-sm-4">
                            <a
                              href={`/#/user/change_password/${email}?firstName=${formData.firstName}&lastName=${formData.lastName}&isIFAUser=1`}
                              type="button"
                              className="btn btn-outline-primary text-bold"
                            >
                              Reset Password
                            </a>
                          </div>
                        </div>
                      ) : (
                        <Fragment>
                          <div className="form-group row">
                            <label
                              htmlFor="job_title"
                              className="col-sm-1 custom-label"
                            >
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
                                placeholder=""
                                name="password"
                                value={formData.password || ""}
                                onChange={onchangeHandle}
                                required
                                title="Please enter user password."
                              />
                              {GetErrors("password")}
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="confirm_password"
                              className="col-sm-1 custom-label"
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
                                placeholder=""
                                name="confirm_password"
                                value={formData.confirm_password || ""}
                                onChange={onchangeHandle}
                                required
                              />
                              {GetErrors("confirm_password")}
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="confirm_password"
                              className="col-sm-1 custom-label"
                            >
                             Fee BPS
                            </label>
                            <div className="col-sm-4">
                              <input
                                type="number"
                                className={
                                  !GetErrors("fees_bps")
                                    ? "form-control"
                                    : "is-invalid form-control"
                                }
                                id="fees_bps"
                                placeholder=""
                                name="fees_bps"
                                value={formData.fees_bps || ""}
                                onChange={onchangeHandle}
                                min={1}
                                max={10000}
                                required
                                disabled={true}
                              />
                              {GetErrors("fees_bps")}
                            </div>
                          </div>
                        </Fragment>
                      )}
                      <div className="form-group row">
                        <div className="col-sm-1"></div>
                        <div className="col-md-6">
                          <div className="custom-control custom-switch">
                            <input
                              type="checkbox"
                              className=" custom-control-input "
                              id="customSwitches"
                              name="enabled"
                              value={formData.enabled}
                              onChange={switchOnChange}
                              checked={
                                formData.enabled && parseInt(formData.enabled) === 1
                                  ? true
                                  : false
                              }
                            />
                            <label
                              className="input-lg  custom-control-label"
                              htmlFor="customSwitches"
                            >
                              Enabled
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-15">
                        {isUpdateMode ? (
                          <button
                            type="submit"
                            className="shadow-none btn btn-primary"
                          >
                            {" "}
                            Save Changes{" "}
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="shadow-none btn btn-primary"
                          >
                            {" "}
                            Create IFA User{" "}
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </Fragment>
      ) 
      <Footer />
    </Fragment>
  );
}
export default App;
