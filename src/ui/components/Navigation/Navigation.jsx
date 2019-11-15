import { object, bool } from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AboutModal from 'components/AboutModal';
import ThemeToggle from 'components/ThemeToggle';
import mapDispatchToProps from 'state/mapDispatchToProps';
import { getIsAdmin, getIsAuthenticated } from 'state/selectors';

const Navigation = ({
  actions,
  darkMode,
  history,
  isAdmin,
  isAuthenticated
}) => {
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
  const goToChatroom = () => {
    history.push('/chatroom');
    setExpandMenu(false);
  };
  const goToAdmin = () => {
    history.push('/admin');
    setExpandMenu(false);
  };

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
              <Nav.Link onClick={goToChatroom}>Chatroom</Nav.Link>
            )}
            {isAdmin && <Nav.Link onClick={goToAdmin}>Admin</Nav.Link>}
            {isAuthenticated && (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
          </Nav>
          <ThemeToggle />
        </Navbar.Collapse>
      </Navbar>
      <AboutModal
        darkMode={darkMode}
        handleClose={hideAboutModal}
        show={showModal}
      />
    </Fragment>
  );
};

Navigation.propTypes = {
  actions: object.isRequired,
  darkMode: bool.isRequired,
  history: object.isRequired,
  isAdmin: bool.isRequired,
  isAuthenticated: bool.isRequired
};

const mapStateToProps = state => ({
  darkMode: state.darkMode,
  isAdmin: getIsAdmin(state),
  isAuthenticated: getIsAuthenticated(state)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Navigation)
);
