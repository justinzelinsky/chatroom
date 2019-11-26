import React, { Fragment, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import AboutModal from 'components/AboutModal';
import ThemeToggle from 'components/ThemeToggle';
import actions from 'state/actions';
import { getIsAdmin, getIsAuthenticated } from 'state/selectors';

const NavigationBar = () => {
  const { darkMode, isAdmin, isAuthenticated } = useSelector(state => ({
    darkMode: state.darkMode,
    isAdmin: getIsAdmin(state),
    isAuthenticated: getIsAuthenticated(state)
  }));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [expandMenu, setExpandMenu] = useState(false);

  const handleLogout = () => {
    dispatch(actions.logout());
    setExpandMenu(false);
  };
  const showAboutModal = () => setShowModal(true);
  const hideAboutModal = () => {
    setShowModal(false);
    setExpandMenu(false);
  };
  const handleMenuToggle = () => setExpandMenu(!expandMenu);
  const goTo = path => () => {
    history.push(path);
    setExpandMenu(false);
  };

  const isActive = path => location.pathname.indexOf(path) !== -1;
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
              <Nav.Link
                active={isActive('chatroom')}
                onClick={goTo('/chatroom')}>
                Chatroom
              </Nav.Link>
            )}
            {isAdmin && (
              <Nav.Link active={isActive('admin')} onClick={goTo('/admin')}>
                Admin
              </Nav.Link>
            )}
            {isAuthenticated && (
              <Fragment>
                <Nav.Link
                  active={isActive('profile')}
                  onClick={goTo('/profile')}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Fragment>
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

export default NavigationBar;
