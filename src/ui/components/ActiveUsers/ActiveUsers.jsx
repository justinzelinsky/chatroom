import './style.scss';

import { array } from 'prop-types';
import React from 'react';

const ActiveUsers = ({ activeUsers }) => (
  <div styleName="active-users">
    <div styleName="header">Users in the chat:</div>
    {activeUsers.map((user, idx) => (
      <div styleName="user-in-chat" key={idx}>
        {user}
      </div>
    ))}
  </div>
);

ActiveUsers.propTypes = {
  activeUsers: array.isRequired
};

export default ActiveUsers;
