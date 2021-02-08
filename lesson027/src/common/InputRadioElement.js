import React from "react";

function InputRadioElement(props) {
  return (
    <React.Fragment>
      <label className="text-center font-weight-bold" htmlFor={props.name}>
        {props.title}
      </label>
      <div className="form-check">
        <input
          className={
            "form-check-input" +
            (props.hasError === 1
              ? " is-invalid"
              : props.hasError === 0
              ? ""
              : " is-valid")
          }
          type="radio"
          name={props.name}
          value={props.value[0]}
          id={props.value[0]}
          checked={props.selected === props.value[0] ? true : false}
          onChange={props.handleChange}
          disabled={props.handleChange ? false : true}
        />
        <label className="form-check-label" htmlFor={props.value[0]}>
          {props.value[0]}
        </label>
      </div>
      <div className="form-check">
        <input
          className={
            "form-check-input" +
            (props.hasError === 1
              ? " is-invalid"
              : props.hasError === 0
              ? ""
              : " is-valid")
          }
          type="radio"
          name={props.name}
          value={props.value[1]}
          id={props.value[1]}
          checked={props.selected === props.value[1] ? true : false}
          onChange={props.handleChange}
          disabled={props.handleChange ? false : true}
        />
        <label className="form-check-label" htmlFor={props.value[1]}>
          {props.value[1]}
        </label>
        <div className="invalid-feedback">{props.invalidText}</div>
      </div>
    </React.Fragment>
  );
}
export default InputRadioElement;
