import './style.scss';

import classnames from 'classnames';
import { bool, func } from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';

const AboutModal = ({ darkMode, show, handleClose }) => (
  <Modal
    centered={true}
    onHide={handleClose}
    show={show}
    styleName={classnames('about-modal', { 'dark-mode': darkMode })}>
    <Modal.Header closeButton={true}>
      <Modal.Title>About React-Redux Chatroom</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      This is a basic chatroom written using React, Redux, and Socket.IO.
    </Modal.Body>
  </Modal>
);

AboutModal.propTypes = {
  darkMode: bool.isRequired,
  handleClose: func.isRequired,
  show: bool.isRequired
};

export default AboutModal;
