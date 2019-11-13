import './style.scss';

import classnames from 'classnames';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { bool, func } from 'prop-types';

const AboutModal = ({ darkMode, show, handleClose }) => (
  <Modal
    styleName={classnames('about-modal', { 'dark-mode': darkMode })}
    show={show}
    onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>About React-Redux Chatroom</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      This is a basic chatroom written using React, Redux, and Socket.IO.
    </Modal.Body>
  </Modal>
);

AboutModal.propTypes = {
  darkMode: bool.isRequired,
  show: bool.isRequired,
  handleClose: func.isRequired
};

export default AboutModal;
