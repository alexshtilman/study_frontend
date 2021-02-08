import React, { Component } from "react";
import InputTextElement from "./InputTextElement";
import CONFIG from "../validationConfig.json";
import _ from "lodash";

export default class SalaryStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statisticsArray: [],
      salary: { value: "", hasError: 0 },
      min: 0,

      max: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
      if (
        parseInt(e.target.value) >
          CONFIG.formValidationValues.salary.minRange &&
        parseInt(e.target.value) < CONFIG.formValidationValues.salary.max
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
    }
  };

  comFunct = (employee) => {};

  handleSubmit(event) {
    event.preventDefault();
    let submitConfirm = true;
    if (this.state.salary.hasError !== -1) submitConfirm = false;
    if (submitConfirm) {
      const employees = this.props.employees;
      const salaryValue = parseInt(this.state.salary.value);

      const statisticsObj = _.countBy(employees, function (rec) {
        return parseInt(rec.salary / salaryValue);
      });

      const tmpArray = Object.entries(statisticsObj).map((e) => {
        return {
          val: `${e[0] * salaryValue}-${e[0] * salaryValue + salaryValue}`,
          count: e[1],
        };
      });
      let max = _.maxBy(employees, function (employee) {
        return employee.salary;
      });
      let min = _.minBy(employees, function (employee) {
        return employee.salary;
      });
      let total = _.sumBy(employees, function (employee) {
        return employee.salary;
      });

      this.setState({
        complete: "Calculation complete",
        statisticsArray: tmpArray,
        max: max.salary,
        min: min.salary,
        total,
      });
    } else {
      this.setState({
        complete: "",
        salary: {
          value: this.state.salary.value,
          hasError: this.state.salary.hasError !== -1 ? 1 : -1,
        },
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="col-sm-8">
          <div className="card">
            <div className="card-header">
              <h2>Salary statistics</h2>
            </div>
            <div className="card-body">
              <div className="alert alert-success">
                Current employees count: {this.props.employees.length}
                <br />
              </div>
              <form id="employeeForm" onSubmit={this.handleSubmit}>
                <div className="row">
                  <InputTextElement
                    name="salary"
                    title="Salary range"
                    hasError={this.state.salary.hasError}
                    handleChange={this.handleChange}
                    value={this.state.salary.value}
                    invalidText={`Please type number in range [${CONFIG.formValidationValues.salary.minRange}-
                    ${CONFIG.formValidationValues.salary.max}]`}
                  />

                  <div className="form-group col-xl-6 col-sm-12 pt-4">
                    <button className="btn btn-success m-2" type="submit">
                      Calculate
                    </button>
                  </div>
                </div>
              </form>
              {this.state.complete ? (
                <React.Fragment>
                  <div className="alert alert-success">
                    {this.state.complete}
                  </div>
                  <div className="tableWrap">
                    <table className="table table-bordered table-striped ">
                      <thead>
                        <tr>
                          <th>title</th>
                          <th>count</th>
                        </tr>
                      </thead>
                      <tbody id="tableBody">
                        <tr key="total">
                          <td>Total salary</td>
                          <td>{this.state.total}</td>
                        </tr>
                        <tr key="min">
                          <td>Minimum value</td>
                          <td>{this.state.min}</td>
                        </tr>
                        <tr key="max">
                          <td>Maximum value</td>
                          <td>{this.state.max}</td>
                        </tr>
                        {this.state.statisticsArray.map((stat) => {
                          return (
                            <tr key={stat.val}>
                              <td>{stat.val}</td>
                              <td>{stat.count}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </React.Fragment>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
