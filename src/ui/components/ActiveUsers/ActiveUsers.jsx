import './style.scss';

import { array } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getActiveUserList } from 'state/selectors';

const ActiveUsers = ({ activeUserList }) => (
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

ActiveUsers.propTypes = {
  activeUserList: array.isRequired
};

const mapStateToProps = state => ({
  activeUserList: getActiveUserList(state)
});

export default connect(mapStateToProps)(ActiveUsers);
