import React, { Component } from "react";

export default class InputRadioElement extends Component {
  render() {
    return (
      <React.Fragment>
        <label
          className="text-center font-weight-bold"
          htmlFor={this.props.name}
        >
          {this.props.title}
        </label>
        <div className="form-check">
          <input
            className={
              "form-check-input" +
              (this.props.hasError === 1
                ? " is-invalid"
                : this.props.hasError === 0
                ? ""
                : " is-valid")
            }
            type="radio"
            name={this.props.name}
            value={this.props.value[0]}
            id={this.props.value[0]}
            onChange={this.props.handleChange}
          />
          <label className="form-check-label" htmlFor={this.props.value[0]}>
            {this.props.value[0]}
          </label>
        </div>
        <div className="form-check">
          <input
            className={
              "form-check-input" +
              (this.props.hasError === 1
                ? " is-invalid"
                : this.props.hasError === 0
                ? ""
                : " is-valid")
            }
            type="radio"
            name={this.props.name}
            value={this.props.value[1]}
            id={this.props.value[1]}
            onChange={this.props.handleChange}
          />
          <label className="form-check-label" htmlFor={this.props.value[1]}>
            {this.props.value[1]}
          </label>
          <div className="invalid-feedback">{this.props.invalidText}</div>
        </div>
      </React.Fragment>
    );
  }
}
