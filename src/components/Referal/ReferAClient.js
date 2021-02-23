import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import Headerserver from "components/layout/Headers/Headerserver";
import Footer from "components/layout/common/Footer";
import WelcomeUser from "components/common/WelcomeUser";
import * as Service from "components/Service/SimpleService";
import { MDBDataTableV5 } from "mdbreact";
import LoadingRelative from "components/common/LoadingRelative";
import BlueCheckedPNG from "assets/img/blue.svg";
import GrayCheckedPNG from "assets/img/gray.svg";
import times from "assets/img/times.png";
import {endPoints} from 'config/appConfig';

function App(props) {
  
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
  });
  const [errors, setErrors] = useState(false);
  const { details } = useSelector((state) => state.auth);
  const [formSuccessMsg, setFormSuccessMsg] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [listReferent, setlistReferent] = useState(null);
  const [listReferentLoading, setlistReferentLoading] = useState(false);
  const [popupData, setPopUpData] = useState(null);

  const [showPoup, setShowPopUp] = useState(false);

  const onchangeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const GetErrors = (properties) => {
    if (typeof errors !== "undefined") {
      // Check the length
      if (Object.keys(errors).length > 0) {
        // Get the errror
        // Check the props is exits
        if (errors.hasOwnProperty(properties)) {
          return (
            <div className="invalid-feedback-custom">{errors[properties]}</div>
          );
        }
        return false;
      }

      return false;
    }

    return false;
  };

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      setErrors([]);
      setFormSuccessMsg(false);
      const data = { to: formData.email, toName: formData.fullname };

      setProcessing(true);
      Service.post(endPoints.referal.addAdminReferralAPI, data)
        .then((response) => {
          // Check it's status
          setProcessing(false);
          if (response.data.success === true) {
            setFormData({ email: "", fullname: "" });
            setFormSuccessMsg(true);
          }

          console.log(response);
        })
        .catch((error) => {
          setProcessing(false);
          console.log("Error occured");
          // Set error
          let modifyErrors = {};
          //console.log(error.response.data);
          if (Object.keys(error.response.data).length > 0) {
            // access each data
            for (var i in error.response.data) {
              modifyErrors[i] = error.response.data[i].join(" ");
            }

            setErrors(modifyErrors);
          }
          //console.log(modifyErrors);
        });
      //console.log(formData);
    },
    [formData]
  );

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
          const added = result.map(function (item) {
            item.view = (
              <span
                className="view__a"
                onClick={(e) => showPopUp(e, item.email)}
              >
                {" "}
                View
              </span>
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
        label: "Numer of referal",
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
      <div className = {showPoup ? 'blur' : ''}>
      <Headerserver />
      <WelcomeUser details={details} users={true} />
     
      <div className = "mh-700">
      <div className="page__section">
        <div className="page__section-item">
          <div className="filter__container">
            <div className="filter__item">
              <div className="page__section-info-text">
                <h5 className="text-dark text-bold"> Refer a client</h5>
                <p className="padding__invite__clients text-black">
                  Invite clients by entering their emails and names and let them
                  know more about Wealthface
                </p>
              </div>
            </div>
          </div>
          <div className="filter__item"></div>
          <form onSubmit={submitForm} className="user-info">
            <div className="">
              {formSuccessMsg && (
                <div className="alert alert-success">
                  Invitation sent sucessfully.
                </div>
              )}

              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-1  custom-label">
                  Email
                </label>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <div className="col-sm-3">
                  <input
                    type="email"
                    className={
                      !GetErrors("email")
                        ? "form-control"
                        : "is-invalid form-control"
                    }
                    id="email"
                    value={formData.email || ""}
                    onChange={onchangeHandle}
                    name="email"
                    title="Please enter client email."
                    required
                  />
                  {GetErrors("firstName")}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-1  custom-label">
                  Name(Optional)
                </label>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <div className="col-sm-3">
                  <input
                    type="text"
                    className={
                      !GetErrors("fullname")
                        ? "form-control"
                        : "is-invalid form-control"
                    }
                    id="fullname"
                    value={formData.fullname || ""}
                    onChange={onchangeHandle}
                    name="fullname"
                    title="Please enter your name."
                    pattern="[A-Za-z ]{2,225}"
                  />
                  {GetErrors("fullname")}
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-1  custom-label"
                ></label>

                <div className="col-sm-3">
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <button type="submit" className="nomargin btn btn-primary">
                    {" "}
                    {processing ? (
                      <div class="spinner-grow" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {listReferentLoading ? (
          <LoadingRelative />
        ) : (
          <div className="page__section-item">
            <div className="filter__container">
              <div className="filter__item">
                <div className="page__section-info-text">
                  <h5 className="text-dark text-bold"> Refer points table</h5>
                  <p className="padding__invite__clients text-black"></p>
                </div>
                {/*
const starts = new Array(5).fill(false);
const point = 2;
if(starts.length === 0) return starts;

for(var j = 1; j <= starts.length ; j++) {
	if(point  === j){
	 for(var i = 0; i < point; ++i) {
	 	starts[i] = true;
	 }
	 break;
} 
}
              */}
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
        )}
      </div>
     
      </div>
     
      <Footer />
      </div>
    
    </Fragment>
  );
}

export default App;
