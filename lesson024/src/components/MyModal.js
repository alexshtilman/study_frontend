import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVirus } from "@fortawesome/free-solid-svg-icons";

export default class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: { value: "", hasError: 0, exists: "" },
      name: { value: "", hasError: 0 },
      emailAddress: { value: "", hasError: 0 },
      gender: { value: "", hasError: 0 },
      title: { value: "", hasError: 0 },
      salary: { value: "", hasError: 0 }
    };

    this.callBackClose = this.callBackClose.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSalaryChange = this.handleSalaryChange.bind(this);

    this.submitHandler = this.submitHandler.bind(this);
  }
  callBackClose = () => {
    this.setState({
      ...this.state,
      id: { value: "", hasError: 0, exists: "" },
      name: { value: "", hasError: 0 },
      emailAddress: { value: "", hasError: 0 },
      gender: { value: "", hasError: 0 },
      title: { value: "", hasError: 0 },
      salary: { value: "", hasError: 0 }
    });
    this.props.handleClose();
  };
  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: {
        value: e.target.value,
        hasError: -1
      }
    });
  };
  handleEmailChange = e => {
    if (e.target.value === "") {
      this.setState({
        ...this.state,
        [e.target.name]: {
          value: e.target.value,
          hasError: 0
        }
      });
    } else {
      const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      if (mailFormat.test(e.target.value)) {
        this.setState({
          ...this.state,
          [e.target.name]: {
            value: e.target.value,
            hasError: -1
          }
        });
      } else {
        this.setState({
          ...this.state,
          [e.target.name]: {
            value: e.target.value,
            hasError: 1
          }
        });
      }
    }
  };
  handleIdChange = e => {
    if (e.target.value === "") {
      this.setState({
        ...this.state,
        [e.target.name]: {
          value: e.target.value,
          hasError: 0
        }
      });
    } else {
      const numberFormat = /\b\d{5}\b/;
      if (
        numberFormat.test(e.target.value) &&
        parseInt(e.target.value) > 9999
      ) {
        this.setState({
          ...this.state,
          [e.target.name]: {
            value: e.target.value,
            hasError: -1
          }
        });
      } else {
        this.setState({
          ...this.state,
          [e.target.name]: {
            value: e.target.value,
            hasError: 1
          }
        });
      }
    }
  };
  handleNameChange = e => {
    if (e.target.value === "") {
      this.setState({
        ...this.state,
        [e.target.name]: {
          value: e.target.value,
          hasError: 0
        }
      });
    } else {
      const nameFormat = /\w{4,}/;
      if (nameFormat.test(e.target.value)) {
        this.setState({
          ...this.state,
          [e.target.name]: {
            value: e.target.value,
            hasError: -1
          }
        });
      } else {
        this.setState({
          ...this.state,
          [e.target.name]: {
            value: e.target.value,
            hasError: 1
          }
        });
      }
    }
  };
  handleSalaryChange = e => {
    if (e.target.value === "") {
      this.setState({
        ...this.state,
        [e.target.name]: {
          value: e.target.value,
          hasError: 0
        }
      });
    } else {
      const numberFormat = /^[0-9]*$/gm;
      if (numberFormat.test(e.target.value)) {
        if (e.target.value >= 5000 && e.target.value <= 35000) {
          this.setState({
            ...this.state,
            [e.target.name]: {
              value: e.target.value,
              hasError: -1
            }
          });
        } else {
          this.setState({
            ...this.state,
            [e.target.name]: {
              value: e.target.value,
              hasError: 1
            }
          });
        }
      } else {
        this.setState({
          ...this.state,
          [e.target.name]: {
            value: e.target.value,
            hasError: 1
          }
        });
      }
    }
  };

  submitHandler = event => {
    event.preventDefault();
    let submitConfirm = true;
    if (this.state.id.hasError !== -1) submitConfirm = false;
    if (this.state.name.hasError !== -1) submitConfirm = false;
    if (this.state.gender.hasError !== -1) submitConfirm = false;
    if (this.state.title.hasError !== -1) submitConfirm = false;
    if (this.state.salary.hasError !== -1) submitConfirm = false;
    if (submitConfirm) {
      const result = this.props.callBack(this.state);
      if (!result) {
        this.callBackClose();
      } else {
        this.setState({
          id: {
            value: this.state.id.value,
            hasError: 1,
            exists: result
          }
        });
      }
    } else {
      this.setState({
        id: {
          value: this.state.id.value,
          hasError: this.state.id.hasError !== -1 ? 1 : -1
        },
        name: {
          value: this.state.name.value,
          hasError: this.state.name.hasError !== -1 ? 1 : -1
        },
        emailAddress: {
          value: this.state.emailAddress.value,
          hasError: this.state.emailAddress.hasError !== -1 ? 1 : -1
        },
        gender: {
          value: this.state.gender.value,
          hasError: this.state.gender.hasError !== -1 ? 1 : -1
        },
        title: {
          value: this.state.title.value,
          hasError: this.state.title.hasError !== -1 ? 1 : -1
        },
        salary: {
          value: this.state.salary.value,
          hasError: this.state.salary.hasError !== -1 ? 1 : -1
        }
      });
    }
  };

  render() {
    return (
      <Modal
        size={this.props.action === "add" ? "lg" : ""}
        show={this.props.open}
        centered
        onHide={this.props.handleClose}
      >
        <form id="employeeForm" onSubmit={this.submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.action === "add"
                ? "Add employee "
                : "Delete confirmation"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={this.props.action === "add" ? {} : { textAlign: "center" }}
          >
            {this.props.action === "add" ? (
              <div>
                <div className="row">
                  <div className="form-group col-xl-5 col-sm-12">
                    <label
                      className="text-center font-weight-bold"
                      htmlFor="id"
                    >
                      Employee identifier
                    </label>
                    <input
                      className={
                        "form-control" +
                        (this.state.id.hasError === 1
                          ? " is-invalid"
                          : this.state.id.hasError === 0
                          ? ""
                          : " is-valid")
                      }
                      id="id"
                      type="text"
                      name="id"
                      placeholder="Employee identifier"
                      onChange={this.handleIdChange}
                      value={this.state.id.value}
                    />
                    <div className="invalid-feedback">
                      {this.state.id.exists ||
                        "Please type an correct id (5 digits)"}
                    </div>
                  </div>

                  <div className="form-group col-xl-7 col-sm-12">
                    <label
                      className="text-center font-weight-bold"
                      htmlFor="emailAddress"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className={
                        "form-control" +
                        (this.state.emailAddress.hasError === 1
                          ? " is-invalid"
                          : this.state.emailAddress.hasError === 0
                          ? ""
                          : " is-valid")
                      }
                      id="emailAddress"
                      name="emailAddress"
                      placeholder="Email"
                      onChange={this.handleEmailChange}
                      value={this.state.emailAddress.value}
                    />
                    <div className="invalid-feedback">
                      Please type an correct email
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="form-check">
                    <input
                      className={
                        "form-check-input" +
                        (this.state.gender.hasError === 1
                          ? " is-invalid"
                          : this.state.gender.hasError === 0
                          ? ""
                          : " is-valid")
                      }
                      type="radio"
                      name="gender"
                      value="Female"
                      id="Female"
                      onChange={this.handleChange}
                    />
                    <label className="form-check-label" htmlFor="Female">
                      Female
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className={
                        "form-check-input" +
                        (this.state.gender.hasError === 1
                          ? " is-invalid"
                          : this.state.gender.hasError === 0
                          ? ""
                          : " is-valid")
                      }
                      type="radio"
                      name="gender"
                      value="Male"
                      id="Male"
                      onChange={this.handleChange}
                    />
                    <label className="form-check-label" htmlFor="Male">
                      Male
                    </label>
                    <div className="invalid-feedback">Please select gender</div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-xl-4 col-sm-12">
                    <label
                      className="text-center font-weight-bold"
                      htmlFor="name"
                    >
                      Employee name
                    </label>
                    <input
                      className={
                        "form-control" +
                        (this.state.name.hasError === 1
                          ? " is-invalid"
                          : this.state.name.hasError === 0
                          ? ""
                          : " is-valid")
                      }
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Employee name"
                      onChange={this.handleNameChange}
                      value={this.state.name.value}
                    />
                    <div className="invalid-feedback">
                      Name should be not less than 4 symbols
                    </div>
                  </div>

                  <div className="form-group col-xl-4 col-sm-12">
                    <label
                      className="text-center font-weight-bold"
                      htmlFor="salary"
                    >
                      Salary
                    </label>
                    <input
                      type="text"
                      className={
                        "form-control" +
                        (this.state.salary.hasError === 1
                          ? " is-invalid"
                          : this.state.salary.hasError === 0
                          ? ""
                          : " is-valid")
                      }
                      id="salary"
                      name="salary"
                      placeholder="Salary"
                      onChange={this.handleSalaryChange}
                      value={this.state.salary.value}
                    />
                    <div className="invalid-feedback">
                      Number In the range 5000 – 35000
                    </div>
                  </div>
                  <div className="form-group col-xl-4 col-sm-12">
                    <label
                      className="text-center font-weight-bold"
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <select
                      className={
                        "form-control" +
                        (this.state.title.hasError === 1
                          ? " is-invalid"
                          : this.state.title.hasError === 0
                          ? ""
                          : " is-valid")
                      }
                      name="title"
                      onChange={this.handleChange}
                    >
                      <option value="">select title...</option>
                      <option value="WageEmployee">Wage Employee</option>
                      <option value="Manager">Manager</option>
                      <option value="SalesPerson">Sales Person</option>
                      <option value="SalesManager">Sales Manager</option>
                    </select>
                    <div className="invalid-feedback">Please select Title</div>
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
            ) : (
              <div>
                <FontAwesomeIcon icon={faVirus} size="6x" color="red" />
                <br />
                <br />
                <p>Are you really want to delete this person?</p>
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.callBackClose}>
              Cancel
            </Button>
            {this.props.action === "add" ? (
              <Button variant="primary" type="submit">
                Confirm
              </Button>
            ) : (
              <Button variant="primary" onClick={this.props.callBack}>
                Confirm
              </Button>
            )}
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
