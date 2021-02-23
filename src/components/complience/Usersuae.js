import React, { Fragment, useState, useEffect } from "react";
import Header from "components/layout/Headers/Headerserver";
import { MDBDataTableV5 } from "mdbreact";
import { withRouter } from "react-router-dom";
import qs from "qs";
import Loading from "components/common/Loading";
import { useSelector } from "react-redux";
import CsvDownload from "react-json-to-csv";
import { countObjectProperties } from "functions/mis";
import WelcomUser from "components/common/WelcomeUser";
import NoDataFound from "components/common/NoDataFound";
import * as Service from "components/Service/SimpleService";
import Footer from "components/layout/common/Footer";
import {endPoints} from 'config/appConfig';


function App(props) {
  const perpage = 10000;
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [usersInJson, setUsersInJson] = useState([]);

  
  const apiLink = endPoints.clients.listComplianceClients;
  
  
  let { page } = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  const { details } = useSelector((state) => state.auth);
  
  page = typeof page === "undefined" ? 1 : parseInt(page);

  
  let skipPage = page - 1;

  
  useEffect(() => {
    const getUsers = async function getUsers() {
      Service.get(`${apiLink}/${skipPage}/${perpage}/UAE`, {}, (response) => {
        if (response.data.code === 402) {
          window.location.reload();
        }

        setUsersInJson(JSON.stringify(response.data.data.rows));
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

    /*
    Many be i need to find solution in other way because colouring is not working with sorting 
    because table filed does not support html element
      item.risk_factor = (
          (<span className = "text-danger">{item.risk_factor.toUpperCase()}</span>)
          
        );
    */
    
    let newData;

    if (Object.keys(users.data).length > 0) {
      newData = users.data.rows.map(function (item) {
        
        if (item.risk_factor === "medium") {
          item.risk_factor = item.risk_factor.toUpperCase();
        } else if (item.risk_factor === "low") {
          item.risk_factor = item.risk_factor.toUpperCase();
        } else if (item.risk_factor === "high") {
          item.risk_factor = item.risk_factor.toUpperCase();
        } else {
        }

        
        let get_risk_factor =
          typeof item.risk_factor === "string"
            ? item.risk_factor.toLowerCase()
            : null;
        
        item.action = (
          <a
            href={"/#/details/UAE/" + item.email + "/" + get_risk_factor}
            className="btn btn-primary"
            target = "_blank"
            rel="noopener noreferrer"
          >
            Details
          </a>
        );
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
          width: 100,
        },
        {
          label: "Country",
          field: "country",
          sort: "asc",
          width: 150,
        },
        {
          label: "Risk",
          field: "risk_factor",
          sort: "asc",
          width: 100,
        },
        {
          label: "Compliance Decision",
          field: "compliance_decision",
          sort: "asc",
          width: 100,
        },
        {
          label: "Compliance By",
          field: "compliance_by",
          sort: "asc",
          width: 100,
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
          label: "Action",
          field: "action",
          sort: "asc",
          width: 60,
        },
      ],
      rows: newData,
    };
  }

  const approvedUsers = (properties, value) => {
    let res = null;
    
    if (typeof users.data !== "undefined") {
      if (typeof users.data.rows !== "undefined") {
        
        if (Object.keys(users.data.rows).length > 0) {
          res = countObjectProperties(users.data.rows, properties, value);
        }
      }
    }

    return res;
  };

  return (
    <Fragment>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <WelcomUser
            details={details}
            text="Compliance UAE"
            compliance={true}
          />
          <div className="item__card-container">
            <div className="item__card-item">
              <div className="item__card-info">Total Compliances</div>
              <div className="item__card-title">
                {" "}
                {typeof users.data !== "undefined" ? (
                  <Fragment>{users.data.totalNum}</Fragment>
                ) : (
                  <Fragment></Fragment>
                )}{" "}
              </div>
            </div>

            <div className="item__card-item">
              <div className="item__card-info">Medium Risk</div>
              <div className="item__card-title">
                {approvedUsers("risk_factor", "MEDIUM")}
              </div>
            </div>

            <div className="item__card-item">
              <div className="item__card-info">Low Risk</div>
              <div className="item__card-title">
                {approvedUsers("risk_factor", "LOW")}
              </div>
            </div>

            <div className="item__card-item">
              <div className="item__card-info">High Risk</div>
              <div className="item__card-title">
                {approvedUsers("risk_factor", "HIGH")}
              </div>
            </div>
          </div>
          <div className="page__section">
            <div className="page__section-item">
              <div className="filter__container">
                <div className="filter__item">
                  <div className="page__section-title"></div>
                </div>

                <div className="filter__item">
                  <div className="page__section-info-text">
                    {" "}
                    {typeof users.data !== "undefined" ? (
                      <Fragment>{users.data.totalNum}</Fragment>
                    ) : (
                      <Fragment />
                    )}{" "}
                    compliance
                  </div>
                  {usersInJson !== false &&
                  Object.keys(usersInJson).length > 0 ? (
                    <Fragment>
                      <CsvDownload
                        data={JSON.parse(usersInJson)}
                        filename="client.csv"
                        className="btn-back btn btn-outline-danger"
                      >
                        Download CSV
                      </CsvDownload>{" "}
                    </Fragment>
                  ) : (
                    <Fragment></Fragment>
                  )}
                </div>
              </div>

              <div className="table__container">
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
                      pagingTop
                      borderless
                      paginationLabel={["Previous", "Next"]}
                      responsive
                      barReverse
                    />

                    {/*
									<div className="table__pagination">
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
								</div>
								*/}
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
