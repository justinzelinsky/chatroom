import './ChatroomEntry.scss';

import React, { useState } from 'react';

import Chatroom from 'components/Chatroom';
import UsernameInput from 'components/UsernameInput';

const ChatroomEntry = () => {
  const [username, setUsername] = useState('');
  const [usernameSelected, setUsernameSelected] = useState(false);

  const onChange = event => {
    setUsername(event.target.value);
  };

  const onSubmit = () => {
    setUsernameSelected(true);
  };
  
  return (
    <div styleName="container">
      { usernameSelected && <Chatroom username={username}/>}
      {! usernameSelected && <UsernameInput onChange={onChange}
                                            onSubmit={onSubmit} />}
    </div>
  );
};

export default ChatroomEntry;
