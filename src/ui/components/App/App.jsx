import { object } from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';

import Chatroom from 'components/Chatroom';
import Login from 'components/Login';
import Navigation from 'components/Navigation';
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
      <Switch>
        <UnprotectedRoute component={Register} path="/register" />
        <UnprotectedRoute component={Login} path="/login" />
        <ProtectedRoute component={Chatroom} path="/chatroom" />
        <Redirect to="/login" />
      </Switch>
    </Fragment>
  );
};

App.propTypes = {
  actions: object.isRequired
};

export default connect(null, mapDispatchToProps)(App);
