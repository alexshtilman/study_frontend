import React, { Component } from "react";
import InputTextElement from "./InputTextElement";
import CONFIG from "../validationConfig.json";
import generateRandomEmployee from "../functions/random";

export default class EmployeesGeneration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: this.props.employees,
      count: { value: 0, hasError: 0 },
      complete: false,
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.generateEmployee = this.generateEmployee.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  generateEmployee = (min, max) => {
    const newPerson = generateRandomEmployee(min, max);
    const employees = this.state.employees;
    const ind = employees.findIndex((e) => e.id === newPerson.id);
    if (ind < 0) {
      employees.unshift(newPerson);
      this.setState({
        employees,
      });
    } else this.generateEmployee(min, max);
  };
  submitHandler = (event) => {
    event.preventDefault();
    let submitConfirm = true;
    if (this.state.count.hasError !== -1) submitConfirm = false;
    if (submitConfirm) {
      for (let i = 0; i < this.state.count.value; i++)
        this.generateEmployee(
          CONFIG.formValidationValues.salary.min,
          CONFIG.formValidationValues.salary.max
        );

      this.props.handleUpdate(this.state.employees);
      this.setState({
        complete: `${this.state.count.value} employees added!`,
        count: { value: 0, hasError: 0 },
        employees: this.props.employees,
      });
    } else {
      this.setState({
        message: "",
        count: {
          value: this.state.count.value,
          hasError: this.state.count.hasError !== -1 ? 1 : -1,
        },
      });
    }
  };
  handleChange = (e) => {
    if (e.target.value === "") {
      this.setState({
        ...this.state,
        [e.target.name]: {
          value: e.target.value,
          hasError: 0,
        },
      });
    } else {
      if (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 100) {
        this.setState({
          ...this.state,
          [e.target.name]: {
            value: e.target.value,
            hasError: -1,
          },
        });
      } else {
        this.setState({
          ...this.state,
          [e.target.name]: {
            value: e.target.value,
            hasError: 1,
          },
        });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-sm-8">
          <div className="card">
            <div className="card-header">
              <h2>Generate employees</h2>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                Digits in id: {CONFIG.formValidationValues.id}
                <br />
                Min salary: {CONFIG.formValidationValues.salary.min}
                <br />
                Max salary: {CONFIG.formValidationValues.salary.max}
                <br />
                Current employees count: {this.props.employees.length}
                <br />
              </div>
              <form id="employeeForm" onSubmit={this.submitHandler}>
                <div className="row">
                  <InputTextElement
                    name="count"
                    title="Employee count"
                    hasError={this.state.count.hasError}
                    handleChange={this.handleChange}
                    value={this.state.count.value}
                    invalidText={"Please type number in range [1-99]"}
                  />

                  <div className="form-group col-xl-6 col-sm-12 pt-4">
                    <button className="btn btn-success m-2" type="submit">
                      Generate
                    </button>
                  </div>
                </div>
              </form>
              {this.state.complete ? (
                <div className="alert alert-success">{this.state.complete}</div>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
