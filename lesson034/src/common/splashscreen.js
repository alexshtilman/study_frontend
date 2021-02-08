import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Splashscreen() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Loading in progress...</h2>
      </div>
      <div className="card-body" style={{ textAlign: "center" }}>
        <FontAwesomeIcon icon={faSpinner} spin size="4x" />
        <br />
        <br />
        <h1> loading...</h1>
      </div>
    </div>
  );
}
