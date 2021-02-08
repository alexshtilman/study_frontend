import React from "react";
import EmployeesTable from "./EmployeesTable";
import InputTextElement from "./InputTextElement";
import InputSelectElement from "./InputSelectElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import NoData from "./NoData";

import CONFIG from "../config.json";

function Search(props) {
  const [title, setTitle] = React.useState({
    value: "select title...",
    hasError: 0,
  });
  const [minSalary, setMinSalary] = React.useState({ value: "", hasError: 0 });
  const [maxSalary, setMaxSalary] = React.useState({ value: "", hasError: 0 });
  const [searchResultStr, setSearchResultStr] = React.useState("");
  const [employeesSearch, setEmployeesSearch] = React.useState([]);

  const handleChange = (e) => {
    setTitle({ value: e.target.value, hasError: -1 });
  };
  const handleSalaryChange = (e) => {
    if (e.target.value === "") {
      if (e.target.name === "minSalary")
        setMinSalary({
          value: e.target.value,
          hasError: 0,
        });
      else
        setMaxSalary({
          value: e.target.value,
          hasError: 0,
        });
    } else {
      const numberFormat = /^[0-9]*$/gm;
      if (numberFormat.test(e.target.value)) {
        if (
          e.target.value >= 0 &&
          e.target.value <= CONFIG.formValidationValues.salary.max
        ) {
          if (e.target.name === "minSalary")
            setMinSalary({
              value: e.target.value,
              hasError: -1,
            });
          else
            setMaxSalary({
              value: e.target.value,
              hasError: -1,
            });
        } else {
          if (e.target.name === "minSalary")
            setMinSalary({
              value: e.target.value,
              hasError: 1,
            });
          else
            setMaxSalary({
              value: e.target.value,
              hasError: 1,
            });
        }
      } else {
        if (e.target.name === "minSalary")
          setMinSalary({
            value: e.target.value,
            hasError: 1,
          });
        else
          setMaxSalary({
            value: e.target.value,
            hasError: 1,
          });
      }
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const minSalaryThis =
      parseInt(minSalary.value) > 0
        ? parseFloat(minSalary.value) > parseFloat(maxSalary.value)
          ? 0
          : parseFloat(minSalary.value)
        : 0;
    const maxSalaryThis =
      maxSalary.value || CONFIG.formValidationValues.salary.max;
    const employees = props.employees;
    let searchResult;
    let searchResultStr = "";
    if (title.value === "select title...") {
      searchResult = employees.filter((employee) => {
        return (
          employee.salary > minSalaryThis && employee.salary < maxSalaryThis
        );
      });
      searchResultStr = `salary in range [${minSalaryThis}, ${maxSalaryThis}]`;
    } else {
      searchResultStr = `name = ${title.value} and salary in range [${minSalaryThis}, ${maxSalaryThis}]`;
      searchResult = employees.filter((employee) => {
        return (
          employee.salary > minSalaryThis &&
          employee.salary < maxSalaryThis &&
          employee.title === title.value
        );
      });
    }
    setEmployeesSearch(searchResult);
    setTitle({ value: "select title...", hasError: 0 });
    setMinSalary({ value: "", hasError: 0 });
    setMaxSalary({ value: "", hasError: 0 });
    setSearchResultStr(searchResultStr);
  };

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header">
          <h2>Search employees</h2>
        </div>
        <div className="card-body">
          <form id="employeeForm" onSubmit={submitHandler}>
            <div>
              <div className="row">
                <div className="form-group col-xl-4 col-sm-12">
                  <InputSelectElement
                    name="title"
                    text="Employee title"
                    hasError={title.hasError}
                    handleChange={handleChange}
                    options={CONFIG.titleOptions}
                    invalidText="Please select title"
                  />
                </div>

                <InputTextElement
                  name="minSalary"
                  title="Min salary"
                  hasError={minSalary.hasError}
                  handleChange={handleSalaryChange}
                  value={minSalary.value}
                  invalidText={`Please type digit in range [0-${CONFIG.formValidationValues.salary.max}]`}
                />

                <InputTextElement
                  name="maxSalary"
                  title="Max salary"
                  hasError={maxSalary.hasError}
                  handleChange={handleSalaryChange}
                  value={maxSalary.value}
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
          {searchResultStr ? (
            <div className="alert alert-success mt-3">
              Search results for request:{searchResultStr}
            </div>
          ) : null}
          {employeesSearch.length > 0 ? (
            <div className="tableWrap mt-3">
              <EmployeesTable employees={employeesSearch} readOnly={true} />
            </div>
          ) : searchResultStr ? (
            <NoData />
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Search;
