import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import EmployeesNav from "./components/EmployeesNav";
import Welcome from "./components/Welcome";
import Employees from "./components/Employees";
import EmployeesGeneration from "./components/EmployeesGeneration";
import SalaryStatistics from "./components/SalaryStatistics";
import TitleStatistics from "./components/TitleStatistics";
import Search from "./components/Search";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleUpdate = (employees) => {
    this.setState({
      employees,
    });
  };

  render() {
    return (
      <main>
        <Router>
          <EmployeesNav />
          <section className="row justify-content-md-center">
            <Switch>
              <Route
                path="/lesson025/employees"
                exact
                render={() => {
                  return (
                    <Employees
                      employees={this.state.employees}
                      handleUpdate={this.handleUpdate}
                    />
                  );
                }}
              />
              <Route
                path="/lesson025/title/statistics"
                exact
                render={() => {
                  return <TitleStatistics employees={this.state.employees} />;
                }}
              />
              <Route
                path="/lesson025/search"
                exact
                render={() => {
                  return <Search employees={this.state.employees} />;
                }}
              />
              <Route
                path="/lesson025/generation"
                exact
                render={() => {
                  return (
                    <EmployeesGeneration
                      employees={this.state.employees}
                      handleUpdate={this.handleUpdate}
                    />
                  );
                }}
              />
              <Route
                path="/lesson025/salary/statistics"
                exact
                render={() => {
                  return <SalaryStatistics employees={this.state.employees} />;
                }}
              />
              <Route
                path="/lesson025/"
                exact
                render={() => {
                  return <Welcome />;
                }}
              />
            </Switch>
          </section>
        </Router>
      </main>
    );
  }
}
export default App;
