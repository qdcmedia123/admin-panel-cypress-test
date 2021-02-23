import React, { Fragment, useState, useEffect, useCallback } from "react";
import Header from "components/layout/Headers/Headerserver";
import { MDBDataTableV5 } from "mdbreact";
import { withRouter } from "react-router-dom";
import qs from "qs";
import Loading from "components/common/Loading";
import { useSelector } from "react-redux";
import WelcomUser from "components/common/WelcomeUser";
import NoDataFound from "components/common/NoDataFound";
import * as Service from "components/Service/SimpleService";
import MultiSelect from "react-multi-select-component";
import { capitalizeFirstletter } from "functions/mis";
import {endPoints} from 'config/appConfig';
import Footer from "components/layout/common/Footer";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function App(props) {
  const perpage = 1000;
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [usersOriginal, setUsersOriginal] = useState({});
  const [selectedCountries, setselectedCountries] = useState([]);
  const [selectedRisklevel, setselectedRisklevel] = useState([]);
  const apiLink = endPoints.portfolios.portfoliValuesList;
  let { page } = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { details } = useSelector((state) => state.auth);
  page = typeof page === "undefined" ? 1 : parseInt(page);
  let skipPage = page - 1;
  const countryListOptions = [
    { label: "Bahrain", value: "BHR" },
    { label: "Kuwait", value: "KWT" },
    { label: "Oman", value: "OMN" },
    { label: "Saudi Arabia", value: "SAU" },
    { label: "UAE", value: "ARE" },
    { label: "USA", value: "USA" },
  ];
  const riskFactorsLists = [
    { label: "Very Aggressive", value: "very_aggressive" },
    { label: "Aggressive", value: "aggressive" },
    { label: "Semi Aggressive", value: "semi_aggressive" },
    { label: "Balanced", value: "balanced" },
    { label: "Conservative", value: "conservative" },
    { label: "Low Risk", value: "Low Risk" },
  ];
  useEffect(() => {
    const getUsers = async function getUsers() {
      Service.get(apiLink, {}, (response) => {
        if (response.data.code === 402) {
          window.location.reload();
        }
        setUsersOriginal(response.data);
        setUsers(response.data);
        setIsLoading(false);
      }).catch((error) => {
        console.log(error);
      });
    };
    getUsers();
  }, [apiLink, skipPage, perpage]);
  let data = "";
  let searchlists = {};
  searchlists.perpage = perpage;
  if (isLoading === false) {
    searchlists.no_of_result = users.data.totalNum;
    let newData;
    if (Object.keys(users.data).length > 0) {
      newData = users.data.rows.map(function (item) {
        if (typeof item.risk_level !== "undefined") {
          item.risk_level_customize = capitalizeFirstletter(item.risk_level);
        }
        if (typeof item.value !== "undefined") {
          item.value = Math.round(item.value * 100) / 100;
        }
            if (item.drivewealth_account_id) {
              item.action = (
                <a
                  href={
                    "/#/account/details/" +
                    item.drivewealth_account_id +
                    `?account_name=${item.firstName}&lastName=${item.lastName}&phone=${item.phone}&risk_level=${item.risk_level}&status=${item.status}&email=${item.email}&regulation=${item.regulation}&risk_factor=${item.risk_factor}`
                  }
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Details
                </a>
              );
            }
        return item;
      });
    }
    data = {
      columns: [
        {
          label: "First Name",
          field: "firstName",
          sort: "disabled",
          width: 150,
        },
        {
          label: "Last Name",
          field: "lastName",
          sort: "asc",
          width: 270,
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
          width: 200,
        },
        {
          label: "Country",
          field: "addressCountry",
          sort: "asc",
          width: 100,
        },
        {
          label: "Values($)",
          field: "value",
          sort: "asc",
          width: 150,
        },
        {
          label: "Performance($)",
          field: "returnValue",
          sort: "asc",
          width: 100,
        },
        {
          label: "Performance(%)",
          field: "returnRatio",
          sort: "asc",
          width: 100,
        },
        {
          label: "Risk Level",
          field: "risk_level_customize",
          sort: "asc",
          width: 100,
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
          width: 50
        }
      ],
      rows: newData,
    };
  }
  const filterData = useCallback(
    (e) => {
      e.preventDefault();
      let selectedCountriesMapped = selectedCountries.map((item) => item.value);
      let selectedRisklevelMapped = selectedRisklevel.map((item) => item.value);
      let filtered = usersOriginal.data.rows;
      if (selectedRisklevelMapped.length > 0) {
        filtered = usersOriginal.data.rows.filter(function (element) {
          return selectedRisklevelMapped.indexOf(element.risk_level) !== -1;
        });
      }
      if (selectedCountriesMapped.length > 0) {
        filtered = filtered.filter(function (element) {
          return selectedCountriesMapped.indexOf(element.country) !== -1;
        });
      }
      var msgTotal = filtered.reduce(function (prev, cur) {
        return +prev + +cur.value;
      }, 0);
      let clientTotals = { aum: msgTotal, activeAccounts: filtered.length };
      setUsers((prevStyle) => ({
        ...prevStyle,
        data: {
          rows: filtered,
          clientTotals: clientTotals,
        },
      }));
    },
    [selectedCountries, selectedRisklevel, usersOriginal]
  );
  return (
    <Fragment>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <WelcomUser details={details} text="" />
          <div className="item__card-container">
            <div className="item__card-item">
              <div className="item__card-info">TOTAL AUM</div>
              <div className="item__card-title">
                {" "}
                {typeof users.data !== "undefined" ? (
                  <Fragment>
                    {" "}
                    {formatter.format(users.data.clientTotals.aum)}
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}{" "}
              </div>
            </div>
            <div className="item__card-item">
              <div className="item__card-info">ACTIVE ACCOUNTS</div>
              <div className="item__card-title">
                {typeof users.data !== "undefined" ? (
                  <Fragment> {users.data.clientTotals.activeAccounts}</Fragment>
                ) : (
                  <Fragment></Fragment>
                )}{" "}
              </div>
            </div>
          </div>
          <div className="page__section">
            <div className="page__section-item">
              <div className="container-fluid-d">
                <div className="row filterRows">
                  <div className="col-md-12 text-left">
                    <div className="filter__inner__warper">
                      <form className="form-inline ml-auto  justify-content-end">
                        <div className="form-group">
                          <label htmlFor="inputPassword6">
                            Filter By: Risk Level
                          </label>
                          &nbsp; &nbsp;
                          {}
                          <MultiSelect
                            options={riskFactorsLists}
                            value={selectedRisklevel}
                            onChange={setselectedRisklevel}
                            labelledBy={"Select"}
                          />
                        </div>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <div className="form-group">
                          <label htmlFor="inputPassword7">Country</label>
                          &nbsp; &nbsp;
                          <MultiSelect
                            options={countryListOptions}
                            value={selectedCountries}
                            onChange={setselectedCountries}
                            labelledBy={"Select"}
                            id="inputPassword7"
                          />
                        </div>
                        <div className="form-group">
                          <button
                            onClick={filterData}
                            type="submit"
                            className="btn btn-primary mb-2"
                          >
                            Filter
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table__container portfolioList">
                {isLoading ? (
                  <Loading />
                ) : Object.keys(users.data).length > 0 ? (
                  <Fragment>
                    <MDBDataTableV5
                      hover
                      entriesOptions={[10, 20, 25]}
                      entries={10}
                      pagesAmount={4}
                      data={data}
                      fullPagination
                      searchTop
                      searchBottom={false}
                      borderless
                      paginationLabel={["Previous", "Next"]}
                      responsive
                    />
                    {}
                  </Fragment>
                ) : (
                  <NoDataFound />
                )}
              </div>
            </div>
           <Footer />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
export default withRouter(App);
