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
      flStatistics: false,
      open: false,
      selectedId: "",
      action: "add",
      id: { value: "", hasError: 0, exists: "" },
      name: { value: "", hasError: 0 },
      emailAddress: { value: "", hasError: 0 },
      gender: { value: "", hasError: 0 },
      title: { value: "", hasError: 0 },
      salary: { value: "", hasError: 0 }
    };
    this.generateEmployee = this.generateEmployee.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
    this.showFlStatistics = this.showFlStatistics.bind(this);
    this.showAddEmployee = this.showAddEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  showFlStatistics = () => {
    this.setState({
      flStatistics: this.state.flStatistics ? false : true
    });
  };
  showAddEmployee = () => {
    this.setState({
      open: true,
      action: "add"
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
      selectedId: ""
    });
  };
  addEmployee = newEmployee => {
    const employees = this.state.employees;

    const ind = employees.findIndex(
      e => e.id === parseInt(newEmployee.id.value)
    );

    if (ind < 0) {
      const emp = {
        id: parseInt(newEmployee.id.value),
        name: newEmployee.name.value,
        emailAddress: newEmployee.emailAddress.value,
        gender: newEmployee.gender.value,
        title: newEmployee.title.value,
        salary: parseInt(newEmployee.salary.value)
      };
      employees.unshift(emp);
      this.setState({
        open: false,
        employees,
        max: this.state.max + 1
      });
      return false;
    } else return `employee with id ${newEmployee.id.value} already exist`;
  };
  generateEmployee = () => {
    const newPerson = generateRandomEmployee(5000, 35000);
    const employees = this.state.employees;
    const ind = employees.findIndex(e => e.id === newPerson.id);
    if (ind < 0) {
      employees.unshift(newPerson);
      this.setState({
        employees
      });
    } else generateRandomEmployee();
  };
  deleteClick = id => {
    this.setState({
      open: true,
      action: "delete",
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
              showAddEmployee={this.showAddEmployee}
              generateEmployee={this.generateEmployee}
              deleteClick={this.deleteClick}
              showStat={this.showFlStatistics}
            />
            <MyModal
              open={this.state.open}
              action={this.state.action}
              onHide={this.handleClose}
              callBack={
                this.state.action === "delete"
                  ? this.deleteEmployee
                  : this.addEmployee
              }
              handleClose={this.handleClose}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
