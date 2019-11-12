import './style.scss';

import { object } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import mapDispatchToProps from 'state/mapDispatchToProps';

const LogoutButton = ({ actions }) => {
  const handleLogout = () => actions.logout();

  return (
    <a onClick={handleLogout} styleName="logout-link">
      (logout)
    </a>
  );
};

LogoutButton.propTypes = {
  actions: object.isRequired
};

export default React.memo(connect(null, mapDispatchToProps)(LogoutButton));
