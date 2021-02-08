import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
import EmployeesHttpService from "./services/EmployeesHttpService";
function App() {
  const employeesService = new EmployeesHttpService(CONFIG.jsonUrl);
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

  return (
    <Context.Provider
      value={{
        handleToast,
        employeesService,
        toast,
        CONFIG,
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
                path={CONFIG.homeDir + "employees/"}
                exact
                render={() => {
                  return <Employees />;
                }}
              />
              <Route
                path={CONFIG.homeDir + "title/statistics/"}
                exact
                render={() => {
                  return <TitleStatistics />;
                }}
              />
              <Route
                path={CONFIG.homeDir + "search/"}
                exact
                render={() => {
                  return <Search />;
                }}
              />
              <Route
                path={CONFIG.homeDir + "generation/"}
                exact
                render={() => {
                  return <EmployeesGeneration />;
                }}
              />
              <Route
                path={CONFIG.homeDir + "salary/statistics/"}
                exact
                render={() => {
                  return <SalaryStatistics />;
                }}
              />
              <Route
                path={CONFIG.homeDir}
                exact
                render={() => {
                  return <Welcome />;
                }}
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
