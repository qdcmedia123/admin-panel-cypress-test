import React, { Fragment, useState } from "react";
import Headerserver from "components/layout/Headers/Headerserver";
import Service from "components/Service/service";

function App() {
  const [items, setItems] = useState({});
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setItems({ ...items, [name]: value });
  };

  const Create = (e) => {
    e.preventDefault();

    Service.post("/api/v1/register", items)
      .then((response) => {
        // Check status in data
        if (response.data.code === 200) {
          // Registration is success
          setMessage(response.data.message);
          setError(false);
          // Reset the state
          setItems({});
        } else if (response.data.code === 401) {
          // API level Error
          setMessage(false);
          setError(response.data.message);
        } else {
          // Dont know what was error
        }
      })
      .catch((error) => {
        // Network level error
        setMessage(false);
        setError(error.response.data);
      });
  };

  return (
    <Fragment>
      <Headerserver />
      <div className="page__section">
        <div className="page__section-item">
          <div className="filter__container">
            <div className="filter__item">
              <div className="page__section-title">Create User</div>
            </div>
            <form className="needs-validation">
              {error !== false ? (
                <div className="alert alert-danger" role="alert">
                  {error.confirm_password || error}
                </div>
              ) : (
                <Fragment></Fragment>
              )}

              {message !== false ? (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              ) : (
                <Fragment></Fragment>
              )}

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    onChange={changeHandler}
                    name="email"
                    value={items.email || ""}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Password"
                    onChange={changeHandler}
                    name="password"
                    value={items.password || ""}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inputAddress">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputAddress"
                  placeholder="Confirm Password"
                  onChange={changeHandler}
                  name="confirm_password"
                  value={items.confirm_password || ""}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => Create(e)}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
