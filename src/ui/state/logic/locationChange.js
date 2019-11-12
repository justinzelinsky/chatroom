import { LOCATION_CHANGE } from 'connected-react-router';
import { createLogic } from 'redux-logic';

import { logout } from 'state/actions';

let firstTime = true;

const locationChangeLogic = createLogic({
  type: LOCATION_CHANGE,
  process(_, dispatch, done) {
    if (firstTime) {
      firstTime = false;
      if (localStorage.jwtToken) {
        dispatch(logout());
      }
    }
    done();
  }
});

export default locationChangeLogic;
