import { elementType } from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { getIsAuthenticated } from 'state/selectors';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
ProtectedRoute.propTypes = {
  component: elementType.isRequired
};

export default ProtectedRoute;
