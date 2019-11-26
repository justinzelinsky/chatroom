import jwt_decode from 'jwt-decode';
import Push from 'push.js';
import { createLogic } from 'redux-logic';

import {
  PAGE_LOAD,
  requestAllUsers,
  requestMessages,
  setCurrentUser
} from 'state/actions';

const initialLoadLogic = createLogic({
  type: PAGE_LOAD,
  process({ setAuthToken }, dispatch, done) {
    Push.Permission.request();

    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      try {
        const user = jwt_decode(jwtToken);

        setAuthToken(jwtToken);

        dispatch(setCurrentUser(user));
        dispatch(requestMessages());
        dispatch(requestAllUsers());
      } catch {
        console.log('Invalid token');
      }
    }
    done();
  }
});

export default initialLoadLogic;
