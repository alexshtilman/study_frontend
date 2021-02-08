import React, { Component } from "react";
import InputTextElement from "./InputTextElement";
import InputRadioElement from "./InputRadioElement";
import InputSelectElement from "./InputSelectElement";

import CONFIG from "../validationConfig.json";

export default class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: { value: "", hasError: 0, exists: "" },
      name: { value: "", hasError: 0 },
      emailAddress: { value: "", hasError: 0 },
      gender: { value: "", hasError: 0 },
      title: { value: "", hasError: 0 },
      salary: { value: "", hasError: 0 },
      rate: { value: 5, hasError: 0 },
      message: "",
    };

    this.handleChange = this.handleChange.bind(this);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSalaryChange = this.handleSalaryChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.callBackClose = this.callBackClose.bind(this);
  }
  callBackClose = () => {
    this.props.showAddEmployee();
  };
  handleChange = (e) => {
    if (e.target.value === "select title...") {
      this.setState({
        ...this.state,
        [e.target.name]: {
          value: e.target.value,
          hasError: 0,
        },
      });
    } else {
      this.setState({
        ...this.state,
        [e.target.name]: {
          value: e.target.value,
          hasError: -1,
        },
      });
    }
  };
  handleEmailChange = (e) => {
    if (e.target.value === "") {
      this.setState({
        ...this.state,
        [e.target.name]: {
          value: e.target.value,
          hasError: 0,
        },
      });
    } else {
      const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      if (mailFormat.test(e.target.value)) {
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
  handleIdChange = (e) => {
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
        parseInt(e.target.value) > 10 ** (CONFIG.formValidationValues.id - 1) &&
        parseInt(e.target.value) < 10 ** CONFIG.formValidationValues.id
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
  handleNameChange = (e) => {
    if (e.target.value === "") {
      this.setState({
        ...this.state,
        [e.target.name]: {
          value: e.target.value,
          hasError: 0,
        },
      });
    } else {
      if (e.target.value.length >= CONFIG.formValidationValues.name) {
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
          e.target.value >= CONFIG.formValidationValues.salary.min &&
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
    let submitConfirm = true;
    if (this.state.id.hasError !== -1) submitConfirm = false;
    if (this.state.name.hasError !== -1) submitConfirm = false;
    if (this.state.gender.hasError !== -1) submitConfirm = false;
    if (this.state.title.hasError !== -1) submitConfirm = false;
    if (this.state.salary.hasError !== -1) submitConfirm = false;
    if (submitConfirm) {
      const result = this.props.addEmployee(this.state);
      if (!result) {
        this.setState({
          message: `Employee with id ${this.state.id.value} created!`,
        });
      } else {
        this.setState({
          message: "",
          id: {
            value: this.state.id.value,
            hasError: 1,
            exists: result,
          },
        });
      }
    } else {
      this.setState({
        message: "",
        id: {
          value: this.state.id.value,
          hasError: this.state.id.hasError !== -1 ? 1 : -1,
        },
        name: {
          value: this.state.name.value,
          hasError: this.state.name.hasError !== -1 ? 1 : -1,
        },
        emailAddress: {
          value: this.state.emailAddress.value,
          hasError: this.state.emailAddress.hasError !== -1 ? 1 : -1,
        },
        gender: {
          value: this.state.gender.value,
          hasError: this.state.gender.hasError !== -1 ? 1 : -1,
        },
        title: {
          value: this.state.title.value,
          hasError: this.state.title.hasError !== -1 ? 1 : -1,
        },
        salary: {
          value: this.state.salary.value,
          hasError: this.state.salary.hasError !== -1 ? 1 : -1,
        },
      });
    }
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
      <div className="col-sm-6">
        <div className="card">
          <div className="card-header">
            <h2>Add employee</h2>
          </div>
          <div className="card-body">
            <form id="employeeForm" onSubmit={this.submitHandler}>
              <div>
                <div className="row">
                  <InputTextElement
                    name="id"
                    title="Employee identifier"
                    hasError={this.state.id.hasError}
                    handleChange={this.handleIdChange}
                    value={this.state.id.value}
                    exists={this.state.id.exists}
                    invalidText={`Please type an correct id (${CONFIG.formValidationValues.id} digits)`}
                  />
                  <InputTextElement
                    name="emailAddress"
                    title="Email"
                    hasError={this.state.emailAddress.hasError}
                    handleChange={this.handleEmailChange}
                    value={this.state.emailAddress.value}
                    invalidText="Please type an correct email"
                  />
                  <div className="col-xl-4 col-sm-12">
                    <div className="container">
                      <InputRadioElement
                        name="gender"
                        title="Gender"
                        value={["Male", "Female"]}
                        invalidText="Please select gender"
                        hasError={this.state.gender.hasError}
                        handleChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <InputTextElement
                    name="name"
                    title="Employee name"
                    hasError={this.state.name.hasError}
                    handleChange={this.handleNameChange}
                    value={this.state.name.value}
                    invalidText={`Name should be not less than ${CONFIG.formValidationValues.name} symbols`}
                  />
                  <InputTextElement
                    name="salary"
                    title="Salary"
                    hasError={this.state.salary.hasError}
                    handleChange={this.handleSalaryChange}
                    value={this.state.salary.value}
                    invalidText={`Number In the range ${CONFIG.formValidationValues.salary.min} – ${CONFIG.formValidationValues.salary.max}`}
                  />
                  <div className="form-group col-xl-4 col-sm-12">
                    <InputSelectElement
                      name="title"
                      text="Title"
                      hasError={this.state.title.hasError}
                      handleChange={this.handleChange}
                      options={titleOptions}
                      invalidText="Please select title"
                    />
                  </div>
                </div>
                {this.state.exists ? (
                  <div className="row">
                    <div className="alert alert-danger">
                      {this.state.exists}
                    </div>
                  </div>
                ) : null}
              </div>
              <div style={{ align: "right" }}>
                <button
                  className="btn btn-dark m-2"
                  onClick={this.callBackClose}
                >
                  Cancel
                </button>

                <button className="btn btn-success m-2" type="submit">
                  Confirm
                </button>
              </div>
              {this.state.message !== "" ? (
                <div className="alert alert-success mt-2">
                  {this.state.message}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
