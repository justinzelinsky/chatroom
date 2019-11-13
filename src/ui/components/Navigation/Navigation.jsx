import { object, bool } from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';

import AboutModal from 'components/AboutModal';
import mapDispatchToProps from 'state/mapDispatchToProps';

const Navigation = ({ actions, isAuthenticated }) => {
  const [showModal, setShowModal] = useState(false);
  const [expandMenu, setExpandMenu] = useState(false);

  const handleLogout = () => {
    actions.logout();
    setExpandMenu(false);
  };
  const showAboutModal = () => setShowModal(true);
  const hideAboutModal = () => {
    setShowModal(false);
    setExpandMenu(false);
  };
  const handleMenuToggle = () => setExpandMenu(!expandMenu);

  return (
    <Fragment>
      <Navbar
        bg="light"
        defaultExpanded={false}
        expand="lg"
        expanded={expandMenu}
        onToggle={handleMenuToggle}
        stick={'top'}>
        <Navbar.Brand>React-Redux Chatroom</Navbar.Brand>
        <Navbar.Toggle aria-controls="chatroom-navbar-nav" />
        <Navbar.Collapse id="chatroom-navbar-nav">
          <Nav>
            <Nav.Link onClick={showAboutModal}>About</Nav.Link>
            {isAuthenticated && (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AboutModal show={showModal} handleClose={hideAboutModal} />
    </Fragment>
  );
};

Navigation.propTypes = {
  actions: object.isRequired,
  isAuthenticated: bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
