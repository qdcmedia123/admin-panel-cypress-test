<ul className="navbar-nav">
  {/* Check if list leads is enabled */}
  {listLead ? (
    <li className="nav-item dropdown">
      <a href="!#" className=" nav-link dropdown-toggle" data-toggle="dropdown">
        Leads<b className="caret"></b>
      </a>
      <ul className="dropdown-menu multi-level">
        <li className="dropdown-submenu">
          <a className="dropdown-item" href="/#/leads/list/all">
            List
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="/#/leads/list/usa">
                USA
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/#/leads/list/uae">
                UAE
              </a>
            </li>

            <li>
              <a className="dropdown-item" href="/#/leads/list/all">
                All
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  ) : (
    <Fragment></Fragment>
  )}

  {listClients ? (
    <li className="nav-item dropdown">
      <a href="!#" className=" nav-link dropdown-toggle" data-toggle="dropdown">
        Clients <b className="caret"></b>
      </a>
      <ul className="dropdown-menu multi-level">
        <li className="dropdown-submenu">
          <a onClick={falseReturn} className="dropdown-item" href="!#">
            List
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="/#/accounts/list/usa">
                USA
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/#/accounts/list/uae">
                UAE
              </a>
            </li>

            <li>
              <a className="dropdown-item" href="/#/accounts/list/all">
                All
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  ) : (
    <Fragment></Fragment>
  )}

  {listCompliance ? (
    <li className="nav-item dropdown">
      <a href="!#" className=" nav-link dropdown-toggle" data-toggle="dropdown">
        Compliance<b className="caret"></b>
      </a>

      <ul className="dropdown-menu multi-level">
        <li className="dropdown-submenu">
          <a onClick={falseReturn} className="dropdown-item" href="#!">
            List
          </a>
          <ul className="dropdown-menu">
            {!complianceUAEOnly && (
              <li>
                <a className="dropdown-item" href="/#/compliance/list/usa">
                  USA
                </a>
              </li>
            )}

            <li>
              <a className="dropdown-item" href="/#/compliance/list/uae">
                UAE
              </a>
            </li>

            {!complianceUAEOnly && (
              <li>
                <a className="dropdown-item" href="/#/compliance/list/all">
                  All
                </a>
              </li>
            )}
          </ul>
        </li>
        <li className="dropdown"></li>
        <a
          className="dropdown-item"
          href="/#/compliance/risk_assessment_matrix"
        >
          {" "}
          Risk Assessment Matrix
        </a>
      </ul>
    </li>
  ) : (
    <Fragment></Fragment>
  )}

  {/* User managment */}

  {showUsers ? (
    <li className="nav-item dropdown">
      <a href="!#" className=" nav-link dropdown-toggle" data-toggle="dropdown">
        User Managment<b className="caret"></b>
      </a>

      <ul className="dropdown-menu multi-level">
        {createUser ? (
          <li>
            <a className="dropdown-item" href="/#/user/create_user">
              Create User
            </a>
          </li>
        ) : (
          <Fragment></Fragment>
        )}

        <li>
          <a className="dropdown-item" href="/#/users/list">
            List Users
          </a>
        </li>
      </ul>
    </li>
  ) : (
    <Fragment></Fragment>
  )}

  {listPortfolio ? (
    <li className="nav-item dropdown">
      <a href="!#" className=" nav-link dropdown-toggle" data-toggle="dropdown">
        Portfolio<b className="caret"></b>
      </a>

      <ul className="dropdown-menu multi-level">
        <li>
          <a className="dropdown-item" href="/#/portfolio/list">
            List
          </a>
        </li>
      </ul>
    </li>
  ) : (
    <Fragment></Fragment>
  )}

  <li className="nav-item">
    <a onClick={props.logoutUser} className="nav-link" href="/">
      Logout &nbsp;
      <i className="fa fa-sign-out-alt fa-lg" aria-hidden="true"></i>
    </a>
  </li>

  <li className="nav-item">
    <a onClick={falseReturn} className="nav-link" href="!#">
      <i className="fa fa-bell fa-lg" aria-hidden="true"></i>
    </a>
  </li>
</ul>;
