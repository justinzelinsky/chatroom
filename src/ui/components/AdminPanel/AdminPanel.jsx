import './style.scss';

import classnames from 'classnames';
import { bool, object } from 'prop-types';
import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';

import mapDispatchToProps from 'state/mapDispatchToProps';

const AdminPanel = ({ actions, darkMode }) => {
  const clearChatHistory = () => actions.clearChatHistory();
  const adminClassname = classnames('admin-panel', { 'dark-mode': darkMode });
  return (
    <Jumbotron styleName={adminClassname}>
      <h1>Admin Panel</h1>
      <hr />
      <h2>Chat History</h2>
      <Button onClick={clearChatHistory}>Clear Chat History</Button>
    </Jumbotron>
  );
};

AdminPanel.propTypes = {
  actions: object.isRequired,
  darkMode: bool.isRequired
};

const mapStateToProps = state => ({
  darkMode: state.darkMode
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
