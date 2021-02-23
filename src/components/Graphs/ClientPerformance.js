import React, { useState, useEffect, useCallback, Fragment } from "react";
import * as Service from "components/Service/SimpleService";
import PropTypes from "prop-types";
import { PerformanceGrapDataFormate, DataFormater } from "functions/mis";
import Loading from "../common/LoadingRelative";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";

class CustomizedAxisTick extends React.Component {
  render() {
    const { x, y, payload } = this.props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={10}
          textAnchor="end"
          fill="#666"
          transform="rotate(-45)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}
function App(props) {
  const [performanceMonths, setPerformanceMonths] = useState(365);
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [mainGraphData, setMainGraphData] = useState(null);

  const { client_id } = props;
  const setPerformanceRange = useCallback(
    (days) => {
      setLoading(true);
      setPerformanceMonths(days);
      const slicedData = mainGraphData;
      setGraphData(slicedData.slice(-parseInt(days)));
      setLoading(false);
    },
    [mainGraphData]
  );

  const getGraphData = useCallback(() => {
    if (graphData === null) {
      setLoading(true);
      Service.get(
        `/api/v1/getAdminAccPerformanceGraph/${client_id}/365`,
        {},
        (response) => {
          const modifyData = PerformanceGrapDataFormate(
            response.data.data.both,
            365
          );
          setGraphData(modifyData);
          setMainGraphData(modifyData);
          setLoading(false);
        }
      ).catch((error) => {
        setLoading(false);
        console.log(error);
      });
    }
  }, [client_id, graphData]);

  useEffect(() => {
    getGraphData();
  }, [getGraphData]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {graphData !== null && Object.entries(graphData).length > 1 ? (
            <Fragment>
              <div className="custom__padding__55 date_filter__graph">
                <div className="month__container__performace">
                  <div className="months__tabs_container ">
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
                <div className="performance__graph__container">
                  <ResponsiveContainer width={"99%"} height={400}>
                    <AreaChart
                      width={730}
                      height={400}
                      data={graphData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#cdeadf"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="97%"
                            stopColor="#799a8d"
                            stopOpacity={0.5}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="dateStr" tick={<CustomizedAxisTick />} />
                      {/* After approve this code will be written in useEffect and useState, will function will not execute inside the JXS */}
                      <YAxis
                        tickFormatter={DataFormater}
                        type="number"
                        domain={["auto", "auto"]}
                      />

                      {/*  domain={[minMaxEquity.min, minMaxEquity.max]} */}
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="equityValue"
                        stroke="#455850"
                        fillOpacity={1}
                        fill="url(#colorUv)"
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="page__section">
              {" "}
              <div className="page__section-item noDataContainer text-center">
                {" "}
                <div className="get__to__middle">No data available</div>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
App.propTypes = {
  client_id: PropTypes.string.isRequired,
};
export default App;
