import './style.scss';

import React from 'react';
import { useSelector } from 'react-redux';

import { getActiveUserList } from 'state/selectors';

const ActiveUsers = () => {
  const activeUserList = useSelector(getActiveUserList);
  return (
    <div styleName="active-users">
      <h3>Active Users:</h3>
      <ol styleName="user-list">
        {activeUserList.map(({ isSelf, name }, idx) => (
          <li key={idx}>
            {name} {isSelf && '(self)'}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ActiveUsers;
