import './style.scss';

import { string } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

const NotificationBar = ({ notification }) =>
  notification && (
    <Alert variant="primary" styleName="notification-bar">
      {notification}
    </Alert>
  );

NotificationBar.propTypes = {
  notification: string
};

const mapStateToProps = state => ({
  notification: state.notification
});

export default connect(mapStateToProps)(NotificationBar);
