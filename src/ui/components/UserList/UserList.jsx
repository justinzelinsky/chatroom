import './style.scss';

import classnames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';

import { getUserList } from 'state/selectors';

const UserList = () => {
  const userList = useSelector(getUserList);
  return (
    <div styleName="user-list-container">
      <h3>Users:</h3>
      <div styleName="user-list">
        {userList.map(({ isActive, isSelf, name }, idx) => {
          const statusStyle = classnames('status', { 'is-active': isActive });
          return (
            <div key={idx} styleName="user">
              <span styleName={statusStyle}></span>
              {name} {isSelf && '(self)'}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
