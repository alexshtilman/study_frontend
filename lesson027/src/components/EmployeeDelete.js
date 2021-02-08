import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVirus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { Context } from "../common/context";
export default function EmployeeDelete() {
  const { deleteEmployee, handleClose, selectedEmployee } = React.useContext(
    Context
  );
  return (
    <div className="col-sm-12 col-lg-4 col-md-4  offset-lg-4 offset-md-4 mt-3">
      <div className="card">
        <div className="card-header"> Delete confirmation</div>
        <div className="card-body text-center">
          <FontAwesomeIcon icon={faVirus} size="6x" color="red" />
          <br />
          <br />
          <p>{`Are you really want to delete person with id ${selectedEmployee}`}</p>
        </div>
        <div
          className="card-footer"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteEmployee}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
