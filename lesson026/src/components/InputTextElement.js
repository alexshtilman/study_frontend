import React from "react";

function InputTextElement(props) {
  return (
    <div className={props.css ? props.css : "form-group col-xl-4 col-sm-12"}>
      <label className="text-center font-weight-bold" htmlFor={props.name}>
        {props.title}
      </label>
      <input
        className={
          "form-control" +
          (props.hasError === 1
            ? " is-invalid"
            : props.hasError === 0
            ? ""
            : " is-valid")
        }
        id={props.name}
        type="text"
        name={props.name}
        placeholder={props.title}
        onChange={props.handleChange}
        disabled={props.handleChange ? false : true}
        value={props.value}
      />
      <div className="invalid-feedback">
        {props.exists || props.invalidText}
      </div>
    </div>
  );
}
export default InputTextElement;
