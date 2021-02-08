import React from "react";
import EmployeesTable from "./EmployeesTable";
import InputTextElement from "../common/InputTextElement";
import InputSelectElement from "../common/InputSelectElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import NoData from "../common/NoData";
import { Context } from "../common/context";
import CONFIG from "../config.json";
import useSubscribeEffect from "../services/useSubscribeEffect";
import Loading from "../common/loading";
function Search() {
  const [title, setTitle] = React.useState({
    value: "select title...",
    hasError: 0,
  });
  const [minSalary, setMinSalary] = React.useState({ value: "", hasError: 0 });
  const [maxSalary, setMaxSalary] = React.useState({ value: "", hasError: 0 });
  const [searchResultStr, setSearchResultStr] = React.useState("");
  const [employeesSearch, setEmployeesSearch] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const {
    employeesService,
    callBacksetNoConnection,
    noConnection,
  } = React.useContext(Context);
  const [employees] = useSubscribeEffect(
    employeesService,
    employeesService.getEmployees,
    callBacksetNoConnection
  );

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
    setLoading(true);
    const minSalaryThis =
      parseInt(minSalary.value) > 0
        ? parseFloat(minSalary.value) > parseFloat(maxSalary.value)
          ? 0
          : parseFloat(minSalary.value)
        : 0;
    const maxSalaryThis =
      maxSalary.value || CONFIG.formValidationValues.salary.max;
    const employeesLocal = employees;
    let searchResult;
    let searchResultStr = "";
    if (title.value === "select title...") {
      searchResult = employeesLocal.filter((employee) => {
        return (
          employee.salary > minSalaryThis && employee.salary < maxSalaryThis
        );
      });
      searchResultStr = `salary in range [${minSalaryThis}, ${maxSalaryThis}]`;
    } else {
      searchResultStr = `name = ${title.value} and salary in range [${minSalaryThis}, ${maxSalaryThis}]`;
      searchResult = employeesLocal.filter((employee) => {
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
    setLoading(false);
  };

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header">
          <h2>Search employees</h2>
        </div>
        <div className="card-body">
          {noConnection ? (
            <div className="alert alert-danger">{noConnection}</div>
          ) : (
            <React.Fragment>
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
                    {loading ? (
                      <Loading />
                    ) : (
                      <React.Fragment>
                        <FontAwesomeIcon icon={faSearch} size="1x" />
                        {"  "}
                        Search
                      </React.Fragment>
                    )}
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
                noConnection ? (
                  <div className="alert alert-danger">{noConnection}</div>
                ) : (
                  <NoData />
                )
              ) : null}
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Search;
