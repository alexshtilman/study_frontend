import React, { Component } from "react";

export default class InputTextElement extends Component {
  render() {
    return (
      <div
        className={
          this.props.css ? this.props.css : "form-group col-xl-4 col-sm-12"
        }
      >
        <label
          className="text-center font-weight-bold"
          htmlFor={this.props.name}
        >
          {this.props.title}
        </label>
        <input
          className={
            "form-control" +
            (this.props.hasError === 1
              ? " is-invalid"
              : this.props.hasError === 0
              ? ""
              : " is-valid")
          }
          id={this.props.name}
          type="text"
          name={this.props.name}
          placeholder={this.props.title}
          onChange={this.props.handleChange}
          value={this.props.value}
        />
        <div className="invalid-feedback">
          {this.props.exists || this.props.invalidText}
        </div>
      </div>
    );
  }
}
