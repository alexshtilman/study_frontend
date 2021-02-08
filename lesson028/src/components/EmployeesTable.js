import React, { useEffect } from "react";
import NoData from "../common/NoData";
import "./table.css";
import Rate from "../common/Rate";
import SortOrder from "./SortOrder";
import { Context } from "../common/context";

function EmployeesTable(props) {
  const {
    handleDeleteEmployee,
    handleUpdateForm,
    sortUsed,
    setSortUsed,
    useSort,
  } = React.useContext(Context);

  useEffect(() => {}, [setSortUsed]);
  console.log(props.employees);
  return (
    <React.Fragment>
      {Object.keys(props.employees).length > 0 ? (
        <table className="table table-bordered table-striped ">
          <thead>
            {handleDeleteEmployee ? (
              <tr>
                <th>
                  <SortOrder
                    title="emailAddress"
                    currentSort="emailAddress"
                    sortUsed={sortUsed}
                    useSort={useSort}
                  />
                </th>
                <th>
                  <SortOrder
                    title="name"
                    currentSort="name"
                    sortUsed={sortUsed}
                    useSort={useSort}
                  />
                </th>
                <th>
                  <SortOrder
                    title="salary"
                    currentSort="salary"
                    sortUsed={sortUsed}
                    useSort={useSort}
                  />
                </th>
                <th>
                  <SortOrder
                    title="title"
                    currentSort="title"
                    sortUsed={sortUsed}
                    useSort={useSort}
                  />
                </th>
                <th>rating</th>

                {handleDeleteEmployee ? (
                  <th style={{ textAlign: "center" }}>action</th>
                ) : null}
              </tr>
            ) : (
              <tr>
                <th>emailAddress</th>
                <th>name</th>
                <th>salary</th>
                <th>title</th>
                <th>rating</th>

                {handleDeleteEmployee ? (
                  <th style={{ textAlign: "center" }}>action</th>
                ) : null}
              </tr>
            )}
          </thead>
          <tbody id="tableBody">
            {props.employees.map(function (employee, index) {
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

                  {handleDeleteEmployee ? (
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="btn btn-info"
                        onClick={() => {
                          handleUpdateForm(employee);
                        }}
                      >
                        <i className="fa fa-pencil" />
                      </button>
                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => {
                          handleDeleteEmployee(employee.id);
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
