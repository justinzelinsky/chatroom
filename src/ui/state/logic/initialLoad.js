import jwt_decode from 'jwt-decode';
import { createLogic } from 'redux-logic';

import { PAGE_LOAD, requestMessages, setCurrentUser } from 'state/actions';

const initialLoadLogic = createLogic({
  type: PAGE_LOAD,
  process({ setAuthToken }, dispatch, done) {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      try {
        const user = jwt_decode(jwtToken);

        setAuthToken(jwtToken);

        dispatch(setCurrentUser(user));
        dispatch(requestMessages());
      } catch {
        console.log('Invalid token');
      }
    }
    done();
  }
});

export default initialLoadLogic;
