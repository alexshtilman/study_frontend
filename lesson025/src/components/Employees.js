import React, { Component } from "react";
import EmployeesTable from "./EmployeesTable";
import generateRandomEmployee from "../functions/random";
import MyModal from "./MyModal";
import _ from "lodash";
import EmployeeForm from "./EmployeeForm";

import CONFIG from "../validationConfig.json";

export default class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: this.props.employees,
      max: 1,
      showFrom: false,
      open: false,
      selectedId: "",
      id: { value: "", hasError: 0, exists: "" },
      name: { value: "", hasError: 0 },
      emailAddress: { value: "", hasError: 0 },
      gender: { value: "", hasError: 0 },
      title: { value: "", hasError: 0 },
      salary: { value: "", hasError: 0 },
    };
    this.generateEmployee = this.generateEmployee.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowForm = this.handleShowForm.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.callBackRate = this.callBackRate.bind(this);
  }

  handleShowForm = () => {
    this.setState({
      showFrom: this.state.showFrom ? false : true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      selectedId: "",
    });
  };
  updateEmployee = () => {
    this.props.handleUpdate(this.state.employees);
  };
  addEmployee = (newEmployee) => {
    const employees = this.state.employees;

    const ind = employees.findIndex(
      (e) => e.id === parseInt(newEmployee.id.value)
    );

    if (ind < 0) {
      const emp = {
        id: parseInt(newEmployee.id.value),
        name: newEmployee.name.value,
        emailAddress: newEmployee.emailAddress.value,
        gender: newEmployee.gender.value,
        title: newEmployee.title.value,
        salary: parseInt(newEmployee.salary.value),
        rate: 5,
        stars: [0, 0, 0, 0, 0],
      };
      employees.unshift(emp);
      this.setState({
        open: false,
        employees,
        max: this.state.max + 1,
      });
      this.updateEmployee();
      return false;
    } else return `employee with id ${newEmployee.id.value} already exist`;
  };
  generateEmployee = (min, max) => {
    const newPerson = generateRandomEmployee(min, max);
    const employees = this.state.employees;
    const ind = employees.findIndex((e) => e.id === newPerson.id);
    if (ind < 0) {
      employees.unshift(newPerson);
      this.setState({
        employees,
      });
      this.updateEmployee();
    } else this.generateEmployee(min, max);
  };
  deleteClick = (id) => {
    this.setState({
      open: true,
      selectedId: id,
    });
  };
  deleteEmployee = () => {
    let newEmployees = this.state.employees;
    _.remove(newEmployees, (employee) => employee.id === this.state.selectedId);
    this.setState({
      open: false,
      employees: newEmployees,
    });
    this.updateEmployee();
  };
  componentDidMount() {
    this.setState({ showFrom: false });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.showFrom && prevState.showFrom)
      this.setState({
        showFrom: false,
      });
  }
  callBackRate = (rate, id) => {
    let employees = this.state.employees;
    const ind = employees.findIndex((e) => e.id === parseInt(id));
    let stars = [0, 0, 0, 0, 0];
    for (let i = rate; i < 5; i++) stars[i] = 1;
    employees[ind].rate = rate;
    employees[ind].stars = stars.reverse();
    this.setState({
      employees: employees,
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.showFrom ? (
          <EmployeeForm
            employees={this.state.employees}
            handleUpdate={this.updateEmployee}
            showAddEmployee={this.handleShowForm}
            addEmployee={this.addEmployee}
          />
        ) : (
          <React.Fragment>
            <div className="col-sm-8">
              <div className="card">
                <div className="card-header">
                  <h2>Show employees</h2>
                </div>
                <div className="card-body">
                  <div className="tableWrap">
                    <EmployeesTable
                      employees={this.state.employees}
                      deleteClick={this.deleteClick}
                      callBack={this.callBackRate}
                      readOnly={false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid mt-2">
              <div className="row">
                <div className="col-sm-8 offset-sm-2">
                  <div className="card">
                    <div className="card-header">
                      <button
                        className="btn btn-primary m-2"
                        onClick={() =>
                          this.generateEmployee(
                            CONFIG.formValidationValues.salary.min,
                            CONFIG.formValidationValues.salary.max
                          )
                        }
                      >
                        Add random employee
                        <i className="fa fa-random ml-2" />
                      </button>
                      <button
                        className="btn btn-success m-2"
                        onClick={this.handleShowForm}
                      >
                        Add employee
                        <i className="fa fa-plus-circle ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
