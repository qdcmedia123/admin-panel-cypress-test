import React, { Fragment, useState, useEffect, useCallback } from "react";
import Header from "components/layout/Headers/Headerserver";
import { withRouter } from "react-router-dom";
import qs from "qs";
import Loading from "../common/Loading";
import { useSelector } from "react-redux";
import WelcomUser from "components/common/WelcomeUser";
import * as Service from "components/Service/SimpleService";
import LoadingSmall from "components/common/LoadingRelative";
import {endPoints} from 'config/appConfig';
import Footer from "components/layout/common/Footer";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function App(props) {
  const perpage = 1000;

  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(null);
  const [porfolioAllocationData, setPorfolioAllocationData] = useState([]);
  const [portfolioDataLoading, setPortfolioDataLoading] = useState(false);
  const [openedTabs, setOpenedtabs] = useState([]);

  // Setting url
  const apiLink = `${endPoints.portfolioAllocation.portFolioAllocationList}/aggressive`;

  // get the page
  let { page } = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  const { details } = useSelector((state) => state.auth);
  // what is page is undefined
  page = typeof page === "undefined" ? 1 : parseInt(page);

  // Create skip
  let skipPage = page - 1;

  // Use effect
  useEffect(() => {
    const getUsers = async function getUsers() {
      Service.get(apiLink, {}, (response) => {
        if (response.data.code === 402) {
          window.location.reload();
        }
        const data = response.data.data;
        delete data.result;
        setTotal(data);

        setIsLoading(false);
      }).catch((error) => {
        console.log(error);
      });
    };

    getUsers();
  }, [apiLink, skipPage, perpage]);

  const setPortfoliAllocationDataOnClick = useCallback(
    (e, value) => {
      setPortfolioDataLoading(true);
      // Check value is already exists in opened tabls
      if (openedTabs.indexOf(value) === -1) {
        setOpenedtabs([...openedTabs, value]);
      } else {
        // Remove fomr the array
        let removedTab = openedTabs.filter((item) => item !== value);
        setOpenedtabs(removedTab);
      }

      if (getKeys(porfolioAllocationData).indexOf(value) === -1) {
        Service.get(
          `${endPoints.portfolioAllocation.portFolioAllocationList}/${value}`,
          {},
          (response) => {
            // console.log(response.data.data.result);
            //console.log(response);
            let result = {};
            if (Object.entries(response.data.data.result).length > 0) {
              result = response.data.data.result;
            } else {
              result[value] = [];
            }

            setPorfolioAllocationData([...porfolioAllocationData, result]);

            setPortfolioDataLoading(false);
          }
        ).catch((error) => {
          setPortfolioDataLoading(false);
          console.log(error);
        });
      } else {
        setPortfolioDataLoading(false);
      }
    },
    [porfolioAllocationData, openedTabs]
  );

  const getKeys = (data) => {
    if (typeof data === "undefined" || data === null) return null;
    let keys = [];
    for (const [, value] of Object.entries(data)) {
      keys.push(Object.keys(value).join(""));
    }
    return keys;
  };

  const getRiskLevelTabElements = useCallback(
    (riskLevel) => {
      // Portfolio allocation data must be there
      if (
        porfolioAllocationData !== null &&
        Object.entries(porfolioAllocationData).length > 0
      ) {
        // Check that value is exists
        const getKeysRL = getKeys(porfolioAllocationData);
        // risk level must exists
        const findingIndex = (element) => element === riskLevel;
        const getIndex = getKeysRL.findIndex(findingIndex);
        // Must not be -1
        if (getIndex !== -1) {
          // Get the data

          let getObjectColumn = porfolioAllocationData[getIndex][riskLevel];
          let data = [];

          if (
            typeof getObjectColumn === "undefined" ||
            getObjectColumn === null ||
            Object.entries(getObjectColumn).length < 1
          ) {
            return null;
          }

          Object.entries(getObjectColumn.symbols).forEach((entry, index) => {
            let key = entry[0];

            let value = entry[1];
            //use key and value here
            data.push(
              <tr key={index}>
                <th scope="row">
                  <button className="btn btn-primary">{key}</button>
                </th>
                <td>{value.qty.toFixed(2)}</td>
                <td>{value.allocation.toFixed(2)}</td>
                <td>{value.marketValue.toFixed(2)}</td>
              </tr>
            );
          });

          return data;
        }

        return null;
      }

      return null;
    },
    [porfolioAllocationData]
  );

  const getAUMForRiskLevel = useCallback(
    (riskLevel) => {
      const findingIndex = (element) => element === riskLevel;
      const getIndex = getKeys(porfolioAllocationData).findIndex(findingIndex);

      let AUM;
      if (getIndex !== -1) {
        AUM = porfolioAllocationData[getIndex][riskLevel]["AUM"];
      }

      return AUM;
    },
    [porfolioAllocationData]
  );

  return (
    <Fragment>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <WelcomUser details={details} text="" />

          <div className="item__card-container">
            <div className="item__card-item">
              <div className="item__card-info">TOTAL AUM</div>
              <div className="item__card-title">
                {total !== null &&
                  typeof total.total_AUM !== "undefined" &&
                  formatter.format(total.total_AUM)}
              </div>
            </div>

            <div className="item__card-item">
              <div className="item__card-info">INVESTMENT AMOUNT</div>
              <div className="item__card-title">
                {total !== null &&
                  typeof total.total_investment !== "undefined" &&
                  formatter.format(total.total_investment)}
              </div>
            </div>
          </div>
          <div className="page__section">
            <div className="panel-group" id="accordion">
              <div
                className="panel panel-default panel-custom"
                onClick={(e) => setPortfoliAllocationDataOnClick(e, "low_risk")}
              >
                <div className="panel-heading">
                  <h4
                    className="panel-title"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                  >
                    <Fragment>Low Risk</Fragment>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <Fragment>
                      {openedTabs.indexOf("low_risk") !== -1 &&
                        typeof getAUMForRiskLevel("low_risk") !== "undefined" &&
                        "AUM " +
                          formatter.format(getAUMForRiskLevel("low_risk"))}
                    </Fragment>
                  </h4>
                </div>
                <div id="collapseOne" className="panel-collapse collapse">
                  {portfolioDataLoading ? (
                    <LoadingSmall />
                  ) : (
                    <div className="panel-body">
                      <div className="item__card-info">
                        <div className="nopadding col-md-12 inline float-left text-black"></div>

                        <div className="table-responsive portfolio__allocation__table__container">
                          {getRiskLevelTabElements("low_risk") !== null ? (
                            <table className="noborder table-borderless table ">
                              <thead>
                                <tr>
                                  <th scope="col">Symbols</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Allocation</th>
                                  <th scope="col">Market Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {getRiskLevelTabElements("low_risk")}
                              </tbody>
                            </table>
                          ) : (
                            <div className="noDataContainer text-center">
                              {" "}
                              <div className="get__to__middle">
                                No data available
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="panel panel-default panel-custom"
                onClick={(e) =>
                  setPortfoliAllocationDataOnClick(e, "very_conservative")
                }
              >
                <div className="panel-heading">
                  <h4
                    className="panel-title"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                  >
                    <Fragment>Very Conservative </Fragment>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <Fragment>
                      {openedTabs.indexOf("very_conservative") !== -1 &&
                        typeof getAUMForRiskLevel("very_conservative") !==
                          "undefined" &&
                        "AUM " +
                          formatter.format(
                            getAUMForRiskLevel("very_conservative")
                          )}
                    </Fragment>
                  </h4>
                </div>
                <div id="collapseTwo" className="panel-collapse collapse">
                  {portfolioDataLoading ? (
                    <LoadingSmall />
                  ) : (
                    <div className="panel-body">
                      <div className="item__card-info">
                        <div className="nopadding col-md-12 inline float-left text-black"></div>

                        <div className="table-responsive portfolio__allocation__table__container">
                          {getRiskLevelTabElements("very_conservative") !==
                          null ? (
                            <table className="noborder table-borderless table ">
                              <thead>
                                <tr>
                                  <th scope="col">Symbols</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Allocation</th>
                                  <th scope="col">Market Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {getRiskLevelTabElements("very_conservative")}
                              </tbody>
                            </table>
                          ) : (
                            <div className="noDataContainer text-center">
                              {" "}
                              <div className="get__to__middle">
                                No data available
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="panel panel-default panel-custom"
                onClick={(e) =>
                  setPortfoliAllocationDataOnClick(e, "conservative")
                }
              >
                <div className="panel-heading">
                  <h4
                    className="panel-title"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                  >
                    <Fragment>Conservative </Fragment>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <Fragment>
                      {openedTabs.indexOf("conservative") !== -1 &&
                        typeof getAUMForRiskLevel("conservative") !==
                          "undefined" &&
                        "AUM " +
                          formatter.format(getAUMForRiskLevel("conservative"))}
                    </Fragment>
                  </h4>
                </div>
                <div id="collapseThree" className="panel-collapse collapse">
                  {portfolioDataLoading ? (
                    <LoadingSmall />
                  ) : (
                    <div className="panel-body">
                      <div className="item__card-info">
                        <div className="nopadding col-md-12 inline float-left text-black"></div>
                        <div className="table-responsive portfolio__allocation__table__container">
                          {getRiskLevelTabElements("conservative") !== null ? (
                            <table className="noborder table-borderless table ">
                              <thead>
                                <tr>
                                  <th scope="col">Symbols</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Allocation</th>
                                  <th scope="col">Market Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {getRiskLevelTabElements("conservative")}
                              </tbody>
                            </table>
                          ) : (
                            <div className="noDataContainer text-center">
                              {" "}
                              <div className="get__to__middle">
                                No data available
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="panel panel-default panel-custom"
                onClick={(e) => setPortfoliAllocationDataOnClick(e, "balanced")}
              >
                <div className="panel-heading">
                  <h4
                    className="panel-title"
                    data-toggle="collapse"
                    data-target="#collapseFour"
                  >
                    <Fragment>Balanced </Fragment>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <Fragment>
                      {openedTabs.indexOf("balanced") !== -1 &&
                        typeof getAUMForRiskLevel("balanced") !== "undefined" &&
                        "AUM " +
                          formatter.format(getAUMForRiskLevel("balanced"))}
                    </Fragment>
                  </h4>
                </div>
                <div id="collapseFour" className="panel-collapse collapse">
                  {portfolioDataLoading ? (
                    <LoadingSmall />
                  ) : (
                    <div className="panel-body">
                      <div className="item__card-info">
                        <div className="nopadding col-md-12 inline float-left text-black"></div>
                        <div className="table-responsive portfolio__allocation__table__container">
                          {getRiskLevelTabElements("balanced") !== null ? (
                            <table className="noborder table-borderless table ">
                              <thead>
                                <tr>
                                  <th scope="col">Symbols</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Allocation</th>
                                  <th scope="col">Market Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {getRiskLevelTabElements("balanced")}
                              </tbody>
                            </table>
                          ) : (
                            <div className="noDataContainer text-center">
                              {" "}
                              <div className="get__to__middle">
                                No data available
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="panel panel-default panel-custom"
                onClick={(e) =>
                  setPortfoliAllocationDataOnClick(e, "semi_aggressive")
                }
              >
                <div className="panel-heading">
                  <h4
                    className="panel-title"
                    data-toggle="collapse"
                    data-target="#collapseFive"
                  >
                    <Fragment>Semi Aggressive </Fragment>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <Fragment>
                      {openedTabs.indexOf("semi_aggressive") !== -1 &&
                        typeof getAUMForRiskLevel("semi_aggressive") !==
                          "undefined" &&
                        "AUM " +
                          formatter.format(
                            getAUMForRiskLevel("semi_aggressive")
                          )}
                    </Fragment>
                  </h4>
                </div>
                <div id="collapseFive" className="panel-collapse collapse">
                  {portfolioDataLoading ? (
                    <LoadingSmall />
                  ) : (
                    <div className="panel-body">
                      <div className="item__card-info">
                        <div className="nopadding col-md-12 inline float-left text-black"></div>
                        <div className="table-responsive portfolio__allocation__table__container">
                          {getRiskLevelTabElements("semi_aggressive") !==
                          null ? (
                            <table className="noborder table-borderless table ">
                              <thead>
                                <tr>
                                  <th scope="col">Symbols</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Allocation</th>
                                  <th scope="col">Market Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {getRiskLevelTabElements("semi_aggressive")}
                              </tbody>
                            </table>
                          ) : (
                            <div className="noDataContainer text-center">
                              {" "}
                              <div className="get__to__middle">
                                No data available
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="panel panel-default panel-custom"
                onClick={(e) =>
                  setPortfoliAllocationDataOnClick(e, "aggressive")
                }
              >
                <div className="panel-heading">
                  <h4
                    className="panel-title"
                    data-toggle="collapse"
                    data-target="#collapseSix"
                  >
                    <Fragment>Aggressive </Fragment>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <Fragment>
                      {openedTabs.indexOf("aggressive") !== -1 &&
                        typeof getAUMForRiskLevel("aggressive") !==
                          "undefined" &&
                        "AUM " +
                          formatter.format(getAUMForRiskLevel("aggressive"))}
                    </Fragment>
                  </h4>
                </div>
                <div id="collapseSix" className="panel-collapse collapse">
                  {portfolioDataLoading ? (
                    <LoadingSmall />
                  ) : (
                    <div className="panel-body">
                      <div className="item__card-info">
                        <div className="nopadding col-md-12 inline float-left text-black"></div>
                        <div className="table-responsive portfolio__allocation__table__container">
                          {getRiskLevelTabElements("aggressive") !== null ? (
                            <table className="noborder table-borderless table ">
                              <thead>
                                <tr>
                                  <th scope="col">Symbols</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Allocation</th>
                                  <th scope="col">Market Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {getRiskLevelTabElements("aggressive")}
                              </tbody>
                            </table>
                          ) : (
                            <div className="noDataContainer text-center">
                              {" "}
                              <div className="get__to__middle">
                                No data available
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="panel panel-default panel-custom"
                onClick={(e) =>
                  setPortfoliAllocationDataOnClick(e, "very_aggressive")
                }
              >
                <div className="panel-heading">
                  <h4
                    className="panel-title"
                    data-toggle="collapse"
                    data-target="#collapseSeven"
                  >
                    <Fragment>Very Aggressive </Fragment>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <Fragment>
                      {openedTabs.indexOf("very_aggressive") !== -1 &&
                        typeof getAUMForRiskLevel("very_aggressive") !==
                          "undefined" &&
                        "AUM " +
                          formatter.format(
                            getAUMForRiskLevel("very_aggressive")
                          )}
                    </Fragment>
                  </h4>
                </div>
                <div id="collapseSeven" className="panel-collapse collapse">
                  <div className="panel-body">
                    <div className="item__card-info">
                      <div className="nopadding col-md-12 inline float-left text-black"></div>
                      <div className="table-responsive portfolio__allocation__table__container">
                        {getRiskLevelTabElements("very_aggressive") !== null ? (
                          <table className="noborder table-borderless table ">
                            <thead>
                              <tr>
                                <th scope="col">Symbols</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Allocation</th>
                                <th scope="col">Market Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getRiskLevelTabElements("very_aggressive")}
                            </tbody>
                          </table>
                        ) : (
                          <div className="noDataContainer text-center">
                            {" "}
                            <div className="get__to__middle">
                              No data available
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

           <Footer/>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default withRouter(App);
