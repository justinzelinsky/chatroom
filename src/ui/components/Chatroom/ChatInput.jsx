import './ChatInput.scss';

import moment from 'moment';
import {
  object,
  string
} from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import mapDispatchToProps from 'state/mapDispatchToProps';
import { getCurrentUserName } from 'state/selectors';
import { emitNewChat } from 'utils/Socket';

const ChatInput = ({ actions, username }) => {
  const [ message, setMessage ] = useState('');

  const onChange = event => {
    setMessage(event.target.value);
  };

  const onKeyPress = event => {
    if (event.key === 'Enter' && message) {
      const ts = moment().format('HH:mm');
      actions.addChat(message, ts, username);
      emitNewChat({ message, ts, username });
      setMessage('');
    }
  };

  return (
    <div styleName="chat-input-container">
      <div styleName="chat-input-username">
        <span styleName="username-display">
          {username}
        </span>
      </div>
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
  username: getCurrentUserName(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);
