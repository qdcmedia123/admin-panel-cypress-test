import React, { Fragment, useState, useEffect, useCallback } from "react";
import Headerserver from "components/layout/Headers/Headerserver";
import { MDBDataTableV5 } from "mdbreact";
import { withRouter } from "react-router-dom";
import qs from "qs";
import Loading from "components/common/Loading";
import { useSelector } from "react-redux";
import { countObjectProperties } from "functions/mis";
import WelcomeUser from "components/common/WelcomeUser";
import NoDataFound from "components/common/NoDataFound";
import * as Service from "components/Service/SimpleService";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import Moment from "moment";
import Footer from "components/layout/common/Footer";
import { capitalizeFirstletter } from "functions/mis";
import {endPoints} from 'config/appConfig';


function App(props) {
  const perpage = 10000;
  const [users, setUsers] = useState({});
  const [usersOriginal, setUsersOriginal] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [statusOptions, setStatusOptions] = useState([
    "Pending",
    "Rejected",
    "Not Nunded",
    "Funded",
    "Active",
    "Inactive",
    "Approved",
    "kyc",
    "Registered User",
  ]);

  const [filter, setFilter] = useState([]);
  const [uncheckAll, setUnCheckAll] = useState(false);
  // Filter will be differnt as per permission
  const { details } = useSelector((state) => state.auth);
  // Setting urlom
  const apiLink = endPoints.clients.listClients;
  
  // get the page
  let { page } = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  // what is page is undefined
  page = typeof page === "undefined" ? 1 : parseInt(page);

  // Create skip
  let skipPage = page - 1;

  // Use effect
  useEffect(() => {
    // Lets check what kind of permission user have
    // Because status need to be show on the basis of
    // Currently logged in user
    const getUsers = async function getUsers() {
      Service.get(`${apiLink}/${skipPage}/${perpage}/All`, {}, (response) => {
        const { rows } = response.data.data;

        let filteredDataByPerimssion;

        if (typeof details !== "undefined") {
          const {
            account_manager,
            senior_account_manager,
          } = details.data.permission_mapping;

          var holdStatusOption = [];
          // if user is account_manager and senior account manager
          if (account_manager === true && senior_account_manager === true) {
            // Set filter custome option
            //console.log(' hum account manager and senior account manager both.')
            // Status options
            /*
            holdStatusOption = [
              'Pending',
              'Rejected',
              'Not Funded',
              'Funded',
              'Active',
              'Inactive',
              'Approved',
              'kyc',
              'Registered User',
            ];

            */

            holdStatusOption = [
              "Funded",
              "Active",
              "Inactive",
              "Not Funded",
              "Close",
            ];

            setFilter(holdStatusOption);

            // Lets filter the origin user and users variable

            filteredDataByPerimssion = rows.filter(function (element) {
              // Check that in array and filter
              return holdStatusOption.indexOf(element.status) !== -1;
            });
            // Change the response data rest should be find
            response.data.data.rows = filteredDataByPerimssion;
            setUsers(response.data);
            setUsersOriginal(response.data);
            setStatusOptions(holdStatusOption);
          } else if (account_manager === true) {
            // if only account manager
            // Set filter options

            holdStatusOption = ["Not Funded", "Close"];

            /*
              holdStatusOption = [
              'Pending',
              'Rejected',
              'kyc',
              'Registered User',
            ];
            */

            // Set filter
            setFilter(holdStatusOption);

            filteredDataByPerimssion = rows.filter(function (element) {
              // Check that in array and filter
              return holdStatusOption.indexOf(element.status) !== -1;
            });
            // Change the response data rest should be find
            response.data.data.rows = filteredDataByPerimssion;
            setUsers(response.data);
            setUsersOriginal(response.data);
            setStatusOptions(holdStatusOption);
          } else if (senior_account_manager === true) {
            // if user is only account manager
            // Set filter

            holdStatusOption = ["Funded", "Active", "Inactive", "Close"];

            /*
            holdStatusOption = [
              'Not Funded',
              'Funded',
              'Active',
              'Inactive',
              'Approved',
            ];
            */

            setFilter(holdStatusOption);

            filteredDataByPerimssion = rows.filter(function (element) {
              // Check that in array and filter
              return holdStatusOption.indexOf(element.status) !== -1;
            });
            // Change the response data rest should be find
            response.data.data.rows = filteredDataByPerimssion;
            setUsers(response.data);
            setUsersOriginal(response.data);
            setStatusOptions(holdStatusOption);
          } else {
            // Show nothing
            setStatusOptions([]);
          }
        }

        setIsLoading(false);
      });
    };

    getUsers();
  }, [apiLink, skipPage, perpage, details]);

  // Setting deata
  let data = "";

  // User list
  let searchlists = {};

  // Setting perpage
  searchlists.perpage = perpage;

  // If data is loaded
  if (isLoading === false) {
    searchlists.no_of_result = users.data.totalNum;

    // map and change the value
    var newData = users.data.rows.filter(function (item) {
      if (item.status === "Not Funded") {
        item.status_el = <div className="text-warning">{item.status}</div>;
      } else if (item.status === "Funded") {
        item.status_el = <div className="text-primary">{item.status}</div>;
      } else if (item.status === "Active") {
        item.status_el = <div className="text-success">{item.status}</div>;
      } else if (item.status === "Inactive") {
        item.status_el = <div className="text-danger">{item.status}</div>;
      } else if (item.status === "Approved") {
        item.status_el = <div className="text-secondary">{item.status}</div>;
      } else if (item.status === "Pending") {
        item.status_el = <div className="text-warning">{item.status}</div>;
      } else if (item.status === "Rejected") {
        item.status_el = <div className="text-muted">{item.status}</div>;
      } else if (item.status === "kyc") {
        item.status_el = <div className="text-info">{item.status}</div>;
      } else if (item.status === "Registered User") {
        item.status_el = <div className="text-success">{item.status}</div>;
      } else if (item.status === "Close") {
        item.status_el = <div className="text-danger">{item.status}</div>;
      } else {
        item.status_el = <Fragment>N/A</Fragment>;
      }

      if (item.risk_level) {
        // Add new attri
        item.risk_level_modified = capitalizeFirstletter(item.risk_level);
      }

      return item;
      // let check status
    });

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
          width: 100,
        },
        {
          label: "Country",
          field: "country",
          sort: "asc",
          width: 150,
        },
        {
          label: "Status",
          field: "status_el",
          sort: "asc",
          width: 150,
        },
        {
          label: "Created At",
          field: "created_at",
          sort: "asc",
          width: 150,
        },
        {
          label: "Updated At",
          field: "updated_at",
          sort: "asc",
          width: 150,
        },
        {
          label: "Risk Level",
          field: "risk_level_modified",
          sort: "asc",
          width: 150,
        },
      ],
      rows: newData,
    };
  }

  /*
  {
          label: 'Risk',
          field: 'risk_factor_modified',
          sort: 'asc',
          width: 150,
        },
  const selectOnchange = event => {
    let options = event.target.options;
    let value = [];

    // Loop each value
    for (var i = 0, l = options.length; i < l; i++) {
      // Check if options is selected
      if (options[i].selected) {
        // Push the value to array
        value.push(options[i].value);
      }
    }
    // Change the selected state
    setFilter(value);
  };
  */

  // Filter button onclick function
  /*
  const submitFilterBtn = e => {
    e.preventDefault();
    // Check the length of statusSelected
    if (filter.length > 0) {
      // Access each that in the origin state which is user
      var filtered = usersOriginal.data.rows.filter(function(element) {
        // Check that in array and filter
        return filter.indexOf(element.status) !== -1;
      });

      // Change the state but let origin data to be there. only users.data.row: (Object ) need to be chagne
      setUsers(prevStyle => ({
        ...prevStyle,
        data: { ...prevStyle, rows: filtered },
      }));
    }
  };

  */
  const filterCheckbox = useCallback(
    (e, value) => {
      //console.log(value);
      if (e.target.checked) {
        // Set filter is asyn thefore here i can not access
        const prevState = filter;
        prevState.push(value);
        setUnCheckAll(false);
        if (prevState.length >= 0) {
          // Access each that in the origin state which is user
          var filtered = usersOriginal.data.rows.filter(function (element) {
            // Check that in array and filter
            return prevState.indexOf(element.status) !== -1;
          });

          // Change the state but let origin data to be there. only users.data.row: (Object ) need to be chagne
          setUsers((prevStyle) => ({
            ...prevStyle,
            data: { rows: filtered, totalNum: filtered.length },
          }));
        }

        setFilter([...filter, value]);
      } else {
        //let removedFilter = ["Pending", "kyc"];
        const newVar = filter.filter(function (item) {
          return item !== value;
        });
        //console.log(newVar);
        setFilter(newVar);

        if (newVar.length >= 0) {
          // Access each that in the origin state which is user
          filtered = usersOriginal.data.rows.filter(function (element) {
            // Check that in array and filter
            return newVar.indexOf(element.status) !== -1;
          });

          // Change the state but let origin data to be there. only users.data.row: (Object ) need to be chagne
          setUsers((prevStyle) => ({
            ...prevStyle,
            data: { rows: filtered, totalNum: filtered.length },
          }));
        }
      }
    },
    [filter, usersOriginal]
  );

  // Data state wil be change on the basis of permission
  const approvedUsers = (properties, value) => {
    let res = false;
    // Check all is good
    if (typeof usersOriginal.data.rows !== "undefined") {
      // Check the length
      if (Object.keys(usersOriginal.data.rows).length > 0) {
        res = countObjectProperties(usersOriginal.data.rows, properties, value);
      }
    }

    return res;
  };

  // Check all function
  const checkAll = (e) => {
    // Check the value
    if (e.target.checked === false) {
      setUnCheckAll(false);
      if (statusOptions.length >= 0) {
        // Access each that in the origin state which is user
        var filtered = usersOriginal.data.rows.filter(function (element) {
          // Check that in array and filter
          return statusOptions.indexOf(element.status) !== -1;
        });

        // Change the state but let origin data to be there. only users.data.row: (Object ) need to be chagne
        setUsers((prevStyle) => ({
          ...prevStyle,
          data: {
            ...prevStyle,
            rows: filtered,
            totalNum: usersOriginal.data.rows.length,
          },
        }));
      }
      // Then check all value
      setFilter(statusOptions);
    } else {
      //
      setUnCheckAll(true);
      setFilter([]);
      setUsers((prevStyle) => ({
        ...prevStyle,
        data: {
          ...prevStyle,
          rows: [],
          totalNum: 0,
        },
      }));
    }
  };

  const handleEvent = useCallback(
    (event, picker) => {
      const startDate = Moment(picker.startDate._d).format("YYYY-MM-DD");
      const endDate = Moment(picker.endDate._d).format("YYYY-MM-DD");

      // clone the users

      // Lets filter
      const filtered = usersOriginal.data.rows.filter(function (item) {
        return item.created_at >= startDate && item.created_at <= endDate;
      });

      // Updat the user var
      setUsers((prevStyle) => ({
        ...prevStyle,
        data: {
          ...prevStyle,
          rows: filtered,
          yesterDay: prevStyle.data.yesterDay,
          lastWeek: prevStyle.data.lastWeek,
          totalNum: filtered.length,
        },
      }));

      // Update origin users

      setUsersOriginal((prevStyle) => ({
        ...prevStyle,
        data: {
          ...prevStyle,
          rows: filtered,
          yesterDay: prevStyle.data.yesterDay,
          lastWeek: prevStyle.data.lastWeek,
          totalNum: filtered.length,
        },
      }));
    },
    [usersOriginal]
  );

  return (
    <Fragment>
      <Headerserver />

      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <WelcomeUser details={details} text="Clients UAE and USA" />

          <div className="item__card-container_6x">
            <div className="item__card-item">
              <div className="item__card-info">Total</div>
              <div className="item__card-title">
                {typeof usersOriginal.data !== "undefined" ? (
                  <Fragment>{usersOriginal.data.totalNum}</Fragment>
                ) : (
                  <Fragment></Fragment>
                )}
              </div>
            </div>

            <div className="item__card-item col">
              <div className="item__card-info">Active</div>
              <div className="item__card-title">
                {approvedUsers("status", "Active")}
              </div>
            </div>
            <div className="item__card-item">
              <div className="item__card-info">Funded</div>
              <div className="item__card-title">
                {approvedUsers("status", "Funded")}
              </div>
            </div>

            <div className="item__card-item">
              <div className="item__card-info">Not Funded</div>
              <div className="item__card-title">
                {approvedUsers("status", "Not Funded")}
              </div>
            </div>

            <div className="item__card-item">
              <div className="item__card-info">Close</div>
              <div className="item__card-title">
                {approvedUsers("status", "Close")}
              </div>
            </div>
          </div>

          <div className="page__section">
            <div className="page__section-item">
              <div className="filter__container">
                <div className="filter__item">
                  <div className="page__section-info-text text-bold">
                    <h5>
                      {typeof users.data !== "undefined" ? (
                        <Fragment>{users.data.totalNum}</Fragment>
                      ) : (
                        <Fragment></Fragment>
                      )}
                      &nbsp; Clients
                    </h5>
                  </div>
                  <div className="filter__item-select-warp"></div>

                  <div className="filter__item-select-wrap">
                    {statusOptions.length > 0 ? (
                      <Fragment>
                        <div className="filter__item-select">
                          <div className="page__section-info-text text-nowrap">
                            Filter by: Status
                          </div>

                          <div className="form-control">
                            <div className="form-check d-inline mr-2">
                              {statusOptions.length > 1 ? (
                                <Fragment>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value="check_all"
                                    id="check_all"
                                    onChange={checkAll}
                                    name="check_all"
                                    checked={uncheckAll}
                                  />

                                  <label
                                    className="form-check-label"
                                    htmlFor="check_all"
                                  >
                                    <span className="font-weight-bold">
                                      Uncheck All
                                    </span>
                                  </label>
                                </Fragment>
                              ) : (
                                <Fragment></Fragment>
                              )}
                            </div>

                            {/* checked = {filter.indexOf(item) !== -1 ? true : false} */}
                            {statusOptions.map((item, index) => (
                              <div
                                className="form-check d-inline mr-3"
                                key={index}
                              >
                                <input
                                  name={"filter_checkbox" + index}
                                  checked={
                                    filter.indexOf(item) !== -1 ? true : false
                                  }
                                  value={item}
                                  onChange={(e) => filterCheckbox(e, item)}
                                  type="checkbox"
                                  key={index}
                                  className="form-check-input"
                                  id={"filter-checkbox" + index}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={"filter-checkbox" + index}
                                >
                                  {item}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment></Fragment>
                    )}
                  </div>
                </div>

                <div className="filter__item">
                  <div className="filter__by__date_container">
                    <DateRangePicker
                      startDate="11/1/2019"
                      endDate="3/12/2020"
                      onApply={handleEvent}
                    >
                      <button className="btn btn-primary">
                        Filter by date range
                      </button>
                    </DateRangePicker>
                  </div>
                </div>
              </div>

              {Object.keys(users.data.rows).length > 0 ? (
                <div className="table__container">
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
                      pagingTop
                      borderless
                      paginationLabel={["Previous", "Next"]}
                      responsive
                      barReverse
                    />

                    <div className="table__pagination">
                      {/*
                        <Pagination
                        activePage={page}
                        itemsCountPerPage={searchlists.perpage}
                        totalItemsCount={searchlists.no_of_result}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                        linkClass="page-link"
                        prevPageText=<span>Previous</span>
                        nextPageText=<span>Next</span>
                        innerClass="table__pagination-wrapper"
                        itemClass="table__pagination-item"
                        itemClassPrev="table__pagination-previous"
                        itemClassNext="table__pagination-next"
                        firstPageText="<"
                      />
                      */}
                    </div>
                  </Fragment>
                </div>
              ) : (
                <NoDataFound />
              )}
            </div>

            <Footer />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

/*
App.propTypes = {
  countObjectProperties: PropTypes.func.isRequired
}
*/

export default withRouter(App);
