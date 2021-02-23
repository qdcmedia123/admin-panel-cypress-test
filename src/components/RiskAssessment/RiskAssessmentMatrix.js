import React, { Fragment, useState, useEffect, useCallback } from "react";
import Headerserver from "components/layout/Headers/Headerserver";
import Loading from "components/common/Loading";
import * as Service from "components/Service/SimpleService";
import { withRouter } from "react-router-dom";
import WelcomeUser from "components/common/WelcomeUser";
import { useSelector } from "react-redux";
import Footer from "components/layout/common/Footer";

function App(props) {
  const { details } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState();
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [questionType, setQuestionType] = useState({
    questionType: "customerTypes",
  });
  const [message, setMessage] = useState(null);

  const getData = useCallback(() => {
    setIsLoading(true);
    Service.post("/api/v1/riskAssesmentMatrix", {
      q: questionType.questionType,
    })
      .then((response) => {
        setRiskAssessment(response.data.data);

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, [questionType]);
  // Send network
  useEffect(() => {
    getData();
  }, [getData]);

  // Check if data is modified
  const questiontypes = useCallback(() => {
    // chek risk accessmenet is not null
    if (riskAssessment !== null) {
      // get the question
      const { questionsList } = riskAssessment;

      // Loop
      return questionsList.map((item, index) => (
        <option key={index} value={item}>
          {formateString1(item)}
        </option>
      ));
    }
    return null;
  }, [riskAssessment]);

  // On change statement
  const OnChangeElement = useCallback(
    (e) => {
      // Set the
      setMessage(null);
      setRiskAssessment(riskAssessment);
      setQuestionType({ ...questionType, questionType: e.target.value });
    },
    [questionType, riskAssessment]
  );

  const RiskRatingChange = useCallback(
    (e, key) => {
      // With the keys I will change the whole data
      //console.log(riskAssessment);
      //console.log(key)
      // Clone the value
      const cloneRiskAssesment = Object.assign({}, riskAssessment);
      cloneRiskAssesment.result[questionType.questionType][key] =
        e.target.value;

      //const newValue = riskAssessment.result[questionType.questionType][key] = e.target.value;

      setRiskAssessment(cloneRiskAssesment);

      //console.log(cloneRiskAssesment);
    },
    [riskAssessment, questionType.questionType]
  );

  const submitBtn = () => {
    setMessage(null);
    setIsLoading(true);

    let data = Object.assign({}, {});

    data = {
      q: questionType.questionType,
      answers: { result: riskAssessment.result },
    };
    // Send to the server
    Service.post("/api/v1/riskAssesmentMatrixSave", data)
      .then((response) => {
        setIsLoading(false);
        if (response.data.success === true && response.data.code === 200) {
          setMessage("Changes saved sucessfully");
        } else {
          console.log(`Something went wrong` + response);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const selectColor = (str) => {
    if (typeof str === "undefined" || str === "") return null;

    if (str === "Low") {
      return "#04B600";
    } else if (str === "Medium") {
      return "#EDB900";
    } else if (str === "High") {
      return "#FF0000";
    } else {
      return "#000000;";
    }
  };
  // Get the tr
  const TableTr = useCallback(() => {
    // Check if not null
    if (riskAssessment !== null && Object.keys(riskAssessment).length > 0) {
      // Get the objecct
      let getObject = riskAssessment.result[questionType.questionType];
      //console.log('Well')
      //console.log(getObject)
      //return;
      // getObject must be object with length
      if (typeof getObject !== "undefined") {
        return Object.keys(getObject).map((key, index) => (
          <tr key={index}>
            <th className="text-left">{key}</th>
            <th className="text-right">
              <select
                onChange={(e) => RiskRatingChange(e, key)}
                name="risk_rating"
                className="custom-option no-border form-control input-lg "
                defaultValue={getObject[key]}
                style={{ width: "120px", color: selectColor(getObject[key]) }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </th>
          </tr>
        ));
      }
    }
    return null;
  }, [riskAssessment, questionType.questionType, RiskRatingChange]);
  //console.log(riskAssessment);

  const formateString = useCallback(() => {
    switch (questionType.questionType) {
      case "customerTypes":
        return "Customer Types";
      case "countryRisk":
        return "Country Risk";
      case "productRiskRating":
        return "Product Risk Rating";
      case "pep":
        return "PEP";
      case "distributionChannelRiskRating":
        return "Distribution Channel Risk Rating";
      default:
        return null;
    }
  }, [questionType.questionType]);

  const formateString1 = (string) => {
    switch (string) {
      case "customerTypes":
        return "Customer Types";
      case "countryRisk":
        return "Country Risk";
      case "productRiskRating":
        return "Product Risk Rating";
      case "pep":
        return "PEP";
      case "distributionChannelRiskRating":
        return "Distribution Channel Risk Rating";
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <Headerserver />
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="container-fluid-d">
            <WelcomeUser details={details} text="Risk Assessment Matrix">
              {/* 
        <div className="back__arrow">
                <a href="!#">
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
                  <span className="back-to-users">Back To Accounts</span>
                </a>
              </div>
            
      */}
            </WelcomeUser>

            <div className="page__section ">
              {message !== null && (
                <div className="alert alert-success">
                  Changes saved sucessfully
                </div>
              )}

              <div className="page__section-item">
                <div className="filter__container">
                  <div className="filter__item">
                    <div className="page__section-info-text text-bold">
                      <h2>Risk Assessment Matrix</h2>
                    </div>
                    <div className="with_25 filter__item-select-wrap">
                      <select
                        onChange={OnChangeElement}
                        className="form-control form-control-lg blue1"
                        name="questionType"
                        value={questionType.questionType}
                      >
                        {questiontypes()}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="ETFs__table__container">
                    <table className="noborder table-borderless table text-left">
                      <thead>
                        <tr>
                          <th scope="col" className="text-left">
                            {formateString()}
                          </th>
                          <th scope="col" className="text-left">
                            Risk Rating
                          </th>
                        </tr>
                      </thead>
                      <tbody>{TableTr()}</tbody>
                    </table>
                  </div>
                </div>

                <div className="text-center">
                  <button className="btn btn-primary" onClick={submitBtn}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}

      <Footer />
    </Fragment>
  );
}

export default withRouter(App);
