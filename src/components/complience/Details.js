import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Headerserver from "components/layout/Headers/Headerserver";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Loading from "../common/Loading";
import { formateDate } from "core-functions/getReadbledate";
import { useSelector } from "react-redux";
import { calculateManyRiskFactor } from "../../functions/mis";
import lodash from "lodash";
import ShuftiResponse from "components/layout/ShuftiResponse";
import * as Service from "components/Service/SimpleService";
import qs from "qs";
import {
  findGetParamater,
  titleCase,
  GetPortfolioNumber,
} from "../../functions/mis";
function App(props) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [item, setItem] = useState({});
  const [riskFactorUpdated, setRiskFactorUpdated] = useState(false);
  const [shuftiResponse, setShuftiResponse] = useState(false);
  const [holdShufitResComponent, setholdShufitResComponent] = useState(false);
  const [document, setDocument] = useState([
    <h6 key="1" className="alert alert-info col-md-4">
      No documents is provided.
    </h6>,
  ]);
  const [downButton, setDownloadButton] = useState(null);
  const [ComplianceRiskAssesment, setComplianceRiskAssesment] = useState([]);
  const [riskFactorLoaded, setRiskFactorLoaded] = useState(false);
  const [riskAssesment, setRiskAssesment] = useState(false);
  const [overalRiskFactor, setOveralRiskFactor] = useState(false);
  let url = "/api/v1/clientInfo";
  const data = props.match.params;
  const { email } = data;
  const {
    fullname,
    permission_mapping: { upload_client_documents },
  } = useSelector((state) => state.auth.details.data);
  const isFromLeadPage = findGetParamater("from_where", props.location.search);
  const status = findGetParamater("status", props.location.search);

  const uploadClientIDUI = useMemo(
    (e) => {
      if (typeof upload_client_documents !== "undefined") {
        // Check if user have upolad client document permission
        if (upload_client_documents === true) {
          return (
            <a
              rel="noopener noreferrer"
              href={`/#/risk_assessment/upload_client_identity/${email}`}
              className="btn btn-primary float-right"
              target="_blank"
            >
              Upload Client ID
            </a>
          );
        }
        return null;
      }
      return null;
    },
    [email, upload_client_documents]
  );

  const getUserDetails = useCallback(() => {
    if (details === null) {
      if (typeof email !== undefined) {
        Service.post(url, data)
          .then((response) => {
            if (response.data.success === true) {
              setDetails(response.data.data.result[0]);
              setLoading(false);
              let details = response.data.data.result[0];
              if (
                typeof details.docs !== "undefined" &&
                typeof details.docs === "object"
              ) {
                if (Object.keys(details.docs).length > 0) {
                  let holdDocument = [];
                  let holdDownloadButton = [];
                  for (var i in details.docs) {
                    let type = details.docs[i]["type"];
                    let document = details.docs[i]["document"];
                    if (document.indexOf("application/pdf") !== -1) {
                      holdDocument.push(
                        <iframe
                          data-lightbox="iframe"
                          frameBorder="0"
                          key={i}
                          src={document}
                          title={type}
                        />
                      );
                      holdDownloadButton.push(
                        <a
                          key={type + ".pdf"}
                          className="btn btn-outline-primary"
                          href={document}
                          download={type + ".pdf"}
                        >
                          Download {type.replace("_", " ")}
                        </a>
                      );
                    } else if (
                      document.indexOf("image/png") !== -1 ||
                      document.indexOf("image/jpeg") !== -1 ||
                      document.indexOf("image/jpg") !== -1 ||
                      document.indexOf("image/gif") !== -1
                    ) {
                      holdDocument.push(
                        <a
                          href={document}
                          download
                          key={i}
                          className="col-lg-3 col-md-3 col-sm-3 col-xs-6"
                        >
                          <img
                            key={i}
                            src={document}
                            title="Click To Download"
                            alt={type}
                            className="attachment-img"
                          />
                        </a>
                      );
                      holdDownloadButton.push(
                        <a
                          key={type}
                          className="btn btn-outline-primary"
                          href={document}
                          download={type}
                        >
                          Download {type.replace("_", " ")}
                        </a>
                      );
                    } else {
                      holdDocument.push(
                        <div className="alert alert-info" key={i}>
                          Did not recoznize file.
                        </div>
                      );
                    }
                  }
                  setDownloadButton(holdDownloadButton);
                  setDocument(holdDocument);
                }
              }
            } else {
              setDetails(false);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }
    }
  }, [details, email, url, data]);
  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);
  useEffect(() => {
    const calculationOveralRiskFactor = () => {
      const selectedRisk = [];
      if (riskAssesment) {
        if (typeof riskAssesment.data !== "undefined") {
          for (var i in riskAssesment.data) {
            //
            selectedRisk.push(
              riskAssesment.data[i]["answers"]["selectedAnswer"][
                "answerRisk"
              ].toLowerCase()
            );
          }
        }
      }
      let OverRiskFactor = calculateManyRiskFactor(selectedRisk);
      setOveralRiskFactor(OverRiskFactor);
    };
    calculationOveralRiskFactor();
  }, [riskAssesment]);
  const getRiskAssesmentMatrix = useCallback(() => {
    if (typeof email !== undefined) {
      Service.post("/api/v1/getComplianceRiskAssesment", data)
        .then((response) => {
          if (response.data.success === true && response.data.code === 200) {
            setRiskFactorLoaded(true);
            setRiskAssesment((riskAssesment) => ({
              ...riskAssesment,
              data: response.data.data.data,
            }));
            setShuftiResponse(response.data.data.shuftiResponse);
            setItem((item) => ({
              ...item,
              comment: response.data.data.comment,
            }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [data, email]);
  useEffect(() => {
    getRiskAssesmentMatrix();
  }, [data, getRiskAssesmentMatrix]);
  const onchangeHandle = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };
  const approve = (e) => {
    e.preventDefault();
    Service.post("/api/v1/complianceApproveClient", data)
      .then((response) => {
        if (response.data.code === 200) {
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deny = (e) => {
    e.preventDefault();
    Service.post("/api/v1/complianceDenyClient", data)
      .then((response) => {
        if (response.data.code === 200) {
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const calculationOveralRiskFactor = () => {
    const selectedRisk = [];
    if (riskAssesment) {
      if (typeof riskAssesment.data !== "undefined") {
        for (var i in riskAssesment.data) {
          //
          selectedRisk.push(
            riskAssesment.data[i]["answers"]["selectedAnswer"][
              "answerRisk"
            ].toLowerCase()
          );
        }
      }
    }
    let OverRiskFactor = calculateManyRiskFactor(selectedRisk);
    setOveralRiskFactor(OverRiskFactor);
  };
  const TypeChange = (e) => {
    const v = { [e.target.name]: e.target.value };
    setComplianceRiskAssesment([...ComplianceRiskAssesment, v]);
    for (var i in riskAssesment.data) {
      if (riskAssesment.data[i]["question"] === e.target.name) {
        const getanswers = riskAssesment.data[i]["answers"]["availableAnswers"];
        const riskLeven = getanswers.filter(function (item) {
          if (item["answerText"] === e.target.value) return item["answerRisk"];
          return null;
        });
        riskAssesment.data[i]["answers"]["selectedAnswer"]["answer"] =
          e.target.value;
        riskAssesment.data[i]["answers"]["selectedAnswer"]["answerRisk"] =
          riskLeven[0]["answerRisk"];
      }
    }
    calculationOveralRiskFactor();
    setRiskAssesment(riskAssesment);
  };
  const ShowAssesment = () => {
    const tableRows = [];
    if (typeof riskAssesment.data !== "undefined") {
      for (let i in riskAssesment.data) {
        const tr = (
          <tr key={i}>
            <td>
              {(() => {
                switch (riskAssesment.data[i]["question"]) {
                  case "customerTypes":
                    return "Customer Type";
                  case "countryRisk":
                    return "Country Risk";
                  case "pep":
                    return "PEP";
                  case "productRiskRating":
                    return "Product Risk Rating";
                  case "distributionChannelRiskRating":
                    return "Distribution Channel RiskRating";
                  default:
                    return "N/A";
                }
              })()}
            </td>
            <td>
              <select
                onChange={TypeChange}
                name={riskAssesment.data[i]["question"]}
                className="d-inline form-control col-md-4"
                defaultValue={
                  riskAssesment.data[i]["answers"]["selectedAnswer"]["answer"]
                }
                disabled={
                  BackToPage(data.regulation).page === "Compliances"
                    ? false
                    : true
                }
              >
                {riskAssesment.data[i]["answers"]["availableAnswers"].map(
                  (item, k) => (
                    <option key={k}>{item["answerText"]}</option>
                  )
                )}
              </select>
            </td>
            <td>
              {(() => {
                switch (
                  riskAssesment.data[i]["answers"]["selectedAnswer"][
                    "answerRisk"
                  ]
                ) {
                  case "Low":
                    return <div className="text-success">LOW</div>;
                  case "Medium":
                    return <div className="text-warning">Medium</div>;
                  case "High":
                    return <div className="text-danger">High</div>;
                  default:
                    return "N/A";
                }
              })()}
            </td>
          </tr>
        );
        tableRows.push(tr);
      }
    }
    return tableRows;
  };
  const UpdateClientAssesmentMatrix = useCallback(
    (e) => {
      e.preventDefault();
      let calculatedRiskFactor = overalRiskFactor;
      let comment = item.comment || "";
      const localriskAssesment = lodash.cloneDeep(riskAssesment);
      let { email } = props.match.params;
      for (let i in localriskAssesment.data) {
        delete localriskAssesment.data[i]["answers"]["availableAnswers"];
      }
      let newObjectToSend = {
        data: localriskAssesment.data,
        comment: comment,
        email: email,
        overalRiskFactor: calculatedRiskFactor,
      };
      Service.post("/api/v1/saveFinalResponseCompliance", newObjectToSend)
        .then((response) => {
          if (response.data.success === true && response.data.code === 200) {
            setRiskFactorUpdated(true);
            window.scrollTo(0, 0);
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [item.comment, overalRiskFactor, props.match.params, riskAssesment]
  );
  const OnChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const BlockThisUser = () => {
    console.log("Block event fire from here.");
  };
  const getResponse = (e, value) => {
    e.preventDefault();
    setholdShufitResComponent(<ShuftiResponse data={shuftiResponse[value]} />);
  };
  const BackToPage = (regulation) => {
    if (isFromLeadPage !== null) {
      return { page: "Leads", url: "/#/leads/list/" + isFromLeadPage };
    }
    return { page: "Compliances", url: "/#/compliance/list/" + regulation };
  };
  const getLeadsDocs = useCallback(() => {
    if (details !== false) {
      if (typeof details.docs !== "undefined") {
        if (
          typeof details.docs === "object" &&
          Object.keys(details.docs).length > 0
        ) {
          return details.docs.map((item) => item.type);
        }
        return null;
      }
      return null;
    }
    return null;
  }, [details]);
  const returnFalse = (e) => {
    e.preventDefault();
    window.scrollTo(0, window.innerHeight);
    return false;
  };
  const goBack = () => {
    props.history.goBack();
  };
  const fromACP = qs.parse(props.location.search, { ignoreQueryPrefix: true })
    .from_account_details_page;
  return (
    <Fragment>
      <Headerserver />
      <div className="container-fluid">
        <div className="col-md-12">
          <h4 className="hello">
            {typeof fullname !== "undefined" ? (
              <Fragment>Hello {fullname}</Fragment>
            ) : (
              <Fragment></Fragment>
            )}
          </h4>
          <h6 className="dynamic__date"> {formateDate(new Date())}</h6>
          {typeof fromACP !== "undefined" && fromACP === "1" && (
            <div className="back__arrow">
              <button className="btn btn-link" onClick={() => goBack()}>
                <svg
                  width="30"
                  height="14"
                  viewBox="0 0 30 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30 7L1 6.99999"
                    stroke="#525352"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M7 13L1 6.76923L7 1"
                    stroke="#525352"
                    strokeMiterlimit="10"
                  />
                </svg>
                <span className="back-to-users">Go Back</span>
              </button>
              {/* Display the component only where user have permission */}

              {uploadClientIDUI}
            </div>
          )}
        </div>
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            {BackToPage(data.regulation).page !== "Compliances" ? (
              <div className="page__section-item">
                <div className="nopadding col">
                  <div className="row">
                    <div className="col-md-6 text-left">
                      <div className="padding__tb">
                        <h4 className="d-inline">
                          <span className="font-weight-bold">
                            {details.firstName + " " + details.lastName}
                          </span>
                          <span className="color__grey">
                            / {titleCase(details.risk_level)}
                          </span>
                          <span className="ml__custom_10 badge badge-primary">
                            {GetPortfolioNumber(details.risk_level)}
                          </span>
                          <span className="ml__custom_10 badge badge-primary">
                            Basic
                          </span>
                        </h4>
                      </div>
                      <div className="">
                        <span>{details.email}</span>
                      </div>
                      <div className="padding__tb">
                        <span>
                          <img
                            src={require("../../assets/img/Vector.png")}
                            alt="Wealthface"
                            title="Dashboard"
                          />
                        </span>
                        {getLeadsDocs() !== null ? (
                          getLeadsDocs().map((item, index) => (
                            <span
                              onClick={returnFalse}
                              key={index}
                              className="p-3 text-primary text-decoration-underline"
                            >
                              {" "}
                              <a href="!#">{item}</a>
                            </span>
                          ))
                        ) : (
                          <Fragment>
                            <span
                              onClick={returnFalse}
                              className="p-3 text-primary text-decoration-underline"
                            >
                              {" "}
                              <a href="!#">No Documents Available</a>
                            </span>
                          </Fragment>
                        )}
                        {}
                      </div>
                      <div className="padding__tb">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                        >
                          KYC & Account opening
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6 text-right">
                      <h4 className="d-inline">
                        <span className="badge badge-success">
                          {details.status === "kyc"
                            ? details.status.toUpperCase()
                            : details.status}
                        </span>
                      </h4>
                      <div className="padding__tb__1">
                        {typeof status !== "undefined" &&
                          status !== null &&
                          status === "Pending" &&
                          uploadClientIDUI}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Fragment></Fragment>
            )}
            <div className="page__section-item compliance__tab">
              <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="User Information">
                  {message !== false ? (
                    <div className="alert alert-success" role="alert">
                      {message}
                    </div>
                  ) : (
                    <Fragment></Fragment>
                  )}
                  <div className="conatiner-fluid">
                    <form className="user-info">
                      <div className="form-group row">
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-1  custom-label"
                        >
                          Full Name
                        </label>
                        <div className="col-sm-2">
                          {}
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={details.firstName || ""}
                            onChange={onchangeHandle}
                            name="firstName"
                            readOnly
                          />
                        </div>
                        <div className="col-sm-2">
                          <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            value={details.lastName || ""}
                            onChange={onchangeHandle}
                            name="lastName"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="email"
                          className="col-sm-1 custom-label"
                        >
                          Email
                        </label>
                        <div className="col-sm-4">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder=""
                            value={props.match.params.email || ""}
                            onChange={onchangeHandle}
                            name="email"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="phone"
                          className="col-sm-1 custom-label"
                        >
                          Phone
                        </label>
                        <div className="col-sm-4">
                          <input
                            type="phone"
                            className="form-control"
                            id="phone"
                            placeholder=""
                            value={details.phone || ""}
                            onChange={onchangeHandle}
                            name="phone"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="residential"
                          className="col-sm-1 custom-label"
                        >
                          Residental
                        </label>
                        <div className="col-sm-4">
                          <input
                            type="text"
                            className="form-control"
                            id="residential"
                            placeholder=""
                            value={details.residential || ""}
                            onChange={onchangeHandle}
                            name="residential"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="residental"
                          className="col-sm-1 custom-label"
                        ></label>
                        <div className="col-sm-1">
                          <input
                            type="text"
                            className="form-control"
                            readOnly
                            name="postalCode"
                            value={details.postalCode || ""}
                          />
                        </div>
                        <div className="col-sm-2">
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={details.city || ""}
                            readOnly
                          />
                        </div>
                        <div className="col-sm-1">
                          <input
                            type="text"
                            className="form-control"
                            value={details.country || ""}
                            name="country"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="company"
                          className="col-sm-1 custom-label"
                        >
                          Company
                        </label>
                        <div className="col-sm-4">
                          <input
                            type="text"
                            className="form-control"
                            id="company"
                            placeholder=""
                            name="company"
                            value={details.company || ""}
                            onChange={onchangeHandle}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="type_of_business"
                          className="col-sm-1 custom-label"
                        >
                          Type of business
                        </label>
                        <div className="col-sm-4">
                          <input
                            type="text"
                            className="form-control"
                            id="type_of_business"
                            placeholder=""
                            name="type_of_business"
                            value={details.type_of_business || ""}
                            onChange={onchangeHandle}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="job_title"
                          className="col-sm-1 custom-label"
                        >
                          Job Title
                        </label>
                        <div className="col-sm-4">
                          <input
                            type="text"
                            className="form-control"
                            id="job_title"
                            placeholder=""
                            name="job_title"
                            value={details.job_title || ""}
                            onChange={onchangeHandle}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="job_title"
                          className="col-sm-1 custom-label"
                        >
                          <h6>Attachment</h6>
                        </label>
                        <div className="col-sm-11">
                          {downButton !== null && downButton}
                        </div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-11">
                          {typeof details.docs === "object" ? (
                            <div className="someClass">{document}</div>
                          ) : (
                            <Fragment></Fragment>
                          )}
                        </div>
                      </div>
                      {typeof props.match.params.risk_factor !== "undefined" &&
                      props.match.params.risk_factor === "high" ? (
                        <div className="form-row">
                          <button
                            className="btn-back btn btn-primary"
                            onClick={approve}
                          >
                            Approve
                          </button>
                          <button
                            className="btn-back btn btn-outline-danger"
                            onClick={deny}
                          >
                            Deny
                          </button>
                        </div>
                      ) : (
                        <Fragment></Fragment>
                      )}
                    </form>
                  </div>
                </Tab>
                <Tab eventKey="profile" title="Risk Assessment">
                  {riskFactorUpdated && (
                    <div className="alert alert-success" role="alert">
                      Risk assesment sucessfully updated.
                    </div>
                  )}
                  {riskFactorLoaded ? (
                    <Fragment>
                      <div className="table-responsive risk_assessment_container">
                        <table className="noboarder table">
                          <thead className="custom__thead">
                            <tr>
                              <th scope="col">Category</th>
                              <th scope="col">Type</th>
                              <th scope="col">Risk Factor</th>
                            </tr>
                          </thead>
                          <tbody className="cutom__table__body">
                            {ShowAssesment()}
                            <tr className="overall__risk_tr">
                              <td className="font-weight-bold">Overall Risk</td>
                              <td></td>
                              <td className="font-weight-bold">
                                {" "}
                                {overalRiskFactor !== false ? (
                                  <Fragment>
                                    {(() => {
                                      switch (overalRiskFactor) {
                                        case "low":
                                          return (
                                            <div className="text-success">
                                              LOW
                                            </div>
                                          );
                                        case "high":
                                          return (
                                            <div className="text-danger">
                                              HIGH
                                            </div>
                                          );
                                        case "medium":
                                          return (
                                            <div className="text-warning">
                                              MEDIUM
                                            </div>
                                          );
                                        default:
                                          return "None";
                                      }
                                    })()}
                                  </Fragment>
                                ) : (
                                  <Fragment></Fragment>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {BackToPage(data.regulation).page === "Compliances" ? (
                        <form>
                          <div className="form-row">
                            <textarea
                              className="form-control lead__comment"
                              placeholder="Leave a comment"
                              name="comment"
                              value={item.comment || ""}
                              onChange={OnChange}
                            ></textarea>
                          </div>
                          <div className="form-row">
                            <button
                              className="btn-back btn btn-primary"
                              onClick={UpdateClientAssesmentMatrix}
                            >
                              Open account
                            </button>
                            <button
                              className="btn-back btn btn-outline-primary "
                              onClick={BlockThisUser}
                            >
                              Block this user
                            </button>
                          </div>
                        </form>
                      ) : (
                        <Fragment></Fragment>
                      )}
                    </Fragment>
                  ) : (
                    <Fragment></Fragment>
                  )}
                </Tab>
                {}
                {BackToPage(data.regulation).page === "Compliances" ? (
                  <Tab eventKey="shufti" title="Shufti Response">
                    {typeof shuftiResponse !== "undefined" &&
                    Object.keys(shuftiResponse).length > 0 ? (
                      <div className="conatiner-fluid">
                        <div className="row">
                          <div className="">
                            {}
                            {Object.keys(shuftiResponse).length > 0 &&
                            shuftiResponse !== false ? (
                              <Fragment>
                                {Object.keys(shuftiResponse).map(
                                  (item, index) => (
                                    <a
                                      href="!#"
                                      value={item}
                                      className="btn btn-primary"
                                      key={index}
                                      onClick={(e) => getResponse(e, item)}
                                    >
                                      {item}
                                    </a>
                                  )
                                )}
                                {holdShufitResComponent}
                              </Fragment>
                            ) : (
                              <Fragment></Fragment>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Fragment>
                        <div className="alert alert-info">
                          {" "}
                          No Shufti response received.
                        </div>
                      </Fragment>
                    )}
                  </Tab>
                ) : (
                  <Fragment></Fragment>
                )}
              </Tabs>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
export default App;
