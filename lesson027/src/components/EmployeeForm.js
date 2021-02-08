import React from "react";
import InputTextElement from "../common/InputTextElement";
import InputRadioElement from "../common/InputRadioElement";
import InputSelectElement from "../common/InputSelectElement";

import CONFIG from "../config.json";
import Rate from "../common/Rate";
import { Context } from "../common/context";

function EmployeeForm() {
  const [id, setId] = React.useState({ value: "", hasError: 0, exists: "" });
  const [name, setName] = React.useState({ value: "", hasError: 0 });
  const [emailAddress, setEmailAddress] = React.useState({
    value: "",
    hasError: 0,
  });
  const [gender, setGender] = React.useState({ value: "", hasError: 0 });
  const [title, setTitle] = React.useState({ value: "", hasError: 0 });
  const [salary, setSalary] = React.useState({ value: "", hasError: 0 });
  let emptyRate = [];
  for (let i = 0; i < CONFIG.defaultMaxRate; i++) emptyRate[i] = 0;
  const [rate, setRate] = React.useState({
    value: CONFIG.defaultRate,
    stars: emptyRate,
  });
  const { addEmployee, handleClose } = React.useContext(Context);

  const handleGenderChange = (e) => {
    setGender({
      selected: e.target.value,
      hasError: -1,
    });
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
  const handleEmailChange = (e) => {
    if (e.target.value === "") {
      setEmailAddress({
        value: e.target.value,
        hasError: 0,
      });
    } else {
      const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      if (mailFormat.test(e.target.value)) {
        setEmailAddress({
          value: e.target.value,
          hasError: -1,
        });
      } else {
        setEmailAddress({
          value: e.target.value,
          hasError: 1,
        });
      }
    }
  };
  const handleIdChange = (e) => {
    if (e.target.value === "") {
      setId({
        value: e.target.value,
        hasError: 0,
      });
    } else {
      if (
        parseInt(e.target.value) > 10 ** (CONFIG.formValidationValues.id - 1) &&
        parseInt(e.target.value) < 10 ** CONFIG.formValidationValues.id
      ) {
        setId({
          value: e.target.value,
          hasError: -1,
        });
      } else {
        setId({
          value: e.target.value,
          hasError: 1,
        });
      }
    }
  };
  const handleNameChange = (e) => {
    if (e.target.value === "") {
      setName({
        value: e.target.value,
        hasError: 0,
      });
    } else {
      if (e.target.value.length >= CONFIG.formValidationValues.name) {
        setName({
          value: e.target.value,
          hasError: -1,
        });
      } else {
        setName({
          value: e.target.value,
          hasError: 1,
        });
      }
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
    for (let i = newRate; i < CONFIG.defaultMaxRate; i++) emptyRate[i] = 1;
    emptyRate.reverse();
    setRate({
      value: newRate,
      stars: emptyRate,
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    let submitConfirm = true;
    if (id.hasError !== -1) submitConfirm = false;
    if (emailAddress.hasError !== -1) submitConfirm = false;
    if (name.hasError !== -1) submitConfirm = false;
    if (gender.hasError !== -1) submitConfirm = false;
    if (title.hasError !== -1) submitConfirm = false;
    if (salary.hasError !== -1) submitConfirm = false;
    if (submitConfirm) {
      const result = addEmployee({
        id,
        emailAddress,
        name,
        gender,
        title,
        salary,
        rate,
      });
      if (!result) {
        handleClose();
      } else {
        setId({
          value: id.value,
          hasError: 1,
          exists: result,
        });
      }
    } else {
      setId({ value: id.value, hasError: id.hasError !== -1 ? 1 : -1 });
      setName({ value: name.value, hasError: name.hasError !== -1 ? 1 : -1 });
      setEmailAddress({
        value: emailAddress.value,
        hasError: emailAddress.hasError !== -1 ? 1 : -1,
      });
      setGender({
        value: gender.value,
        hasError: gender.hasError !== -1 ? 1 : -1,
      });
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
        <h2>Add employee</h2>
      </div>
      <div className="card-body">
        <form id="employeeForm" onSubmit={submitHandler}>
          <div>
            <div className="row">
              <InputTextElement
                name="id"
                title="Employee identifier"
                hasError={id.hasError}
                handleChange={handleIdChange}
                value={id.value}
                exists={id.exists}
                invalidText={`Please type an correct id (${CONFIG.formValidationValues.id} digits)`}
              />
              <InputTextElement
                name="emailAddress"
                title="Email"
                hasError={emailAddress.hasError}
                handleChange={handleEmailChange}
                value={emailAddress.value}
                invalidText="Please type an correct email"
              />
              <div className="col-xl-4 col-sm-12">
                <div className="container">
                  <InputRadioElement
                    name="gender"
                    title="Gender"
                    value={["Male", "Female"]}
                    selected={gender.selected}
                    invalidText="Please select gender"
                    hasError={gender.hasError}
                    handleChange={handleGenderChange}
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
                handleChange={handleNameChange}
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
          </div>
          <div style={{ textAlign: "end" }}>
            <button className="btn btn-dark m-2" onClick={handleClose}>
              Cancel
            </button>

            <button className="btn btn-success m-2" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EmployeeForm;
