import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Header from "../Header";
import Tickets from "./list/Tickets";
import qs from "qs";

function App(props) {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  const ifDeleted = () => {
    let getAction = props.history.action;
    let updatedBool = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    }).deleted;

    if (getAction === "PUSH" && updatedBool === "true") {
      return true;
    }

    return false;
  };

  const ifUpdated = () => {
    // action =
    let getAction = props.history.action;
    let updatedBool = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    }).updated;

    if (getAction === "PUSH" && updatedBool === "true") {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const tickets = async function tickets() {
      setLoading(true);
      // send axios request
      try {
        let response = await axios(`/api/v1/tickets`);
        if (response.status === 200) {
          setLoading(false);
          setItem(response.data);
        }
      } catch (error) {
        setLoading(false);
        console.log(error.response.data);
      }
    };
    tickets();
  }, []);

  return (
    <div>
      <div className="container text-center">
        <Header />
        <div>
          {ifDeleted() ? (
            <div
              className="alert alert-success"
              role="alert"
              style={{ width: "100%" }}
            >
              Ticket deleted sucessfully.
            </div>
          ) : (
            <div></div>
          )}

          {ifUpdated() ? (
            <div
              className="alert alert-success"
              role="alert"
              style={{ width: "100%" }}
            >
              Ticket sucessfully updated.
            </div>
          ) : (
            <div></div>
          )}

          {loading === true ? (
            <div className="spinner-grow text-muted"></div>
          ) : (
            <div>
              {Object.keys(item).length > 0 ? (
                <div>
                  <h4 className="modal-title w-100 font-weight-bold">
                    Tickets
                  </h4>
                  <Tickets tickets={item} />
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              ) : (
                <div>No items</div>
              )}
            </div>
          )}
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
