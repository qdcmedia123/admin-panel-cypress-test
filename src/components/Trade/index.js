import React, { Fragment, useState, useEffect, useCallback } from "react";
import Headerserver from "components/layout/Headers/Headerserver";
import Footer from "components/layout/common/Footer";
import { withRouter } from "react-router-dom";
import TradeSymbolsRatioPieChart from "components/Graphs/TradeSymbolsRatioPieChart";
import * as Service from "components/Service/SimpleService";
import { endPoints } from "config/appConfig";
import AverageTradeSize from "components/Graphs/averageTradeSize";

import {
  getTradeSymbolsPieChartData,
  formateDataTradegetAvgT,
} from "functions/mis";
import LoadingRelative from "components/common/LoadingRelative";


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [tradSizeLoading, setTradeSizeLoading] = useState(false);
  const [getAvgT, setGetAvgT] = useState(null);
  const [performanceMonths, setPerformanceMonths] = useState(12);

  const setPerformanceRange = useCallback((month) => {
    setTradeSizeLoading(true);
    setPerformanceMonths(month);
    setTradeSizeLoading(false);
  }, []);

  const getAdminMasterTotals = useCallback(() => {
    setIsLoading(true);
    Service.get(
      `${endPoints.dashboard.getAdminMasterTotals}`,
      {},
      (response) => {
        if (response.data.code === 200) {
          const { equity } = response.data.data;
          // Get the result
          const transformGraphData = getTradeSymbolsPieChartData(equity);
          setGraphData(transformGraphData);
        }
        setIsLoading(false);
      }
    ).catch((error) => {
      setIsLoading(false);
      console.log(error);
    });

   
  }, []);

  const getAVGGraphDAta = useCallback(() => {
    setTradeSizeLoading(true);
    Service.get(endPoints.reporting.getAvgT + `/${performanceMonths}`, {}, (response) => {
      if (response.data.code === 200) {
        let formatData = formateDataTradegetAvgT(response.data.data);
        setGetAvgT(formatData);
        setTradeSizeLoading(false);
      }
    }).catch((error) => {
      console.error(error);
      setTradeSizeLoading(false);
    });
  }, [performanceMonths])

  useEffect(() => {
    getAdminMasterTotals();
    getAVGGraphDAta();
  }, [getAdminMasterTotals, getAVGGraphDAta]);


  return (
    <Fragment>
      <Headerserver />
      <div className="container-fluid mt-15">

       {!tradSizeLoading &&  <div className="months__tabs_container ml-15">
         
          <span
            className={
              performanceMonths === 3
                ? "selected__month_tab months__tabs"
                : "months__tabs"
            }
            onClick={() => setPerformanceRange(3)}
          >
            {" "}
            3M
          </span>

          <span
            className={
              performanceMonths === 6
                ? "selected__month_tab months__tabs"
                : "months__tabs"
            }
            onClick={() => setPerformanceRange(6)}
          >
            {" "}
            6M
          </span>
          <span
            className={
              performanceMonths === 12
                ? "selected__month_tab months__tabs"
                : "months__tabs"
            }
            onClick={() => setPerformanceRange(12)}
          >
            {" "}
            1Y
          </span>
        </div>
}       
        <div className = "mh-700">
        <div className="section__2 container__flex mt-15">
          <div className="col__6">
          {tradSizeLoading ? <LoadingRelative/> : <Fragment>
            <h3>Average Trade Size </h3>
              <br/>
              <br/>

            <div className="graph__container ">
              {getAvgT !== null && <AverageTradeSize data = {getAvgT}/>}
            </div>
          </Fragment>}
            
          </div>
          

          {isLoading ? (
            <LoadingRelative />
          ) : (
            <Fragment>
              {graphData !== null && (
                <div className="col__6">
                  <div className="graph__container">
                    <h3>Top Trades</h3>
                    <TradeSymbolsRatioPieChart data={graphData} />
                  </div>
                </div>
              )}
            </Fragment>
          )}
        </div>
      
        </div>
       
      </div>

      <Footer />
    </Fragment>
  );
}

export default withRouter(App);
