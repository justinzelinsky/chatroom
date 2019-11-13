import React from 'react';
import { Modal } from 'react-bootstrap';
import { bool, func } from 'prop-types';

const AboutModal = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>About React-Redux Chatroom</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      This is a basic chatroom written using React, Redux, and Socket.IO.
    </Modal.Body>
  </Modal>
);

AboutModal.propTypes = {
  show: bool.isRequired,
  handleClose: func.isRequired
};

export default AboutModal;
