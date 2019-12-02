import { createLogic } from 'redux-logic';

import { REQUEST_MESSAGES, receivedMessages } from 'state/actions';

const getMessagesLogic = createLogic({
  type: REQUEST_MESSAGES,
  process({ get }, dispatch, done) {
    get('/api/messages').then(messages => {
      dispatch(receivedMessages(messages));
      done();
    });
  }
});

export default getMessagesLogic;
