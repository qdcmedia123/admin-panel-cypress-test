import React, { Fragment, useState, useEffect } from "react";
import ShuftiTable from "./Child/ShuftiTable";

function App(props) {
  const [document, setDocument] = useState([]);

  // Getting images
  useEffect(() => {
    const getDocumentTypesAndElement = () => {
      const Documents = [];

      // Check that document is defeind
      if (typeof props.data.document !== "undefined") {
        // Check document index is defined
        if (typeof props.data.document.document !== "undefined") {
          // Get the document
          const document = props.data.document.document;

          if (document.indexOf("application/pdf") !== -1) {
            // Contain pdf
            Documents.push(
              <iframe
                data-lightbox="iframe"
                frameBorder="0"
                src={document}
                title="Declined Document"
                key="345"
              />
            );

            //console.log('pdf');
          } else if (
            // Contain image
            document.indexOf("image/png") !== -1 ||
            document.indexOf("image/jpeg") !== -1 ||
            document.indexOf("image/jpg") !== -1 ||
            document.indexOf("image/gif") !== -1
          ) {
            Documents.push(
              <a
                href={document}
                download
                className="col-lg-3 col-md-3 col-sm-3 col-xs-6"
                key="345"
              >
                <img
                  src={document}
                  title="Click To Download"
                  alt="Download"
                  className="attachment-img-shufti"
                  key="345"
                />
              </a>
            );
          } else {
            Documents.push(
              <div className="alert alert-info">Did not recoznize file.</div>
            );
          }
        } else {
          console.log("Node props.data.document.document defined");
        }
      } else {
        console.log("No document props");
      }

      setDocument(Documents);
    };
    getDocumentTypesAndElement();
  }, [props]);

  const declined = () => {
    if (typeof props.data.verification !== "undefined") {
      // Check if ti's declined
      if (props.data.verification === "declined") {
        // Document is decliend

        return (
          <ShuftiTable data={props}>
            <tr>
              <th>Decline Reason</th>
              <td>{props.data.declined_reason}</td>
            </tr>
            <tr>
              <th>Declined Reason</th>
              <td>
                <ul className="list-group">
                  {props.data.statuses.map((item, index) => (
                    <li
                      className="bullet___none alert alert-danger"
                      key={index}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>

            <tr>
              <th>Document / {props.data.document.type}</th>
              <td>{document}</td>
            </tr>
          </ShuftiTable>
        );
      } else if (props.data.verification === "accepted") {
        return (
          <ShuftiTable data={props}>
            <tr>
              <th>Document/ {props.data.document.type}</th>
              <td>{document}</td>
            </tr>
          </ShuftiTable>
        );
      } else {
        // Unknown reason
        return <h1>Unknown</h1>;
      }
    } else {
      return <div className="alert alert-info">No verification is defined</div>;
    }
  };

  return <Fragment>{declined()}</Fragment>;
}

export default App;
