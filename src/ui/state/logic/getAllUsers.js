import { createLogic } from 'redux-logic';

import { REQUEST_ALL_USERS, receivedAllUsers } from 'state/actions';

const getAllUsersLogic = createLogic({
  type: REQUEST_ALL_USERS,
  process({ get }, dispatch, done) {
    get('/api/users').then(users => {
      dispatch(receivedAllUsers(users));
      done();
    });
  }
});

export default getAllUsersLogic;
