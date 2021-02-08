import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import EmployeesNav from "./components/EmployeesNav";
import Welcome from "./components/Welcome";
import Employees from "./components/Employees";
import EmployeesGeneration from "./components/EmployeesGeneration";
import SalaryStatistics from "./components/SalaryStatistics";
import TitleStatistics from "./components/TitleStatistics";
import Search from "./components/Search";
import Toast from "react-bootstrap/Toast";
import CONFIG from "./config/config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Context } from "./common/context";
import EmployeesFireBaseHttpService from "./services/firebase/EmployeesFireBaseHttpService";

import LogIn from "./components/LogIn";
import authFireBaseService from "./services/firebase/authFireBaseService";
import { useDispatch, useSelector } from "react-redux";
import { actionUserData, actionEmployees, actionToast } from "./store/actions";
import Splashscreen from "./common/splashscreen";

function App() {
  const authService = new authFireBaseService();
  const employeesService = new EmployeesFireBaseHttpService("employees");
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const toast = useSelector((state) => state.toast);

  useEffect(() => {
    dispatch(actionToast({ display: false, message: "" }));
    authService.getUserData().subscribe((userData) => {
      dispatch(actionUserData(userData));
      if (userData.userName) {
        employeesService.getEmployees().subscribe((employees) => {
          dispatch(actionEmployees(employees));
        });
      }
      setLoading(false);
    });
  }, []);

  const callBackResetUserData = () => {
    authService.logOut();
  };

  return (
    <Context.Provider
      value={{
        callBackResetUserData,
        authService,
        employeesService,
      }}
    >
      <main>
        <Router>
          <div className="col-sm-12 col-lg-8 col-md-10 offset-lg-2 offset-md-1 mt-2 mb-2">
            <EmployeesNav />
          </div>
          <section className="col-sm-12 col-lg-8 col-md-10 offset-lg-2 offset-md-1">
            <Switch>
              <Route
                path={CONFIG.homeDir + "login/"}
                exact
                render={() => {
                  return !userData.userName ? (
                    loading ? (
                      <Splashscreen />
                    ) : (
                      <LogIn />
                    )
                  ) : (
                    <Redirect to={CONFIG.homeDir + "employees/"} />
                  );
                }}
              />
              <Route
                path={CONFIG.homeDir + "employees/"}
                exact
                render={() => {
                  return userData.userName ? (
                    <Employees />
                  ) : (
                    <Redirect to={CONFIG.homeDir + "login/"} />
                  );
                }}
              />
              <Route
                path={CONFIG.homeDir + "title/statistics/"}
                exact
                render={() => {
                  return userData.userName ? (
                    <TitleStatistics />
                  ) : (
                    <Redirect to={CONFIG.homeDir + "login/"} />
                  );
                }}
              />
              <Route
                path={CONFIG.homeDir + "search/"}
                exact
                render={() => {
                  return userData.userName ? (
                    <Search />
                  ) : (
                    <Redirect to={CONFIG.homeDir + "login/"} />
                  );
                }}
              />
              <Route
                path={CONFIG.homeDir + "generation/"}
                exact
                render={() => {
                  return userData.userName && userData.isAdmin ? (
                    <EmployeesGeneration />
                  ) : (
                    <Redirect to={CONFIG.homeDir + "login/"} />
                  );
                }}
              />
              <Route
                path={CONFIG.homeDir + "salary/statistics/"}
                exact
                render={() => {
                  return userData.userName ? (
                    <SalaryStatistics />
                  ) : (
                    <Redirect to={CONFIG.homeDir + "login/"} />
                  );
                }}
              />
              <Route
                path={CONFIG.homeDir}
                exact
                render={() => {
                  return <Welcome />;
                }}
              />
              <Route
                exact
                path="/"
                render={() =>
                  userData.userName ? (
                    <Redirect to={CONFIG.homeDir} />
                  ) : (
                    <Redirect to={CONFIG.homeDir + "login/"} />
                  )
                }
              />
            </Switch>
          </section>
        </Router>
        <Toast
          onClose={() => dispatch(actionToast({ display: false, message: "" }))}
          show={toast.display}
          delay={3000}
          autohide
          style={{
            position: "absolute",
            top: 20,
            right: 20,
          }}
        >
          <Toast.Header>
            <strong className="mr-auto">Info</strong>
          </Toast.Header>
          <Toast.Body>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <FontAwesomeIcon icon={faUserCircle} size="6x" color="blue" />
            </div>
            {toast.message}
          </Toast.Body>
        </Toast>
      </main>
    </Context.Provider>
  );
}
export default App;
