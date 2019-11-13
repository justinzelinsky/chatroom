import { object, bool } from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';

import AboutModal from 'components/AboutModal';
import ThemeToggle from 'components/ThemeToggle';
import mapDispatchToProps from 'state/mapDispatchToProps';

const Navigation = ({ actions, darkMode, isAuthenticated }) => {
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

  const variant = darkMode ? 'dark' : 'light';

  return (
    <Fragment>
      <Navbar
        bg={variant}
        defaultExpanded={false}
        expand="lg"
        expanded={expandMenu}
        onToggle={handleMenuToggle}
        stick={'top'}
        variant={variant}>
        <Navbar.Brand>React-Redux Chatroom</Navbar.Brand>
        <Navbar.Toggle aria-controls="chatroom-navbar-nav" />
        <Navbar.Collapse id="chatroom-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={showAboutModal}>About</Nav.Link>
            {isAuthenticated && (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
          </Nav>
          <ThemeToggle />
        </Navbar.Collapse>
      </Navbar>
      <AboutModal
        darkMode={darkMode}
        show={showModal}
        handleClose={hideAboutModal}
      />
    </Fragment>
  );
};

Navigation.propTypes = {
  actions: object.isRequired,
  darkMode: bool.isRequired,
  isAuthenticated: bool.isRequired
};

const mapStateToProps = state => ({
  darkMode: state.darkMode,
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
