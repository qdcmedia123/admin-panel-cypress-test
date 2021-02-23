import React, { Fragment, useState, useEffect, useCallback } from "react";
import Headerserver from "components/layout/Headers/Headerserver";
import Footer from "components/layout/common/Footer";
import { withRouter } from "react-router-dom";
import * as Service from "components/Service/SimpleService";
import { endPoints } from "config/appConfig";
import LoadingSmall from "components/common/LoadingRelative";
import FundingReport from "components/Graphs/Funding";
import { putNegative } from "functions/mis";


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [performanceMonths, setPerformanceMonths] = useState(365);

  const [graphData, setGraphData] = useState(null);

  const setPerformanceRange = useCallback((days) => {
    setIsLoading(true);
    setPerformanceMonths(days);
    setIsLoading(false);
  }, []);

  const getGraphData = useCallback(() => {
    setIsLoading(true);
    Service.get(
      `${endPoints.dashboard.wdAndDepositsGrapshData}/${performanceMonths}`,
      {},
      (response) => {
        setIsLoading(false);
        const modifyData = putNegative(response.data.data.result).reverse();
        setGraphData(modifyData);
        
      }
    ).catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
  }, [performanceMonths]);

  useEffect(() => {
    getGraphData();
  }, [getGraphData]);
 
  console.log(graphData)
  return (
    <Fragment>
      <Headerserver />
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
          <div className = "mh-700">
            <div className="section__2 container__flex__col__12">
            <Fragment>
              {graphData !== null && (
                <Fragment>
                  <div className="col__6">
                    <h3 className = "graph__label">Deposit and Withdraw</h3>
                    <div className="graph__container">
                      <FundingReport  data={graphData} />
                    </div>
                  </div>

                
                </Fragment>
              )}
            </Fragment>
          </div>
        
          </div>
          
        )}
      </div>

      <Footer />
    </Fragment>
  );
}

export default withRouter(App);
