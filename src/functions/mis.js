import React from "react";
import Moment from "moment";
import { getCode } from "country-list";
import { extendMoment } from "moment-range";
import _ from "underscore";
const moment = extendMoment(Moment);

export const roundDown = v => {
  if(typeof v === 'undefined' || v === null) return null;
  return Math.floor(v/100) * 100;
}
export const roundup = v => {
	if(typeof v === 'undefined' || v === null) return null;
    return Math.ceil(v/100) * 100;
}

export const getMinAndMax = (data) => {
  if (typeof data === "undefined" || data === null) return false;
  var maxFunction = data.map(function (item) {
    return item["equityValue"];
  });

  var getMaxValue = parseInt((Math.max(...maxFunction) * 1.1).toFixed());
  var getMinValue = parseInt((Math.min(...maxFunction) * 0.9).toFixed());

  return { max: getMaxValue, min: getMinValue };
};


export const CCF__TC__FA__Sum = (data) => {
  const filterThem = [
    "Charge Card Fee",
    "Tax certification (w8)",
    "Fee - ACH",
    "W8",
  ];
  const CTF = data.filter((item) => {
    if (filterThem.includes(item.comment)) {
      return item;
    }
  });
  if (CTF.length === 0) {
    return 0;
  }
  if (!isObject(CTF)) return null;
  const getAllAmountSummed = CTF.map((item) => {
    return item.accountAmount;
  });
  if (!isObject(getAllAmountSummed)) return null;
  const positive = getAllAmountSummed.filter((item) => item >= 0);
  const negative = getAllAmountSummed.filter((item) => item < 0);
  let ns;
  let ps;
  if (negative.length === 0) {
    ns = 0;
  } else {
    ns = negative.reduce((a, b) => a + b);
  }
  if (positive.length === 0) {
    ps = 0;
  } else {
    ps = positive.reduce((a, b) => a + b);
  }
  const product = ps + ns;
  return Math.round(100 * product) / 100;
};
export const DataFormater = (number) => {
  if (number > 1000000000) {
    return (number / 1000000000).toString() + "B";
  } else if (number > 1000000) {
    return (number / 1000000).toString() + "M";
  } else if (number > 1000) {
    return (number / 1000).toString() + "K";
  } else {
    return number.toString();
  }
};
export const formateDataTradegetAvgT = (data) => {
  let formatData = [];
  for (let [key, value] of Object.entries(data)) {
    formatData.push({ date: key, ...value });
  }
  return formatData.reverse();
};
export const putNegative = (data) => {
  if (!isObject) return null;
  const modified = data.map(function (item) {
    if (item.withdrawals > 0) {
      item.withdrawals = -Math.abs(item.withdrawals);
    }
    return item;
  });
  return modified;
};
export const isObject = (data) => {
  if (
    typeof data === "undefined" ||
    data === null ||
    typeof data !== "object"
  ) {
    if (Object.entries(data).length < 0) {
      return false;
    }
    return false;
  }
  return true;
};
export const ClientReportGraphs = (data, days, type) => {
  if (!isObject(data)) {
    return null;
  }
  if (days < 32) {
    let graphData = data.map(function (item) {
      return item;
    });
    return graphData;
  }
  var groupedByDateData = _.groupBy(data, function (date) {
    return date.date.substring(0, 7);
  });
  let GraphData = [];
  Object.entries(groupedByDateData).forEach((entry) => {
    let key = entry[0];
    if (type === "active") {
      GraphData.push({
        date: key,
        active: entry[1].reduce(function (a, b) {
          return a + b.active;
        }, 0),
      });
    } else if ((type = "approved")) {
      GraphData.push({
        date: key,
        approved: entry[1].reduce(function (a, b) {
          return a + b.approved;
        }, 0),
      });
    } else {
    }
  });
  return GraphData;
};
export const getTradeSymbolsPieChartData = (data) => {
  if (typeof data !== "object" && Object.entries(data).length > 0) {
    return false;
  }
  const { equityPositions, equityValue } = data;
  const getGraphData = equityPositions.map(function (item) {
    const rt = (item.marketValue / equityValue) * 100;
    return {
      name: item.symbol,
      marketValue: item.marketValue,
      value: Math.round(rt * 100) / 100,
      availableForTradingQty: item.availableForTradingQty,
    };
  });
  return getGraphData;
};
export const PerformanceGrapDataFormate = (data, days) => {
  if (days < 32) {
    let graphData = data.map(function (item) {
      return { dateStr: item.dateStr, equityValue: item.equityValue };
    });
    return graphData.reverse();
  }
  var groupedByDateData = _.groupBy(data, function (date) {
    return date.dateStr.substring(0, 7);
  });
  let GraphData = [];
  Object.entries(groupedByDateData).forEach((entry) => {
    for (var i = 0; i < entry[1].length; i++) {
      if (i === 0) {
      } else {
      }
      GraphData.push(entry[1][i]);
    }
  });

  return GraphData.reverse();
};
export const getStars = (point, gray_star, blue_star) => {
  let starts = [];
  let numberOfStars = 5;
  for (var i = 0; i < numberOfStars; i++) {
    starts.push(<img key={i} src={gray_star} title="" alt="" />);
  }
  if (typeof point === "undefined" || parseInt(point) === 0) {
    return starts;
  }
  if (point > 5) {
    point = 5;
  }
  if (point === 0) return starts;
  for (var j = 1; j <= starts.length; j++) {
    if (point === j) {
      for (let i = 0; i < point; ++i) {
        starts[i] = <img key={i} src={blue_star} title="" alt="" />;
      }
      break;
    }
  }
  return starts;
};
export const transformPieChartData = (data) => {
  if (typeof data === "undefined" || Object.entries(data).length < 1)
    return null;
  let result = [];
  Object.entries(data).forEach(function (item) {
    const key = item[0];
    const value = item[1];
    const eachData = { name: key, value: value };
    result.push(eachData);
  });
  return result;
};
const activitiesAndFinCode = {
  trades: ["SPUR", "SSAL"],
  deposits_and_withdrawals: ["CSR", "CSD", "JNLC"],
  dividends_and_interest: ["DIV", "INT"],
};
export const getActivityTabData = (data, tab) => {
  if (Object.entries(data).length === 0 && typeof data !== "object")
    return null;
  let filterData = data.filter(function (item) {
    if (tab === "all_activities") {
      return tab;
    } else if (tab === "other_activitiy") {
      const filterDataByFicTechId = Object.values(activitiesAndFinCode);
      const flatIds = filterDataByFicTechId.flat();
      return flatIds.indexOf(item.finTranTypeID) === -1;
    } else {
      const filterDataByFicTechId = activitiesAndFinCode[tab];
      if (filterDataByFicTechId.indexOf(item.finTranTypeID) !== -1) {
        return item;
      }
    }
    return null;
  });
  return filterData;
};
export const getCountryNameToCountryTwoCode = (countries) => {
  if (Object.entries(countries).length > 1 && countries.constructor !== Object)
    return null;
  let neVar = {};
  for (let [key, value] of Object.entries(countries)) {
    if (key.toLowerCase() === "united states") {
      key = "United States of America";
    }
    if (key.toLowerCase() === "united kingdom") {
      key = "United Kingdom of Great Britain and Northern Ireland";
    }
    key = getCode(key);
    neVar[key] = value;
  }
  return neVar;
};
export const getAccomunativeObjectValues = (data) => {
  const keys = Object.keys(data[0]).slice(1);
  const modidy = data.map(function (content, index, array) {
    if (typeof array[index - 1] !== "undefined") {
      keys.forEach(function (item) {
        content[item] = Math.round(
          array[index][item] + (array[index - 1][item] * 1e2) / 1e2
        );
      });
      return content;
    } else {
      return content;
    }
  });
  return modidy;
};
export const AUMBarColors = {
  cash_balance: "#82ca9d",
  equity_value: "#82BFFF",
};
export const risk_levels = [
  "low_risk",
  "very_conservative",
  "conservative",
  "balanced",
  "semi_aggressive",
  "aggressive",
  "very_aggressive",
];
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export const riskLevelColor = {
  low_risk: "#037CFD",
  very_conservative: "#2C69D5",
  conservative: "#5256AE",
  balanced: "#74458C",
  semi_aggressive: "#9E3062",
  aggressive: "#C61D3A",
  very_aggressive: "#FE0101",
};
export const AUMGrqphData = (data, userSelectedPastMonth = 12) => {
  const end = Moment(new Date())
    .subtract(userSelectedPastMonth, "months")
    .format("YYYY-MM-DD");
  const start = new Date();
  const range = moment.range(moment(end), moment(start));
  const different = Array.from(range.by("months"));
  let dateRange = [];
  different.forEach(function (element) {
    dateRange.push(Moment(element).format("YYYY-MM-DD"));
  });
  let sumingOpp = [];
  for (let i = 0; i < dateRange.length - 1; i++) {
    let sumOpp = data.filter(function (item) {
      if (
        Moment(item.created_at).format("YYYY-MM-DD") >=
          Moment(item.created_at).format(dateRange[i]) &&
        Moment(item.created_at).format("YYYY-MM-DD") <=
          Moment(item.created_at).format(dateRange[i + 1])
      ) {
        return item;
      } else {
        return null;
      }
    }, 0);
    sumingOpp[dateRange[i + 1]] = sumOpp;
  }
  let getAllMonthsSummed = [];
  for (var i in sumingOpp) {
    let equitySum = 0;
    let cashValueSum = 0;
    let allObj = [];
    equitySum = sumingOpp[i].reduce(function (prev, cur) {
      return prev + +cur.equity.equityValue;
    }, 0);
    cashValueSum = sumingOpp[i].reduce(function (prev, cur) {
      return prev + +cur.cash.cashBalance;
    }, 0);
    allObj = {
      name: i,
      cash_balance: Math.round(cashValueSum * 1e2) / 1e2,
      equity_value: Math.round(equitySum * 1e2) / 1e2,
    };
    getAllMonthsSummed.push(allObj);
  }
  let totalEquity = getAllMonthsSummed.reduce(function (a, b) {
    return a + +b.equity_value;
  }, 0);
  totalEquity = Math.round(totalEquity);
  let totalCashValue = getAllMonthsSummed.reduce(function (a, b) {
    return a + +b.cash_balance;
  }, 0);
  totalCashValue = Math.round(totalCashValue);
  let AUM = totalEquity + totalCashValue;
  AUM = Math.round(AUM);
  const result = {
    data: getAllMonthsSummed,
    AUM: AUM,
    totalEquity: totalEquity,
    totalCashValue: totalCashValue,
  };
  return result;
};
export const getAgainGraphData = (result, pointInterval) => {
  const b = [];
  const dataLength = result[0].data.length;
  for (let i = 0; i < dataLength; i++) {
    let TR = {};
    TR.name = pointInterval[i + 1];
    for (let [key, value] of Object.entries(result)) {
      TR[value.name] = result[key].data[i];
    }
    b.push(TR);
  }
  return b;
};
export const getDataForGraphDyna = (data, risk_levels, filterMonths) => {
  let riskLevelColor = {
    low_risk: "#037CFD",
    very_conservative: "#2C69D5",
    conservative: "#5256AE",
    balanced: "#74458C",
    semi_aggressive: "#9E3062",
    aggressive: "#E1F4DA",
    very_aggressive: "#F2D4CA",
  };
  if (
    typeof data === "undefined" ||
    typeof risk_levels === "undefined" ||
    typeof filterMonths === "undefined"
  ) {
    return null;
  }
  if (
    Object.keys(data).length < 0 ||
    risk_levels.length < 1 ||
    filterMonths < 1 ||
    filterMonths > 12
  ) {
    return null;
  }
  let series = [];
  filterMonths = filterMonths + 1;
  const startPoint = moment()
    .subtract(filterMonths, "months")
    .format("YYYY-MM-DD");
  const start = new Date(),
    end = startPoint;
  const range = moment.range(moment(end), moment(start));
  const different = Array.from(range.by("months"));
  let dateRange = [];
  different.forEach(function (element) {
    dateRange.push(Moment(element).format("YYYY-MM-DD"));
  });
  for (var j = 0; j < risk_levels.length; j++) {
    const risk_name = risk_levels[j];
    const risk_data = data.filter(function (item) {
      return item.risk_level === risk_name ? 1 : 0;
    });
    let sumingOpp = [];
    for (let i = 0; i < dateRange.length - 1; i++) {
      let sumOpp = risk_data.filter(function (item) {
        if (
          Moment(item.created_at).format("YYYY-MM-DD") >=
            Moment(item.created_at).format(dateRange[i]) &&
          Moment(item.created_at).format("YYYY-MM-DD") <=
            Moment(item.created_at).format(dateRange[i + 1])
        ) {
          return item;
        } else {
          return null;
        }
      }, 0);
      sumingOpp[dateRange[i + 1]] = sumOpp;
    }
    let getAllMonthsSummed = [];
    for (var i in sumingOpp) {
      let sumOpp;
      sumOpp = sumingOpp[i].reduce(function (prev, cur) {
        return prev + +cur.value.toFixed(2);
      }, 0);
      getAllMonthsSummed[i] = Math.round(sumOpp * 1e2) / 1e2;
    }
    let graphObj = {
      name: risk_levels[j],
      data: Object.values(getAllMonthsSummed),
      color: riskLevelColor[risk_levels[j]],
    };
    series.push(graphObj);
  }
  let newResult = { result: series, pointInterval: dateRange };
  return newResult;
};
export const getLastMonth = (dateLessThen) => {
  if (typeof dateLessThen !== "number")
    return { error: true, message: "Months must be between 0 -12" };
  if (dateLessThen < 0 || dateLessThen > 12)
    return { error: true, message: "Months must be between 0 -12" };
  let makeDate = new Date();
  makeDate = new Date(makeDate.setMonth(makeDate.getMonth() - dateLessThen));
  const lessthen = Moment(makeDate).format("YYYY-MM-DD");
  return lessthen;
};
export const filterDataByLastCurrentMonths = (data, dateLessThen) => {
  if (typeof dateLessThen !== "number")
    return { error: true, message: "Months must be between 0 -12" };
  if (dateLessThen < 0 || dateLessThen > 12)
    return { error: true, message: "Months must be between 0 -12" };
  if (typeof data !== "object")
    return {
      error: true,
      message: `First argument must be object is ${typeof data}`,
    };
  if (data.length < 0) return false;
  const getMonths = getLastMonth(dateLessThen);
  const filtered = data.filter(function (item) {
    return item.created_at >= getMonths;
  });
  return filtered;
};
export const DataSumOfRiskLevel = (data, dateLessThen, risk_level) => {
  let getFilteredData = filterDataByLastCurrentMonths(data, dateLessThen);
  let filterByRiskLevel = getFilteredData.filter(function (item) {
    return item.risk_level === risk_level;
  });
  let sumOpp = filterByRiskLevel.reduce(function (prev, cur) {
    return prev + +cur.value;
  }, 0);
  return sumOpp;
};
export const getRiskLevelSumWithTimeRange = (
  data,
  dateLessThen,
  risk_level
) => {
  let risk_levels = [
    "low_risk",
    "very_conservative",
    "conservative",
    "balanced",
    "semi_aggressive",
    "aggressive",
    "very_aggressive",
  ];
  if (
    typeof risk_level !== "undefined" &&
    risk_levels.indexOf(risk_level) !== -1
  ) {
    let singleObj = {};
    singleObj[risk_level] = Math.round(
      (DataSumOfRiskLevel(data, dateLessThen, risk_level) * 1e2) / 1e2
    );
    return [singleObj];
  }
  let riskLength = risk_levels.length;
  let obj = {};
  for (var i = 0; i < riskLength; i++) {
    obj[risk_levels[i]] = Math.round(
      (DataSumOfRiskLevel(data, dateLessThen, risk_levels[i]) * 1e2) / 1e2
    );
  }
  return [obj];
};
export const getAllParams = (str) => {
  if (str === "" || typeof str === "undefined") return null;
  let tmp = [];
  str = str.replace(/\?/g, "");
  let expolodeStr = str.split("&");
  let Obj = {};
  expolodeStr.forEach(function (item) {
    tmp = item.split("=");
    Obj[tmp[0]] = tmp[1];
  });
  return Obj;
};
export const isPositive = (num) => {
  if (typeof num === "undefined" || num === "") return null;
  return Math.sign(num) === 1
    ? { negative: false, number: num }
    : { negative: true, number: Math.abs(num) };
};
export const GetPortfolioNumber = (findme) => {
  if (typeof findme !== "string" || findme === null) return null;
  const portfolios = [
    "low_risk",
    "very_conservative",
    "conservative",
    "balanced",
    "semi_aggressive",
    "aggressive",
    "very_aggressive",
  ];
  const isLargeNumber = (element) => element === findme;
  const indexFound = portfolios.findIndex(isLargeNumber);
  return indexFound !== -1 ? indexFound + 1 : indexFound;
};
export const findGetParamater = (parameterName, str) => {
  let result = null;
  let tmp = [];
  str = str.replace(/\?/g, "");
  let expolodeStr = str.split("&");
  expolodeStr.forEach(function (item) {
    tmp = item.split("=");
    if (tmp[0] === parameterName) return (result = decodeURIComponent(tmp[1]));
  });
  return result;
};
export const splitFirstNameAndLastName = (string) => {
  if (typeof string === "undefined" || string === "" || string === null)
    return false;
  const split = string.split(" ");
  const firstname = split[0];
  const lastname = split.slice(1).join(" ");
  return { firstName: firstname, lastName: lastname };
};
export const capitalizeFirstletter = (string) => {
  if (string === null || typeof string === "undefined") return null;
  string = string.replace(/_/g, " ");
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const titleCase = (str) => {
  if (str === null || typeof str === "undefined") return null;
  str = str.replace(/_/g, " ");
  let splitString = str.toLowerCase().split(" ");
  for (let i = 0; i < splitString.length; i++) {
    splitString[i] =
      splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1);
  }
  return splitString.join(" ");
};
const totalRisk = (r1, r2) => {
  const validateRiskFactors = ["low", "medium", "high"];
  if (
    validateRiskFactors.indexOf(r1) === -1 ||
    validateRiskFactors.indexOf(r2) === -1
  )
    return false;
  var ret = null;
  switch (r1) {
    case "low":
      ret = r2 === "high" ? "medium" : "low";
      break;
    case "medium":
      ret = r2;
      break;
    case "high":
      ret = r2 === "low" ? "medium" : "high";
      break;
    default:
      break;
  }
  return ret;
};
export const calculateManyRiskFactor = (...arg) => {
  if (Object.values(arg).length < 1) return false;
  const argValues = Object.values(arg[0]);
  let lastone = argValues;
  let firstCompute = totalRisk(...argValues.splice(0, 2));
  let secoundCompute = totalRisk(...argValues.splice(0, 2));
  let thirdCompute = totalRisk(firstCompute, secoundCompute);
  return totalRisk(thirdCompute, ...lastone);
};
export const countObjectProperties = (data, properties, propertiesValue) => {
  if (typeof data === "undefined" || Object.keys(data).length < 1) return false;
  const countProps = Object.keys(
    data.filter((item) => {
      return item[properties] === propertiesValue ? item : null;
    })
  ).length;
  return countProps;
};
