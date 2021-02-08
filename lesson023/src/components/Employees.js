import React, { Component } from "react";
import EmployeesStatistics from "./EmployeesStatistics";
import EmployeesTable from "./EmployeesTable";
import generateRandomEmployee from "../functions/random";
import _ from "lodash";
import MyModal from "./MyModal";
export default class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      max: 1,
      flStatistics: false
    };
    this.generateEmployee = this.generateEmployee.bind(this);
    this.showFlStatistics = this.showFlStatistics.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  showFlStatistics = () => {
    this.setState({
      flStatistics: this.state.flStatistics ? false : true
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
      selectedId: ""
    });
  };
  generateEmployee = () => {
    const newPerson = generateRandomEmployee(this.state.max, 5000, 35000);
    const employees = this.state.employees;
    employees.unshift(newPerson);
    this.setState({
      employees,
      max: this.state.max + 1
    });
  };
  deleteClick = id => {
    this.setState({
      open: true,
      selectedId: id
    });
  };
  deleteEmployee = () => {
    let newEmployees = this.state.employees;
    _.remove(newEmployees, employee => employee.id === this.state.selectedId);
    this.setState({
      open: false,
      employees: newEmployees
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.flStatistics ? (
          <EmployeesStatistics
            employees={this.state.employees}
            showStat={this.showFlStatistics}
          />
        ) : (
          <React.Fragment>
            <EmployeesTable
              employees={this.state.employees}
              generateEmployee={this.generateEmployee}
              deleteClick={this.deleteClick}
              showStat={this.showFlStatistics}
            />
            <MyModal
              open={this.state.open}
              onHide={this.handleClose}
              callBack={this.deleteEmployee}
              handleClose={this.handleClose}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
