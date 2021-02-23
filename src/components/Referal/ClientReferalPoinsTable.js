import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import Headerserver from "components/layout/Headers/Headerserver";
import Footer from "components/layout/common/Footer";
import WelcomeUser from "components/common/WelcomeUser";
import * as Service from "components/Service/SimpleService";
import { MDBDataTableV5 } from "mdbreact";
import LoadingRelative from "components/common/LoadingRelative";
import StartBlue from "assets/img/star_blue.png";
import StartGray from "assets/img/star_gray.png";
import { getStars } from "functions/mis";
import BlueCheckedPNG from "assets/img/blue.svg";
import GrayCheckedPNG from "assets/img/gray.svg";
import times from "assets/img/times.png";
import {endPoints} from 'config/appConfig';

function App(props) {
  // Get the get params url

  const { details } = useSelector((state) => state.auth);

  const [listReferent, setlistReferent] = useState([
    {
      email: "ron@wealthface.com",
      phone: null,
      country: null,
      lastName: null,
      firstName: null,
      referralPoints: 3,
      view: "test",
    },

    {
      email: "test@wealthface.com",
      phone: null,
      country: null,
      lastName: null,
      firstName: null,
      referralPoints: 1,
      view: "test",
    },
    {
      email: "test@wealthface.com",
      phone: null,
      country: null,
      lastName: null,
      firstName: null,
      referralPoints: 10,
      view: "test",
    },
  ]);
  const [popupData, setPopUpData] = useState(null);

  const [showPoup, setShowPopUp] = useState(false);

  const [listReferentLoading, setlistReferentLoading] = useState(false);

  const showPopUp = useCallback((e, email) => {
    const dummyPopUpData = [
      
    ];

    Service.post(endPoints.referal.referredPeopleByEmail, { email: email }).then(
      (response) => {
        if (
          typeof response.data.data.result !== "undefined" &&
          response.data.data.result.length > 0
        ) {
          let { result } = response.data.data;
          let popUpData = [...result, ...dummyPopUpData];
          setPopUpData(popUpData);
          setShowPopUp(true);
        } else {
          setPopUpData(null);
          setShowPopUp(true);
        }
      }
    );
  }, []);

  const listReferentAPI = useCallback(() => {
    setlistReferentLoading(true);
    Service.get(endPoints.referal.listReferent, {}, (response) => {
      if (response.data.code === 200) {
        // we need to add the column
        const { result } = response.data.data;
        if (Object.entries(result).length > 0) {
          // add
          // Add the value to response

          let added = result.map(function (item) {
            item.view = (
              <span
                className="view__a"
                onClick={(e) => showPopUp(e, item.email)}
              >
                {" "}
                View
              </span>
            );
            item.referralPoints = getStars(
              parseInt(item.referralPoints),
              StartGray,
              StartBlue
            );
            return item;
          });

          setlistReferentLoading(false);

          setlistReferent(added);
        }
      } else {
        setlistReferentLoading(false);
        console.log(
          `response code ${response.data.code} is received from the server.`
        );
      }
    }).catch((error) => {
      setlistReferentLoading(false);
      console.log(error);
    });
  }, [showPopUp]);

  useEffect(() => {
    listReferentAPI();
  }, [listReferentAPI]);

  const data = {
    columns: [
      {
        label: "First Name",
        field: "firstName",
        sort: "asc",
        width: 50,
      },
      {
        label: "Last Name",
        field: "lastName",
        sort: "asc",
        width: 100,
      },
      {
        label: "email",
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
        label: "Referal Points",
        field: "referralPoints",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "view",
        sort: "asc",
        width: 100,
      },
    ],
    rows: listReferent,
  };

  return (
    <Fragment>
    {showPoup && (
      <div className="friend__invide__waprer">
        <img
          src={times}
          className="float-right times_fa"
          alt=""
          onClick={() => setShowPopUp(false)}
        />
        <br />
        <br /> <br />{" "}
        <div className="friend__invited__container">
          <div className="friends__invided"> Friends Invited</div>

          {popupData !== null &&
            Object.entries(popupData).length > 0 &&
            popupData.map((item, key) => (
              <div key={key} className="friend__container">
                <div className="frineds__invited_list">
                  <div className="list__items__invited">
                    <div className="email">{item.email}</div>
                    <div className="progress__bar">
                      {/*
                    Funded: 50
                      Active 100
                      Rest 0
                  */}
                      <div
                        className="progress_bar_green"
                        style={{
                          width: (() => {
                            switch (item.status) {
                              case "Funded":
                                return "25%";
                              case "Active":
                                return "100%";
                              default:
                                return "0%";
                            }
                          })(),
                        }}
                      ></div>
                    </div>

                    <div className="account__opened__funded">
                      <div className="account_opend">
                        <span className="roundBox">
                          <img src={BlueCheckedPNG} title="" alt="" />
                        </span>
                        <span className="after__icon"> Account Opened</span>
                      </div>
                      {item.status === "Funded" && (
                        <div className="funded">
                          <span className="roundBox">
                            <img src={BlueCheckedPNG} title="" alt="" />
                          </span>
                          <span className="after__icon"> Funded</span>
                        </div>
                      )}

                      {item.status !== "Funded" && (
                        <div className="funded">
                          <span className="roundBox">
                            <img src={GrayCheckedPNG} title="" alt="" />
                          </span>
                          <span className="after__icon"> Funded</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {popupData === null && (
            <div className="friend__container">
              <div className="frineds__invited_list">
                <div className="list__items__invited">No Data available.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
    <div className = {showPoup === true ? 'blur' : ''}>
      <Headerserver />
      <WelcomeUser details={details} users={true} />
      
      <div className="page__section">
        {listReferentLoading ? (
          <LoadingRelative />
        ) : (
          <div className = "mh-700">
              <div className="page__section-item">
            <div className="filter__container">
              <div className="filter__item">
                <div className="page__section-info-text">
                  <h5 className="text-dark text-bold"> Refer points table</h5>
                  <p className="padding__invite__clients text-black"></p>
                </div>
              </div>
            </div>
            <div className="filter__item"></div>

            <div className="table__container d-block">
              {listReferent !== null &&
                Object.entries(listReferent).length > 0 && (
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
                )}
            </div>
          </div>
       
          </div>
        
       )}
      </div>
      <Footer />
    </div>
    </Fragment>
  );
}

export default App;
