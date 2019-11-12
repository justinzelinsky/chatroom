import { createLogic } from 'redux-logic';

import { SET_CURRENT_USER } from 'state/actions';

const setCurrentUserLogic = createLogic({
  type: SET_CURRENT_USER,
  process({ action, emitAddedUser }, _, done) {
    const { currentUser } = action.payload;
    if (currentUser.name) {
      emitAddedUser(currentUser.name);
    }
    done();
  }
});

export default setCurrentUserLogic;
