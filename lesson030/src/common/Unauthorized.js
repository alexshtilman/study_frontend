import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
function Unauthorized() {
  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <br />
      <FontAwesomeIcon icon={faKey} size="6x" color="red" />
      <br />
      <br />
      Authorization requested!
    </div>
  );
}
export default Unauthorized;
