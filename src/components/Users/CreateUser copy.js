import React, { Fragment, useEffect, useState, useCallback } from "react";
import Headerserver from "components/layout/Headers/Headerserver";
import Footer from "components/layout/common/Footer";
import WelcomeUser from "components/common/WelcomeUser";
import { useSelector } from "react-redux";
import * as Service from "components/Service/SimpleService";
import Loading from "components/common/Loading";

function App(props) {
  const { details } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const [permissions, setPermissions] = useState(false);
  const [formData, setFormData] = useState({ enabled: "off" });
  const [role, setRole] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState([]);
  //const [requestOnProcess, setRequestOnProcess] = useState(false);
  const [formSuccessMsg, setFormSuccessMsg] = useState(false);
  //const [userDetails, setUserDetails] = useState(false);
  const [fetPermission, setFetchPermission] = useState();

  const { email } = props.match.params;

  // Check if data is in updated mode
  const isInUpdatedMode = useCallback(() => {
    // Check if email is not undefined
    if (typeof email !== "undefined") {
      // Form in in updated node
      // Send http request with the meail
      Service.get("/api/v1/showUser", {}, (response) => {
        console.log(response);
      });
    }
  }, [email]);

  useEffect(() => {
    isInUpdatedMode();
  }, [isInUpdatedMode]);

  useEffect(() => {
    // Send the http request
    Service.get("/api/v1/listRoles", {}, (response) => {
      setLoading(true);
      if (response.data.code === 200 && response.data.success === true) {
        // We receive data

        setData(response.data.data);
        setLoading(false);
      } else {
        // Something went wrong
        setErrors(response.data.errors.join(""));
        setLoading(false);
      }
    }).catch((error) => {
      setErrors(error);
      setLoading(false);
    });
  }, []);

  // Feth all permission
  useEffect(() => {
    // Send the http request
    Service.get("/api/v1/listPermissions", {}, (response) => {
      if (response.data.code === 200 && response.data.success === true) {
        // We receive data
        console.log("List Permission...");
        console.log(response.data.data);
        setFetchPermission(response.data.data);
      } else {
        // Something went wrong
        setErrors(response.data.errors.join(""));
      }
    }).catch((error) => {
      setErrors(error);
    });
  }, []);
  // Get all the permission

  const onchangeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Get roles in select
  const getRolesInSelect = useCallback(() => {
    // Check if there is data

    if (typeof data !== "undefined") {
      if (Object.keys(data).length > 0) {
        const roles = Array.from(data, ({ roleName }) => roleName);
        // Return html
        return roles.map((index, item) => (
          <option key={index} value={index}>
            {index.toUpperCase().replace("_", " ")}
          </option>
        ));
      }
      return false;
    }

    return false;
  }, [data]);

  // Role conchanges statement
  const roleOnChangeStatement = (e) => {
    const getPermission = data
      .filter((item) => item.roleName === e.target.value)
      .map((filtered) => filtered.permissions);

    var result = Object.values(getPermission);
    setRole(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setPermissions(result[0]);
    setSelectedPermission([]);
  };

  const checkboxOnChange = useCallback(
    (e) => {
      let permissionSelected = selectedPermission;

      if (e.target.checked) {
        setSelectedPermission([...selectedPermission, e.target.value]);
      } else {
        // Remove that value
        let removedPermission = permissionSelected.filter(
          (item) => item !== e.target.value
        );
        setSelectedPermission(removedPermission);
      }
    },
    [selectedPermission]
  );
  // Check the permission

  const switchOnChange = useCallback(
    (e) => {
      // Check things is checked
      if (e.target.checked) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      } else {
        // Get initial value
        // set new value
        setFormData({ ...formData, [e.target.name]: "off" });
      }
    },
    [formData]
  );

  const submitForm = (e) => {
    e.preventDefault();
    setErrors([]);

    formData.permissions = selectedPermission;
    formData.fullname = formData.firstName + " " + formData.lastName;
    // Send http request
    Service.post("/api/v1/addUser", formData)
      .then((response) => {
        // Check it's status
        if (response.data.success === "ok" && response.status === 200) {
          // Clear all state
          setFormData({ enabled: "off" });
          setSelectedPermission([]);
          setFormSuccessMsg("User sucessfully created.");
          // Set message success
        }
      })
      .catch((error) => {
        console.log("Error occured");
        // Set error
        let modifyErrors = {};

        if (Object.keys(error.response.data).length > 0) {
          // access each data
          for (var i in error.response.data) {
            modifyErrors[i] = error.response.data[i].join(" ");
          }

          setErrors(modifyErrors);
        }
        //console.log(modifyErrors);
      });
    //console.log(formData);
  };

  const GetErrors = (properties) => {
    if (typeof errors !== "undefined") {
      // Check the length
      if (Object.keys(errors).length > 0) {
        // Get the errror
        // Check the props is exits
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

      {!loading ? (
        <Fragment>
          <WelcomeUser details={details} text="Create User" />

          <div className="page__section">
            {errors !== false && errors === "error" ? (
              <div className="alert alert-danger">
                An Error Occured. Http request has been faild
              </div>
            ) : (
              <Fragment>
                {/*
                <div className="alert alert-info">
                  This page is under development and testing....
                </div>
                */}

                {formSuccessMsg && (
                  <div className="alert alert-success">{formSuccessMsg}</div>
                )}
                <div className="page__section-item">
                  <div className="filter__container">
                    <div className="filter__item">
                      <div className="page__section-info-text">
                        <h5> Create User</h5>
                      </div>
                    </div>
                  </div>
                  <div className="filter__item"></div>

                  <div className="">
                    <form onSubmit={submitForm} className="user-info">
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

                      {getRolesInSelect() !== false ? (
                        <div className="form-group row">
                          <label
                            htmlFor="job_title"
                            className="col-sm-1 custom-label"
                          >
                            Role
                          </label>

                          <div className="col-sm-2">
                            <select
                              name="role"
                              className={
                                !GetErrors("role")
                                  ? "form-control"
                                  : "is-invalid form-control"
                              }
                              id="role"
                              placeholder="Role"
                              value={formData.role || ""}
                              onChange={(e) => roleOnChangeStatement(e)}
                              required
                            >
                              <option value=""></option>
                              {getRolesInSelect()}
                            </select>
                            {GetErrors("role")}
                          </div>
                        </div>
                      ) : (
                        <Fragment></Fragment>
                      )}

                      <div>
                        {permissions !== false ? (
                          <Fragment>
                            <label
                              htmlFor="job_title"
                              className="col-sm-1 custom-label"
                            >
                              Permissions
                            </label>
                            {permissions.map((value, index) => (
                              <div
                                className="form-check form-check-inline"
                                key={index + "_" + role}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={index}
                                  value={value}
                                  name={index}
                                  onChange={checkboxOnChange}
                                  checked={selectedPermission.includes(value)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={index}
                                >
                                  {value.replace(/_/g, " ").toUpperCase()}
                                </label>
                              </div>
                            ))}
                            {GetErrors("permissions")}
                          </Fragment>
                        ) : (
                          <Fragment></Fragment>
                        )}
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-1"></div>
                        <div className="col-md-6">
                          <div className="custom-control custom-switch">
                            <input
                              type="checkbox"
                              className="form-control custom-control-input "
                              id="customSwitches"
                              name="enabled"
                              onChange={switchOnChange}
                              checked={
                                formData.enabled && formData.enabled === "on"
                                  ? true
                                  : false
                              }
                            />

                            <label
                              className="input-lg  custom-control-label"
                              htmlFor="customSwitches"
                            >
                              Enable
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-sm-1"></div>
                        <button type="submit" className="btn btn-primary">
                          {" "}
                          Create{" "}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </Fragment>
      ) : (
        <Loading />
      )}

      <Footer />
    </Fragment>
  );
}

export default App;
