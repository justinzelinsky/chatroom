import { object } from 'prop-types';
import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';

import LoadingSpinner from 'components/LoadingSpinner';
import NavigationBar from 'components/NavigationBar';
import NotificationBar from 'components/NotificationBar';
import ProtectedRoute from 'components/ProtectedRoute';
import UnprotectedRoute from 'components/UnprotectedRoute';
import mapDispatchToProps from 'state/mapDispatchToProps';

const AdminPanel = lazy(() => import('components/AdminPanel'));
const Chatroom = lazy(() => import('components/Chatroom'));
const Login = lazy(() => import('components/Login'));
const Register = lazy(() => import('components/Register'));

const App = ({ actions }) => {
  useEffect(() => {
    actions.pageLoad();
  }, []);
  return (
    <Fragment>
      <NavigationBar />
      <NotificationBar />
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          <ProtectedRoute component={Chatroom} path="/chatroom" />
          <ProtectedRoute component={AdminPanel} path="/admin" />
          <UnprotectedRoute component={Login} path="/login" />
          <UnprotectedRoute component={Register} path="/register" />
          <Redirect to="/login" />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

App.propTypes = {
  actions: object.isRequired
};

export default connect(null, mapDispatchToProps)(App);
