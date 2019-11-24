import { createLogic } from 'redux-logic';

import { USER_STOPS_TYPING } from 'state/actions';

const userStopsTypingLogic = createLogic({
  type: USER_STOPS_TYPING,
  process({ getState, emitStopTyping }, _, done) {
    const { currentUser } = getState();
    emitStopTyping(currentUser);
    done();
  }
});

export default userStopsTypingLogic;
