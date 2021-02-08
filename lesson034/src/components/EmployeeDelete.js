import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faVirus } from "@fortawesome/free-solid-svg-icons";

import { Button } from "react-bootstrap";
import { Context } from "../common/context";
export default function EmployeeDelete() {
  const { deleteEmployee, handleClose } = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const callBack = async () => {
    await deleteEmployee();
    setLoading(true);
  };
  return (
    <div className="col-sm-12 col-lg-4 col-md-4  offset-lg-4 offset-md-4 mt-3">
      <div className="card">
        <div className="card-header"> Delete confirmation</div>
        <div className="card-body text-center">
          {loading ? (
            <div>
              <FontAwesomeIcon icon={faSpinner} spin size="6x" color="blue" />
              <br />
              <br />
              Deleting...
            </div>
          ) : (
            <React.Fragment>
              <FontAwesomeIcon icon={faVirus} size="6x" color="red" />

              <br />
              <br />

              <p>{`Are you really want to delete this employee?`}</p>
            </React.Fragment>
          )}
        </div>

        <div
          className="card-footer"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={callBack} disabled={loading}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
