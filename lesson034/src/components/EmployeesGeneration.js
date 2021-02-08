import React from "react";
import InputTextElement from "../common/InputTextElement";

import generateRandomEmployee from "../functions/random";
import { Context } from "../common/context";
import Loading from "../common/loading";
import CONFIG from "../config/config.json";
function EmployeesGeneration() {
  const { employeesService } = React.useContext(Context);

  const [count, setCount] = React.useState({ value: 0, hasError: 0 });
  const [complete, setComplete] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [plus, setPlus] = React.useState(0);
  //const [percent, setPercent] = React.useState(1);

  const submitHandler = async (event) => {
    event.preventDefault();
    let counterSuccess = 0;
    let counterUnsuccess = 0;
    let submitConfirm = true;
    if (count.hasError !== -1) submitConfirm = false;
    if (submitConfirm) {
      setComplete(false);
      setPlus(0);
      let percent = 100 / count.value;
      setLoading(true);
      for (let i = 0; i < count.value; i++) {
        const employee = generateRandomEmployee(
          CONFIG.formValidationValues.salary.min,
          CONFIG.formValidationValues.salary.max
        );
        try {
          await employeesService.addEmployee(employee);
          counterSuccess++;
          setPlus(parseInt(counterSuccess * percent));
        } catch (error) {
          counterUnsuccess++;
        }
      }
      setCount({ value: 0, hasError: 0 });
      setLoading(false);
      setComplete(
        `${count.value} employees was requested to add, but [${counterSuccess}] successful; [${counterUnsuccess}] unsuccessful`
      );
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
                disabled={loading}
              />

              <div className="form-group col-xl-6 col-sm-12 pt-4">
                <button
                  className={
                    loading
                      ? "btn btn-info m-2 disabled"
                      : "btn btn-success m-2"
                  }
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <Loading /> : "Generate"}
                </button>
              </div>
            </div>
          </form>
          {complete ? (
            <div className="alert alert-success">{complete}</div>
          ) : loading ? (
            <div className="progress mb-3 hidden" id="progressDiv">
              <div
                id="progress"
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: `${plus}%` }}
                aria-valuenow={plus}
                aria-valuemin="0"
                aria-valuemax={count.value}
              >
                {plus}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}
export default EmployeesGeneration;
