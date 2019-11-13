import React, { Fragment } from 'react';
import { Redirect, Switch } from 'react-router-dom';

import Chatroom from 'components/Chatroom';
import Login from 'components/Login';
import Navigation from 'components/Navigation';
import ProtectedRoute from 'components/ProtectedRoute';
import Register from 'components/Register';
import UnprotectedRoute from 'components/UnprotectedRoute';

const App = () => (
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

export default App;
