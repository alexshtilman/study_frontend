import React from "react";
import InputTextElement from "../common/InputTextElement";
import CONFIG from "../config.json";
import generateRandomEmployee from "../functions/random";
import { Context } from "../common/context";

function EmployeesGeneration() {
  const { employees, handleUpdate } = React.useContext(Context);

  const [employeesLocal, setEmployeesLocal] = React.useState(employees);
  const [count, setCount] = React.useState({ value: 0, hasError: 0 });
  const [complete, setComplete] = React.useState(false);

  const generateEmployee = (min, max) => {
    const newPerson = generateRandomEmployee(min, max);
    const employeesThis = employees;
    const ind = employeesThis.findIndex((e) => e.id === newPerson.id);
    if (ind < 0) {
      employeesThis.unshift(newPerson);
      setEmployeesLocal(employeesThis);
    } else generateEmployee(min, max);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    let submitConfirm = true;
    if (count.hasError !== -1) submitConfirm = false;
    if (submitConfirm) {
      for (let i = 0; i < count.value; i++)
        generateEmployee(
          CONFIG.formValidationValues.salary.min,
          CONFIG.formValidationValues.salary.max
        );
      handleUpdate(employeesLocal);
      setComplete(`${count.value} employees added!`);
      setCount({ value: 0, hasError: 0 });
    } else {
      setCount({
        value: count.value,
        hasError: count.hasError !== -1 ? 1 : -1,
      });
    }
  };
  const handleChange = (e) => {
    if (e.target.value === "") {
      setCount({
        value: e.target.value,
        hasError: 0,
      });
    } else {
      if (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 100) {
        setCount({
          value: e.target.value,
          hasError: -1,
        });
      } else {
        setCount({
          value: e.target.value,
          hasError: 1,
        });
      }
    }
  };

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header">
          <h2>Generate employees</h2>
        </div>
        <div className="card-body">
          <div className="alert alert-info">
            Digits in id: {CONFIG.formValidationValues.id}
            <br />
            Min salary: {CONFIG.formValidationValues.salary.min}
            <br />
            Max salary: {CONFIG.formValidationValues.salary.max}
            <br />
            Current employees count: {employees.length}
            <br />
          </div>
          <form id="employeeForm" onSubmit={submitHandler}>
            <div className="row">
              <InputTextElement
                name="count"
                title="Employee count"
                hasError={count.hasError}
                handleChange={handleChange}
                value={count.value}
                invalidText={"Please type number in range [1-99]"}
              />

              <div className="form-group col-xl-6 col-sm-12 pt-4">
                <button className="btn btn-success m-2" type="submit">
                  Generate
                </button>
              </div>
            </div>
          </form>
          {complete ? (
            <div className="alert alert-success">{complete}</div>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}
export default EmployeesGeneration;
