const Moment = require("moment");
const MomentRange = require("moment-range");
const util = require("util");

const moment = MomentRange.extendMoment(Moment);

const data = [
  {
    _id: {
      $oid: "5dc3c0fb9fae807b357fa7ea",
    },
    updated_at: "2020-05-19 09:01:09",
    created_at: "2019-11-07 07:00:11",
    cash: {
      cashBalance: 1.84,
    },
    equity: {
      equityValue: 2.64,
    },
  },
  {
    _id: {
      $oid: "5dcd517b9fae80251063ff54",
    },
    updated_at: "2020-05-19 09:01:10",
    created_at: "2019-11-14 13:07:07",
    cash: {
      cashBalance: 1.33,
    },
    equity: {
      equityValue: 195.08,
    },
  },
  {
    _id: {
      $oid: "5dc416fb9fae8011005b7132",
    },
    updated_at: "2020-05-19 09:01:12",
    created_at: "2019-11-07 13:07:07",
    cash: {
      cashBalance: 226.72,
    },
    equity: {
      equityValue: 2410.22,
    },
  },
  {
    _id: {
      $oid: "5dc416fd9fae8011005b713a",
    },
    updated_at: "2020-05-19 09:01:14",
    created_at: "2019-11-07 13:07:09",
    cash: {
      cashBalance: 3.96,
    },
    equity: {
      equityValue: 95.25,
    },
  },
  {
    _id: {
      $oid: "5dc416ff9fae8011005b7146",
    },
    updated_at: "2020-05-19 10:00:15",
    created_at: "2019-11-07 13:07:11",
    cash: {
      cashBalance: 16.1,
    },
    equity: {
      equityValue: 516.57,
    },
  },
  {
    _id: {
      $oid: "5dc6ba0a9fae800f6e20c07f",
    },
    updated_at: "2020-05-19 10:00:16",
    created_at: "2019-11-09 13:07:22",
    cash: {
      cashBalance: 10.62,
    },
    equity: {
      equityValue: 514.48,
    },
  },
  {
    _id: {
      $oid: "5df630149fae80437d47cf03",
    },
    updated_at: "2020-05-19 09:01:27",
    created_at: "2019-12-15 13:07:32",
    cash: {
      cashBalance: 96.14,
    },
    equity: {
      equityValue: 5132.95,
    },
  },
  {
    _id: {
      $oid: "5e1ef24d9fae8022f37891da",
    },
    updated_at: "2020-05-19 09:01:28",
    created_at: "2020-01-15 11:06:53",
    cash: {
      cashBalance: 7.18,
    },
    equity: {
      equityValue: 101.45,
    },
  },
  {
    _id: {
      $oid: "5e58ac9336b9d663166ac3bc",
    },
    updated_at: "2020-05-19 09:01:29",
    created_at: "2020-02-28 06:00:51",
    cash: {
      cashBalance: 43.61,
    },
    equity: {
      equityValue: 3272.64,
    },
  },
  {
    _id: {
      $oid: "5e1a2e909fae80419034dc76",
    },
    updated_at: "2020-05-19 09:01:29",
    created_at: "2020-01-11 20:22:40",
    cash: {
      cashBalance: 55.81,
    },
    equity: {
      equityValue: 2983.4,
    },
  },
  {
    _id: {
      $oid: "5e1c68239fae806bf662902a",
    },
    updated_at: "2020-05-19 09:01:30",
    created_at: "2020-01-13 12:52:51",
    cash: {
      cashBalance: 13.9,
    },
    equity: {
      equityValue: 487.54,
    },
  },
  {
    _id: {
      $oid: "5e1d9f449fae8010d675ba40",
    },
    updated_at: "2020-05-19 10:00:22",
    created_at: "2020-01-14 11:00:20",
    cash: {
      cashBalance: 4.28,
    },
    equity: {
      equityValue: 40.63,
    },
  },
  {
    _id: {
      $oid: "5e9fddad36b9d64bda0bf533",
    },
    updated_at: "2020-05-19 09:01:34",
    created_at: "2020-04-22 06:01:17",
    cash: {
      cashBalance: 10.05,
    },
    equity: {
      equityValue: 197.19,
    },
  },
  {
    _id: {
      $oid: "5e29368c36b9d606f30338d6",
    },
    updated_at: "2020-05-19 09:01:37",
    created_at: "2020-01-23 06:00:44",
    cash: {
      cashBalance: 1,
    },
    equity: {
      equityValue: 0,
    },
  },
  {
    _id: {
      $oid: "5e5d57f136b9d67cb21fa230",
    },
    updated_at: "2020-05-19 09:01:43",
    created_at: "2020-03-02 19:01:05",
    cash: {
      cashBalance: 7.45,
    },
    equity: {
      equityValue: 94.14,
    },
  },
  {
    _id: {
      $oid: "5e9b4e9836b9d6373747bf70",
    },
    updated_at: "2020-05-19 10:00:05",
    created_at: "2020-04-18 19:01:44",
    cash: {
      cashBalance: 130.76,
    },
    equity: {
      equityValue: 4998.89,
    },
  },
  {
    _id: {
      $oid: "5e70054836b9d65e761eb978",
    },
    updated_at: "2020-05-19 10:00:12",
    created_at: "2020-03-16 23:01:28",
    cash: {
      cashBalance: 8.41,
    },
    equity: {
      equityValue: 139,
    },
  },
  {
    _id: {
      $oid: "5e71d55b36b9d66592348fde",
    },
    updated_at: "2020-05-19 09:02:06",
    created_at: "2020-03-18 08:01:31",
    cash: {
      cashBalance: 40.88,
    },
    equity: {
      equityValue: 1308.29,
    },
  },
  {
    _id: {
      $oid: "5e73f9d136b9d66b1449cc5c",
    },
    updated_at: "2020-05-19 09:02:09",
    created_at: "2020-03-19 23:01:37",
    cash: {
      cashBalance: 15.4,
    },
    equity: {
      equityValue: 336.01,
    },
  },
  {
    _id: {
      $oid: "5e810cba36b9d610221a56c6",
    },
    updated_at: "2020-05-19 09:02:15",
    created_at: "2020-03-29 21:01:46",
    cash: {
      cashBalance: 8.55,
    },
    equity: {
      equityValue: 285.02,
    },
  },
  {
    _id: {
      $oid: "5dc3c0fc9fae807b357fa7ee",
    },
    updated_at: "2020-05-19 09:01:11",
    created_at: "2019-11-07 07:00:12",
    cash: {
      cashBalance: 47,
    },
    equity: {
      equityValue: 1693.9,
    },
  },
  {
    _id: {
      $oid: "5eac0fc036b9d60e122f1d52",
    },
    updated_at: "2020-05-19 09:02:24",
    created_at: "2020-05-01 12:02:08",
    cash: {
      cashBalance: 261,
    },
    equity: {
      equityValue: 9956.43,
    },
  },
  {
    _id: {
      $oid: "5e974c1836b9d611092c1a95",
    },
    updated_at: "2020-05-19 10:00:07",
    created_at: "2020-04-15 18:02:00",
    cash: {
      cashBalance: 0,
    },
    equity: {
      equityValue: 0,
    },
  },
  {
    _id: {
      $oid: "5dc568899fae80453852ce5a",
    },
    updated_at: "2020-05-19 10:00:19",
    created_at: "2019-11-08 13:07:21",
    cash: {
      cashBalance: 39.26,
    },
    equity: {
      equityValue: 944.21,
    },
  },
  {
    _id: {
      $oid: "5eb1fe8936b9d60aeb366da4",
    },
    updated_at: "2020-05-19 10:00:29",
    created_at: "2020-05-06 00:02:17",
    cash: {
      cashBalance: 7.15,
    },
    equity: {
      equityValue: 550.87,
    },
  },
  {
    _id: {
      $oid: "5eb35e1f36b9d65e3b7b4366",
    },
    updated_at: "2020-05-19 10:00:26",
    created_at: "2020-05-07 01:02:23",
    cash: {
      cashBalance: 1.18,
    },
    equity: {
      equityValue: 91.35,
    },
  },
  {
    _id: {
      $oid: "5eb84fbc36b9d6176b189936",
    },
    updated_at: "2020-05-19 10:00:14",
    created_at: "2020-05-10 19:02:20",
    cash: {
      cashBalance: 1.2,
    },
    equity: {
      equityValue: 94.46,
    },
  },
  {
    _id: {
      $oid: "5eb922b536b9d6499b1e9e9c",
    },
    updated_at: "2020-05-19 09:02:38",
    created_at: "2020-05-11 10:02:29",
    cash: {
      cashBalance: 368.18,
    },
    equity: {
      equityValue: 619.16,
    },
  },
  {
    _id: {
      $oid: "5eba743b36b9d61f181fe79a",
    },
    updated_at: "2020-05-19 09:02:40",
    created_at: "2020-05-12 10:02:35",
    cash: {
      cashBalance: 1.81,
    },
    equity: {
      equityValue: 141.19,
    },
  },
];

function AUMGrqphData() {
  // Let calculate total
  let totalEquity = data.reduce(function (a, b) {
    return a + +b.equity.equityValue;
  }, 0);

  totalEquity = Math.round(totalEquity * 1e2) / 1e2;

  let totalCashValue = data.reduce(function (a, b) {
    return a + +b.cash.cashBalance;
  }, 0);

  totalCashValue = Math.round(totalCashValue * 1e2) / 1e2;

  let AUM = totalEquity + totalCashValue;
  AUM = Math.round(AUM * 1e2) / 1e2;
  const userSelectedPastMonth = 12;
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
  let values = 0;

  for (let i = 0; i < dateRange.length - 1; i++) {
    let sumOpp = data.filter(function (item) {
      // Here you have date access
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

    sumingOpp[dateRange[i]] = sumOpp;
  }

  let getAllMonthsSummed = [];
  // Now lets sum op the values
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

  const result = {
    data: getAllMonthsSummed,
    AUM: AUM,
    totalEquity: totalEquity,
    totalCashValue: totalCashValue,
  };

  return result;
}

// Here is your data

console.log(AUMGrqphData(data));
