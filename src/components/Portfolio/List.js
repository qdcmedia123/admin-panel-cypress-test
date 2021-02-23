import React, { Fragment } from "react";
import Headerserver from "components/layout/Headers/Headerserver";
import Footer from "components/layout/common/Footer";
import { withRouter } from "react-router-dom";
import WelcomeUser from "components/common/WelcomeUser";
import { useSelector } from "react-redux";

function App(props) {
  const { details } = useSelector((state) => state.auth);
  //const [isLoading, setIsLoading] = useState();

  return (
    <Fragment>
      <Headerserver />
      <div className="container-fluid-d">
        <WelcomeUser details={details} text="Portfolio list">
          <div className="back__arrow">
            <a href={`/#/accounts/list/`}>
              <svg
                width="30"
                height="14"
                viewBox="0 0 30 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30 7L1 6.99999"
                  stroke="#525352"
                  strokeMiterlimit="10"
                />
                <path
                  d="M7 13L1 6.76923L7 1"
                  stroke="#525352"
                  strokeMiterlimit="10"
                />
              </svg>
              <span className="back-to-users">Back To {}</span>
            </a>
          </div>
        </WelcomeUser>

        <div className="padding0-30px">
          <div className="row">
            <div className="col-md-3 mb-3 background-fff cart__item__b">
              Hello content
            </div>
          </div>
        </div>

        <div className="padding0-30px">
          <div className="row">
            <div className="col-md-3 mb-3 background-fff align-self-start cart__item__b">
              <ul
                className="nav nav-pills flex-column"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="low-risk"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Low Risk
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id=" very-conservative"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Very Conservative
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="conservative"
                    data-toggle="tab"
                    href="#contact"
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                  >
                    Contact
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="balanced"
                    data-toggle="tab"
                    href="#tab-blanced"
                    role="tab"
                    aria-controls="balanced"
                    aria-selected="false"
                  >
                    Balanced
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="semi-aggressive"
                    data-toggle="tab"
                    href="#tab-semi-aggressive"
                    role="tab"
                    aria-controls="semi-aggressive"
                    aria-selected="false"
                  >
                    Semi Aggressive
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="aggressive"
                    data-toggle="tab"
                    href="#tab-aggressive"
                    role="tab"
                    aria-controls="aggressive"
                    aria-selected="false"
                  >
                    Aggressive
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="very-aggressive"
                    data-toggle="tab"
                    href="#tab-very-aggressive"
                    role="tab"
                    aria-controls="very-aggressive"
                    aria-selected="false"
                  >
                    Very Aggressive
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-9">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="low-risk"
                >
                  <div className="item__card-item">
                    <div className="item__card-info">
                      <div className="nopadding col-md-12 inline float-left text-black">
                        <h5>ETFs</h5>
                      </div>
                      <div className="ETFs__table__container">
                        <table className="noborder table-borderless table ">
                          <thead>
                            <tr>
                              <th scope="col">Symbols</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Allocation</th>
                              <th scope="col">Performance</th>
                              <th scope="col">Market Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">
                                <button className="btn btn-primary">BIV</button>
                              </th>
                              <td>0.00</td>
                              <td>12.02</td>
                              <td>
                                <span className="text-success">0.01</span>{" "}
                              </td>
                              <td>0.31</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <button className="btn btn-primary">BLV</button>
                              </th>
                              <td>0.00</td>
                              <td>21.32</td>
                              <td>
                                <span className="text-success">0.03</span>{" "}
                              </td>
                              <td>0.55</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <button className="btn btn-primary">BSV</button>
                              </th>
                              <td>0.00</td>
                              <td>5.81</td>
                              <td>
                                <span className="text-danger">0</span>{" "}
                              </td>
                              <td>0.15</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <button className="btn btn-primary">GLD</button>
                              </th>
                              <td>0.00</td>
                              <td>0</td>
                              <td>
                                <span className="text-danger">0</span>{" "}
                              </td>
                              <td>0</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <button className="btn btn-primary">VOX</button>
                              </th>
                              <td>0.01</td>
                              <td>21.71</td>
                              <td>
                                <span className="text-danger">-0.1</span>{" "}
                              </td>
                              <td>0.56</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <button className="btn btn-primary">VPL</button>
                              </th>
                              <td>0.02</td>
                              <td>39.15</td>
                              <td>
                                <span className="text-danger">-0.18</span>{" "}
                              </td>
                              <td>1.01</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="very-conservative"
                >
                  <div className="item__card-item">
                    <div className="item__card-info">
                      <h2>Profile</h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Neque, eveniet earum. Sed accusantium eligendi molestiae
                        quo hic velit nobis et, tempora placeat ratione rem
                        blanditiis voluptates vel ipsam? Facilis, earum!
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="contact"
                  role="tabpanel"
                  aria-labelledby="conservative"
                >
                  <div className="item__card-item">
                    <div className="item__card-info">
                      <h2>Contact</h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Neque, eveniet earum. Sed accusantium eligendi molestiae
                        quo hic velit nobis et, tempora placeat ratione rem
                        blanditiis voluptates vel ipsam? Facilis, earum!
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="tab-blanced"
                  role="tabpanel"
                  aria-labelledby="balanced"
                >
                  <div className="item__card-item">
                    <div className="item__card-info">
                      <h2>Balanced</h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Neque, eveniet earum. Sed accusantium eligendi molestiae
                        quo hic velit nobis et, tempora placeat ratione rem
                        blanditiis voluptates vel ipsam? Facilis, earum!
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="tab-semi-aggressive"
                  role="tabpanel"
                  aria-labelledby="semi-aggressive"
                >
                  <div className="item__card-item">
                    <div className="item__card-info">
                      <h2>semi</h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Neque, eveniet earum. Sed accusantium eligendi molestiae
                        quo hic velit nobis et, tempora placeat ratione rem
                        blanditiis voluptates vel ipsam? Facilis, earum!
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="tab-aggressive"
                  role="tabpanel"
                  aria-labelledby="aggressive"
                >
                  <div className="item__card-item">
                    <div className="item__card-info">
                      <h2>aggressi</h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Neque, eveniet earum. Sed accusantium eligendi molestiae
                        quo hic velit nobis et, tempora placeat ratione rem
                        blanditiis voluptates vel ipsam? Facilis, earum!
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="tab-very-aggressive"
                  role="tabpanel"
                  aria-labelledby="very-aggressive"
                >
                  <div className="item__card-item">
                    <div className="item__card-info">
                      <h2>very</h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Neque, eveniet earum. Sed accusantium eligendi molestiae
                        quo hic velit nobis et, tempora placeat ratione rem
                        blanditiis voluptates vel ipsam? Facilis, earum!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default withRouter(App);
