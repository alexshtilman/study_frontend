import React from "react";
import NoData from "./NoData";
import "./table.css";
import Rate from "./Rate";

function EmployeesTable(props) {
  const deleteEmployee = (id) => {
    props.deleteClick(id);
  };
  return (
    <React.Fragment>
      {props.employees.length > 0 ? (
        <table className="table table-bordered table-striped ">
          <thead>
            <tr>
              <th>emailAddress</th>
              <th>name</th>
              <th>salary</th>
              <th>title</th>
              <th>rating</th>

              {props.deleteClick ? (
                <th style={{ textAlign: "center" }}>action</th>
              ) : null}
            </tr>
          </thead>
          <tbody id="tableBody">
            {props.employees.map((employee, index) => {
              return (
                <tr key={`${index}-${employee.id}`}>
                  <td>{employee.emailAddress}</td>
                  <td>{employee.name}</td>

                  <td>{employee.salary}</td>
                  <td>{employee.title}</td>

                  <td>
                    <Rate
                      rate={employee.rate}
                      id={employee.id}
                      readOnly={true}
                      stars={employee.stars}
                    />
                  </td>

                  {props.deleteClick ? (
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="btn btn-info"
                        onClick={() => {
                          props.updateClick(employee);
                        }}
                      >
                        <i className="fa fa-pencil" />
                      </button>
                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => {
                          deleteEmployee(employee.id);
                        }}
                      >
                        <i className="fa fa-ban" />
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
export default EmployeesTable;
