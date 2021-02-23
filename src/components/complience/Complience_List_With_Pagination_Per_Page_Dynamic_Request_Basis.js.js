import React, { Fragment, useState, useEffect } from "react";
import Header from "components/layout/Headers/Headerserver";
import { MDBDataTable } from "mdbreact";
import { formateDate } from "core-functions/getReadbledate";
import Pagination from "react-js-pagination";
import { withRouter } from "react-router-dom";
import Service from "components/Service/service";
import qs from "qs";
import Loading from "components/common/Loading";

function App(props) {
  const perpage = 20;
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Setting url
  const apiLink = "/api/v1/listComplianceClients";

  // get the page
  let { page } = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  // what is page is undefined
  page = typeof page === "undefined" ? 1 : parseInt(page);

  // Create skip
  let skipPage = page - 1;

  // Use effect
  useEffect(() => {
    const getUsers = async function getUsers() {
      Service.get(`${apiLink}/${skipPage}/${perpage}`, {}, (response) => {
        console.log(response.data);
        setUsers(response.data);
        setIsLoading(false);
      }).catch((error) => {
        console.log(error);
      });
    };
    getUsers();
  }, [apiLink, skipPage, perpage]);

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
    const newData = users.data.rows.map(function (item) {
      // If item.risk_factor = medium then
      if (item.risk_factor === "medium") {
        item.risk_factor = (
          <div className="color__neutral text-uppercase">
            {item.risk_factor}
          </div>
        );
      } else if (item.risk_factor === "low") {
        item.risk_factor = (
          <div className="color__green">{item.risk_factor}</div>
        );
      } else if (item.risk_factor === "high") {
        item.risk_factor = <div className="color__red">{item.risk_factor}</div>;
      } else {
      }

      // Add view details
      item.action = (
        <a href={"details/" + item.email} className="btn btn-primary">
          Details
        </a>
      );
      return item;
    });

    data = {
      columns: [
        {
          label: "First Name",
          field: "firstName",
          sort: "asc",
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
          label: "Action",
          field: "action",
          sort: "asc",
          width: 60,
        },
      ],
      rows: newData,
    };
  }

  const handlePageChange = (pageNumber) => {
    // Add new query
    let currentUrlParams = new URLSearchParams(window.location.search);

    // Update the query sting
    currentUrlParams.set("page", pageNumber);

    // Push the location to search
    props.history.push(
      window.location.pathname + "?" + currentUrlParams.toString()
    );

    // Reload the page
    window.location.reload();
  };

  return (
    <Fragment>
      <Header />
      <div className="item__card-container">
        <div className="item__card-item">
          <div className="item__card-info">Total Users</div>
          <div className="item__card-title">2,450</div>
        </div>
        <div className="item__card-item">
          <div className="item__card-info">Total Users</div>
          <div className="item__card-title">2,450</div>
        </div>
        <div className="item__card-item">
          <div className="item__card-info">Total Users</div>
          <div className="item__card-title">2,450</div>
        </div>
        <div className="item__card-item">
          <div className="item__card-info">Total Users</div>
          <div className="item__card-title">2,450</div>
        </div>
      </div>

      <div className="page__section">
        <div className="page__section-item">
          <div className="filter__container">
            <div className="filter__item">
              <div className="page__section-title">Users</div>
            </div>

            <div className="filter__item">
              <div className="page__section-info-text">
                {" "}
                {typeof users.data !== "undefined" ? (
                  <Fragment>{users.data.totalNum}</Fragment>
                ) : (
                  <Fragment />
                )}{" "}
                users
              </div>

              {/*
								<div className="filter__item-select-wrap">
								<div className="filter__item-select">
									<div className="page__section-info-text text-nowrap">
										Filter by: Country
									</div>
									<select className="form-control">
										<option>All</option>
										<option>USA</option>
										<option>uae</option>
									</select>
								</div>
								<div className="filter__item-select">
									<div className="page__section-info-text text-nowrap">
										Filter by: Status
									</div>
									<select className="form-control">
										<option>All</option>
										<option>Approved</option>
										<option>Pending</option>
										<option>Not Approved</option>
									</select>
								</div>
								<a
									href="!#
		"
									className="btn btn-primary"
								>
									Filter
								</a>
							</div>
						
							*/}
            </div>
          </div>

          <div className="table__container">
            {isLoading ? (
              <Loading />
            ) : Object.keys(users.data.rows).length > 0 ? (
              <Fragment>
                <MDBDataTable
                  paging={false}
                  striped
                  bordered
                  hover
                  data={data}
                />

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
              </Fragment>
            ) : (
              <div> No data found.</div>
            )}
          </div>
        </div>

        <div className="container-fluid">
          <div className="rowsd">
            <div className="colxc">
              <h1 className="titla_block">
                <span className="badge badge-pill badge-primary"></span>
              </h1>
              <h1 className="under_title_block">{formateDate(new Date())}</h1>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default withRouter(App);
