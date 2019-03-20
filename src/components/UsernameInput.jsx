import './UsernameInput.scss';

import { func } from 'prop-types';
import React from 'react';

const UsernameInput = ({ onChange, onSubmit }) => {
  const onKeyPress = event => {
    if (event.key === 'Enter') {
      onSubmit();
    }
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
  onChange: func.isRequired,
  onSubmit: func.isRequired
};

export default UsernameInput;
