import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVirus } from "@fortawesome/free-solid-svg-icons";

function MyModal(props) {
  return (
    <Modal
      size={props.action === "add" ? "lg" : ""}
      show={props.open}
      centered
      onHide={props.handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.action === "add" ? "Add employee " : "Delete confirmation"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ textAlign: "center" }}>
        <div>
          <FontAwesomeIcon icon={faVirus} size="6x" color="red" />
          <br />
          <br />
          <p>Are you really want to delete this person?</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={props.callBack}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyModal;
