import axios from 'axios';

import setAuthToken from 'utils/setAuthToken';

describe('Test Auth Token', () => {
  it('should not set the auth header on an empty value', () => {
    const token = '';
    setAuthToken(token);
    expect(axios.defaults.headers.common['Authorization']).toEqual(undefined);
  });

  it('should set the auth header on a non-empty value', () => {
    const token = 'foobarbaz';
    setAuthToken(token);
    expect(axios.defaults.headers.common['Authorization']).toEqual(token);
  });
});
