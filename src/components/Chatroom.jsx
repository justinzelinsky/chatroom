import './Chatroom.scss';

import {
  array,
  object,
  string
} from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';


import ChatInput from 'components/ChatInput';
import ChatMessage from 'components/ChatMessage';
import { 
  subscribeToChatEvents,
  subscribeToUserEvents,
  emitAddedUser
} from 'components/Socket';
import mapDispatchToProps from 'state/mapDispatchToProps';
import { getFormattedActiveUsers } from 'state/selectors';

const Chatroom = ({ activeUsers, actions, chats, username }) => {
  useEffect(() => {
    emitAddedUser(username);
    subscribeToChatEvents(chat => actions.addChat(chat));
    subscribeToUserEvents(usernames => actions.updateActiveUsers(usernames));
  }, [username]);

  return (
    <div styleName="chatroom">
      <div styleName="chats">
        { chats.length === 0 && (
          <div styleName="no-chats">No Chats!</div>
        )}
        { chats.map((chat, idx) => <ChatMessage chat={chat}
                                                key={idx} />)}
      </div>
      <div styleName="chatroom-footer">
        <ChatInput />
        <div>Users in the chat: {activeUsers}</div>
      </div>
    </div>
  );
};

Chatroom.propTypes = {
  activeUsers: string.isRequired,
  actions: object.isRequired,
  chats: array.isRequired,
  username: string.isRequired
};

const mapStateToProps = state => ({
  activeUsers: getFormattedActiveUsers(state), 
  chats: state.chats,
  username: state.username
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);
