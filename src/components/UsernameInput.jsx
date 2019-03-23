import './UsernameInput.scss';

import { 
  object,
  string
} from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import mapDispatchToProps from 'state/mapDispatchToProps';

const UsernameInput = ({ actions, username }) => {
  const onKeyPress = event => {
    if (event.key === 'Enter' && username) {
      actions.push('chatroom');
    }
  };

  const onChange = event => {
    actions.updateUsername(event.target.value);
  };

  return (
    <div styleName="username-input-wrapper">
      <input autoFocus={true}
             styleName="username-input"
             onKeyPress={onKeyPress}
             onChange={onChange} 
             placeholder="Please enter your username"
             type="text" />
    </div>
  );
};

UsernameInput.propTypes = {
  actions: object.isRequired,
  username: string.isRequired
};

const mapStateToProps = state => ({
  username: state.username,
});

export default connect(mapStateToProps, mapDispatchToProps)(UsernameInput);
