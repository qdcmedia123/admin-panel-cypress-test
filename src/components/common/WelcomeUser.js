import React, { Fragment } from "react";
import { formateDate } from "core-functions/getReadbledate";

function App(props) {
  return (
    <div className="row no__margin">
      <div className="col-md-12">
        <div className="hello">
          {typeof props.details.data !== "undefined" ? (
            <Fragment>
              {props.compliance === true && (
                <Fragment>
                  <h4 className="admin-name">
                    Hello {props.details.data.fullname}
                  </h4>
                  <h6 className="dynamic__date"> {formateDate(new Date())}</h6>
                </Fragment>
              )}
              {props.users === true && (
                <Fragment>
                  <h4 className="admin-name">
                    Hello {props.details.data.fullname}
                  </h4>
                  <h6 className="dynamic__date"> {formateDate(new Date())}</h6>
                </Fragment>
              )}
            </Fragment>
          ) : (
            <Fragment></Fragment>
          )}

          {/*  */}

          <h6 className="where__you__are"> {props.text || ""} </h6>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default App;
