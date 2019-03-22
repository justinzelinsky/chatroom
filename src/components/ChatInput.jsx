import './ChatInput.scss';

import {
  object,
  string
} from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { emitNewChat } from './socket';
import mapDispatchToProps from 'state/mapDispatchToProps';

const ChatInput = ({ actions, username }) => {
  const [ message, setMessage ] = useState('');

  const onChange = event => {
    setMessage(event.target.value);
  };

  const onKeyPress = event => {
    if (event.key === 'Enter' && message) {
      const chat = { username, message };
      actions.addChat(chat);
      emitNewChat(chat);
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
  actions: object.isRequired,
  username: string.isRequired
};

const mapStateToProps = state => ({
  username: state.username
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
