import './style.scss';

import { shape, string } from 'prop-types';
import React from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

const NotificationBar = ({ notification }) =>
  notification && (
    <Alert styleName="notification-bar" variant={notification.variant}>
      {notification.message}
    </Alert>
  );

NotificationBar.propTypes = {
  notification: shape({
    message: string.isRequired,
    variant: string.isRequired
  })
};

const mapStateToProps = state => ({
  notification: state.notification
});

export default connect(mapStateToProps)(NotificationBar);
