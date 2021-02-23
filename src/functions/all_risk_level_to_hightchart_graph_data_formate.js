const Moment = require("moment");
const MomentRange = require("moment-range");
const util = require("util");

const moment = MomentRange.extendMoment(Moment);
const data = [
  {
    email: "mail.omermustafa@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "46f1e2ed-6bbe-4431-a488-c34cec57f309.1588812841333",
    value: 90.49000000000001,
    returnValue: -1.02,
    returnRatio: 0,
    created_at: "2020-05-07 01:02:23",
    updated_at: "2020-05-13 08:00:24",
    firstName: "Omer",
    lastName: "Mustafa",
    country: "ARE",
    phone: "0503820642",
  },
  {
    email: "cn_s98@protonmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "48f91beb-72a8-4212-a9b0-55685eebd7a2.1588720790283",
    value: 545.72,
    returnValue: -6.14,
    returnRatio: 0,
    created_at: "2020-05-06 00:02:17",
    updated_at: "2020-05-13 08:00:26",
    firstName: "ABDULLA SALEM RASHED AHMED",
    lastName: "AL MENHALI",
    country: "ARE",
    phone: "0569009177",
  },
  {
    email: "elodie_morvan01@yahoo.fr",
    addressCountry: "United Arab Emirates",
    risk_level: "semi_aggressive",
    drivewealth_account_id:
      "fa232ece-f4b9-4337-9e68-a7db175bcfeb.1588331911980",
    value: 10048.55,
    returnValue: 78.55,
    returnRatio: 0.8,
    created_at: "2020-05-01 12:02:08",
    updated_at: "2020-05-13 07:02:22",
    firstName: "elodie",
    lastName: "morvan",
    country: "ARE",
    phone: "502781773",
  },
  {
    email: "jrblack99golf@gmail.com",
    addressCountry: "United States",
    risk_level: "aggressive",
    drivewealth_account_id:
      "0564a02d-f023-4b0c-8951-05dc0506aeb8.1586971991920",
    value: 0,
    returnValue: 0,
    returnRatio: 0,
    created_at: "2020-04-15 18:02:00",
    updated_at: "2020-05-13 08:00:05",
    firstName: "Jacob",
    lastName: "Black",
    country: "USA",
    phone: "4197893938",
  },
  {
    email: "clintonnguyen357@gmail.com",
    addressCountry: "United States",
    risk_level: "very_aggressive",
    drivewealth_account_id:
      "a990bb5a-1457-4a1b-b5e6-b236a6bbe8b5.1585513676151",
    value: 285.81,
    returnValue: 19.76,
    returnRatio: 7.13,
    created_at: "2020-03-29 21:01:46",
    updated_at: "2020-05-13 07:02:12",
    firstName: "Clinton",
    lastName: "Nguyen",
    phone: "6692647442",
    country: "USA",
  },
  {
    email: "madmax4836@gmail.com",
    addressCountry: "Saudi Arabia",
    risk_level: "semi_aggressive",
    drivewealth_account_id:
      "a3b21489-a6e3-45a8-a116-023a2889c957.1584656028845",
    value: 345.65999999999997,
    returnValue: 14.03,
    returnRatio: 4.25,
    created_at: "2020-03-19 23:01:37",
    updated_at: "2020-05-13 07:02:07",
    firstName: "Mohammed",
    lastName: "Kutbi",
    country: "SAU",
    phone: "565506106",
  },
  {
    email: "ayyubp@yahoo.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "e3972a3e-0924-405a-8f2f-f58535d47c73.1584515986050",
    value: 1318.9399999999998,
    returnValue: 69.08,
    returnRatio: 5.4,
    created_at: "2020-03-18 08:01:31",
    updated_at: "2020-05-13 07:02:04",
    firstName: "Ayyub",
    lastName: "Logde",
    country: "ARE",
    phone: "0507994061",
  },
  {
    email: "Syedsaadbinasad@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "20fb1b51-7c10-48f4-aee7-439a02776758.1584396961134",
    value: 144.21,
    returnValue: 21.03,
    returnRatio: 15.48,
    created_at: "2020-03-16 23:01:28",
    updated_at: "2020-05-13 08:00:12",
    firstName: "Saad",
    lastName: "Asad",
    country: "ARE",
    phone: "0561727577",
  },
  {
    email: "Oraib.kazimi@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "1a3317d1-02d2-428b-911c-b2239f93485f.1587233037848",
    value: 5015.1900000000005,
    returnValue: 192.47,
    returnRatio: 3.94,
    created_at: "2020-04-18 19:01:44",
    updated_at: "2020-05-13 08:00:09",
    firstName: "Oraib",
    lastName: "Kazimi",
    country: "ARE",
    phone: "0526208619",
  },
  {
    email: "mhsmazrouei@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "very_aggressive",
    drivewealth_account_id:
      "8da24fa6-e999-47cc-95d7-793b287ea6e0.1583173360077",
    value: 99.01,
    returnValue: 11.17,
    returnRatio: 12.2,
    created_at: "2020-03-02 19:01:05",
    updated_at: "2020-05-13 07:01:40",
    firstName: "Mohamed",
    lastName: "Almazrouei",
    country: "ARE",
    phone: "0504421100",
  },
  {
    email: "ggzerardo9994@outlook.com",
    addressCountry: "United States",
    risk_level: "balanced",
    drivewealth_account_id:
      "9b945f10-65ab-4079-8cb9-d2909c2ecd05.1579758545637",
    value: 1,
    returnValue: 0,
    returnRatio: 0,
    created_at: "2020-01-23 06:00:44",
    updated_at: "2020-05-13 07:01:34",
    firstName: "Gerardo",
    lastName: "Gonzalez Caraballo",
    country: "USA",
    phone: "4409905670",
  },
  {
    email: "radandri@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "ddd6631d-701c-4c7e-aa53-e8747bb9aced.1587534437478",
    value: 202.72,
    returnValue: 7.67,
    returnRatio: 3.98,
    created_at: "2020-04-22 06:01:17",
    updated_at: "2020-05-13 07:01:32",
    firstName: "Andriy",
    lastName: "Radchenko",
    country: "ARE",
    phone: "562167314",
  },
  {
    email: "roshar89@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "34f5efe6-751c-4906-a561-242b6ec6bfe6.1578998324923",
    value: 43.94,
    returnValue: 3.59,
    returnRatio: 9.06,
    created_at: "2020-01-14 11:00:20",
    updated_at: "2020-05-13 08:00:15",
    firstName: "Rohit",
    lastName: "Sharma",
    country: "ARE",
    phone: "0502196521",
  },
  {
    email: "babani.deepesh@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "b1ca7505-61ee-4aea-8bc6-d04e4d57c738.1578917608647",
    value: 490.32,
    returnValue: 41.02,
    returnRatio: 8.61,
    created_at: "2020-01-13 12:52:51",
    updated_at: "2020-05-13 07:01:28",
    firstName: "Deepesh",
    lastName: "Babani",
    country: "ARE",
    phone: "501008350",
  },
  {
    email: "dr.m.alfadel@gmail.com",
    addressCountry: "Saudi Arabia",
    risk_level: "aggressive",
    drivewealth_account_id:
      "b5119553-dc37-4ff6-b2aa-da964e0c06da.1578774083828",
    value: 2971.34,
    returnValue: 250.02,
    returnRatio: 8.58,
    created_at: "2020-01-11 20:22:40",
    updated_at: "2020-05-13 07:01:27",
    firstName: "mohammad",
    lastName: "alkahtani",
    country: "ARE",
    phone: "522222540",
  },
  {
    email: "abjaar@yahoo.com",
    addressCountry: "United Arab Emirates",
    risk_level: "balanced",
    drivewealth_account_id:
      "c2e4abbc-12b0-40d4-8073-1762dac3c76d.1582869269563",
    value: 3268.6000000000004,
    returnValue: 263.75,
    returnRatio: 8.18,
    created_at: "2020-02-28 06:00:51",
    updated_at: "2020-05-13 07:01:26",
    firstName: "Alexandra",
    lastName: "Jaar",
    country: "ARE",
    phone: "508127263",
  },
  {
    email: "boneyv@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "bff48e0c-6966-49b2-a516-30da9b7b8f7c.1579021068330",
    value: 106.27000000000001,
    returnValue: 5.09,
    returnRatio: 5.14,
    created_at: "2020-01-15 11:06:53",
    updated_at: "2020-05-13 07:01:26",
    firstName: "Boney",
    lastName: "Varghese",
    country: "ARE",
    phone: "505450436",
  },
  {
    email: "rskralmehairi@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "b42e584e-f3c0-4c20-a228-ffcf2ef9d551.1576412686674",
    value: 5112.400000000001,
    returnValue: 446.36,
    returnRatio: 8.9,
    created_at: "2019-12-15 13:07:32",
    updated_at: "2020-05-13 07:01:25",
    firstName: "Rashed",
    lastName: "Almheiri",
    country: "ARE",
    phone: "0508111493",
  },
  {
    email: "s.ravinet@interco.ae",
    addressCountry: "United Arab Emirates",
    risk_level: "semi_aggressive",
    drivewealth_account_id:
      "189b2099-7f69-408d-b027-d22e08dbfc2a.1573240318860",
    value: 516.16,
    returnValue: 41.63,
    returnRatio: 8.23,
    created_at: "2019-11-09 13:07:22",
    updated_at: "2020-05-13 08:00:10",
    firstName: "sebastien",
    lastName: "ravinet",
    country: "ARE",
    phone: "0506406625",
  },
  {
    email: "mlhoran@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "349b4c87-65e9-45a5-81d0-8e76e9c65105.1573189180471",
    value: 962.06,
    returnValue: -11.04,
    returnRatio: 0,
    created_at: "2019-11-08 13:07:21",
    updated_at: "2020-05-13 08:00:18",
    firstName: "Mark",
    lastName: "Horan",
    country: "ARE",
    phone: "0504430341",
  },
  {
    email: "bashar.nassour1@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "very_aggressive",
    drivewealth_account_id:
      "8ff1f6b8-b407-4458-b71a-b9a812389285.1573653472492",
    value: 191.10000000000002,
    returnValue: 6.99,
    returnRatio: 3.69,
    created_at: "2019-11-14 13:07:07",
    updated_at: "2020-05-13 07:01:08",
    firstName: "Bashar",
    lastName: "Nassour",
    country: "ARE",
    phone: "505689050",
  },
  {
    email: "meera.majbour@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "2df25c5f-c5ee-48dd-9b31-f7be2ffe8c59.1573129679432",
    value: 520.85,
    returnValue: 52.99,
    returnRatio: 10.5,
    created_at: "2019-11-07 13:07:11",
    updated_at: "2020-05-13 08:00:16",
    firstName: "mira",
    lastName: "majbour",
    country: "ARE",
    phone: "561704774",
  },
  {
    email: "ahsan9999@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "balanced",
    drivewealth_account_id:
      "d8080e83-7f36-4201-9181-966e0458928b.1573112496458",
    value: 97.83999999999999,
    returnValue: 5.45,
    returnRatio: 5.81,
    created_at: "2019-11-07 13:07:09",
    updated_at: "2020-05-13 07:01:11",
    firstName: "Ahsan",
    lastName: "Mahmood",
    country: "ARE",
    phone: "508721077",
  },
  {
    email: "ynuseibeh@yahoo.com",
    addressCountry: "United States",
    risk_level: "very_aggressive",
    drivewealth_account_id:
      "8242b300-d392-4aea-a39e-9001471fddb0.1573110821511",
    value: 2571.5,
    returnValue: 197.96,
    returnRatio: 8.44,
    created_at: "2019-11-07 13:07:07",
    updated_at: "2020-05-13 07:01:10",
    firstName: "Yacoub",
    lastName: "Nuseibeh",
    phone: "3055177000",
    country: "USA",
  },
  {
    email: "bilalmajbour@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "68abc2b1-1db1-4c4e-8bf4-3f5b7c9ad6ba.1573109571801",
    value: 1702.65,
    returnValue: 29.65,
    returnRatio: 1.79,
    created_at: "2019-11-07 07:00:12",
    updated_at: "2020-05-13 07:01:08",
    firstName: "bilal",
    lastName: "majbour",
    country: "ARE",
    phone: "0509641641",
  },
  {
    email: "mokaid83@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "66bee4d6-46aa-4983-a46b-c9494ed60c22.1573108797940",
    value: 4.43,
    returnValue: -0.23,
    returnRatio: 0,
    created_at: "2019-11-07 07:00:11",
    updated_at: "2020-05-13 07:01:07",
    firstName: "Fouad",
    lastName: "Dbouk",
    country: "ARE",
    phone: "0502732286",
  },
];

let risk_levels = [
  "low_risk",
  "very_conservative",
  "conservative",
  "balanced",
  "semi_aggressive",
  "aggressive",
  "very_aggressive",
];

function getDataForGraph(data, risk_levels, filterMonths) {
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

    // Let only get aggressive
    const risk_data = data.filter(function (item) {
      return item.risk_level === risk_name ? 1 : 0;
    });

    let sumingOpp = [];
    for (let i = 0; i < dateRange.length - 1; i++) {
      //console.log(dateRange[i + 1], dateRange[i])
      let values = 0;
      let sumOpp = risk_data.filter(function (item) {
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

      // Here I have which months
      sumingOpp[dateRange[i]] = sumOpp;
    }

    //console.log(sumingOpp);

    let getAllMonthsSummed = [];

    // Now lets sum op the values
    for (var i in sumingOpp) {
      let sumOpp;
      // Now you can use reduce

      sumOpp = sumingOpp[i].reduce(function (prev, cur) {
        return prev + +cur.value.toFixed(2);
      }, 0);

      getAllMonthsSummed[i] = sumOpp.toFixed(2);
    }

    let graphObj = {
      name: risk_levels[j],
      data: Object.values(getAllMonthsSummed),
    };

    //console.log(getAllMonthsSummed)

    series.push(graphObj);
  }

  let newResult = { result: series, pointInterval: dateRange };

  return newResult;
}

console.log(
  util.inspect(getDataForGraph(data, ["very_aggressive"], 12), {
    showHidden: false,
    depth: null,
  })
);
///////////////////////////////////////////////
// Single Records
///////////////////////////////////////////////

/*const risk_name = 'very_aggressive';

different.forEach(function(element) {
        dateRange.push(Moment(element).format('YYYY-MM-DD'));
});

// Let only get aggressive 
const risk_data = data.filter(function(item) {

    return item.risk_level === risk_name ? 1 : 0;
})


let sumingOpp = [];
for (let i = 0; i < dateRange.length - 1; i++) {

    //console.log(dateRange[i + 1], dateRange[i])
    let values = 0;
    let sumOpp = risk_data.filter(function(item) {
        // Here you have date access
        if (Moment(item.created_at).format("YYYY-MM-DD") >= Moment(item.created_at).format(dateRange[i]) &&
            Moment(item.created_at).format("YYYY-MM-DD") <= Moment(item.created_at).format(dateRange[i + 1])) {
            return item;
        } else {
            return null;
        }

    }, 0);

    // Here I have which months 
    sumingOpp[dateRange[i]] = sumOpp;

}

let getAllMonthsSummed = [];

// Now lets sum op the values 
for (var i in sumingOpp) {
    // Now you can use reduce 

    let sumOpp = sumingOpp[i].reduce(function(prev, cur) {
        return prev + +cur.value.toFixed(2);
    }, 0);
    getAllMonthsSummed[i] = sumOpp;
}

const graphObj = {
    name: risk_name,
    data: Object.values(getAllMonthsSummed)
}

series.push(graphObj);

console.log(util.inspect(series, {
    showHidden: false,
    depth: null
}))*/

///////////////////////////////////////////////
// Single Records
///////////////////////////////////////////////

//var utcStart = Moment("2019-09-1", "YYYY-MM-DD").utc();

//
/*
let sumOpp = filterByRiskLevel.reduce(function (prev, cur) {
    return prev + +cur.value;
  }, 0);
*/
//console.log(utcStart)

/*
 name: 'Low Risk',
        data: [null, null, 1000, 2050, 3011]
    }

var makeDate = new Date();
makeDate = new Date(makeDate.setMonth(makeDate.getMonth() - 6));*/
// getLastMonth, filterDataByLastCurrentMonths, DataSumOfRiskLevel, getRiskLevelSumWithTimeRange
//console.log(Moment(makeDate).format('YYYY-MM-DD'))

/*
const startDate = Moment(picker.startDate._d).format('YYYY-MM-DD');
const endDate = Moment(picker.endDate._d).format('YYYY-MM-DD');

// Lets filter
const filtered = usersOriginal.data.rows.filter(function(item) {
    return item.created_at >= startDate && item.created_at <= endDate;
});
*/
//console.log(new Date(2019, 9, 1))
