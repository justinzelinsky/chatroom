import { createLogic } from 'redux-logic';

import { ADD_CHAT } from 'state/actions';

const addChatLogic = createLogic({
  type: ADD_CHAT,
  process({ action, emitNewChat }, _, done) {
    if (action.payload.isLocalMessage) {
      emitNewChat({ ...action.payload });
    }
    done();
  }
});

export default addChatLogic;
