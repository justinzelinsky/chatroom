import { createLogic } from 'redux-logic';

import { USER_STARTS_TYPING } from 'state/actions';

const userStartsTypingLogic = createLogic({
  type: USER_STARTS_TYPING,
  process({ getState, emitStartTyping }, _, done) {
    const { currentUser } = getState();
    emitStartTyping(currentUser);
    done();
  }
});

export default userStartsTypingLogic;
