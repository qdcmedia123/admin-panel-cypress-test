import React, { Fragment, useState, useEffect, useCallback } from "react";
import Headerserver from "components/layout/Headers/Headerserver";
import Footer from "components/layout/common/Footer";
import { withRouter } from "react-router-dom";
import * as Service from "components/Service/SimpleService";
import { endPoints } from "config/appConfig";
import LoadingSmall from "components/common/LoadingRelative";
import ClientReport from "components/Graphs/ClientReport";
import { ClientReportGraphs } from "functions/mis";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [performanceMonths, setPerformanceMonths] = useState(365);
  const [graphData, setGraphData] = useState(null);
  const [approvedAccounts, setApprovedAccounts] = useState(null);

  const setPerformanceRange = useCallback((days) => {
    setIsLoading(true);
    setPerformanceMonths(days);
    setIsLoading(false);
  }, []);

  const getGraphData = useCallback(() => {
    setIsLoading(true);
    Service.get(
      `${endPoints.clients.getActiveAccountGraphData}/${performanceMonths}`,
      {},
      (response) => {
        let modifyData = ClientReportGraphs(
          response.data.data.result,
          performanceMonths,
          "active"
        );

        setGraphData(modifyData);
        //console.log(response);
      }
    ).catch((error) => {
      console.log(error);
    });

    Service.get(
      `${endPoints.clients.getApprovedAccountGraphData}/${performanceMonths}`,
      {},
      (response) => {
        setIsLoading(false);
        let modifyData = ClientReportGraphs(
          response.data.data.result,
          performanceMonths,
          "approved"
        );

        setApprovedAccounts(modifyData);
        //console.log(response);
      }
    ).catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
  }, [performanceMonths]);

  useEffect(() => {
    getGraphData();
  }, [getGraphData]);

  
  return (
    <Fragment>
      <Headerserver />
      <div className="body__container">
        <div className="container-fluid mt-15">
          <div className="month__container__performace">
            <div className="months__tabs_container ml-15">
              <span
                className={
                  performanceMonths === 7
                    ? "selected__month_tab months__tabs"
                    : "months__tabs"
                }
                onClick={() => setPerformanceRange(7)}
              >
                {" "}
                1w
              </span>

              <span
                className={
                  performanceMonths === 30
                    ? "selected__month_tab months__tabs"
                    : "months__tabs"
                }
                onClick={() => setPerformanceRange(30)}
              >
                {" "}
                1m
              </span>
              <span
                className={
                  performanceMonths === 365
                    ? "selected__month_tab months__tabs"
                    : "months__tabs"
                }
                onClick={() => setPerformanceRange(365)}
              >
                {" "}
                1y
              </span>
            </div>
          </div>
          {isLoading ? (
            <LoadingSmall />
          ) : (
            <div className="section__2 container__flex__col__6">
              <Fragment>
                {graphData !== null && (
                  <Fragment>
                    <div className="col__6">
                      <h3>Active Account</h3>
                      <div className="graph__container">
                        <ClientReport
                          whichAttribute="active"
                          data={graphData}
                        />
                      </div>
                    </div>

                    <div className="col__6">
                      <h3>Approved Account</h3>
                      <div className="graph__container">
                        <ClientReport
                          whichAttribute="approved"
                          data={approvedAccounts}
                          type="approved"
                        />
                      </div>
                    </div>
                  </Fragment>
                )}
              </Fragment>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}

export default withRouter(App);
