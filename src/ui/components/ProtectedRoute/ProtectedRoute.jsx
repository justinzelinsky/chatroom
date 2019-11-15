import { bool, elementType } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { getIsAuthenticated } from 'state/selectors';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

ProtectedRoute.propTypes = {
  component: elementType.isRequired,
  isAuthenticated: bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state)
});

export default connect(mapStateToProps)(ProtectedRoute);
