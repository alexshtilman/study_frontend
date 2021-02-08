import React, { Component } from "react";
import NoData from "./NoData";
import "./table.css";
import Rate from "./Rate";

export default class EmployeesTable extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.callBack = this.callBack.bind(this);
  }
  handleClose = () => this.setState({ open: false });
  deleteEmployee = (id) => {
    this.props.deleteClick(id);
  };
  callBack = (rate, id) => {
    this.props.callBack(rate, id);
  };
  render() {
    return (
      <React.Fragment>
        {this.props.employees.length > 0 ? (
          <table className="table table-bordered table-striped ">
            <thead>
              <tr>
                <th>id</th>
                <th>emailAddress</th>
                <th>name</th>
                <th>gender</th>
                <th>salary</th>
                <th>title</th>
                {!this.props.readOnly ? <th>rating</th> : null}

                {this.props.deleteClick ? (
                  <th style={{ textAlign: "center" }}>action</th>
                ) : null}
              </tr>
            </thead>
            <tbody id="tableBody">
              {this.props.employees.map((employee, index) => {
                return (
                  <tr key={`${index}-${employee.id}`}>
                    <td>{employee.id}</td>
                    <td>{employee.emailAddress}</td>
                    <td>{employee.name}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.salary}</td>
                    <td>{employee.title}</td>
                    {!this.props.readOnly ? (
                      <td>
                        <Rate
                          rate={employee.rate}
                          callBack={this.callBack}
                          id={employee.id}
                          readOnly={this.props.readOnly}
                          stars={employee.stars}
                        />
                      </td>
                    ) : null}
                    {this.props.deleteClick ? (
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            this.deleteEmployee(employee.id);
                          }}
                        >
                          <i className="fa fa-minus-circle" />
                        </button>
                      </td>
                    ) : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </React.Fragment>
    );
  }
}
