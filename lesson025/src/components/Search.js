import React, { Component } from "react";
import EmployeesTable from "./EmployeesTable";
import InputTextElement from "./InputTextElement";
import InputSelectElement from "./InputSelectElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import NoData from "./NoData";

import CONFIG from "../validationConfig.json";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employeesSearch: [],
      title: { value: "", hasError: 0 },
      minSalary: { value: "", hasError: 0 },
      maxSalary: { value: "", hasError: 0 },
      searchResultStr: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleSalaryChange = this.handleSalaryChange.bind(this);
  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: {
        value: e.target.value,
        hasError: -1,
      },
    });
  };
  handleSalaryChange = (e) => {
    if (e.target.value === "") {
      this.setState({
        ...this.state,
        [e.target.name]: {
          value: e.target.value,
          hasError: 0,
        },
      });
    } else {
      const numberFormat = /^[0-9]*$/gm;
      if (numberFormat.test(e.target.value)) {
        if (
          e.target.value >= 0 &&
          e.target.value <= CONFIG.formValidationValues.salary.max
        ) {
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

  submitHandler = (event) => {
    event.preventDefault();
    const minSalary =
      parseInt(this.state.minSalary.value) > 0
        ? parseFloat(this.state.minSalary.value) >
          parseFloat(this.state.maxSalary.value)
          ? 0
          : parseFloat(this.state.minSalary.value)
        : 0;
    const maxSalary =
      this.state.maxSalary.value || CONFIG.formValidationValues.salary.max;
    const employees = this.props.employees;
    let searchResult;
    let searchResultStr = "";
    if (
      this.state.title.value === "" ||
      this.state.title.value === "select title..."
    ) {
      searchResult = employees.filter((employee) => {
        return employee.salary > minSalary && employee.salary < maxSalary;
      });
      searchResultStr = `salary in range [${minSalary}, ${maxSalary}]`;
    } else {
      searchResultStr = `name = ${this.state.title.value} and salary in range [${minSalary}, ${maxSalary}]`;
      searchResult = employees.filter((employee) => {
        return (
          employee.salary > minSalary &&
          employee.salary < maxSalary &&
          employee.title === this.state.title.value
        );
      });
    }
    this.setState({
      employeesSearch: searchResult,
      name: { value: "", hasError: 0 },
      minSalary: { value: "", hasError: 0 },
      maxSalary: { value: "", hasError: 0 },
      searchResultStr,
    });
  };
  render() {
    const titleOptions = [
      { text: "select title..." },
      { text: "Developer" },
      { text: "Development Manager" },
      { text: "QA Tester" },
      { text: "QA Manager" },
      { text: "Sales Person" },
      { text: "Sales Manager" },
    ];
    return (
      <React.Fragment>
        <div className="col-sm-8">
          <div className="card">
            <div className="card-header">
              <h2>Search employees</h2>
            </div>
            <div className="card-body">
              <form id="employeeForm" onSubmit={this.submitHandler}>
                <div>
                  <div className="row">
                    <div className="form-group col-xl-4 col-sm-12">
                      <InputSelectElement
                        name="title"
                        text="Employee title"
                        hasError={this.state.title.hasError}
                        handleChange={this.handleChange}
                        options={titleOptions}
                        invalidText="Please select title"
                      />
                    </div>

                    <InputTextElement
                      name="minSalary"
                      title="Min salary"
                      hasError={this.state.minSalary.hasError}
                      handleChange={this.handleSalaryChange}
                      value={this.state.minSalary.value}
                      invalidText={`Please type digit in range [0-${CONFIG.formValidationValues.salary.max}]`}
                    />

                    <InputTextElement
                      name="maxSalary"
                      title="Max salary"
                      hasError={this.state.maxSalary.hasError}
                      handleChange={this.handleSalaryChange}
                      value={this.state.maxSalary.value}
                      invalidText={`Please type digit in range [0-${CONFIG.formValidationValues.salary.max}]`}
                    />
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <button
                    className="btn btn-outline-info my-2 my-sm-0"
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faSearch} size="1x" />
                    {"  "}
                    Search
                  </button>
                </div>
              </form>
              {this.state.searchResultStr ? (
                <div className="alert alert-success mt-3">
                  Search results for request:{this.state.searchResultStr}
                </div>
              ) : null}
              {this.state.employeesSearch.length > 0 ? (
                <div className="tableWrap mt-3">
                  <EmployeesTable
                    employees={this.state.employeesSearch}
                    readOnly={true}
                  />
                </div>
              ) : this.state.searchResultStr ? (
                <NoData />
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
