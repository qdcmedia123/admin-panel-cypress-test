import React, { Fragment, useState, useEffect, useCallback } from "react";
import Headerserver from "components/layout/Headers/Headerserver";
import WelcomeUser from "components/common/WelcomeUser";
import Loading from "components/common/Loading";
import { useSelector } from "react-redux";
import * as Service from "components/Service/SimpleService";
import { MDBDataTable } from "mdbreact";
import NoDataFound from "components/common/NoDataFound";
import { findGetParamater } from "functions/mis";

function App(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState();
  const { details } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState();

  const getParamsStr = props.location.search.substr(1);
  let updatedUser = findGetParamater("userUpdated", getParamsStr);

  // Check if page came from updated user
  const isPageFromUpdatedUser = () => {
    // history.action === POP
    if (props.history.action === "PUSH" && updatedUser === "1") {
      // This is udpate page
      return true;
    }

    return false;
  };
  // Get users
  const ListUsers = useCallback(() => {
    setErrors(null);
    setIsLoading(true);
    Service.get("/api/v1/listUsers", {}, (response) => {
      if (response.data.success === true && response.data.code === 200) {
        // Set the data
        //console.log(response);
        setUsers(response.data.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setErrors(response.data.errors.join(""));
      }
    }).catch((error) => {
      //console.log(error)
    });
  }, []);

  // Get user in mdb table
  const getUsersInMDBTable = useCallback(() => {
    // Check the user
    if (typeof users !== "undefined" && Object.keys(users).length > 0) {
      // Get the users

      // Here we need to update our object
      // Firstname and lastname need to put
      // on action button need to add action button

      // let filter
      const filterModifiedData = users.result.filter((item) => {
        return (item.action = (
          <a
            className="btn btn-primary"
            href={"/#/user/create_user/" + item.email}
          >
            Details
          </a>
        ));
      });

      if (filterModifiedData.length > 0) {
        //<MDBDataTable striped bordered hover data={users.result} />
        const data = {
          columns: [
            {
              label: "Full Name",
              field: "fullname",
              sort: "asc",
              width: 50,
            },
            {
              label: "Email",
              field: "email",
              sort: "asc",
              width: "10px",
            },
            {
              label: "enabled",
              field: "enabled",
              sort: "asc",
              width: 50,
            },
            {
              label: "role",
              field: "role",
              sort: "asc",
              width: 30,
            },
            {
              label: "Action",
              field: "action",
              sort: "asc",
              width: 30,
            },
          ],
          rows: filterModifiedData,
        };

        return <MDBDataTable striped bordered hover data={data} />;
      } else {
        return <NoDataFound />;
      }
    } else {
      return null;
    }
  }, [users]);

  useEffect(() => {
    ListUsers();
  }, [ListUsers]);

  return (
    <Fragment>
      <Headerserver />
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <WelcomeUser details={details} text="Users" users={true} />

          <div className="page__section">
            {isPageFromUpdatedUser() !== false ? (
              <div className="alert alert-success">
                Your changes has been saved
              </div>
            ) : (
              <Fragment></Fragment>
            )}

            {errors && (
              <div className="alert alert-danger">
                Something went wrong. Check HTTP request.
              </div>
            )}
            <div className="page__section-item">
              <div className="filter__container">
                <div className="filter__item"></div>
                <div className="page__section-info-text">
                  <h5>
                    {typeof users !== "undefined" ? (
                      <Fragment>{users.totalUsers}</Fragment>
                    ) : (
                      <Fragment></Fragment>
                    )}
                    &nbsp; Users
                  </h5>
                </div>
                <div className="filter__item-select-warp"></div>
                <div className="filter__item-select-wrap"></div>
              </div>
              <div className="table__container">{getUsersInMDBTable()}</div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;
