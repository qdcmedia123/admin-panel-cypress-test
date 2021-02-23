import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../TextFieldGroup";
import axios from "axios";
import Header from "../Header";

function App(props) {
  const [item, setItem] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState();

  const onSubmit = () => {
    // add agent email
    const { email } = props.auth.user;
    item.agent = email;

    axios
      .post("/api/v1/ticket/store", item)
      .then((response) => {
        if (response.status === 200) {
          setMessage("Ticket created sucessfully.");
          setItem({});
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrors(error.response.data);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setItem({ ...item, [name]: value });
  };

  return (
    <div>
      <div className="container">
        <Header />
        <div>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">
                  Create Ticket
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              {typeof message !== "undefined" ? (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              ) : (
                <div></div>
              )}
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  onSubmit();
                }}
              >
                <div className="modal-body mx-3">
                  <TextFieldGroup
                    type="text"
                    placeholder="title"
                    name="title"
                    value={item.title || ""}
                    onChange={handleInputChange}
                    error={
                      typeof errors.title !== "undefined"
                        ? errors.title.toString()
                        : ""
                    }
                  />

                  <textarea
                    className="form-control mb-3"
                    type="description"
                    placeholder="description"
                    name="description"
                    value={item.description || ""}
                    onChange={handleInputChange}
                  />

                  <select
                    className="form-control "
                    defaultValue={item.importance}
                    onChange={handleInputChange}
                    name="importance"
                    value={item.importance || ""}
                    required
                  >
                    <option value="">Importance</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  {typeof errors.role !== "undefined" ? (
                    <div style={{ display: "block" }} class="invalid-feedback">
                      {errors.role.toString()}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>

                <div className="modal-footer d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-default waves-effect waves-light"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(withRouter(App));
