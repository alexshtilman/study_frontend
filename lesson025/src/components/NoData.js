import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
export default class NoData extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <FontAwesomeIcon icon={faQuestionCircle} size="6x" color="blue" />
        <br />
        <br />
        No data to display...
      </div>
    );
  }
}
