import React from "react";
import InputTextElement from "./InputTextElement";
import InputRadioElement from "./InputRadioElement";
import InputSelectElement from "./InputSelectElement";

import CONFIG from "../config.json";
import Rate from "./Rate";

function EmployeeUpdate(props) {
  const [id, setId] = React.useState({
    value: props.employee.id,
    hasError: -1,
  });
  const [name] = React.useState({
    value: props.employee.name,
    hasError: -1,
  });
  const [emailAddress] = React.useState({
    value: props.employee.emailAddress,
    hasError: -1,
  });
  const [gender] = React.useState({
    value: ["Male", "Female"],
    selected: props.employee.gender,
    hasError: -1,
  });
  const [title, setTitle] = React.useState({
    value: props.employee.title,
    hasError: -1,
  });
  const [salary, setSalary] = React.useState({
    value: props.employee.salary,
    hasError: -1,
  });
  const [rate, setRate] = React.useState({
    value: props.employee.rate,
    stars: props.employee.stars,
  });
  const [message, setMessage] = React.useState("");

  const callBackClose = () => {
    props.handleUpdateForm();
  };
  const handleTitleChange = (e) => {
    if (e.target.value === "select title...") {
      setTitle({
        value: e.target.value,
        hasError: 0,
      });
    } else {
      setTitle({
        value: e.target.value,
        hasError: -1,
      });
    }
  };
  const handleSalaryChange = (e) => {
    if (e.target.value === "") {
      setSalary({
        value: e.target.value,
        hasError: 0,
      });
    } else {
      const numberFormat = /^[0-9]*$/gm;
      if (numberFormat.test(e.target.value)) {
        if (
          e.target.value >= CONFIG.formValidationValues.salary.min &&
          e.target.value <= CONFIG.formValidationValues.salary.max
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
      } else {
        setSalary({
          value: e.target.value,
          hasError: 1,
        });
      }
    }
  };
  const callBackRate = (newRate) => {
    let stars = [0, 0, 0, 0, 0];
    for (let i = newRate; i < 5; i++) stars[i] = 1;
    stars.reverse();
    setRate({
      value: newRate,
      stars,
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    let submitConfirm = true;

    if (title.hasError !== -1) submitConfirm = false;
    if (salary.hasError !== -1) submitConfirm = false;
    if (submitConfirm) {
      const result = props.handleUpdate({
        id,
        emailAddress,
        name,
        gender,
        title,
        salary,
        rate,
      });
      if (!result) {
        props.handleUpdateForm();
      } else {
        setMessage("");
        setId({
          value: id.value,
          hasError: 1,
          exists: result,
        });
      }
    } else {
      setMessage("");
      setTitle({
        value: title.value,
        hasError: title.hasError !== -1 ? 1 : -1,
      });
      setSalary({
        value: salary.value,
        hasError: salary.hasError !== -1 ? 1 : -1,
      });
    }
  };
  return (
    <div className="card">
      <div className="card-header">
        <h2>Update employee</h2>
      </div>
      <div className="card-body">
        <form id="employeeForm" onSubmit={submitHandler}>
          <div>
            <div className="row">
              <InputTextElement
                name="id"
                title="Employee identifier"
                hasError={id.hasError}
                handleChange={null}
                value={id.value}
                exists={id.exists}
                invalidText={`Please type an correct id (${CONFIG.formValidationValues.id} digits)`}
              />
              <InputTextElement
                name="emailAddress"
                title="Email"
                hasError={emailAddress.hasError}
                handleChange={null}
                value={emailAddress.value}
                invalidText="Please type an correct email"
              />
              <div className="col-xl-4 col-sm-12">
                <div className="container">
                  <InputRadioElement
                    name="gender"
                    title="Gender"
                    value={gender.value}
                    selected={gender.selected}
                    invalidText="Please select gender"
                    hasError={gender.hasError}
                    handleChange={null}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <InputTextElement
                name="name"
                title="Employee name"
                css="form-group col-xl-3 col-sm-12"
                hasError={name.hasError}
                handleChange={null}
                value={name.value}
                invalidText={`Name should be not less than ${CONFIG.formValidationValues.name} symbols`}
              />
              <InputTextElement
                name="salary"
                title="Salary"
                css="form-group col-xl-3 col-sm-12"
                hasError={salary.hasError}
                handleChange={handleSalaryChange}
                value={salary.value}
                invalidText={`Number In the range ${CONFIG.formValidationValues.salary.min} – ${CONFIG.formValidationValues.salary.max}`}
              />
              <div className="form-group col-xl-3 col-sm-12">
                <InputSelectElement
                  name="title"
                  text="Title"
                  value={title.value}
                  hasError={title.hasError}
                  handleChange={handleTitleChange}
                  options={CONFIG.titleOptions}
                  invalidText="Please select title"
                />
              </div>
              <div className="form-group col-xl-3 col-sm-12">
                <label className="text-center font-weight-bold">
                  Employee Rating
                </label>
                <div className="pt-2">
                  <Rate
                    id={id.value || "new"}
                    rating={rate.value}
                    stars={rate.stars}
                    callBack={callBackRate}
                  />
                </div>
              </div>
            </div>
            {id.exists ? (
              <div className="container">
                <div className="form-group col-xl-12 col-sm-12">
                  <div className="alert alert-danger">{id.exists}</div>
                </div>
              </div>
            ) : null}
          </div>
          <div style={{ textAlign: "end" }}>
            <button className="btn btn-dark m-2" onClick={callBackClose}>
              Close
            </button>

            <button className="btn btn-success m-2" type="submit">
              Confirm
            </button>
          </div>
          {message !== "" ? (
            <div className="alert alert-success mt-2">{message}</div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
export default EmployeeUpdate;
