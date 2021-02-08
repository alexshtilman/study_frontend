import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVirus } from "@fortawesome/free-solid-svg-icons";
export default class MyModal extends Component {
  render() {
    return (
      <Modal show={this.props.open} centered onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete confirmation</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ textAlign: "center" }}>
          <FontAwesomeIcon icon={faVirus} size="6x" color="red" />
          <br />
          <br />
          <p>Are you really want to delete this person?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.props.callBack}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
