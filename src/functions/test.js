const Moment = require("moment");

const data = [
  {
    email: "mokaid83@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "66bee4d6-46aa-4983-a46b-c9494ed60c22.1573108797940",
    value: 4.45,
    returnValue: -0.21,
    returnRatio: 0,
    firstName: "Fouad",
    lastName: "Dbouk",
    country: "ARE",
    phone: "0502732286",
    created_at: "2020-04-08",
  },
  {
    email: "bashar.nassour1@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "very_aggressive",
    drivewealth_account_id:
      "8ff1f6b8-b407-4458-b71a-b9a812389285.1573653472492",
    value: 193.59,
    returnValue: 9.48,
    returnRatio: 4.93,
    firstName: "Bashar",
    lastName: "Nassour",
    country: "ARE",
    phone: "505689050",
    created_at: "2020-04-22",
  },
  {
    email: "bilalmajbour@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "68abc2b1-1db1-4c4e-8bf4-3f5b7c9ad6ba.1573109571801",
    value: 1718.18,
    returnValue: 45.18,
    returnRatio: 2.7,
    firstName: "bilal",
    lastName: "majbour",
    country: "ARE",
    phone: "0509641641",
    created_at: "2020-04-15",
  },
  {
    email: "ynuseibeh@yahoo.com",
    addressCountry: "United States",
    risk_level: "very_aggressive",
    drivewealth_account_id:
      "8242b300-d392-4aea-a39e-9001471fddb0.1573110821511",
    value: 2601.31,
    returnValue: 227.77,
    returnRatio: 9.59,
    firstName: "Yacoub",
    lastName: "Nuseibeh",
    phone: "3055177000",
    country: "USA",
    created_at: "2020-05-10",
  },
  {
    email: "ahsan9999@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "balanced",
    drivewealth_account_id:
      "d8080e83-7f36-4201-9181-966e0458928b.1573112496458",
    value: 98.35,
    returnValue: 5.96,
    returnRatio: 6.32,
    firstName: "Ahsan",
    lastName: "Mahmood",
    country: "ARE",
    phone: "508721077",
    created_at: "2020-02-07",
  },
  {
    email: "meera.majbour@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "2df25c5f-c5ee-48dd-9b31-f7be2ffe8c59.1573129679432",
    value: 525.75,
    returnValue: 57.89,
    returnRatio: 11.36,
    firstName: "mira",
    lastName: "majbour",
    country: "ARE",
    phone: "561704774",
    created_at: "2020-01-22",
  },
  {
    email: "mlhoran@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "349b4c87-65e9-45a5-81d0-8e76e9c65105.1573189180471",
    value: 970.92,
    returnValue: -2.18,
    returnRatio: 0,
    firstName: "Mark",
    lastName: "Horan",
    country: "ARE",
    phone: "0504430341",
    created_at: "2020-05-09",
  },
  {
    email: "s.ravinet@interco.ae",
    addressCountry: "United Arab Emirates",
    risk_level: "semi_aggressive",
    drivewealth_account_id:
      "189b2099-7f69-408d-b027-d22e08dbfc2a.1573240318860",
    value: 519.75,
    returnValue: 45.22,
    returnRatio: 8.88,
    firstName: "sebastien",
    lastName: "ravinet",
    country: "ARE",
    phone: "0506406625",
    created_at: "2020-04-03",
  },
  {
    email: "rskralmehairi@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "b42e584e-f3c0-4c20-a228-ffcf2ef9d551.1576412686674",
    value: 5160.47,
    returnValue: 494.43,
    returnRatio: 9.76,
    firstName: "Rashed",
    lastName: "Almheiri",
    country: "ARE",
    phone: "0508111493",
    created_at: "2020-03-15",
  },
  {
    email: "boneyv@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "bff48e0c-6966-49b2-a516-30da9b7b8f7c.1579021068330",
    value: 107.25,
    returnValue: 6.07,
    returnRatio: 6.07,
    firstName: "Boney",
    lastName: "Varghese",
    country: "ARE",
    phone: "505450436",
    created_at: "2020-03-10",
  },
  {
    email: "abjaar@yahoo.com",
    addressCountry: "United Arab Emirates",
    risk_level: "balanced",
    drivewealth_account_id:
      "c2e4abbc-12b0-40d4-8073-1762dac3c76d.1582869269563",
    value: 3286.29,
    returnValue: 281.44,
    returnRatio: 8.68,
    firstName: "Alexandra",
    lastName: "Jaar",
    country: "ARE",
    phone: "508127263",
    created_at: "2020-03-04",
  },
  {
    email: "dr.m.alfadel@gmail.com",
    addressCountry: "Saudi Arabia",
    risk_level: "aggressive",
    drivewealth_account_id:
      "b5119553-dc37-4ff6-b2aa-da964e0c06da.1578774083828",
    value: 2999.29,
    returnValue: 277.97,
    returnRatio: 9.44,
    firstName: "mohammad",
    lastName: "alkahtani",
    country: "ARE",
    phone: "522222540",
    created_at: "2020-01-20",
  },
  {
    email: "babani.deepesh@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "b1ca7505-61ee-4aea-8bc6-d04e4d57c738.1578917608647",
    value: 494.9,
    returnValue: 45.6,
    returnRatio: 9.48,
    firstName: "Deepesh",
    lastName: "Babani",
    country: "ARE",
    phone: "501008350",
    created_at: "2020-01-18",
  },
  {
    email: "roshar89@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "34f5efe6-751c-4906-a561-242b6ec6bfe6.1578998324923",
    value: 44.32,
    returnValue: 3.97,
    returnRatio: 9.92,
    firstName: "Rohit",
    lastName: "Sharma",
    country: "ARE",
    phone: "0502196521",
    created_at: "2020-03-31",
  },
  {
    email: "radandri@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "ddd6631d-701c-4c7e-aa53-e8747bb9aced.1587534437478",
    value: 204.58,
    returnValue: 9.53,
    returnRatio: 4.9,
    firstName: "Andriy",
    lastName: "Radchenko",
    country: "ARE",
    phone: "562167314",
    created_at: "2020-01-27",
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
    firstName: "Gerardo",
    lastName: "Gonzalez Caraballo",
    country: "USA",
    phone: "4409905670",
    created_at: "2020-04-09",
  },
  {
    email: "mhsmazrouei@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "very_aggressive",
    drivewealth_account_id:
      "8da24fa6-e999-47cc-95d7-793b287ea6e0.1583173360077",
    value: 100.19,
    returnValue: 12.35,
    returnRatio: 13.32,
    firstName: "Mohamed",
    lastName: "Almazrouei",
    country: "ARE",
    phone: "0504421100",
    created_at: "2020-04-03",
  },
  {
    email: "Oraib.kazimi@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "1a3317d1-02d2-428b-911c-b2239f93485f.1587233037848",
    value: 5062.25,
    returnValue: 239.53,
    returnRatio: 4.86,
    firstName: "Oraib",
    lastName: "Kazimi",
    country: "ARE",
    phone: "0526208619",
    created_at: "2020-01-29",
  },
  {
    email: "Syedsaadbinasad@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "20fb1b51-7c10-48f4-aee7-439a02776758.1584396961134",
    value: 145.54,
    returnValue: 22.36,
    returnRatio: 16.3,
    firstName: "Saad",
    lastName: "Asad",
    country: "ARE",
    phone: "0561727577",
    created_at: "2020-05-04",
  },
  {
    email: "ayyubp@yahoo.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "e3972a3e-0924-405a-8f2f-f58535d47c73.1584515986050",
    value: 1331.4399999999998,
    returnValue: 81.58,
    returnRatio: 6.32,
    firstName: "Ayyub",
    lastName: "Logde",
    country: "ARE",
    phone: "0507994061",
    created_at: "2020-03-12",
  },
  {
    email: "madmax4836@gmail.com",
    addressCountry: "Saudi Arabia",
    risk_level: "semi_aggressive",
    drivewealth_account_id:
      "a3b21489-a6e3-45a8-a116-023a2889c957.1584656028845",
    value: 347.94,
    returnValue: 16.31,
    returnRatio: 4.91,
    firstName: "Mohammed",
    lastName: "Kutbi",
    country: "SAU",
    phone: "565506106",
    created_at: "2020-03-04",
  },
  {
    email: "clintonnguyen357@gmail.com",
    addressCountry: "United States",
    risk_level: "very_aggressive",
    drivewealth_account_id:
      "a990bb5a-1457-4a1b-b5e6-b236a6bbe8b5.1585513676151",
    value: 289.44,
    returnValue: 23.39,
    returnRatio: 8.33,
    firstName: "Clinton",
    lastName: "Nguyen",
    phone: "6692647442",
    country: "USA",
    created_at: "2020-02-02",
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
    firstName: "Jacob",
    lastName: "Black",
    country: "USA",
    phone: "4197893938",
    created_at: "2020-01-25",
  },
  {
    email: "elodie_morvan01@yahoo.fr",
    addressCountry: "United Arab Emirates",
    risk_level: "semi_aggressive",
    drivewealth_account_id:
      "fa232ece-f4b9-4337-9e68-a7db175bcfeb.1588331911980",
    value: 10114.17,
    returnValue: 144.17,
    returnRatio: 1.46,
    firstName: "elodie",
    lastName: "morvan",
    country: "ARE",
    phone: "502781773",
    created_at: "2020-01-19",
  },
  {
    email: "cn_s98@protonmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "48f91beb-72a8-4212-a9b0-55685eebd7a2.1588720790283",
    value: 550.62,
    returnValue: -1.24,
    returnRatio: 0,
    firstName: "ABDULLA SALEM RASHED AHMED",
    lastName: "AL MENHALI",
    country: "ARE",
    phone: "0569009177",
    created_at: "2020-03-17",
  },
  {
    email: "mail.omermustafa@gmail.com",
    addressCountry: "United Arab Emirates",
    risk_level: "aggressive",
    drivewealth_account_id:
      "46f1e2ed-6bbe-4431-a488-c34cec57f309.1588812841333",
    value: 91.30000000000001,
    returnValue: -0.21,
    returnRatio: 0,
    firstName: "Omer",
    lastName: "Mustafa",
    country: "ARE",
    phone: "0503820642",
    created_at: "2020-01-22",
  },
];

/*const addDate = data.filter(function (item) {

const startDate = Moment(picker.startDate._d).format('YYYY-MM-DD');
    let rd = new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).format('YYYY-MM-DD');
    let rdf = Moment(rd).formate('YYYY-MM-DD');
    item.created_at = rdf;

    return item;
})*/

function getLastMonth(dateLessThen) {
  if (typeof dateLessThen !== "number")
    return { error: true, message: "Months must be between 0 -12" };
  if (dateLessThen < 0 || dateLessThen > 12)
    return { error: true, message: "Months must be between 0 -12" };

  let makeDate = new Date();
  makeDate = new Date(makeDate.setMonth(makeDate.getMonth() - dateLessThen));

  // If you have date in different formate
  const lessthen = Moment(makeDate).format("YYYY-MM-DD");

  return lessthen;
}

function filterDataByLastCurrentMonths(data, dateLessThen) {
  // Check if it is string
  if (typeof dateLessThen === "string") {
    if (dateLessThen.toLowerCase() === "all") {
      return data;
    }
  }
  if (typeof data !== "object")
    return {
      error: true,
      message: `First argument must be object is ${typeof data}`,
    };
  if (data.length < 0) return false;
  const getMonths = getLastMonth(dateLessThen);

  // Lets filter the data
  const filtered = data.filter(function (item) {
    return item.created_at >= getMonths;
  });
  // Which risk level you need

  return filtered;
}

// Which risk level data you need
function DataSumOfRiskLevel(data, dateLessThen, risk_level) {
  // Check if date is for all
  let getFilteredData = filterDataByLastCurrentMonths(data, dateLessThen);
  // first filter by the risk level
  let filterByRiskLevel = getFilteredData.filter(function (item) {
    return item.risk_level === risk_level;
  });
  let sumOpp = filterByRiskLevel.reduce(function (prev, cur) {
    return prev + +cur.value;
  }, 0);
  // Wi will sum all the datas
  //let getSum = sum(getFilteredData, 'aggressive');

  //return getSum;

  return sumOpp;
}

// Get all risk level sum amoun on the basis of time

function getRiskLevelSumWithTimeRange(data, dateLessThen, risk_level) {
  // Return data
  let response = [];

  let risk_levels = [
    "low_risk",
    "very_conservative",
    "conservative",
    "balanced",
    "semi_aggressive",
    "aggressive",
    "very_aggressive",
  ];

  // I length
  let riskLength = risk_levels.length;
  let obj = {};
  // Lets loop and set the value right there
  for (var i = 0; i < riskLength; i++) {
    obj[risk_levels[i]] = DataSumOfRiskLevel(
      data,
      dateLessThen,
      risk_levels[i]
    );
  }

  return [obj];
}

console.log(getRiskLevelSumWithTimeRange(data, 12, "aggressive"));
/*var makeDate = new Date();
makeDate = new Date(makeDate.setMonth(makeDate.getMonth() - 6));*/

//console.log(Moment(makeDate).format('YYYY-MM-DD'))

/*
const startDate = Moment(picker.startDate._d).format('YYYY-MM-DD');
const endDate = Moment(picker.endDate._d).format('YYYY-MM-DD');

// Lets filter
const filtered = usersOriginal.data.rows.filter(function(item) {
    return item.created_at >= startDate && item.created_at <= endDate;
});
*/
