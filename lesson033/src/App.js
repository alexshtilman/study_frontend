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
import CONFIG from "./config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Context } from "./common/context";
import EmployeesFireBaseHttpService from "./services/firebase/EmployeesFireBaseHttpService";
import AuthJwtService from "./services/json/AuthJwtService";
import LogIn from "./components/LogIn";
import authFireBaseService from "./services/firebase/authFireBaseService";

function App() {
  //const authService = new AuthJwtService(CONFIG.baseUrl);
  const authService = new authFireBaseService();
  const employeesService = new EmployeesFireBaseHttpService("employees"); //new EmployeesHttpService(CONFIG.employeeUrl);

  const [userData, setUserData] = React.useState({});

  const [noConnection, setNoConnection] = React.useState("");

  const callBacksetNoConnection = (msg) => {
    setNoConnection(msg);
  };
  useEffect(() => {
    let userData = authService
      .getUserData()
      .subscribe((response) => setUserData(response));
    return () => {
      userData.unsubscribe();
    };
  }, []);

  const callBackSetUserData = (newData) => {
    // localStorage.setItem(CONFIG.accessToken, jwt);
    //let user = authService.getLogin();
    //setUserData(newData);
    authService.getUserData().subscribe((response) => setUserData(response));
  };
  const callBackResetUserData = () => {
    authService.logOut();
    setUserData("");
  };
  const [toast, setToast] = React.useState({
    display: false,
    message: "",
  });

  const handleToast = (message) => {
    setToast({
      display: !toast.display,
      message,
    });
  };
  // useEffect(() => {}, [authService]);
  return (
    <Context.Provider
      value={{
        handleToast,
        callBackSetUserData,
        callBackResetUserData,
        callBacksetNoConnection,
        authService,
        employeesService,
        toast,
        userData,
        noConnection,
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
                    <LogIn />
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
          onClose={() => handleToast("")}
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
