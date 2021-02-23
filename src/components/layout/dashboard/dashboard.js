import React, { useEffect, useState, useCallback, Fragment, useMemo } from "react";
import Header from "../Header";
import * as Service from "components/Service/SimpleService";
import LoadingRelative from "components/common/LoadingRelative";
import WelcomeUser from "components/common/WelcomeUser";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { VectorMap } from "react-jvectormap";
import { Tab, Tabs } from "react-bootstrap";
import Footer from "components/layout/common/Footer";
import { endPoints } from "config/appConfig";
import arrowUpGreen from "assets/img/arrowUpGreen.png";
import Moment from 'moment';

import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
} from "recharts";
import PieDashboardPieChart from "./PieChart";

import {    
  riskLevelColor,
  formatter,
  titleCase,
  transformPieChartData,
  DataFormater
} from "functions/mis";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [priceEvolutionDuration, setPriceEvolutionDuration] = useState(12);
  const { details } = useSelector((state) => state.auth);
  const userDetails = useSelector((state) => state.auth.details);
  const [priceEvolutionMonths, SetpriceEvolutionMonths] = useState(12);
  const [riskLevelCard, SetriskLevelCard] = useState([]);
  const [listPortfolio, setListPortfolio] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [firstRowAPILoading, setFirstRowAPILoading] = useState(null);
  const [firstRowAPI, setFirstRowAPI] = useState(null);
  const [priceEvolutionAUMMonths, SetpriceEvolutionAUMMonths] = useState(12);
  const [leadsMapData, setLeadsMapData] = useState({});
  const [clientsMapData, setClientsMapData] = useState({});

  // Leads Gender and Leads Sex
  const [leadsGender, setLeadsGender] = useState(null);
  const [leadsAgeGroup, setLeadsAgeGroup] = useState(null);

  // Client gender and client age group
  const [clientsGender, setClientsGender] = useState(null);
  const [clientsAgeGroup, setClientsAgeGroup] = useState(null);

  const [key, setKey] = useState("leads");
  const [peData, setpeData] = useState(null);
  const [peDataLoading, setpeDataLoading] = useState(false);

  const [aumDataUnChanged, setAumDataUnChanged] = useState(null);
  const [aumData, setAumData] = useState(null);
  const [aumDataLoading, setAumDataLoading] = useState(false);

  const getAUMData = useCallback(() => {
    setFirstRowAPILoading(true);
    // Add another api first row
    const firstRowAPILink = endPoints.dashboard.CurrentDashboardNumbers;
    Service.get(`${firstRowAPILink}`, {}, (response) => {
      setFirstRowAPILoading(false);
      //console.log(response.data);
      setFirstRowAPI(response.data.data);
      //console.log(response.data.data)
    }).catch((error) => {
      setFirstRowAPILoading(false);
      console.log(error);
    });
  }, []);

  
  // New graphDate API
  const getpfByMonth =  useCallback(() => {
    setpeDataLoading(true);
      Service.get(endPoints.dashboard.portFolioByMonth+`/${priceEvolutionMonths}`, {}, (response) => {
        if(response.data.code === 200 && response.data.success === true) {
          if(Object.entries(response.data.data).length > 0) {
            const newObject = [];
            for(const [key, value] of Object.entries(response.data.data)) {
              value['date'] = Moment(key).format("YYYY-MMM");
                newObject.push(value);
            }
            
            setpeData(newObject);
            setpeDataLoading(false);
          } 
          
        }
      }).catch(error => {
        console.error(error);
        setpeDataLoading(false);
      })
  }, [priceEvolutionMonths]);

  // AUM Request 
  const getpfByMonthAUM =  useCallback(() => {
    if(aumData === null || aumData === undefined) {
      setAumDataLoading(true);
      Service.get(endPoints.dashboard.portFolioByMonth+`/${priceEvolutionAUMMonths}`, {}, (response) => {
        if(response.data.code === 200 && response.data.success === true) {
          if(Object.entries(response.data.data).length > 0) {
            const newObject = [];
            for(const [key, value] of Object.entries(response.data.data)) {
                value['date'] = Moment(key).format("YYYY-MMM");
                newObject.push(value);
            }
            setAumDataUnChanged(newObject);
            setAumData(newObject);
            setAumDataLoading(false);
          } 
          
        }
      }).catch(error => {
        console.error(error);
        setAumDataLoading(false);
      })
    }
    
  }, [priceEvolutionAUMMonths, aumData]);

  // Use effect for aum 
  useEffect(() => {
    getpfByMonthAUM();
  }, [getpfByMonthAUM])

  useEffect(() => {
    getpfByMonth();
  }, [getpfByMonth])
  
  useEffect(() => {
    let checkPermission = function checkPermission() {
      if (typeof userDetails.data !== "undefined") {
        if (typeof userDetails.data.permission_mapping !== "undefined") {
          //List Listprotfolio
          if (userDetails.data.permission_mapping.list_listProtfolio === true) {
            setListPortfolio(true);
          }

          if (userDetails.data.permission_mapping.admin === true) {
            setAdmin(true);
          }
        }
      }
    };
    checkPermission();
    getAUMData();
  }, [userDetails, getAUMData]);

  useEffect(() => {
    

    // get the leads map
    Service.get(
      `${endPoints.dashboard.mapUsersByCountry}/leads`,
      {},
      (response) => {
        if (
          typeof response.data.data.result.leads !== "undefined" &&
          Object.entries(response.data.data.result.leads).length > 0
        ) {
          //const {leads} = response.data.data.result;
          //const newObjectLeads = Object.assign({},leads )
          setLeadsMapData(response.data.data.result.leads);
        } else {
          console.error("Not data is available for leads map");
        }
      }
    ).catch((error) => {
      console.log(error);
    });

    Service.get(
      `${endPoints.dashboard.mapUsersByCountry}/clients`,
      {},
      (response) => {
        if (
          typeof response.data.data.result.clients !== "undefined" &&
          Object.entries(response.data.data.result.clients).length > 0
        ) {
          //const {leads} = response.data.data.result;
          //const newObjectLeads = Object.assign({},leads )
          setClientsMapData(response.data.data.result.clients);
        } else {
          console.error("Not data is available for leads map");
        }
      }
    ).catch((error) => {
      console.log(error);
    });

    // Leads age gorup and gender group
    Service.get(
      `${endPoints.dashboard.dashboardGroupedNums}/leads`,
      {},
      (response) => {
        if (
          typeof response.data.data.genderGroups !== "undefined" &&
          Object.entries(response.data.data.genderGroups).length > 0
        ) {
          //const {leads} = response.data.data.result;
          //const newObjectLeads = Object.assign({},leads )
          // const modify data
          //let modifyDatagenderGroup = transformPieChartData(response.data.data.genderGroups);
          let mofifyDataAgeGroup = transformPieChartData(
            response.data.data.ageGroups
          );
          setLeadsAgeGroup(mofifyDataAgeGroup);
          setLeadsGender(response.data.data.genderGroups);
        } else {
          console.error(
            "No data available for api /api/v1/dashboardGroupedNums/leads"
          );
        }
      }
    ).catch((error) => {
      console.log(error);
    });

    // Send another request for clients gender and it's
    Service.get(
      `${endPoints.dashboard.dashboardGroupedNums}/clients`,
      {},
      (response) => {
        if (
          typeof response.data.data.genderGroups !== "undefined" &&
          Object.entries(response.data.data.genderGroups).length > 0
        ) {
          //const {leads} = response.data.data.result;
          //const newObjectLeads = Object.assign({},leads )
          // const modify data
          //let modifyDatagenderGroup = transformPieChartData(response.data.data.genderGroups);
          let mofifyDataAgeGroup = transformPieChartData(
            response.data.data.ageGroups
          );
          setClientsAgeGroup(mofifyDataAgeGroup);
          setClientsGender(response.data.data.genderGroups);
        } else {
          console.error(
            "No data available for api /api/v1/dashboardGroupedNums/client"
          );
        }
      }
    ).catch((error) => {
      console.log(error);
    });
  }, []);

  

  const areaGraphData = useMemo(() => {
 
    if (peData !== null) {      
      const graphData = peData;
      
      // Get the all object keys
      let getRiskLevels = Object.keys(graphData[0]).slice(1);

      // Let make linerGradiance objects
      let getLinierJXSElement = getRiskLevels.map((item, index) => (
        <linearGradient key={index} id={item} x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="5%"
            stopColor={riskLevelColor[item]}
            stopOpacity={0.8}
          />
          <stop
            offset="100%"
            stopColor={riskLevelColor[item]}
            stopOpacity={0}
          />
        </linearGradient>
      ));

      let getAreaJSXElement;
      

      getAreaJSXElement = getRiskLevels.map((item, index) => (
        <Area
        isAnimationActive = {false}
          name={titleCase(item)}
          key={index}
          type="monotone"
          dataKey={item}
          stroke={riskLevelColor[item]}
          fillOpacity={1}
          fill={`url(#${item})`}
          hide={riskLevelCard.indexOf(item) !== -1 ? false : true}
        />
      ));
      
      
      //console.log(getRiskLevels);
      return {
        data: graphData,
        linearGradient: getLinierJXSElement,
        Area: getAreaJSXElement,
      };
    }
    return null;
  }, [peData, riskLevelCard]);

  const priceEvolution = useCallback(
    
    (value) => {
      if (priceEvolutionMonths === value) {
        SetpriceEvolutionMonths(12);
        setPriceEvolutionDuration(12);
      } else {
        SetpriceEvolutionMonths(value);
        setPriceEvolutionDuration(value);
      }
    },
    [priceEvolutionMonths]
  );

  const priceEvolutionAUM = useCallback(
    (value) => {
      // Copy aum data 
      const copyAumData = aumDataUnChanged;
      
      if (priceEvolutionAUMMonths === value) {
        setAumData(copyAumData.slice(12));
        SetpriceEvolutionAUMMonths(12);
      } else {
        setAumData(copyAumData.slice(-value));
        SetpriceEvolutionAUMMonths(value);
      }
    },
    [priceEvolutionAUMMonths, aumDataUnChanged]
  );

  const riskLevelCardAction = useCallback(
    (value) => {
      //
      let isAlreadyThere = riskLevelCard.indexOf(value);
      // console.log(isAlreadyThere)
      if (isAlreadyThere !== -1) {
        // Remove from the array

        //console.log(RiskLevel);
        SetriskLevelCard(riskLevelCard.filter((e) => e !== value));
      } else {
        // Otherwise lets add
        //RiskLevel.push(value);
        SetriskLevelCard([...riskLevelCard, value]);
      }
    },
    [riskLevelCard]
  );

  const onRegionTipShow = (e, el, code) => {
    const nc =
      typeof leadsMapData[code] === "undefined" ? 0 : leadsMapData[code];
    el.html(el.html() + " - " + nc);
  };

  const onRegionTipShowClients = (e, el, code) => {
    const nc =
      typeof clientsMapData[code] === "undefined" ? 0 : clientsMapData[code];
    el.html(el.html() + " - " + nc);
  };

  return (
    <div>
      <Header />

      <div className="wrapper">
        <div className="container-fluid dashboard__page__content">
          <WelcomeUser details={details} text="" users={true} />

          {listPortfolio && (
            <div className="dashboard__number">
              {firstRowAPILoading !== null &&
                firstRowAPILoading !== true &&
                firstRowAPI !== null &&
                isAdmin && (
                  <div className="item__card-container_4x">
                    <div className="item__card-item each__rows">
                      <div className="first__colum">
                        <div className="page__visit">PAGE VISIT </div>
                        {firstRowAPI !== null &&
                        Math.sign(firstRowAPI.pageVisitorsChangePercentage) ===
                          1 ? (
                          <Fragment>
                            <div className="rate__number float-right positive">
                              <img
                                src={require("../../../assets/img/Arrow 4.png")}
                                alt="Wealthface"
                                title="Dashboard"
                              />
                              {firstRowAPI.pageVisitorsChangePercentage}%
                            </div>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <div className="rate__number float-right negative">
                              <img
                                src={require("../../../assets/img/Arrow 2.png")}
                                alt="Wealthface"
                                title="Dashboard"
                              />
                              {firstRowAPI.pageVisitorsChangePercentage}%
                            </div>
                          </Fragment>
                        )}
                      </div>

                      <div className="secound__colum">
                        <div className="amount__bold">
                          <h4 className="amount__home">
                            {firstRowAPI !== null && firstRowAPI.pageVisits}
                          </h4>
                        </div>
                        <div className="little__graph float-right">
                          {firstRowAPI !== null &&
                          Math.sign(
                            firstRowAPI.pageVisitorsChangePercentage
                          ) === 1 ? (
                            <Fragment>
                              <img
                                src={require("../../../assets/img/Vector_green.png")}
                                alt="Wealthface"
                                title="Dashboard"
                              />
                            </Fragment>
                          ) : (
                            <Fragment>
                              <img
                                src={require("../../../assets/img/graphic.png")}
                                alt="Wealthface"
                                title="Dashboard"
                              />
                            </Fragment>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="item__card-item each__rows">
                      <div className="first__colum">
                        <div className="page__visit">user sign up</div>

                        {firstRowAPI ? (
                          <Fragment>
                            {(() => {
                              switch (
                                Math.sign(firstRowAPI.signUpChangePercentage)
                              ) {
                                case 1:
                                  return (
                                    <Fragment>
                                      <div className="rate__number float-right positive">
                                        <img
                                          src={require("../../../assets/img/Arrow 4.png")}
                                          alt="Wealthface"
                                          title="Dashboard"
                                          className = "float-right"
                                        />
                                        {firstRowAPI.signUpChangePercentage} %
                                      </div>
                                    </Fragment>
                                  );
                                case 0:
                                  return (
                                    <Fragment>
                                      <div className="rate__number float-right gray">
                                        {firstRowAPI.signUpChangePercentage} %
                                      </div>
                                    </Fragment>
                                  );
                                case -1:
                                  return (
                                    <Fragment>
                                      <div className="rate__number float-right negative">
                                        <img
                                          src={require("../../../assets/img/Arrow 2.png")}
                                          alt="Wealthface"
                                          title="Dashboard"
                                        />
                                        {firstRowAPI.signUpChangePercentage} %
                                      </div>
                                    </Fragment>
                                  );
                                default:
                                  return "";
                              }
                            })()}
                          </Fragment>
                        ) : (
                          <Fragment></Fragment>
                        )}
                      </div>

                      <div className="secound__colum">
                        <div className="amount__bold">
                          <h4 className="amount__home">{firstRowAPI.signUp}</h4>
                        </div>

                        {(() => {
                          switch (
                            Math.sign(firstRowAPI.signUpChangePercentage)
                          ) {
                            case 1:
                              return (
                                <Fragment>
                                  <img
                                    src={require("../../../assets/img/Vector_green.png")}
                                    alt="Wealthface"
                                    title="Dashboard"
                                  />
                                </Fragment>
                              );
                            case 0:
                              return <Fragment></Fragment>;
                            case -1:
                              return (
                                <Fragment>
                                  <div className="little__graph float-right">
                                    <img
                                      src={require("../../../assets/img/graphic.png")}
                                      alt="Wealthface"
                                      title="Dashboard"
                                    />
                                  </div>
                                </Fragment>
                              );
                            default:
                              return "";
                          }
                        })()}
                      </div>
                    </div>

                    <div className="item__card-item each__rows">
                      <div className="first__colum">
                        <div className="page__visit">user on board</div>

                        {firstRowAPI ? (
                          <Fragment>
                            {(() => {
                              switch (
                                Math.sign(firstRowAPI.onBoardChangePercentage)
                              ) {
                                case 1:
                                  return (
                                    <Fragment>
                                      <div className="rate__number float-right positive">
                                        <img
                                          src={require("../../../assets/img/Arrow 4.png")}
                                          alt="Wealthface"
                                          title="Dashboard"
                                        />
                                        {firstRowAPI.onBoardChangePercentage} %
                                      </div>
                                    </Fragment>
                                  );
                                case 0:
                                  return (
                                    <Fragment>
                                      <div className="rate__number float-right gray">
                                        {firstRowAPI.onBoardChangePercentage} %
                                      </div>
                                    </Fragment>
                                  );
                                case -1:
                                  return (
                                    <Fragment>
                                      <div className="rate__number float-right negative">
                                        <img
                                          src={require("../../../assets/img/Arrow 2.png")}
                                          alt="Wealthface"
                                          title="Dashboard"
                                        />
                                        {firstRowAPI.onBoardChangePercentage} %
                                      </div>
                                    </Fragment>
                                  );
                                default:
                                  return "";
                              }
                            })()}
                          </Fragment>
                        ) : (
                          <Fragment></Fragment>
                        )}
                      </div>

                      <div className="secound__colum">
                        <div className="amount__bold">
                          <h4 className="amount__home">
                            {firstRowAPI.onBoard}
                          </h4>
                        </div>

                        {(() => {
                          switch (
                            Math.sign(firstRowAPI.onBoardChangePercentage)
                          ) {
                            case 1:
                              return (
                                <Fragment>
                                  <img
                                    src={require("../../../assets/img/Vector_green.png")}
                                    alt="Wealthface"
                                    title="Dashboard"
                                  />
                                </Fragment>
                              );
                            case 0:
                              return <Fragment></Fragment>;
                            case -1:
                              return (
                                <Fragment>
                                  <div className="little__graph float-right">
                                    <img
                                      src={require("../../../assets/img/graphic.png")}
                                      alt="Wealthface"
                                      title="Dashboard"
                                    />
                                  </div>
                                </Fragment>
                              );
                            default:
                              return "";
                          }
                        })()}
                      </div>
                    </div>

                    <div className="item__card-item each__rows">
                      <div className="first__colum">
                        <div className="page__visit">Bounce Rate </div>
                        {firstRowAPI !== null &&
                        Math.sign(firstRowAPI.bounceRateChangePercentage) ===
                          1 ? (
                          <Fragment>
                            <div className="rate__number float-right negative">
                              <img
                                src={require("../../../assets/img/Arrow_4_up.png")}
                                alt="Wealthface"
                                title="Dashboard"
                              />
                              {firstRowAPI.bounceRateChangePercentage}%
                            </div>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <div className="rate__number float-right positive">
                              <img
                                src={arrowUpGreen}
                                alt="Wealthface"
                                title="Dashboard"
                              />
                              {firstRowAPI.bounceRateChangePercentage}%
                            </div>
                          </Fragment>
                        )}
                      </div>

                      <div className="secound__colum">
                        <div className="amount__bold">
                          <h4 className="amount__home">
                            {firstRowAPI !== null && firstRowAPI.bounceRate} %
                          </h4>
                        </div>
                        <div className="little__graph float-right">
                          {firstRowAPI !== null &&
                          Math.sign(firstRowAPI.bounceRateChangePercentage) ===
                            1 ? (
                            <Fragment>
                              <img
                                src={require("../../../assets/img/graphic.png")}
                                alt="Wealthface"
                                title="Dashboard"
                              />
                            </Fragment>
                          ) : (
                            <Fragment>
                              <img
                                src={require("../../../assets/img/Vector_green.png")}
                                alt="Wealthface"
                                title="Dashboard"
                              />
                            </Fragment>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>

        <div className="container-fluid">
          <div className="section__2">
            {isLoading ? (
              <LoadingRelative />
            ) : (
              <Fragment>
                {listPortfolio && (
                  <Fragment>
                  <div className="row nopadding price_evolotion__container">
                    <div className="col-md-6">
                      <div className="price__evolution">
                        Portfolios Evolution
                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <div className="months__tabs_container text-right">
                        <span
                          className={
                            priceEvolutionMonths === 3
                              ? "selected__month_tab months__tabs"
                              : "months__tabs"
                          }
                          onClick={() => priceEvolution(3)}
                        >
                          {" "}
                          3m
                        </span>
                        <span
                          className={
                            priceEvolutionMonths === 6
                              ? "selected__month_tab months__tabs"
                              : "months__tabs"
                          }
                          onClick={() => priceEvolution(6)}
                        >
                          {" "}
                          6m
                        </span>
                        <span
                          className={
                            priceEvolutionMonths === 12
                              ? "selected__month_tab months__tabs"
                              : "months__tabs"
                          }
                          onClick={() => priceEvolution(12)}
                        >
                          {" "}
                          12m
                        </span>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="text-bold" role="alert">
                        Please click the card to view each risk level
                        graph. Initially its hidden.
                      </div>
                    </div>
                  </div>
                  
                  <div className="price__evolution__box__container">
                    <div
                      id="myCarousel"
                      className=" slide w-100"
                      data-ride="carousel"
                      data-interval="false"
                    >
                      <div className="carousel-inner" role="listbox">
                        <div className="carousel-item py-5 active">
                          <div className="row nopadding">
                            <div className="col-sm ">
                              <div
                                className="card "
                                tabIndex="0"
                                data-toggle="tooltip"
                                title={`Sum of last ${
                                  priceEvolutionMonths === null
                                    ? 12
                                    : priceEvolutionMonths
                                } months.`}
                              >
                                <div
                                  className={
                                    riskLevelCard.indexOf("low_risk") !==
                                    -1
                                      ? "card-body selected c_low_risk"
                                      : "card-body"
                                  }
                                  onClick={() =>
                                    riskLevelCardAction("low_risk")
                                  }
                                >
                                  <div className="dot c_low_risk"></div>

                                  <div className="d-inline risk__and__price">
                                    <div className="risk__text">
                                      {" "}
                                      Low Risk
                                    </div>
                                    <div className="risk__amount">
                                      {peData !== null
                                        ? formatter.format(
                                            peData[peData.length - 1]
                                              .low_risk
                                          )
                                        : 0.0}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-sm">
                              <div
                                className="card"
                                tabIndex="0"
                                data-toggle="tooltip"
                                title={`Sum of last ${
                                  priceEvolutionMonths === null
                                    ? 12
                                    : priceEvolutionMonths
                                } months.`}
                              >
                                <div
                                  className={
                                    riskLevelCard.indexOf(
                                      "very_conservative"
                                    ) !== -1
                                      ? "card-body selected c_very_conservative"
                                      : "card-body"
                                  }
                                  onClick={() =>
                                    riskLevelCardAction(
                                      "very_conservative"
                                    )
                                  }
                                >
                                  <div className="dot c_very_conservative"></div>

                                  <div className="d-inline risk__and__price">
                                    <div className="risk__text">
                                      {" "}
                                      Very Conservative{" "}
                                    </div>
                                    <div className="risk__amount">
                                      {peData !== null
                                        ? formatter.format(
                                            peData[peData.length - 1]
                                              .very_conservative
                                          )
                                        : 0.0}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-sm">
                              <div
                                className="card"
                                tabIndex="0"
                                data-toggle="tooltip"
                                title={`Sum of last ${
                                  priceEvolutionMonths === null
                                    ? 12
                                    : priceEvolutionMonths
                                } months.`}
                              >
                                <div
                                  className={
                                    riskLevelCard.indexOf(
                                      "conservative"
                                    ) !== -1
                                      ? "card-body selected c_conservative"
                                      : "card-body"
                                  }
                                  onClick={() =>
                                    riskLevelCardAction("conservative")
                                  }
                                >
                                  <div className="dot c_conservative"></div>

                                  <div className="d-inline risk__and__price">
                                    <div className="risk__text">
                                      {" "}
                                      Conservative
                                    </div>
                                    <div className="risk__amount">
                                      {peData !== null
                                        ? formatter.format(
                                            peData[peData.length - 1]
                                              .conservative
                                          )
                                        : 0.0}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-sm">
                              <div
                                className="card"
                                tabIndex="0"
                                data-toggle="tooltip"
                                title={`Sum of last ${
                                  priceEvolutionMonths === null
                                    ? 12
                                    : priceEvolutionMonths
                                } months.`}
                              >
                                <div
                                  className={
                                    riskLevelCard.indexOf("balanced") !==
                                    -1
                                      ? "card-body selected c_balanced"
                                      : "card-body"
                                  }
                                  onClick={() =>
                                    riskLevelCardAction("balanced")
                                  }
                                >
                                  <div className="dot c_balanced"></div>

                                  <div className="d-inline risk__and__price">
                                    <div className="risk__text">
                                      {" "}
                                      Balanced
                                    </div>
                                    <div className="risk__amount">
                                      {peData !== null
                                        ? formatter.format(
                                            peData[peData.length - 1]
                                              .balanced
                                          )
                                        : 0.0}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-sm">
                              <div
                                className="card"
                                tabIndex="0"
                                data-toggle="tooltip"
                                title={`Sum of last ${
                                  priceEvolutionMonths === null
                                    ? 12
                                    : priceEvolutionMonths
                                } months.`}
                              >
                                <div
                                  className={
                                    riskLevelCard.indexOf(
                                      "semi_aggressive"
                                    ) !== -1
                                      ? "card-body selected c_semi_aggressive"
                                      : "card-body"
                                  }
                                  onClick={() =>
                                    riskLevelCardAction("semi_aggressive")
                                  }
                                >
                                  <div className="dot c_semi_aggressive"></div>

                                  <div className="d-inline risk__and__price">
                                    <div className="risk__text">
                                      {" "}
                                      Semi Aggressive
                                    </div>
                                    <div className="risk__amount">
                                      {peData !== null
                                        ? formatter.format(
                                            peData[peData.length - 1]
                                              .semi_aggressive
                                          )
                                        : 0.0}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-sm">
                              <div
                                className="card"
                                tabIndex="0"
                                data-toggle="tooltip"
                                title={`Sum of last ${
                                  priceEvolutionMonths === null
                                    ? 12
                                    : priceEvolutionMonths
                                } months.`}
                              >
                                <div
                                  className={
                                    riskLevelCard.indexOf(
                                      "aggressive"
                                    ) !== -1
                                      ? "card-body selected c_aggressive"
                                      : "card-body"
                                  }
                                  onClick={() =>
                                    riskLevelCardAction("aggressive")
                                  }
                                >
                                  <div className="dot c_aggressive"></div>

                                  <div className="d-inline risk__and__price">
                                    <div className="risk__text">
                                      {" "}
                                      Aggressive
                                    </div>
                                    <div className="risk__amount">
                                      {peData !== null
                                        ? formatter.format(
                                            peData[peData.length - 1]
                                              .aggressive
                                          )
                                        : 0.0}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-sm-2">
                              <div
                                className="card"
                                tabIndex="0"
                                data-toggle="tooltip"
                                title={`Sum of last ${
                                  priceEvolutionMonths === null
                                    ? 12
                                    : priceEvolutionMonths
                                } months.`}
                              >
                                <div
                                  className={
                                    riskLevelCard.indexOf(
                                      "very_aggressive"
                                    ) !== -1
                                      ? "card-body selected c_very_aggressive"
                                      : "card-body"
                                  }
                                  onClick={() =>
                                    riskLevelCardAction("very_aggressive")
                                  }
                                >
                                  <div className="dot c_very_aggressive"></div>

                                  <div className="d-inline risk__and__price">
                                    <div className="risk__text">
                                      {" "}
                                      Very Aggressive
                                    </div>
                                    <div className="risk__amount">
                                      {peData !== null
                                        ? formatter.format(
                                            peData[peData.length - 1]
                                              .very_aggressive
                                          )
                                        : 0.0}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="carousel-item py-5">
                          <div className="row"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row nopadding">
                    <div className="col-md-12">
                      {aumData !== null && (
                        <div className="graph min-h-300">
                          {peDataLoading ? (
                            <LoadingRelative />
                          ) : (
                            <ResponsiveContainer
                              width={"99%"}
                              height={400}
                            >
                              <AreaChart
                                width={1400}
                                height={400}
                                data={
                                  aumData !== null
                                    ? areaGraphData.data
                                    : null
                                }
                                margin={{
                                  top: 10,
                                  right: 30,
                                  left: 0,
                                  bottom: 0,
                                }}
                              >
                                <defs>
                                  {areaGraphData.linearGradient}
                                </defs>
                                <XAxis dataKey="date" />
                                <YAxis tickFormatter = {DataFormater}/>
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip
                                  itemStyle={{
                                    fontWeight: "700",
                                    opacity: 1,
                                    textTransform: "capitalize",
                                  }}
                                />
                                {areaGraphData.Area}
                              </AreaChart>
                            </ResponsiveContainer>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Fragment>
                )}
              </Fragment>
            )}
          </div>
        </div>
        {/*
         
         */}
        {listPortfolio && (
          <div className="container-fluid section__3">
            <div className="asset__under__managment__and_title item__card-container_2fr1fr">
              {aumData !== null && (
                <div className="asset__under__managment section__3__1">
                  <div className="row  price_evolotion__container">
                    <div className="col-md-6">
                      <div className="price__evolution">
                        Assets Under Management
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="months__tabs_container text-right">              
                        
                        <span
                          className={
                            priceEvolutionAUMMonths === 3
                              ? "selected__month_tab months__tabs"
                              : "months__tabs"
                          }
                          onClick={() => priceEvolutionAUM(3)}
                        >
                          {" "}
                          3m
                        </span>

                        <span
                          className={
                            priceEvolutionAUMMonths === 6
                              ? "selected__month_tab months__tabs"
                              : "months__tabs"
                          }
                          onClick={() => priceEvolutionAUM(6)}
                        >
                          {" "}
                          6m
                        </span>

                        <span
                          className={
                            priceEvolutionAUMMonths === 12
                              ? "selected__month_tab months__tabs"
                              : "months__tabs"
                          }
                          onClick={() => priceEvolutionAUM(12)}
                        >
                          {" "}
                          12m
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <h3 className="doller">
                        {aumData !== null && formatter.format(aumData[aumData.length-1]['all'])}
                      </h3>
                    </div>
                        
                    <div className="col-md-12 nopadding min-h-300">
                      {aumDataLoading ? <LoadingRelative/> : <ResponsiveContainer width={"99%"} height={400}>
                        <BarChart
                          width={900}
                          height={250}
                          data={aumData}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />

                          <YAxis tickFormatter = {DataFormater}/>
                          <Tooltip
                            itemStyle={{
                              fontWeight: "700",
                              opacity: 1,
                              textTransform: "capitalize",
                            }}
                          />
                          <Legend />
                          <Bar dataKey="all" fill="#017dff"  name = "AUM"/>
                        </BarChart>
                      </ResponsiveContainer>
                    }
                      
                    </div>
                  
                  
                  </div>
                </div>
              )}

              {!isLoading && (
                <div className="title">
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                  >
                    <Tab eventKey="leads" title="Leads">
                      {leadsMapData !== null &&
                        Object.entries(leadsMapData).length > 0 && (
                          <Fragment>
                            <div className="locationMap__text price__evolution">
                              {" "}
                              Location Map Leads
                            </div>

                            <div className="vectory___map__waprer">
                              <VectorMap
                                map={"world_mill"}
                                backgroundColor="transparent" //change it to ocean blue: #0077be
                                zoomOnScroll={true}
                                containerStyle={{
                                  width: "100%",
                                }}
                                containerClassName="map"
                                regionStyle={{
                                  initial: {
                                    fill: "#A6A6A6",
                                    stroke: "none",
                                    "stroke-width": 0,
                                    "stroke-opacity": 0,
                                  },
                                  hover: {
                                    "fill-opacity": 0.8,
                                    cursor: "pointer",
                                  },
                                  selected: {
                                    fill: "#444444", //color for the clicked country
                                  },
                                  selectedHover: {},
                                }}
                                regionsSelectable={false}
                                series={{
                                  regions: [
                                    {
                                      values: leadsMapData, //this is your data
                                      scale: ["#A6A6A6", "#A6A6A6"], //your color game's here
                                      normalizeFunction: "polynomial",
                                    },
                                  ],
                                }}
                                onRegionTipShow={onRegionTipShow}
                              />
                            </div>
                          </Fragment>
                        )}

                      <div className="pie__chart__warper">
                        {leadsGender !== null && leadsAgeGroup !== null && (
                          <PieDashboardPieChart
                            genderData={leadsGender}
                            ageData={leadsAgeGroup}
                            section="Leads"
                            total={Object.values({ ...leadsGender }).reduce(
                              (a, b) => a + b
                            )}
                          />
                        )}
                      </div>
                    </Tab>

                    <Tab eventKey="clients" title="Clients">
                      {clientsMapData !== null &&
                        Object.entries(clientsMapData).length > 0 && (
                          <Fragment>
                            <div className="locationMap__text">
                              {" "}
                              Location Map
                            </div>

                            <div className="vectory___map__waprer">
                              <VectorMap
                                map={"world_mill"}
                                backgroundColor="transparent" //change it to ocean blue: #0077be
                                zoomOnScroll={true}
                                containerStyle={{
                                  width: "100%",
                                }}
                                containerClassName="map"
                                regionStyle={{
                                  initial: {
                                    fill: "#A6A6A6",
                                    stroke: "none",
                                    "stroke-width": 0,
                                    "stroke-opacity": 0,
                                  },
                                  hover: {
                                    "fill-opacity": 0.8,
                                    cursor: "pointer",
                                  },
                                  selected: {
                                    fill: "#444444", //color for the clicked country
                                  },
                                  selectedHover: {},
                                }}
                                regionsSelectable={true}
                                series={{
                                  regions: [
                                    {
                                      values: clientsMapData, //this is your data
                                      scale: ["#A6A6A6", "#A6A6A6"], //your color game's here
                                      normalizeFunction: "polynomial",
                                    },
                                  ],
                                }}
                                onRegionTipShow={onRegionTipShowClients}
                              />
                            </div>
                          </Fragment>
                        )}

                      <div className="pie__chart__warper">
                        {clientsGender !== null && clientsAgeGroup !== null && (
                          <PieDashboardPieChart
                            genderData={clientsGender}
                            ageData={clientsAgeGroup}
                            section="Clients"
                            total={Object.values({ ...clientsGender }).reduce(
                              (a, b) => a + b
                            )}
                          />
                        )}
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(App);
