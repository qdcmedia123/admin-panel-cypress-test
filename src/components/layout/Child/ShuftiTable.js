import React from "react";

function App(props) {
  return (
    <div className="table-responsive">
      <table className="table">
        <tbody>
          <tr>
            <th>Ref ID</th>
            <td>{props.data.data.ref_id}</td>
          </tr>
          <tr>
            <th>Verification</th>
            <td
              className={
                props.data.data.verification === "declined"
                  ? "alert alert-danger"
                  : "alert alert-success"
              }
            >
              {" "}
              {props.data.data.verification}
            </td>
          </tr>

          <tr>
            <th>Time</th>
            <td>{props.data.data.timestamp}</td>
          </tr>

          {props.children}
        </tbody>
      </table>
    </div>
  );
}

export default App;
