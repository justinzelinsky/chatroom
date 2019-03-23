import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import Chatroom from 'components/Chatroom/Chatroom';
import Login from 'components/Login/Login';
import ProtectedRoute from 'components/Routes/ProtectedRoute';
import Register from 'components/Login/Register';
import UnprotectedRoute from 'components/Routes/UnprotectedRoute';

const App = () => (
  <Switch>
      <UnprotectedRoute component={Register}
                        path="/register" />
      <UnprotectedRoute component={Login}
                        path="/login" />
      <ProtectedRoute component={Chatroom}
                      path="/chatroom" />
      <Redirect to="/login" />
  </Switch>
);

export default App;
