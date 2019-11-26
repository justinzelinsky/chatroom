import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';

import LoadingSpinner from 'components/LoadingSpinner';
import NavigationBar from 'components/NavigationBar';
import NotificationBar from 'components/NotificationBar';
import { ProtectedRoute, UnprotectedRoute } from 'components/Routes';
import actions from 'state/actions';

const AdminPanel = lazy(() => import('components/AdminPanel'));
const Chatroom = lazy(() => import('components/Chatroom'));
const Login = lazy(() => import('components/Login'));
const Profile = lazy(() => import('components/Profile'));
const Register = lazy(() => import('components/Register'));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.pageLoad());
  }, []);
  return (
    <Fragment>
      <NavigationBar />
      <NotificationBar />
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          <ProtectedRoute component={Chatroom} path="/chatroom" />
          <ProtectedRoute component={AdminPanel} path="/admin" />
          <ProtectedRoute component={Profile} path="/profile" />
          <UnprotectedRoute component={Login} path="/login" />
          <UnprotectedRoute component={Register} path="/register" />
          <Redirect to="/login" />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

export default App;
