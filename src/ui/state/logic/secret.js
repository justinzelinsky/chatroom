import { createLogic } from 'redux-logic';

import { SECRET } from 'state/actions';

const secretLogic = createLogic({
  type: SECRET,
  process({ get }, _, done) {
    get('/secret')
      .then(res => console.log(res.data)) // eslint-disable-line
      .catch(error => console.log(error.data)) // eslint-disable-line
      .finally(() => done());
  }
});

export default secretLogic;
