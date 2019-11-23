import { createLogic } from 'redux-logic';

import { CLEAR_CHAT_HISTORY, chatHistoryCleared } from 'state/actions';
import { showNotification, hideNotification } from '../actions';

const clearChatHistoryLogic = createLogic({
  type: CLEAR_CHAT_HISTORY,
  process({ post }, dispatch, done) {
    post('/api/messages/clear').then(() => {
      dispatch(chatHistoryCleared());
      dispatch(
        showNotification({
          message: 'Chat history cleared!'
        })
      );
      setTimeout(() => {
        dispatch(hideNotification());
        done();
      }, 5000);
    });
  }
});

export default clearChatHistoryLogic;
