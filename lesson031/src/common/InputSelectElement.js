import React from "react";

function InputSelectElement(props) {
  return (
    <React.Fragment>
      <label className="text-center font-weight-bold" htmlFor={props.name}>
        {props.text}
      </label>
      <select
        value={props.value}
        className={
          "form-control" +
          (props.hasError === 1
            ? " is-invalid"
            : props.hasError === 0
            ? ""
            : " is-valid")
        }
        name={props.name}
        onChange={props.handleChange}
      >
        {props.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{props.invalidText}</div>
    </React.Fragment>
  );
}
export default InputSelectElement;
