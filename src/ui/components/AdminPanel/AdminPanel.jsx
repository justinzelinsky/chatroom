import './style.scss';

import { object } from 'prop-types';
import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';

import mapDispatchToProps from 'state/mapDispatchToProps';

const AdminPanel = ({ actions }) => {
  const clearChatHistory = () => actions.clearChatHistory();
  return (
    <Jumbotron styleName="admin-panel">
      <h1>Admin Panel</h1>
      <hr />
      <h2>Chat History</h2>
      <Button onClick={clearChatHistory}>Clear Chat History</Button>
    </Jumbotron>
  );
};

AdminPanel.propTypes = {
  actions: object.isRequired
};

export default connect(null, mapDispatchToProps)(AdminPanel);
