import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";
import Login from "components/layout/Login";
import jwt_decode from "jwt-decode";
import setAuthToken from "utils/setAuthToken";
import Root from './Root';

import {
  setCurrentUser,
  logoutUser,
  setUserDetails,
} from "actions/authActions";
import PrivateRoute from "components/common/PrivateRoute";
import Dashboard from "components/layout/dashboard/dashboard";
import PrivateRouteAdmin from "components/common/PrivateRouteAdmin";
import Users from "components/complience/Users";
import UserUAE from "components/complience/Usersuae";
import ListUsersRegulationUSA from "components/complience/List";
import ListUsersRegulationUAE from "components/complience/ListUsersUae";
import ListAllUsers from "components/complience/ListAllUsers";
import LeadsUSA from "components/complience/LeadsUSA";
import LeadsAll from "components/complience/LeadsAll";
import LeadsUAE from "components/complience/LeadsUAE";
import Usersall from "components/complience/Usersall";
import Createuser from "components/layout/admin/Createuser";
import ListUsers from "components/Users/ListUser";
import ChangePassword from "components/Users/ChangePassword";
import ComplienceDetails from "components/complience/Details";
import CreateUser from "components/Users/CreateUser";
import CreateIFAUser from "components/Users/CreateIFAUser";
import AllAccounts from "components/Accounts/All";
import AccountsDetails from "components/Accounts/AccountDetails";
import ClientReport from 'components/Accounts/Report';
import RiskAssessmentMatrix from "components/RiskAssessment/RiskAssessmentMatrix";
import PortfolioListTemplate from "components/Portfolio/List";
import PortfolioList from "components/Portfolio/PortfolioList";
import PortfolioAllocation from "components/Portfolio/PortfolioAllocation";
import DashboardPieChart from "components/layout/dashboard/PieChart";
import ReferAClient from "components/Referal/ReferAClient";
import ClientReferalPointsTable from "components/Referal/ClientReferalPoinsTable";
import Trade from 'components/Trade'
import ReportFunding from 'components/Funding';
import TradeLeads from 'components/Trade/Leads';

import ListIFAUsers from "components/Users/ListIFAUsers";
import UploadClientIdentity from "components/RiskAssessment/UploadClientIdentity";

// Funding 
import Funding from "components/complience/Funding";
import AccountApproval from "components/complience/AccountApproval";

import "assets/css/styles.css";
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  const userDetails = localStorage.userDetails;
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(setUserDetails(JSON.parse(userDetails)));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/#/login";
  }
}
let history;
function App() {
  return (
    <Root>
      <Router basename="/" history={history}>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRouteAdmin
              exact
              path="/compliance/list/usa"
              component={Users}
              requiredPermission={[
                "admin",
                "account_manager",
                "senior_account_manager",
                "list_compliance",
                "list_clients",
              ]}
            />
            <PrivateRouteAdmin
              exact
              path="/compliance/list/uae"
              component={UserUAE}
              requiredPermission={[
                "admin",
                "account_manager",
                "senior_account_manager",
                "list_compliance",
                "list_clients",
              ]}
            />
            <PrivateRouteAdmin
              exact
              path="/compliance/list/all"
              component={Usersall}
              requiredPermission={[
                "admin",
                "account_manager",
                "senior_account_manager",
                "list_compliance",
                "list_clients",
              ]}
            />
            <PrivateRouteAdmin
              exact
              path="/users/list/usa"
              component={ListUsersRegulationUSA}
              requiredPermission={[
                "admin",
                "account_manager",
                "senior_account_manager",
                "list_clients",
              ]}
            />
            <PrivateRouteAdmin
              exact
              path="/users/list/uae"
              component={ListUsersRegulationUAE}
              requiredPermission={[
                "admin",
                "account_manager",
                "senior_account_manager",
                "list_clients",
              ]}
            />
            <PrivateRouteAdmin
              exact
              path="/users/list/all"
              component={ListAllUsers}
              requiredPermission={[
                "admin",
                "account_manager",
                "senior_account_manager",
                "list_clients",
              ]}
            />
            <PrivateRouteAdmin
              exact
              path="/leads/list/usa"
              component={LeadsUSA}
              requiredPermission={["list_leads"]}
            />
            <PrivateRouteAdmin
              exact
              path="/leads/list/uae"
              component={LeadsUAE}
              requiredPermission={["list_leads"]}
            />
            <PrivateRouteAdmin
              exact
              path="/leads/list/all"
              component={LeadsAll}
              requiredPermission={["list_leads"]}
            />
            {}
            <PrivateRouteAdmin
              exact
              path="/complience/create"
              component={Createuser}
              requiredPermission={["admin", "account_manager"]}
            />
            <PrivateRouteAdmin
              exact
              path="/details/:regulation/:email/:risk_factor"
              component={ComplienceDetails}
              requiredPermission={[
                "admin",
                "account_manager",
                "senior_account_manager",
                "list_compliance",
              ]}
            />
            {}
            <PrivateRouteAdmin
              exact
              path="/user/create_user"
              component={CreateUser}
              requiredPermission={[
                "admin",
                "account_manager",
                "senior_account_manager",
                "list_compliance",
              ]}
            />
            <PrivateRouteAdmin
              exact
              path="/user/create_user/:email"
              component={CreateUser}
              requiredPermission={[
                "admin",
                "account_manager",
                "senior_account_manager",
                "list_compliance",
              ]}
            />
            
            <PrivateRouteAdmin
              exact
              path="/user/change_password/:email"
              component={ChangePassword}
              requiredPermission={[
                "admin",
                "account_manager",
                "senior_account_manager",
                "list_compliance",
              ]}
            />
            
            <PrivateRouteAdmin
              exact
              path="/users/list"
              component={ListUsers}
              requiredPermission={[
                "admin",
                "account_manager",
                "senior_account_manager",
                "list_compliance",
              ]}
            />
          <PrivateRoute 
              exact
              path="/user/create_ifa_user"
              component={CreateIFAUser}
              requiredPermission={[
                "admin"
              ]}
            />

          <PrivateRouteAdmin
              exact
              path="/users/list_ifa"
              component={ListIFAUsers}
              requiredPermission={[
                "list_ifa_users"
              ]}
            />


          <PrivateRouteAdmin
              exact
              path="/user/create_ifa_user/:email"
              component={CreateIFAUser}
              requiredPermission={[
                "update_ifa_user"
              ]}
            />

            
            <PrivateRouteAdmin
              exact
              path="/accounts/list/:regulation"
              component={AllAccounts}
              requiredPermission={["list_clients"]}
            />
            <PrivateRouteAdmin
              exact
              path="/account/details/:id"
              component={AccountsDetails}
              requiredPermission={["list_clients"]}
            />
            <PrivateRouteAdmin
              exact
              path="/compliance/risk_assessment_matrix"
              component={RiskAssessmentMatrix}
              requiredPermission={["admin"]}
            />
            <PrivateRouteAdmin
              exact
              path="/portfolio/list"
              component={PortfolioList}
              requiredPermission={["list_listProtfolio"]}
            />
            <PrivateRouteAdmin
              exact
              path="/portfolio/list_template"
              component={PortfolioListTemplate}
              requiredPermission={["admin"]}
            />
            <PrivateRouteAdmin
              exact
              path="/portfolio/portfolio_allocation"
              component={PortfolioAllocation}
              requiredPermission={["admin"]}
            />
            <PrivateRouteAdmin
              exact
              path="/charts/pieCharts"
              component={DashboardPieChart}
              requiredPermission={["admin"]}
            />
            <PrivateRouteAdmin
              exact
              path="/referal/refer_a_client"
              component={ReferAClient}
              requiredPermission={["admin"]}
            />
            <PrivateRouteAdmin
              exact
              path="/referal/client_referal_points_table"
              component={ClientReferalPointsTable}
              requiredPermission={["admin"]}
            />
          <PrivateRouteAdmin
              exact
              path="/trade"
              component={Trade}
              requiredPermission={["admin"]}
            />
<PrivateRouteAdmin
              exact
              path="/trade/leads"
              component={TradeLeads}
              requiredPermission={["admin"]}
            />
<PrivateRouteAdmin
              exact
              path="/accounts/report"
              component={ClientReport}
              requiredPermission={["admin"]}
            />
            <PrivateRouteAdmin
              exact
              path="/report/funding"
              component={ReportFunding}
              requiredPermission={["admin"]}
            />

          <PrivateRouteAdmin
              exact
              path="/risk_assessment/upload_client_identity/:email"
              component={UploadClientIdentity}
              requiredPermission={["upload_client_documents"]}
            />
<PrivateRouteAdmin
              exact
              path="/compliance/funding"
              component={Funding}
              requiredPermission={["admin"]}
            />
            
            <PrivateRouteAdmin
              exact
              path="/compliance/account_approval"
              component={AccountApproval}
              requiredPermission={["admin"]}
            />

            

          </Switch>
        </div>
      </Router>
    </Root>
  );
}
export default App;
