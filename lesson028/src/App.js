import "./App.css";
import React, { useEffect } from "react";
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
  const [employees, setEmployees] = React.useState([]);
  const employeesService = new EmployeesHttpService(CONFIG.jsonUrl);
  let subscription;
  const getEmployees = () => {
    subscription = employeesService.getEmployees().subscribe(
      (response) => {
        if (response) {
          if (response.length > 0) setEmployees(response);
          else setEmployees([]);
        } else setEmployees([]);
      },
      (error) => {
        alert(
          `\nConnection to JSON server refused!\n\n\nCheck that ${CONFIG.jsonUrl} is running!`
        );
      }
    );
  };
  useEffect(() => {
    getEmployees();
    return () => {
      if (subscription && !subscription.closed) subscription.unsubscribe();
    };
  }, [subscription]);

  const [toast, setToast] = React.useState({
    display: false,
    message: "",
  });
  const [sortUsed, setSortUsed] = React.useState("");

  const handleToast = (message) => {
    setToast({
      display: !toast.display,
      message,
    });
  };
  const handleUpdate = (employees) => {
    // setEmployees(employees);
  };
  const useSort = (currentSort, order) => {
    if (order === "asc") {
      let newEmp = employees.sort((a, b) => {
        if (a[currentSort] > b[currentSort]) {
          return 1;
        }
        if (a[currentSort] < b[currentSort]) {
          return -1;
        }

        return 0;
      });
      //setEmployees(newEmp);
      setSortUsed(currentSort + "_" + order);
    } else {
      let newEmp = employees.sort((a, b) => {
        if (a[currentSort] > b[currentSort]) {
          return -1;
        }
        if (a[currentSort] < b[currentSort]) {
          return 1;
        }
        return 0;
      });
      //setEmployees(newEmp);
      setSortUsed(currentSort + "_" + order);
    }
  };
  return (
    <Context.Provider
      value={{
        handleToast,
        handleUpdate,
        useSort,
        getEmployees,
        employeesService,
        sortUsed,
        toast,
        employees,
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
                  return <Employees employees={employees} />;
                }}
              />
              <Route
                path={CONFIG.homeDir + "title/statistics/"}
                exact
                render={() => {
                  return <TitleStatistics employees={employees} />;
                }}
              />
              <Route
                path={CONFIG.homeDir + "search/"}
                exact
                render={() => {
                  return <Search employees={employees} />;
                }}
              />
              <Route
                path={CONFIG.homeDir + "generation/"}
                exact
                render={() => {
                  return (
                    <EmployeesGeneration
                      employees={employees}
                      handleUpdate={handleUpdate}
                    />
                  );
                }}
              />
              <Route
                path={CONFIG.homeDir + "salary/statistics/"}
                exact
                render={() => {
                  return <SalaryStatistics employees={employees} />;
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
