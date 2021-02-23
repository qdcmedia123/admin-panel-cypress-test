import React, {
  Fragment,
  useState,
  useEffect,
  useCallback
} from "react";
import Headerserver from "components/layout/Headers/Headerserver";
import NoDataFound from "components/common/NoDataFound";
import Loading from "components/common/Loading";
import Footer from "components/layout/common/Footer";
import CientPerformanceGraph from "components/Graphs/ClientPerformance";
import {
  findGetParamater,
  getAllParams,
  GetPortfolioNumber,
  titleCase,
  formatter,
  getActivityTabData,
  CCF__TC__FA__Sum,
} from "functions/mis";
import * as Service from "components/Service/SimpleService";
import { withRouter } from "react-router-dom";
import WelcomeUser from "components/common/WelcomeUser";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import Moment from "moment";
function App(props) {
  const { details } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState();
  const [accountDetails, setAccountDetails] = useState(null);
  const [equityAndFixedIncom, setEquityAndFixedIncom] = useState(null);
  const [isRiskIncomLoaded, setRiskIncomLoaded] = useState(false);
  const [depositWithdraw, setDepositWithdraw] = useState(null);
  const [activitiestTab] = useState("all_activities");
  const [activitiesHistory, setActivitiesHistory] = useState(null);
  const [activitiesHistoryMonths, setActivitiesHistoryMonths] = useState(12);
  const [tabsActivitiesHistory, setTabsActivitiesHistory] = useState(null);
  const [userActivities, setUserActivities] = useState(null);
  const [updateOct2, setUpdateOct2] = useState(null);
  const [CCFTCFASum, setCCFTCFASum] = useState(null);
  const [didMount, setDidMount] = useState(false);
  const { id } = props.match.params;
  const getRiskLevel = findGetParamater("risk_level", props.location.search);
  if (typeof id === "undefined") {
    props.location.replace("/accounts");
  }
  const getAccountDetails = useCallback(() => {
    setIsLoading(true);
    let clientDetailAPI = axios.get(`/api/v1/clientAccountDetails/${id}`);
    let depositWithDrawAPI = axios.get(`/api/v1/getAccWithdrawDeposit/${id}`);
    axios
      .all([clientDetailAPI, depositWithDrawAPI])
      .then(
        axios.spread((...response) => {
          if (
            response[0].data.message === "" &&
            Object.keys(response[0].data.data).length > 0
          ) {
            setAccountDetails(response[0].data.data[0]);
            setDepositWithdraw(response[1].data.data);
          } else {
            setIsLoading(false);
            throw Error(`Something went wrong ${response[0].data.message}`);
          }
          setIsLoading(false);
        })
      )
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id]);
  const getEquityPerandIncomePer = useCallback(
    (e) => {
      setRiskIncomLoaded(true);
      Service.get(
        `/api/v1/GetAlgoCombsAsArrByPortfolio/${getRiskLevel}`,
        {},
        (response) => {
          const { asset_class } = response.data.data.data;
          setRiskIncomLoaded(false);
          setEquityAndFixedIncom(asset_class);
        }
      ).catch((error) => {
        setRiskIncomLoaded(false);
        console.log(error);
      });
    },
    [getRiskLevel]
  );
  useEffect(() => {
    getAccountDetails();
    getEquityPerandIncomePer();
  }, [getAccountDetails, getEquityPerandIncomePer]);

  // Below code will remove in future version
  // const sumObjectProperties = (data, obje) => {
  //   if (typeof obje === "undefined") return null;
  //   if (typeof data !== "object" || data.length < 0) return null;
  //   let result = data
  //     .map((item) => item[obje])
  //     .reduce((a, c) => {
  //       return a + c;
  //     });
  //   return isPositive(result);
  // };

  
  // const getAmount = useCallback(
  //   (data, obje) => {
  //     if (accountDetails !== null) {
  //       if (accountDetails.equity.equityPositions.length === 0) return 0;
  //       if (sumObjectProperties(data, obje) === null) return 0;
  //       if (sumObjectProperties(data, obje).negative === true) {
  //         return (
  //           <Fragment>
  //             - {sumObjectProperties(data, obje).number.toFixed(2)}
  //           </Fragment>
  //         );
  //       } else {
  //         return (
  //           <Fragment>
  //             {sumObjectProperties(data, obje).number.toFixed(2)}
  //           </Fragment>
  //         );
  //       }
  //     }
  //     return 0;
  //   },
  //   [accountDetails]
  // );
  // const investedAmount = useMemo(() => {
  //   if (
  //     typeof depositWithdraw !== "undefined" &&
  //     depositWithdraw !== null &&
  //     updateOct2 !== null &&
  //     CCFTCFASum !== null
  //   ) {
  //     if (depositWithdraw.deposits > depositWithdraw.withdrawals) {
  //       return (
  //         depositWithdraw.deposits - depositWithdraw.withdrawals + CCFTCFASum
  //       );
  //     } else if (depositWithdraw.deposits < depositWithdraw.withdrawals) {
  //       return updateOct2.accountBalance + CCFTCFASum || 0;
  //     }
  //   }
  //   return null;
  // }, [depositWithdraw, updateOct2, CCFTCFASum]);

  // Note: Below code will be removed in future version
  // const portfolioReturnTotal = useMemo(() => {
  //   if (accountDetails !== null && investedAmount !== null) {
  //     if (accountDetails.equity.equityPositions.length === 0) return 0;
  //     let portfolioValue =
  //       accountDetails.equity.equityValue + accountDetails.cash.cashBalance;
  //     const earning = portfolioValue - investedAmount;
  //     let portFolioReturn = (earning / investedAmount) * 100;
  //     return portFolioReturn.toFixed(2);
  //   } else {
  //     return null;
  //   }
  // }, [investedAmount, accountDetails]);
  // const portfolioReturnDaily = useMemo(() => {
  //   if (accountDetails !== null && investedAmount !== null) {
  //     if (accountDetails.equity.equityPositions.length === 0) return 0;
  //     let earning =
  //       sumObjectProperties(
  //         accountDetails.equity.equityPositions,
  //         "unrealizedDayPL"
  //       ).negative === true
  //         ? -sumObjectProperties(
  //             accountDetails.equity.equityPositions,
  //             "unrealizedDayPL"
  //           ).number.toFixed(2)
  //         : sumObjectProperties(
  //             accountDetails.equity.equityPositions,
  //             "unrealizedDayPL"
  //           ).number.toFixed(2);
  //     let portFolioReturn = (earning / investedAmount) * 100;
  //     return portFolioReturn.toFixed(2);
  //   }
  //   return null;
  // }, [investedAmount, accountDetails]);
 
 
  const getAllParamsRequest = () => {
    return getAllParams(props.location.search);
  };
  const ETFTables = () => {
    if (accountDetails !== null) {
      if (
        typeof accountDetails.equity.equityPositions !== "undefined" &&
        Object.keys(accountDetails.equity.equityPositions).length > 0
      ) {
        const MapTr = accountDetails.equity.equityPositions.map(
          (item, index) => (
            <tr key={index}>
              <th scope="row">
                <button className="btn btn-primary">{item.symbol}</button>
              </th>
              <td>{item.openQty.toFixed(2)}</td>
              <td>{item.valuePercentage}</td>
              <td>
                {Math.sign(item.unrealizedDayPL) === 1 ? (
                  <span className="text-success">
                    {item.unrealizedDayPLPercent}
                  </span>
                ) : (
                  <span className="text-danger">
                    {item.unrealizedDayPLPercent}
                  </span>
                )}{" "}
              </td>
              <td>{item.marketValue}</td>
            </tr>
          )
        );
        return MapTr;
      }
      return null;
    }
    return null;
  };
  const activityTabClickHandler = (tab) => {
    if (
      Object.entries(activitiesHistory).length > 0 &&
      activitiesHistory !== null
    ) {
      const tabData = getActivityTabData(activitiesHistory, tab);
      setTabsActivitiesHistory(tabData);
    }
  };
  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);
  const activityTabClickHandlerHTMl = useCallback(() => {
    return (
      <Fragment>
        {tabsActivitiesHistory !== null &&
        Object.entries(tabsActivitiesHistory).length > 0 ? (
          <div
            className="tab-pane fade show active"
            id={activitiestTab}
            role="tabpanel"
            aria-labelledby={activitiestTab}
          >
            <div className="item__card-item">
              <div className="item__card-info">
                <div className="ETFs__table__container tableFixHead">
                  <table className="noborder table-borderless table ">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Transaction amount</th>
                        <th scope="col">Account Balance</th>
                        <th scope="col">Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tabsActivitiesHistory.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">
                            {Moment(item.tranWhen).format("LL")}
                          </th>
                          <td
                            className={
                              item.tranAmount < 0 ? "negative" : "positive"
                            }
                          >
                            {" "}
                            {formatter.format(item.tranAmount)}{" "}
                          </td>
                          <td
                            className={
                              item.accountBalance < 0 ? "negative" : "positive"
                            }
                          >
                            {formatter.format(item.accountBalance)}
                          </td>
                          <td>
                            <span className=""> {item.comment}</span>{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Fragment>
            <div className="noDataContainer text-center">
              {" "}
              <div className="get__to__middle">No data available</div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }, [activitiestTab, tabsActivitiesHistory]);
  const getClientActivitiesHistory = useCallback(() => {
    Service.get(
      `/api/v1/getAccountFinActivity/${id}/${activitiesHistoryMonths}`,
      {},
      (response) => {
        let data = response.data.data.reverse();
        if (CCFTCFASum === null) {
          const calculate = CCF__TC__FA__Sum(data);
          setCCFTCFASum(calculate);
        }
        if (updateOct2 === null) {
          setUpdateOct2(
            getActivityTabData(data, "deposits_and_withdrawals")[0]
          );
        }
        setActivitiesHistory(data);
        const tabData = getActivityTabData(data, activitiestTab);
        setTabsActivitiesHistory(tabData);
      }
    ).catch((error) => {
      console.log(error);
    });
    Service.get(
      `/api/v1/getAccountIActivity/${id}/${activitiesHistoryMonths}`,
      {},
      (response) => {
        let data = response.data.data.reverse();
        setUserActivities(data);
      }
    ).catch((error) => {
      console.log(error);
    });
  }, [id, activitiesHistoryMonths, activitiestTab, updateOct2, CCFTCFASum]);
  useEffect(() => {
    getClientActivitiesHistory();
  }, [getClientActivitiesHistory]);
  const activitiestMonthChangeRequest = useCallback((e) => {
    setActivitiesHistoryMonths(e.target.value);
  }, []);
  return (
    <Fragment>
      <Headerserver />
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          {}
          <div className="container-fluid-d">
            <WelcomeUser details={details} text="Account Deails">
              {}
            </WelcomeUser>
            <div className="page__section">
              <div className="page__section-item">
                <div className="col nopadding">
                  <div className="row">
                    <div className="col-md-6 text-left">
                      <div className="padding__tb">
                        <h4 className="d-inline">
                          <span className="font-weight-bold">
                            {findGetParamater(
                              "account_name",
                              props.location.search
                            )}
                            &nbsp;
                            {findGetParamater(
                              "lastName",
                              props.location.search
                            )}
                          </span>
                          <span className="color__grey">/ </span>
                          <span className="ml__custom_10 badge badge-primary">
                            Basic
                          </span>
                        </h4>
                      </div>
                      <h5 className="">
                        {" "}
                        Account Number:{" "}
                        {accountDetails !== null && accountDetails.accountNo}
                      </h5>
                      <div className="">
                        <span className="color-gray">
                          {findGetParamater("email", props.location.search)} /{" "}
                          <span className="text-gray">
                            {" "}
                            {findGetParamater("phone", props.location.search)}
                          </span>
                        </span>
                      </div>
                      <div className="deposite___widraw">
                        <div className="col-md-4 inline float-left">
                          <div className="deposite__warper">
                            <div className="deposit__container">
                              <div className="deposit">Deposit</div>
                              <div className="amount">
                                {depositWithdraw !== null &&
                                  formatter.format(depositWithdraw.deposits)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 inline float-left">
                          <div className="deposite__warper">
                            <div className="deposit__container">
                              <div className="deposit ">Withdraw</div>
                              <div className="amount">
                                {depositWithdraw !== null &&
                                  formatter.format(depositWithdraw.withdrawals)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 text-right">
                      <h4 className="d-inlin br-5">
                        <span className="badge badge-success">
                          {" "}
                          {findGetParamater("status", props.location.search)}
                        </span>
                      </h4>
                      <div className="last-activities">
                        <span className="color-gray ">Last Activity:</span>{" "}
                        {accountDetails !== null &&
                          moment(accountDetails.lastUpdated).format(
                            "YYYY-MM-DD"
                          )}
                      </div>
                      <a
                        href={`#/details/${
                          getAllParamsRequest() !== null
                            ? getAllParamsRequest().regulation
                            : null
                        }/${
                          getAllParamsRequest() !== null
                            ? getAllParamsRequest().email
                            : null
                        }/${
                          getAllParamsRequest() !== null
                            ? getAllParamsRequest().risk_factor
                            : null
                        }?from_account_details_page=1`}
                        className="btn btn-primary float-bottom"
                      >
                        Risk Assesment
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {accountDetails !== null ? (
              <Fragment>
                {" "}
                <div className="item__card-container_3x">
                  <div className="item__card-item">
                    <div className="item__card-info">
                      <div className="nopadding col-md-12 inline float-left">
                        <h5>PORTFOLIO VALUE($)</h5>
                      </div>
                    </div>
                    <div className="after__portfoli__value">
                      <div className="item__card-title brder-block nopadding col-md-4 inline float-left text-left">
                        {" "}
                        {typeof depositWithdraw !== "undefined" &&
                          depositWithdraw !== null &&
                          depositWithdraw.portfolioValue}
                        {}
                      </div>
                      <div className=" col-md-8 inline float-left text-left">
                        <div className="equity__value">
                          Equity Value:{" "}
                          <span className="text-bold">
                            {" "}
                            {accountDetails !== null &&
                              accountDetails.equity.equityValue}
                          </span>
                        </div>
                        <div className="cash__value">
                          Cash Value:{" "}
                          <span className="text-bold">
                            {" "}
                            {accountDetails !== null &&
                              accountDetails.cash.cashBalance}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item__card-item">
                    <div className="item__card-info">
                      <div className="nopadding col-md-12 inline float-left">
                        <h5>EARNING($)</h5>
                      </div>
                    </div>
                    <div className="after__portfoli__value">
                      <div className="item__card-title brder-block nopadding col-md-4 inline float-left text-left">
                        {}
                        {}
                        {typeof depositWithdraw !== "undefined" &&
                          depositWithdraw !== null &&
                          depositWithdraw.totalEarnings}
                        {}
                      </div>
                      <div className=" col-md-8 inline float-left text-left">
                        <div className="equity__value">
                          <span>
                            {" "}
                            Daily Earning:{" "}
                            {}
                            {typeof depositWithdraw !== "undefined" &&
                              depositWithdraw !== null &&
                              depositWithdraw.dailyEarning}
                          </span>
                        </div>
                        <div className="cash__value">
                          Total Earning:{" "}
                          <span className="text-bold">
                            {}
                            {typeof depositWithdraw !== "undefined" &&
                              depositWithdraw !== null &&
                              depositWithdraw.totalEarnings}
                            {}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item__card-item">
                    <div className="item__card-info">
                      <div className="nopadding col-md-12 inline float-left">
                        <h5>RETURN(%)</h5>
                      </div>
                    </div>
                    <div className="after__portfoli__value">
                      <div className="item__card-title brder-block nopadding col-md-4 inline float-left text-left">
                        {}
                        {typeof depositWithdraw !== "undefined" &&
                          depositWithdraw !== null &&
                          depositWithdraw.totalReturn.toFixed(2)}
                      </div>
                      <div className=" col-md-8 inline float-left text-left">
                        <div className="equity__value">
                          Daily Performance:{" "}
                          <span className="text-bold">
                            {}
                            {typeof depositWithdraw !== "undefined" &&
                              depositWithdraw !== null &&
                              depositWithdraw.dailyReturn.toFixed(2)}
                          </span>
                        </div>
                        <div className="cash__value">
                          Total Performance:{" "}
                          <span className="text-bold">
                            {}
                            {typeof depositWithdraw !== "undefined" &&
                              depositWithdraw !== null &&
                              depositWithdraw.totalReturn.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment></Fragment>
            )}
            <div className="activities___section ">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Portfolio
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Activity
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#user-activities"
                    role="tab"
                    aria-controls="user-activities"
                    aria-selected="false"
                  >
                    User Activity
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#performance"
                    role="tab"
                    aria-controls="user-activities"
                    aria-selected="false"
                  >
                    Performance
                  </a>
                </li>
              </ul>
              <div className="tab-content tab-content-first" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="item__card-container_1fr2fr">
                    <div className="item__card-item">
                      <div className="risk_portfolio_is_number">
                        <div className="risk_portfolio_is inline-block margin-auto">
                          <h5 className="rpi">Risk portfolio is </h5>
                          <h3 className="blanc">
                            {titleCase(
                              findGetParamater(
                                "risk_level",
                                props.location.search
                              )
                            )}
                          </h3>
                        </div>
                        <div className="risk_portfolio_is inline-block">
                          <h1 className="balanced_number">
                            {GetPortfolioNumber(
                              findGetParamater(
                                "risk_level",
                                props.location.search
                              )
                            )}
                          </h1>
                        </div>
                        {isRiskIncomLoaded !== true &&
                          equityAndFixedIncom !== null && (
                            <div className="col-md-12 nopadding">
                              <div className="euqity__income">
                                <div className="labels_ef">
                                  <div className="equity">Equity</div>
                                  {equityAndFixedIncom.Equity < 99.99 && (
                                    <div className="equity text-right">
                                      Fixed Income
                                    </div>
                                  )}
                                </div>
                                <div className="equity__and__persantage">
                                  <div
                                    className="equty_persantage"
                                    style={{
                                      width: `${equityAndFixedIncom.Equity}%`,
                                    }}
                                  >
                                    {equityAndFixedIncom.Equity === 50.01
                                      ? equityAndFixedIncom.Equity.toFixed()
                                      : equityAndFixedIncom.Equity || null}
                                    %
                                  </div>
                                  {equityAndFixedIncom.Equity < 99.99 && (
                                    <div
                                      className="fixed__income_persantage"
                                      style={{
                                        width: `${equityAndFixedIncom.Fixed_Income}%`,
                                      }}
                                    >
                                      {equityAndFixedIncom.Fixed_Income || null}{" "}
                                      %
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="we__adjust">
                                We adjust allocations inteligently to make sure
                                you’re always on track to your goals.
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="item__card-item">
                      <div className="item__card-info">
                        <div className="nopadding col-md-12 inline float-left text-black">
                          <h5>ETFs</h5>
                        </div>
                        <div className="table-responsive ETFs__table__container">
                          {ETFTables() !== null ? (
                            <table className="noborder table-borderless table ">
                              <thead>
                                <tr>
                                  <th scope="col">Symbols</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Allocation(%)</th>
                                  <th scope="col">Daily P&L(%)</th>
                                  <th scope="col">Market Value($)</th>
                                </tr>
                              </thead>
                              <tbody>{ETFTables()}</tbody>
                            </table>
                          ) : (
                            <Fragment>
                              <NoDataFound />
                            </Fragment>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="padding0-30px">
                    <div className="row nomargin">
                      <div className="col-md-4 mb-2 background-fff align-self-start cart__item__b">
                        <ul
                          className="nav nav-pills flex-column"
                          id="myTab"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#all_activities"
                              role="tab"
                              aria-controls="all_activities"
                              aria-selected="true"
                              onClick={() =>
                                activityTabClickHandler("all_activities")
                              }
                            >
                              All activities
                            </a>
                            <span
                              className="select__month"
                              onChange={activitiestMonthChangeRequest}
                              value={activitiesHistoryMonths}
                            >
                              <select className="form-control">
                                <option value="12">12 M</option>
                                <option value="6">6 M</option>
                                <option value="3">3 M</option>
                                <option value="1">1 M</option>
                              </select>
                            </span>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#trades"
                              role="tab"
                              aria-controls="trades"
                              aria-selected="false"
                              onClick={() => activityTabClickHandler("trades")}
                            >
                              Trades
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#deposits_and_withdrawals"
                              role="tab"
                              aria-controls="deposits_and_withdrawals"
                              aria-selected="false"
                              onClick={() =>
                                activityTabClickHandler(
                                  "deposits_and_withdrawals"
                                )
                              }
                            >
                              Deposits and withdrawals
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#dividends_and_interest"
                              role="tab"
                              aria-controls="dividends_and_interest"
                              aria-selected="false"
                              onClick={() =>
                                activityTabClickHandler(
                                  "dividends_and_interest"
                                )
                              }
                            >
                              Dividends & interest
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#other_activitiy"
                              role="tab"
                              aria-controls="other_activitiy"
                              aria-selected="false"
                              onClick={() =>
                                activityTabClickHandler("other_activitiy")
                              }
                            >
                              Other activity
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-8 activity">
                        <div className="tab-content" id="myTabContent">
                          {activityTabClickHandlerHTMl()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="user-activities"
                  role="tabpanel"
                  aria-labelledby="user-activities"
                >
                  <div className="col-md-12 activity">
                    {typeof userActivities === "object" &&
                    userActivities !== null &&
                    Object.entries(userActivities).length > 0 ? (
                      <div
                        className="tab-content extra-padding"
                        id="myTabContent"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="trades"
                          role="tabpanel"
                          aria-labelledby="trades"
                        >
                          <div className="item__card-item">
                            <div className="item__card-info">
                              <div className="ETFs__table__container tableFixHead">
                                <table className="noborder table-borderless table ">
                                  <thead>
                                    <tr>
                                      <th scope="col">Activity Type</th>
                                      <th scope="col"> Email</th>
                                      <th scope="col">Date & Time</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {userActivities.map((item, index) => (
                                      <tr key={index}>
                                        <th scope="row">{item.type}</th>
                                        <td> {item.email}</td>
                                        <td>{item.created_at}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="noDataContainer text-center">
                        {" "}
                        <div className="get__to__middle">No data available</div>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="performance"
                  role="tabpanel"
                  aria-labelledby="user-activities"
                >
                  {didMount && (
                    <CientPerformanceGraph
                      client_id={id}
                    ></CientPerformanceGraph>
                  )}
                  {}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
}
export default withRouter(App);
