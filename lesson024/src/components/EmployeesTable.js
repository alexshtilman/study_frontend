import React, { Component } from "react";
import "./table.css";

export default class EmployeesTable extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.showStat = this.showStat.bind(this);
  }
  handleClose = () => this.setState({ open: false });
  deleteEmployee = id => {
    this.props.deleteClick(id);
  };
  showStat = () => {
    this.props.showStat();
  };
  render() {
    return (
      <div className="col-sm-10">
        <div className="card">
          <div className="card-header">
            <h2>Show employees</h2>
          </div>
          <div className="card-body">
            <div className="tableWrap">
              <table className="table table-bordered table-striped ">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>emailAddress</th>
                    <th>name</th>
                    <th>gender</th>
                    <th>salary</th>
                    <th>title</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody id="tableBody">
                  {this.props.employees.map(employee => {
                    return (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.emailAddress}</td>
                        <td>{employee.name}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.salary}</td>
                        <td>{employee.title}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              this.deleteEmployee(employee.id);
                            }}
                          >
                            <i className="fa fa-minus-circle" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-3">
              <button
                className="btn btn-primary m-2"
                onClick={this.props.generateEmployee}
              >
                Add random employee
                <i className="fa fa-random ml-2" />
              </button>
              <button
                className="btn btn-success m-2"
                onClick={this.props.showAddEmployee}
              >
                Add employee
                <i className="fa fa-plus-circle ml-2" />
              </button>
              {this.props.employees.length === 0 ? null : (
                <button
                  className="btn btn-info m-2"
                  onClick={this.props.showStat}
                >
                  Show Statistics
                  <i className="fa fa-filter ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
