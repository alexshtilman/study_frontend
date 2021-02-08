import React, { useEffect } from "react";
import InputTextElement from "../common/InputTextElement";
import CONFIG from "../config.json";
import _ from "lodash";
import { Context } from "../common/context";
import useSubscribeEffect from "../services/useSubscribeEffect";

function SalaryStatistics() {
  const [statisticsArray, setStatisticsArray] = React.useState([]);
  const [salary, setSalary] = React.useState({ value: "", hasError: 0 });
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [complete, setComplete] = React.useState("");
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
    if (e.target.value === "") {
      setSalary({
        value: e.target.value,
        hasError: 0,
      });
    } else {
      if (
        parseInt(e.target.value) >
          CONFIG.formValidationValues.salary.minRange &&
        parseInt(e.target.value) < CONFIG.formValidationValues.salary.max
      ) {
        setSalary({
          value: e.target.value,
          hasError: -1,
        });
      } else {
        setSalary({
          value: e.target.value,
          hasError: 1,
        });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let submitConfirm = true;
    if (salary.hasError !== -1) submitConfirm = false;
    if (submitConfirm) {
      const employeesLocal = employees;
      const salaryValue = parseInt(salary.value);

      const statisticsObj = _.countBy(employeesLocal, function (rec) {
        return parseInt(rec.salary / salaryValue);
      });

      const tmpArray = Object.entries(statisticsObj).map((e) => {
        return {
          val: `${e[0] * salaryValue}-${e[0] * salaryValue + salaryValue}`,
          count: e[1],
        };
      });
      let max = _.maxBy(employeesLocal, function (employee) {
        return employee.salary;
      });
      let min = _.minBy(employeesLocal, function (employee) {
        return employee.salary;
      });
      let total = _.sumBy(employeesLocal, function (employee) {
        return employee.salary;
      });
      setComplete("Calculation complete");
      setStatisticsArray(tmpArray);
      setMin(min.salary);
      setMax(max.salary);
      setTotal(total);
    } else {
      setComplete("");
      setSalary({
        value: salary.value,
        hasError: salary.hasError !== -1 ? 1 : -1,
      });
    }
  };

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header">
          <h2>Salary statistics</h2>
        </div>
        <div className="card-body">
          <div className="alert alert-success">
            Current employees count: {employees.length}
            <br />
          </div>
          <form id="employeeForm" onSubmit={handleSubmit}>
            <div className="row">
              <InputTextElement
                name="salary"
                title="Salary range"
                hasError={salary.hasError}
                handleChange={handleChange}
                value={salary.value}
                invalidText={`Please type number in range [${CONFIG.formValidationValues.salary.minRange}-
                    ${CONFIG.formValidationValues.salary.max}]`}
              />

              <div className="form-group col-xl-6 col-sm-12 pt-4">
                <button
                  className={
                    noConnection
                      ? "btn btn-danger m-2 disabled"
                      : "btn btn-success m-2"
                  }
                  type="submit"
                  disabled={noConnection}
                >
                  Calculate
                </button>
              </div>
            </div>
          </form>
          {noConnection ? (
            <div className="alert alert-danger">{noConnection}</div>
          ) : complete ? (
            <React.Fragment>
              <div className="alert alert-success">{complete}</div>
              <div className="tableWrap">
                <table className="table table-bordered table-striped ">
                  <thead>
                    <tr>
                      <th>title</th>
                      <th>count</th>
                    </tr>
                  </thead>
                  <tbody id="tableBody">
                    <tr key="total">
                      <td>Total salary</td>
                      <td>{total}</td>
                    </tr>
                    <tr key="min">
                      <td>Minimum value</td>
                      <td>{min}</td>
                    </tr>
                    <tr key="max">
                      <td>Maximum value</td>
                      <td>{max}</td>
                    </tr>
                    {statisticsArray.map((stat) => {
                      return (
                        <tr key={stat.val}>
                          <td>{stat.val}</td>
                          <td>{stat.count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}
export default SalaryStatistics;
