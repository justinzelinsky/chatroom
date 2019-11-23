import './style.scss';

import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const NotificationBar = () => {
  const notification = useSelector(state => state.notification);
  if (notification) {
    return (
      <Alert styleName="notification-bar" variant={notification.variant}>
        {notification.message}
      </Alert>
    );
  }
  return null;
};

export default NotificationBar;
