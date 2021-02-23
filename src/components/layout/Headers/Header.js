import React from "react";
import logo from "assets/img/logo.png";
function App() {
  return (
    <div className="collapse12">
      <div className="">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg ">
            <a className="navbar-brand" href="/">
              <img src={logo} alt="Wealthface" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div></div>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/#/login">
                    Sign In
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default App;
