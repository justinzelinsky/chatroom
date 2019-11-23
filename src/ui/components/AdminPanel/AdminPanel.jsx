import './style.scss';

import classnames from 'classnames';
import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import actions from 'state/actions';

const AdminPanel = () => {
  const darkMode = useSelector(state => state.darkMode);
  const dispatch = useDispatch();

  const clearChatHistory = () => dispatch(actions.clearChatHistory());
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

export default AdminPanel;
