import { object } from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';

import AdminPanel from 'components/AdminPanel';
import Chatroom from 'components/Chatroom';
import Login from 'components/Login';
import Navigation from 'components/Navigation';
import NotificationBar from 'components/NotificationBar';
import ProtectedRoute from 'components/ProtectedRoute';
import Register from 'components/Register';
import UnprotectedRoute from 'components/UnprotectedRoute';
import mapDispatchToProps from 'state/mapDispatchToProps';

const App = ({ actions }) => {
  useEffect(() => {
    actions.pageLoad();
  }, []);
  return (
    <Fragment>
      <Navigation />
      <NotificationBar />
      <Switch>
        <ProtectedRoute component={Chatroom} path="/chatroom" />
        <ProtectedRoute component={AdminPanel} path="/admin" />
        <UnprotectedRoute component={Login} path="/login" />
        <UnprotectedRoute component={Register} path="/register" />
        <Redirect to="/login" />
      </Switch>
    </Fragment>
  );
};

App.propTypes = {
  actions: object.isRequired
};

export default connect(null, mapDispatchToProps)(App);
