import './Chatroom.scss';

import {
  array,
  object,
  string
} from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { 
  subscribeToChatEvents,
  subscribeToUserJoin,
  subscribeToUserLeft,
  emitAddedUser
} from './socket';
import ChatInput from 'components/ChatInput';
import ChatMessage from 'components/ChatMessage';
import mapDispatchToProps from 'state/mapDispatchToProps';
import { getFormattedActiveUsers } from 'state/selectors';

const Chatroom = ({ activeUsers, actions, chats, username }) => {
  useEffect(() => {
    emitAddedUser(username);
    subscribeToChatEvents(chat => actions.addChat(chat));
    subscribeToUserJoin(usernames => actions.userJoined(usernames));
    subscribeToUserLeft(usernames => actions.userLeft(usernames));
  }, [username]);

  return (
    <div styleName="chatroom">
      <div styleName="chats">
        { chats.length === 0 && (
          <div styleName="no-chats">No Chats!</div>
        )}
        { chats.map((chat, idx) => <ChatMessage chat={chat}
                                                key={idx} />)}
        <div styleName="chat-footer">
          <ChatInput />
          <div>Users in the chat: {activeUsers}</div>
        </div>
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
