import React, { Component } from "react";

export default class InputSelectElement extends Component {
  render() {
    return (
      <React.Fragment>
        <label
          className="text-center font-weight-bold"
          htmlFor={this.props.name}
        >
          {this.props.text}
        </label>
        <select
          className={
            "form-control" +
            (this.props.hasError === 1
              ? " is-invalid"
              : this.props.hasError === 0
              ? ""
              : " is-valid")
          }
          name={this.props.name}
          onChange={this.props.handleChange}
        >
          {this.props.options.map((opt) => (
            <option key={opt.text} value={opt.text}>
              {opt.text}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{this.props.invalidText}</div>
      </React.Fragment>
    );
  }
}
