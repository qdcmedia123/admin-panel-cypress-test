import React, { Fragment, useState, useEffect } from "react";
import Header from "components/layout/Headers/Headerserver";
import { MDBDataTableV5 } from "mdbreact";
import { withRouter } from "react-router-dom";
import qs from "qs";
import Loading from "components/common/Loading";
import { useSelector } from "react-redux";
import WelcomUser from "components/common/WelcomeUser";
import NoDataFound from "components/common/NoDataFound";
import * as Service from "components/Service/SimpleService";
import { capitalizeFirstletter } from "functions/mis";
import { endPoints } from "config/appConfig";
import Footer from "components/layout/common/Footer";

function App(props) {
  const perpage = 1000;
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const apiLink = endPoints.portfolios.portfoliValuesList;
  let { page } = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const { details } = useSelector((state) => state.auth);
  page = typeof page === "undefined" ? 1 : parseInt(page);
  let skipPage = page - 1;

  useEffect(() => {
    const getUsers = async function getUsers() {
      Service.get(apiLink, {}, (response) => {
        if (response.data.code === 402) {
          window.location.reload();
        }

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
          label: "Date",
          field: "firstName",
          sort: "disabled",
          width: 150,
        },
        {
          label: "Account Number",
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
          label: "Account($)",
          field: "value",
          sort: "asc",
          width: 150,
        },
        {
          label: "Payment Methods",
          field: "returnValue",
          sort: "asc",
          width: 100,
        },
        {
          label: "Status",
          field: "returnRatio",
          sort: "asc",
          width: 100,
        }
      ],
      rows: newData,
    };
  }

  return (
    <Fragment>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <WelcomUser details={details} text="" />
          
          <div className="page__section funding">
          <h1>Funding</h1>
            <div className="page__section-item">
           
              <div className="container-fluid-d">
                <div className="row filterRows">
                 
                  <div className="col-md-12 text-left">
                    <div className="filter__inner__warper">
                      <form className="form-inline ml-auto  justify-content-end"></form>
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
