import {
  func,
  bool
} from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest}
         render={props =>
            isAuthenticated === true ? (
              <Component {...props} />
            ) : (
              <Redirect to="/login" />
            )
         }
  />
);

ProtectedRoute.propTypes = {
  component: func.isRequired,
  isAuthenticated: bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(ProtectedRoute);