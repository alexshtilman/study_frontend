import React, { useEffect } from "react";
import EmployeesTable from "./EmployeesTable";
import CONFIG from "../config.json";
import { Pagination } from "react-bootstrap";
import { Context } from "../common/context";
import Unauthorized from "../common/Unauthorized";
export default function EmployeesList() {
  const {
    employees,
    handleDeleteEmployee,
    handleUpdateForm,
    handleShowForm,
    generateEmployee,
    sortUsed,
    noConnection,
    userData,
  } = React.useContext(Context);

  const [active, setActive] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const [maxPerPage, setMaxPerPage] = React.useState(CONFIG.maxPerPage);

  let [start, setStart] = React.useState(0);
  useEffect(() => {
    let tabs = Math.ceil(Object.keys(employees).length / maxPerPage);
    let items = [];
    let currentTabs = tabs < CONFIG.tabsPerPage ? tabs : CONFIG.tabsPerPage;
    for (let number = 0; number < currentTabs; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => {
            setActive(number);
            setStart(number);
          }}
        >
          {number + 1}
        </Pagination.Item>
      );
    }
    if (tabs > CONFIG.tabsPerPage) items.push(<Pagination.Next key="next" />);
    setItems(items);
  }, [active, start, maxPerPage, employees]);
  const handlePageChange = (e) => {
    e.preventDefault();
    if (!isNaN(e.target.value) && e.target.value !== "")
      setMaxPerPage(e.target.value);
    else setMaxPerPage(1);
  };

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header">
          <h2>Show employees</h2>
        </div>
        <div className="card-body">
          <div className="tableWrap">
            {noConnection ? (
              <Unauthorized />
            ) : (
              <EmployeesTable
                employees={employees.slice(
                  start * maxPerPage,
                  start * maxPerPage + maxPerPage
                )}
                deleteClick={handleDeleteEmployee}
                updateClick={handleUpdateForm}
                sortUsed={sortUsed}
                readOnly={false}
              />
            )}
          </div>
        </div>
        <div
          className="card-footer"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {noConnection ? null : (
            <React.Fragment>
              {userData.isAdmin ? (
                <div>
                  <button
                    className="btn btn-primary m-2"
                    onClick={() =>
                      generateEmployee(
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
                    onClick={handleShowForm}
                  >
                    Add employee
                    <i className="fa fa-plus-circle ml-2" />
                  </button>
                </div>
              ) : null}

              <div
                className="pt-2"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Pagination>{items}</Pagination>
                <div style={{ width: "60px", marginLeft: "8px" }}>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    className="form-control"
                    value={maxPerPage}
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
