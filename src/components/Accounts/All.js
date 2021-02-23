import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
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
import { capitalizeFirstletter } from "functions/mis";
import Footer from "components/layout/common/Footer";
import CsvDownload from "react-json-to-csv";
import MultiSelect from "react-multi-select-component";
import { countries } from "assets/data/countries";

function App(props) {
  const perpage = 10000;
  const [users, setUsers] = useState({});
  const [usersOriginal, setUsersOriginal] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [downloadOriginalData, setDownloadOriginalData] = useState(null);
  const [leadsDownloadData, setLeadsDownloadData] = useState(null);
  const [startDate, setStartDate] = useState("11/01/2019");
  const [endDate, setEndDate] = useState("3/12/2022");
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
  const [selectedCountries, setselectedCountries] = useState([]);

  const { details } = useSelector((state) => state.auth);
  const apiLink = "/api/v1/listClients";
  let { page } = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  page = typeof page === "undefined" ? 1 : parseInt(page);
  let skipPage = page - 1;
  let getRegulation = props.match.params.regulation;

  useEffect(() => {
    const getUsers = async function getUsers() {
      Service.get(
        `${apiLink}/${skipPage}/${perpage}/${getRegulation}`,
        {},
        (response) => {
          const { rows } = response.data.data;
          setDownloadOriginalData(JSON.stringify(response.data.data.rows));
          setLeadsDownloadData(JSON.stringify(response.data.data.rows));
          let filteredDataByPerimssion;
          if (typeof details !== "undefined") {
            const {
              account_manager,
              senior_account_manager,
            } = details.data.permission_mapping;
            var holdStatusOption = [];
            if (account_manager === true && senior_account_manager === true) {
              holdStatusOption = [
                "Funded",
                "Active",
                "Inactive",
                "Not Funded",
                "Close",
              ];
              setFilter(holdStatusOption);
              filteredDataByPerimssion = rows.filter(function (element) {
                return holdStatusOption.indexOf(element.status) !== -1;
              });
              response.data.data.rows = filteredDataByPerimssion;
              setUsers(response.data);
              setUsersOriginal(response.data);
              setStatusOptions(holdStatusOption);
              setselectedCountries([]);
            } else if (account_manager === true) {
              holdStatusOption = ["Not Funded", "Close"];
              setFilter(holdStatusOption);
              filteredDataByPerimssion = rows.filter(function (element) {
                return holdStatusOption.indexOf(element.status) !== -1;
              });
              response.data.data.rows = filteredDataByPerimssion;
              setUsers(response.data);
              setUsersOriginal(response.data);
              setStatusOptions(holdStatusOption);
              setselectedCountries([]);
            } else if (senior_account_manager === true) {
              holdStatusOption = ["Funded", "Active", "Inactive", "Close"];
              setFilter(holdStatusOption);
              filteredDataByPerimssion = rows.filter(function (element) {
                return holdStatusOption.indexOf(element.status) !== -1;
              });
              response.data.data.rows = filteredDataByPerimssion;
              setUsers(response.data);
              setUsersOriginal(response.data);
              setStatusOptions(holdStatusOption);
              setselectedCountries([]);
            } else {
              setStatusOptions([]);
            }
          }
          setIsLoading(false);
        }
      );
    };
    getUsers();
  }, [apiLink, skipPage, perpage, details, getRegulation]);
  let data = "";
  let searchlists = {};
  searchlists.perpage = perpage;
  if (isLoading === false) {
    searchlists.no_of_result = users.data.totalNum;
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
        item.risk_level_modified = capitalizeFirstletter(item.risk_level);
      }
      if (item.account_id) {
        item.action = (
          <a
            href={
              "/#/account/details/" +
              item.account_id +
              `?account_name=${item.firstName}&lastName=${item.lastName}&phone=${item.phone}&risk_level=${item.risk_level}&status=${item.status}&email=${item.email}&regulation=${item.regulation}&risk_factor=${item.risk_factor}&back_to=${getRegulation}`
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
          label: "Account Number",
          field: "account_no",
          sort: "asc",
          width: 250,
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
          width: 100,
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
        {
          label: "AUM",
          field: "aum",
          sort: "asc",
          width: 150,
        },

        {
          label: "Action",
          field: "action",
          sort: "asc",
          width: 150,
        },
      ],
      rows: newData,
    };
  }

  const filterCheckbox = useCallback(
    (e, value) => {
      let selectedCountriesMapped = selectedCountries.map((item) => item.label);
      if (e.target.checked) {
        const prevState = filter;
        prevState.push(value);
        setUnCheckAll(false);
        if (prevState.length >= 0) {
          var filtered = usersOriginal.data.rows.filter(function (element) {
            return (
              prevState.indexOf(element.status) !== -1 &&
              element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
              element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
            );
          });
          let downloadDataParse = JSON.parse(downloadOriginalData);

          var DownloadFilter = downloadDataParse.filter(function (element) {
            return (
              prevState.indexOf(element.status) !== -1 &&
              element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
              element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
            );
          });

          if (selectedCountriesMapped.length > 0) {
            filtered = filtered.filter(function (element) {
              return (
                selectedCountriesMapped.indexOf(element.country) !== -1 &&
                element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
                element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
              );
            });

            DownloadFilter = DownloadFilter.filter(function (element) {
              return (
                selectedCountriesMapped.indexOf(element.country) !== -1 &&
                element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
                element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
              );
            });
          }
          setLeadsDownloadData(JSON.stringify(DownloadFilter));
          setUsers((prevStyle) => ({
            ...prevStyle,
            data: {
              rows: filtered,
              newClients: prevStyle.data.newClients,
              totalNum: filtered.length,
              yesterDay: prevStyle.data.yesterDay,
              lastWeek: prevStyle.data.lastWeek,
            },
          }));
        }
        setFilter([...filter, value]);
      } else {
        const newVar = filter.filter(function (item) {
          return item !== value;
        });
        setFilter(newVar);
        if (newVar.length >= 0) {
          filtered = usersOriginal.data.rows.filter(function (element) {
            return (
              newVar.indexOf(element.status) !== -1 &&
              element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
              element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
            );
          });
          let downloadDataParse = JSON.parse(downloadOriginalData);
          DownloadFilter = downloadDataParse.filter(function (element) {
            return (
              newVar.indexOf(element.status) !== -1 &&
              element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
              element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
            );
          });
          if (selectedCountriesMapped.length > 0) {
            filtered = filtered.filter(function (element) {
              return (
                selectedCountriesMapped.indexOf(element.country) !== -1 &&
                element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
              element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
              );
            });

            DownloadFilter = DownloadFilter.filter(function (element) {
              return (
                selectedCountriesMapped.indexOf(element.country) !== -1 &&
                element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
              element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
              );
            });
          }
          setLeadsDownloadData(JSON.stringify(DownloadFilter));
          setUsers((prevStyle) => ({
            ...prevStyle,
            data: {
              rows: filtered,
              newClients: prevStyle.data.newClients,
              totalNum: filtered.length,
              yesterDay: prevStyle.data.yesterDay,
              lastWeek: prevStyle.data.lastWeek,
            },
          }));
        }
      }
    },
    [
      filter,
      usersOriginal,
      selectedCountries,
      downloadOriginalData,
      startDate,
      endDate,
    ]
  );

  const approvedUsers = (properties, value) => {
    let res = false;
    if (typeof usersOriginal.data.rows !== "undefined") {
      if (Object.keys(usersOriginal.data.rows).length > 0) {
        res = countObjectProperties(usersOriginal.data.rows, properties, value);
      }
    }
    return res;
  };

  const checkAll = useCallback(
    (e) => {
      let selectedCountriesMapped = selectedCountries.map((item) => item.label);
      if (e.target.checked === false) {
        setUnCheckAll(false);
        if (statusOptions.length >= 0) {
          var filtered = usersOriginal.data.rows.filter(function (element) {
            return (
              statusOptions.indexOf(element.status) !== -1 &&
              element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
              element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
            );
          });
          let downloadDataParse = JSON.parse(downloadOriginalData);
          var DownloadFilter = downloadDataParse.filter(function (element) {
            return (
              statusOptions.indexOf(element.status) !== -1 &&
              element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
              element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
            );
          });
          if (selectedCountriesMapped.length > 0) {
            filtered = filtered.filter(function (element) {
              return (
                selectedCountriesMapped.indexOf(element.country) !== -1 &&
                element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
                element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
              );
            });

            if(typeof DownloadFilter !== 'undefined' && Object.keys(DownloadFilter).length > 0) {
              DownloadFilter = DownloadFilter.filter(function (element) {
                return (
                  selectedCountriesMapped.indexOf(element.country) !== -1 &&
                  element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
                element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
                );
              });
            }
            
          }

          if(typeof DownloadFilter !== 'undefined' && Object.keys(DownloadFilter).length > 0) {
            setLeadsDownloadData(JSON.stringify(DownloadFilter));
          }
          
          setUsers((prevStyle) => ({
            ...prevStyle,
            data: {
              ...prevStyle,
              rows: filtered,
              yesterDay: prevStyle.data.yesterDay,
              newClients: prevStyle.data.newClients,
              lastWeek: prevStyle.data.lastWeek,
              totalNum: usersOriginal.data.rows.length,
            },
          }));
        }
        setFilter(statusOptions);
      } else {
        setUnCheckAll(true);
        setFilter([]);
        setLeadsDownloadData([]);
        setUsers((prevStyle) => ({
          ...prevStyle,
          data: {
            ...prevStyle,
            rows: [],
            yesterDay: prevStyle.data.yesterDay,
            lastWeek: prevStyle.data.lastWeek,
            totalNum: 0,
          },
        }));
      }
    },
    [
      usersOriginal,
      selectedCountries,
      statusOptions,
      downloadOriginalData,
      startDate,
      endDate,
    ]
  );
  
  const handleEvent = useCallback(
    (event, picker) => {
      const prevState = filter;
      let selectedCountriesMapped = selectedCountries.map((item) => item.label);

      const startDate = Moment(picker.startDate._d).format("YYYY-MM-DD");
      const endDate = Moment(picker.endDate._d).format("YYYY-MM-DD");
      console.log(startDate,endDate);

      
      var filtered = usersOriginal.data.rows.filter(function (item) {
        return prevState.indexOf(item.status) !== -1 && item.created_at >= startDate && item.created_at <= endDate;
      });
      let downloadDataParse = JSON.parse(downloadOriginalData);

      var DownloadFilter = downloadDataParse.filter(function (item) {
        return prevState.indexOf(item.status) !== -1 && item.created_at >= startDate && item.created_at <= endDate;
      });

      if (selectedCountriesMapped.length > 0) {
        filtered = filtered.filter(function (element) {
          return prevState.indexOf(element.status) !== -1 && selectedCountriesMapped.indexOf(element.country) !== -1;
        });
        DownloadFilter = DownloadFilter.filter(function (element) {
          return prevState.indexOf(element.status) !== -1 && selectedCountriesMapped.indexOf(element.country) !== -1;
        });
      }

      setStartDate(Moment(picker.startDate._d));
      setEndDate(Moment(picker.endDate._d));

      setLeadsDownloadData(JSON.stringify(DownloadFilter));
      
      setUsers((prevStyle) => ({
        ...prevStyle,
        data: {
          ...prevStyle,
          rows: filtered,
          newClients: prevStyle.data.newClients,
          yesterDay: prevStyle.data.yesterDay,
          lastWeek: prevStyle.data.lastWeek,
          totalNum: filtered.length,
        },
      }));

      // setUsersOriginal((prevStyle) => ({
      //   ...prevStyle,
      //   data: {
      //     ...prevStyle,
      //     rows: filtered,
      //     newClients: prevStyle.data.newClients,
      //     yesterDay: prevStyle.data.yesterDay,
      //     lastWeek: prevStyle.data.lastWeek,
      //     totalNum: filtered.length,
      //   },
      // }));
    },
    [usersOriginal, selectedCountries, downloadOriginalData, filter]
  );
  
  const downloadComponent = useMemo(() => {
    if (typeof details !== "undefined") {
      if (typeof details.data.permission_mapping !== "undefined") {
        if (
          details.data.permission_mapping.data_export === true &&
          leadsDownloadData !== null
          && Object.keys(leadsDownloadData).length > 0
        ) {
          return (
            <Fragment>
              <CsvDownload
                data={JSON.parse(leadsDownloadData)}
                filename="leads.csv"
                className="btn-back btn btn-outline-primary"
              >
                Download
              </CsvDownload>{" "}
            </Fragment>
          );
        }
      }
    }
  }, [leadsDownloadData, details]);

  const filterData = useCallback(
    (selectedCountries, _options) => {
      setselectedCountries(selectedCountries);
      const prevState = filter;
      let selectedCountriesMapped = selectedCountries.map((item) => item.label);
      let filtered = usersOriginal.data.rows;
      var DownloadFilter;
      if (selectedCountriesMapped.length > 0) {
        filtered = filtered.filter(function (element) {
          return (
            selectedCountriesMapped.indexOf(element.country) !== -1 &&
            element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
            element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
          );
        });

        let downloadDataParse = JSON.parse(downloadOriginalData);
        DownloadFilter = downloadDataParse.filter(function (element) {
          return (
            selectedCountriesMapped.indexOf(element.country) !== -1 &&
            element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
            element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
          );
        });
      }
      if (prevState.length >= 0) {
        filtered = filtered.filter(function (element) {
          return (
            prevState.indexOf(element.status) !== -1 &&
            element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
            element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
          );
        });

        if (
          typeof DownloadFilter !== "undefined" &&
          Object.keys(DownloadFilter).length > 0
        ) {
          DownloadFilter = DownloadFilter.filter(function (element) {
            return (
              prevState.indexOf(element.status) !== -1 &&
              element.created_at >= Moment(startDate).format("YYYY-MM-DD")  &&
              element.created_at <= Moment(endDate).format("YYYY-MM-DD")  
            );
          });
        }
      }

      if (
        typeof DownloadFilter !== "undefined" &&
        Object.keys(DownloadFilter).length > 0
      ) {
        setLeadsDownloadData(JSON.stringify(DownloadFilter));
      }

      setUsers((prevStyle) => ({
        ...prevStyle,
        data: {
          rows: filtered,
          lastWeek: prevStyle.data.lastWeek,
          newClients: prevStyle.data.newClients,
          totalNum: prevStyle.data.totalNum,
          yesterDay: prevStyle.data.yesterDay,
        },
      }));
    },
    [usersOriginal, filter, downloadOriginalData, startDate, endDate]
  );

  return (
    <Fragment>
      <Headerserver />
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <WelcomeUser
            details={details}
            text={(() => {
              switch (getRegulation) {
                case "usa":
                  return "Clients USA Regulation";
                case "uae":
                  return "Clietns UAE Regulation";
                case "all":
                  return "Clients USA and UAE Regulation";
                default:
                  return null;
              }
            })()}
          />
          <div className="item__card-container_6x">
            <div className="item__card-item">
              <div className="item__card-info">Total Accounts</div>
              <div className="item__card-title">
                {typeof usersOriginal.data !== "undefined" ? (
                  <Fragment>{usersOriginal.data.totalNum}</Fragment>
                ) : (
                  <Fragment></Fragment>
                )}
              </div>
            </div>
            <div className="item__card-item col">
              <div className="item__card-info">New</div>
              <div className="item__card-title">
                {usersOriginal.data.newClients}
              </div>
            </div>
            <div className="item__card-item">
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
                        <Fragment>{users.data.rows.length}</Fragment>
                      ) : (
                        <Fragment></Fragment>
                      )}
                      &nbsp; Clients
                    </h5>
                    {downloadComponent}
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
                    <DateRangePicker
                      startDate={startDate}
                      endDate={endDate}
                      onApply={handleEvent}
                    >
                      <button className="btn btn-primary">
                        Filter by date range
                      </button>
                    </DateRangePicker>
                  </div>
                </div>
                <div className="filter__item">
                  <div className="filter__by__date_container">
                    <div className="form-group countries__leads form-inline">
                      <label htmlFor="inputPassword6">
                        Filter By: Countries
                      </label>
                      &nbsp; &nbsp;
                      <MultiSelect
                        options={countries}
                        value={selectedCountries}
                        onChange={filterData}
                        labelledBy={"Filter by countries"}
                        id="inputPassword7"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {Object.keys(users.data.rows).length > 0 ? (
                <div className="table__container leads">
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
export default withRouter(App);
