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
import { endPoints } from "config/appConfig";
import { countries } from "assets/data/countries";
import Footer from "components/layout/common/Footer";

function App(props) {
  const perpage = 1000;
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [usersOriginal, setUsersOriginal] = useState({});
  const [selectedCountries, setselectedCountries] = useState([]);
  const [selectedRisklevel, setselectedRisklevel] = useState([]);
  const [selectedInvestStatus, setSelectedInvestStatus] = useState([]);
  let { page } = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { details } = useSelector((state) => state.auth);
  page = typeof page === "undefined" ? 1 : parseInt(page);
  let skipPage = page - 1;
  const countryListOptions = countries;
  const riskFactorsLists = [
    { label: "Paid", value: "paid" },
    { label: "Trial", value: "trial" },
    { label: "Expired", value: "expired" },
    { label: "Unpaid", value: "unpaid" },
  ];
  const investStatus = [
    { label: "Registered", value: "Registered" },
    { label: "Pending", value: "Pending" },
    { label: "Rejected", value: "Rejected" },
    { label: " Approved", value: " Approved" },
    { label: "kyc_init", value: "kyc_init" },
    { label: "kyc", value: "kyc" },
    { label: "Inactive", value: "Inactive" },
    { label: "Close", value: "Close" },
    { label: "Not Funded", value: "Not Funded" },
    { label: "Funded", value: "Funded" },
    { label: "Active", value: "Active" },
    { label: "NA", value: "NA" },
  ];

  useEffect(() => {
    const getUsers = async function getUsers() {
      Service.get(
        endPoints.trade.listTradingLeads + "/0/5000",
        {},
        (response) => {
          if (response.data.code === 402) {
            window.location.reload();
          }
          setUsersOriginal(response.data);
          setUsers(response.data);
          setIsLoading(false);
        }
      ).catch((error) => {
        console.log(error);
      });
    };
    getUsers();
  }, [skipPage, perpage]);
  
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
        if (typeof item.status !== "undefined") {
          if (item.status.toLowerCase() === "unpaid") {
            item.status_customize = (
              <span className="text-danger">{item.status}</span>
            );
          } else if (item.status.toLowerCase() === "paid") {
            item.status_customize = (
              <span className="paid-text">{item.status}</span>
            );
          } else if (item.status.toLowerCase() === "trial") {
            item.status_customize = (
              <span className="trail-text">{item.status}</span>
            );
          } else if (item.status.toLowerCase() === "expired") {
            item.status_customize = (
              <span className="expired-text">{item.status}</span>
            );
          }
        }
        if (typeof item.investStatus !== "undefined") {
          if (item.investStatus === "Not Funded") {
            item.invest_status_el = (
              <div className="text-warning">{item.investStatus}</div>
            );
          } else if (item.investStatus === "Funded") {
            item.invest_status_el = (
              <div className="text-primary">{item.investStatus}</div>
            );
          } else if (item.investStatus === "Active") {
            item.invest_status_el = (
              <div className="text-success">{item.investStatus}</div>
            );
          } else if (item.investStatus === "Inactive") {
            item.invest_status_el = (
              <div className="text-danger">{item.investStatus}</div>
            );
          } else if (item.investStatus === "Approved") {
            item.invest_status_el = (
              <div className="text-secondary">{item.investStatus}</div>
            );
          } else if (item.investStatus === "Pending") {
            item.invest_status_el = (
              <div className="text-warning">{item.investStatus}</div>
            );
          } else if (item.investStatus === "Rejected") {
            item.invest_status_el = (
              <div className="text-muted">{item.investStatus}</div>
            );
          } else if (item.investStatus === "kyc") {
            item.invest_status_el = (
              <div className="text-info">{item.investStatus.toUpperCase()}</div>
            );
          } else if (item.investStatus === "Registered") {
            item.invest_status_el = (
              <div className="text-success">{item.investStatus}</div>
            );
          } else if (item.investStatus === "kyc_init") {
            item.invest_status_el = <div className="text-danger">KYC INIT</div>;
          } else {
            item.invest_status_el = <Fragment>N/A</Fragment>;
          }
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
          label: "Phone",
          field: "phone",
          sort: "asc",
          width: 200,
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
          width: 200,
        },
        {
          label: "Country",
          field: "country",
          sort: "asc",
          width: 100,
        },
        {
          label: "Date",
          field: "created_at",
          sort: "asc",
          width: 150,
        },
        {
          label: "Status",
          field: "status_customize",
          sort: "asc",
          width: 100,
        },
        {
          label: "Invest Status",
          field: "invest_status_el",
          sort: "asc",
          width: 100,
        },
        {
          label: "Subscription",
          field: "subscription",
          sort: "asc",
          width: 100,
        },
      ],
      rows: newData,
    };
  }
  const filterData = useCallback(
    (e) => {
      e.preventDefault();
      let selectedCountriesMapped = selectedCountries.map((item) => item.label);
      let selectedRisklevelMapped = selectedRisklevel.map((item) => item.value);
      let selectedInvestedStatusMapped = selectedInvestStatus.map(
        (item) => item.label
      );
      let filtered = usersOriginal.data.rows;
      if (selectedRisklevelMapped.length > 0) {
        filtered = usersOriginal.data.rows.filter(function (element) {
          return (
            selectedRisklevelMapped.indexOf(element.status.toLowerCase()) !== -1
          );
        });
      }
      if (selectedCountriesMapped.length > 0) {
        filtered = filtered.filter(function (element) {
          return selectedCountriesMapped.indexOf(element.country) !== -1;
        });
      }
      if (selectedInvestedStatusMapped.length > 0) {
        filtered = filtered.filter(function (element) {
          return (
            selectedInvestedStatusMapped.indexOf(element.investStatus) !== -1
          );
        });
      }
      setUsers((prevStyle) => ({
        ...prevStyle,
        data: {
          rows: filtered,
          totalNum: prevStyle.data.totalNum,
          approved: prevStyle.data.approved,
          pending: prevStyle.data.pending,
          rejected: prevStyle.data.rejected,
        },
      }));
    },
    [selectedCountries, selectedRisklevel, usersOriginal, selectedInvestStatus]
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
              <div className="item__card-info">TOTAL CONTACTS</div>
              <div className="item__card-title">
                {" "}
                {typeof users.data !== "undefined" ? (
                  <Fragment> {users.data.totalNum}</Fragment>
                ) : (
                  <Fragment></Fragment>
                )}{" "}
              </div>
            </div>
            <div className="item__card-item">
              <div className="item__card-info">APPROVED ACCOUNTS</div>
              <div className="item__card-title">
                {typeof users.data !== "undefined" ? (
                  <Fragment> {users.data.approved}</Fragment>
                ) : (
                  <Fragment></Fragment>
                )}{" "}
              </div>
            </div>
            <div className="item__card-item">
              <div className="item__card-info">PENDING</div>
              <div className="item__card-title">
                {}
                {typeof users.data !== "undefined" ? (
                  <Fragment> {users.data.pending}</Fragment>
                ) : (
                  <Fragment></Fragment>
                )}{" "}
              </div>
            </div>
            <div className="item__card-item">
              <div className="item__card-info">REJECTED</div>
              <div className="item__card-title">
                {typeof users.data !== "undefined" ? (
                  <Fragment> {users.data.rejected}</Fragment>
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
                          {/* <label htmlFor="inputPassword6">Invest Status</label> */}
                          &nbsp; &nbsp;
                          {}
                          <MultiSelect
                            options={investStatus}
                            value={selectedInvestStatus}
                            onChange={setSelectedInvestStatus}
                            overrideStrings={{"selectSomeItems": "Select Invest Status"}}
                          />
                        </div>
                        &nbsp; &nbsp;
                        <div className="form-group">
                          {/* <label htmlFor="inputPassword6">Status</label> */}
                          &nbsp; &nbsp;
                          {}
                          <MultiSelect
                            options={riskFactorsLists}
                            value={selectedRisklevel}
                            onChange={setselectedRisklevel}
                            overrideStrings={{"selectSomeItems": "Select Status"}}
                          />
                        </div>
                        &nbsp; &nbsp; 
                        <div className="form-group countries__leads_trade">
                          {/* <label htmlFor="inputPassword7">Country</label> */}
                          &nbsp; &nbsp;
                          <MultiSelect
                            options={countryListOptions}
                            value={selectedCountries}
                            onChange={setselectedCountries}
                  
                            id="inputPassword7"
                            overrideStrings={{"selectSomeItems": "Select Countries"}}
                          />
                        </div>
                        &nbsp; &nbsp;
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
          <Footer/>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
export default withRouter(App);
