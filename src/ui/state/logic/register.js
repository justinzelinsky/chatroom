import { createLogic } from 'redux-logic';

import { hasErrors, REGISTER } from 'state/actions';

const registerLogic = createLogic({
  type: REGISTER,
  process({ action, post, history }, dispatch, done) {
    const body = {
      ...action.payload
    };
    post('/api/users/register', body)
      .then(() => history.push('/login'))
      .catch(err => dispatch(hasErrors(err.response.data)))
      .finally(() => done());
  }
});

export default registerLogic;
