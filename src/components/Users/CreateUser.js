import React, { Fragment, useEffect, useState, useCallback } from "react";
import Headerserver from "components/layout/Headers/Headerserver";
import Footer from "components/layout/common/Footer";
import WelcomeUser from "components/common/WelcomeUser";
import { useSelector } from "react-redux";
import * as Service from "components/Service/SimpleService";
import Loading from "components/common/Loading";
import {
  titleCase,
  capitalizeFirstletter,
  splitFirstNameAndLastName,
} from "functions/mis";

function App(props) {
  const { details } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const [formData, setFormData] = useState({ enabled: "off" });
  const [selectedPermission, setSelectedPermission] = useState([]);
  const [formSuccessMsg, setFormSuccessMsg] = useState(false);
  const [fetchPermission, setFetchPermission] = useState();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [listRoles, setListRoles] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { email } = props.match.params;
  const isInUpdatedMode = useCallback(() => {
    if (typeof email !== "undefined") {
      setIsUpdateMode(true);
      Service.post("/api/v1/showUser", { email: email })
        .then((response) => {
          const { fullname } = response.data.data.result;
          const firstAndLastName = splitFirstNameAndLastName(fullname);
          const { result } = response.data.data;
          const modifyedResponse = { ...firstAndLastName, ...result };
          setFormData(modifyedResponse);
          setSelectedPermission(response.data.data.result.permissions);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else {
      setSelectedPermission([]);
      setIsUpdateMode(false);
    }
  }, [email]);
  useEffect(() => {
    isInUpdatedMode();
  }, [isInUpdatedMode]);
  useEffect(() => {
    Service.get("/api/v1/listRoles", {}, (response) => {
      setLoading(true);
      if (response.data.code === 200 && response.data.success === true) {
        setData(response.data.data);
        setLoading(false);
      } else {
        setErrors(response.data.errors.join(""));
        setLoading(false);
      }
    }).catch((error) => {
      setErrors(error);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    Service.get("/api/v1/listAllCatWithPermissions", {}, (response) => {
      if (response.data.code === 200 && response.data.success === true) {
        const getOnlyPermission = response.data.data;
        setFetchPermission(getOnlyPermission);
      } else {
        setErrors(response.data.errors.join(""));
      }
    }).catch((error) => {
      setErrors(error);
    });
  }, []);
  useEffect(() => {
    Service.get("/api/v1/listRoles", {}, (response) => {
      setListRoles(response.data.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  const onchangeHandle = useCallback((e) => {
    if(e.target.name === 'confirm_password') {
       delete(errors.confirm_password);
       if(e.target.value !== formData.password) {
         const {name} = e.target;
         setErrors({...errors, [name]: "The confirm password and password must match."});
       } else {
         setErrors({errors})
       }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }, [formData, errors]);
  console.log(errors);
  const getRolesInSelect = useCallback(() => {
    if (typeof data !== "undefined") {
      if (Object.keys(data).length > 0) {
        const roles = Array.from(data, ({ roleName }) => roleName);
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
  const roleOnChangeStatement = useCallback(
    (e) => {
      if (e.target.value !== "") {
        const getPermission = listRoles
          .filter((item) => item.roleName === e.target.value)
          .map((filtered) => filtered.permissions);
        setSelectedPermission(getPermission[0]);
      } else {
        setSelectedPermission([]);
      }
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [listRoles, formData]
  );
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
  const permisssionChangeHanderl = useCallback(
    (e) => {
      if (e.target.checked) {
        setSelectedPermission([...selectedPermission, e.target.value]);
      } else {
        const removeData = selectedPermission.filter(
          (item) => item !== e.target.value
        );
        setSelectedPermission(removeData);
      }
    },
    [selectedPermission]
  );
  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      setErrors([]);
      formData.permissions = selectedPermission;
      formData.fullname = formData.firstName + " " + formData.lastName;
      Service.post("/api/v1/addUser", formData)
        .then((response) => {
          if (response.data.success === "ok" && response.status === 200) {
            setFormData({ enabled: 0 });
            setSelectedPermission([]);
            setFormSuccessMsg("User sucessfully created.");
            window.scrollTo(0, 0);
          }
        })
        .catch((error) => {
          console.log("Error occured");
          console.log(error.response.data)
          let modifyErrors = {};
          if (Object.keys(error.response.data).length > 0) {
            for (var i in error.response.data) {
              modifyErrors[i] = error.response.data[i].join(" ");
            }
            setErrors(modifyErrors);
          }
        });
    },
    [formData, selectedPermission]
  );
  const { history } = props;
  const updateForm = useCallback(
    (e) => {
      e.preventDefault();
      formData.permissions = selectedPermission;
      formData.fullname = formData.firstName + " " + formData.lastName;
      Service.post("/api/v1/updateUser", formData)
        .then((response) => {
          if (response.status === 200 && response.data.success === true) {
            history.push("/users/list?userUpdated=1");
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
    [formData, selectedPermission, history]
  );
  const showPassword = () => {
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
  const getAllPermissionOnCheckbox = useCallback(() => {
    //
    if (typeof fetchPermission !== "undefined" && fetchPermission.length > 0) {
      //
      const permissionCheckboxes = fetchPermission.map((item, index) => (
        <div className="col-sm-6" key={index}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                {capitalizeFirstletter(item.category)}
              </h5>
            </div>
            <div className="card-text">
              {item.permissions.map((permission, key) => (
                <div
                  className="custom-control custom-switch inline"
                  key={key + index}
                >
                  <input
                    type="checkbox"
                    value={permission}
                    className="form-control custom-control-input "
                    id={"customSwitches" + key + index}
                    name={permission}
                    onChange={permisssionChangeHanderl}
                    checked={
                      selectedPermission.indexOf(permission) !== -1
                        ? true
                        : false
                    }
                  />
                  <label
                    className="input-lg  custom-control-label"
                    htmlFor={"customSwitches" + key + index}
                  >
                    {titleCase(permission)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ));
      return permissionCheckboxes;
    }
    return false;
  }, [fetchPermission, permisssionChangeHanderl, selectedPermission]);
  return (
    <Fragment>
      <Headerserver />
      {!loading ? (
        <Fragment>
          <WelcomeUser
            details={details}
            text={isUpdateMode ? "Update User" : "Create User"}
            users={true}
          />
          <div className="page__section">
            {errors !== false && errors === "error" ? (
              <div className="alert alert-danger">
                An Error Occured. Http request has been faild
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
                        <h5> {isUpdateMode ? "Update User" : "Create User"}</h5>
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
                            Create User{" "}
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
                              href={`/#/user/change_password/${email}?firstName=${formData.firstName}&lastName=${formData.lastName}`}
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
                              type={!passwordVisible ? "password" : "text"} 
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
                            <i
                            className={passwordVisible ? "fa fa-eye eyes-open" : "fa fa-eye-slash eyes-open"}
                            onClick={() => passwordVisible ? setPasswordVisible(false) :  setPasswordVisible(true)}
                            ></i>
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
                                type={!confirmPasswordVisible ? "password" : "text"} 
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
                               <i
                            className={confirmPasswordVisible ? "fa fa-eye eyes-open" : "fa fa-eye-slash eyes-open"}
                            onClick={() => confirmPasswordVisible ? setConfirmPasswordVisible(false) :  setConfirmPasswordVisible(true)}
                            ></i>
                              {GetErrors("confirm_password")}
                            </div>
                          </div>
                        </Fragment>
                      )}
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
                              <option value="">Select Role</option>
                              {getRolesInSelect()}
                            </select>
                            {GetErrors("role")}
                          </div>
                        </div>
                      ) : (
                        <Fragment></Fragment>
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
                                formData.enabled && formData.enabled === 1
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
                      <div className="form-group row">
                        <label
                          htmlFor="job_title"
                          className="col-sm-1 custom-label "
                        >
                          Permissions
                        </label>
                        {GetErrors("permissions") && (
                          <div className="invalid-feedback-custom">
                            {GetErrors("permissions")}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <div className="col-md-12">
                          <div className="row">
                            {getAllPermissionOnCheckbox()}
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
                            Create User{" "}
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
      ) : (<div className = "mh-700"><Loading /></div>
      )}
      <Footer />
    </Fragment>
  );
}
export default App;
