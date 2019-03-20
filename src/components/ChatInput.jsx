import './ChatInput.scss';

import {
  func,
  string
} from 'prop-types';
import React, { useState } from 'react';

const ChatInput = ({ onSubmit, username }) => {
  const [ message, setMessage ] = useState('');

  const onChange = event => {
    setMessage(event.target.value);
  };

  const onKeyPress = event => {
    if (event.key === 'Enter' && message) {
      const chat = { username, message };
      onSubmit(chat);
      setMessage('');
    }
  };

  return (
    <div styleName="chat-input-container">
      {username}
      <input autoFocus={true}
             onChange={onChange} 
             onKeyPress={onKeyPress} 
             type="text"
             value={message} />
    </div>
  );
};

ChatInput.propTypes = {
  onSubmit: func.isRequired,
  username: string.isRequired
};

export default ChatInput;
