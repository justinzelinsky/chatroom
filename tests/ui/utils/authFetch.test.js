import { get, post, setAuthToken } from 'ui/utils/authFetch';
import fetchMock from 'fetch-mock';

describe('get request', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  it('should have successfully execute a get request', async () => {
    const expectedResponse = { greeting: 'Hello, World' };
    fetchMock.get('/greeting', expectedResponse);

    const response = await get('/greeting');
    expect(response).toEqual(expectedResponse);
    expect(fetchMock.calls()).toHaveLength(1);
  });

  it('should have no authorization headers by default', async () => {
    const expectedResponse = { greeting: 'Hello, World' };
    fetchMock.get('/greeting', expectedResponse);

    const response = await get('/greeting');
    expect(response).toEqual(expectedResponse);
    const options = fetchMock.lastOptions();
    const expectedHeaders = {
      'Content-Type': 'application/json'
    };
    expect(options.headers).toEqual(expectedHeaders);
  });

  it('should have authorization headers once added', async () => {
    setAuthToken('token');
    const expectedResponse = { greeting: 'Hello, World' };
    fetchMock.get('/greeting', expectedResponse);

    const response = await get('/greeting');
    expect(response).toEqual(expectedResponse);
    const options = fetchMock.lastOptions();
    const expectedHeaders = {
      Authorization: 'token',
      'Content-Type': 'application/json'
    };
    expect(options.headers).toEqual(expectedHeaders);
  });

  it('should not have authorization headers once removed', async () => {
    setAuthToken('token');
    const expectedResponse = { greeting: 'Hello, World' };
    fetchMock.get('/greeting', expectedResponse);

    const response = await get('/greeting');
    expect(response).toEqual(expectedResponse);
    const options = fetchMock.lastOptions();
    const expectedHeaders = {
      Authorization: 'token',
      'Content-Type': 'application/json'
    };
    expect(options.headers).toEqual(expectedHeaders);

    setAuthToken('');

    await get('/greeting');
    const options2 = fetchMock.lastOptions();
    const expectedHeaders2 = {
      'Content-Type': 'application/json'
    };
    expect(options2.headers).toEqual(expectedHeaders2);
  });

  it('should reject when api call fails', async () => {
    fetchMock.get('/badendpoint', {
      statusText: 'Bad endpoint',
      status: 500
    });
    try {
      await get('/badendpoint');
    } catch (err) {
      expect(err).toEqual({ error: 'Bad endpoint' });
    }
  });
});

describe('post request', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  it('should have successfully execute a post request', async () => {
    fetchMock.post('/updateUser', { status: 200, body: { status: 'ok' } });

    await post('/updateUser');
    expect(fetchMock.calls()).toHaveLength(1);
  });

  it('should reject when api call fails', async () => {
    fetchMock.post('/badendpoint', {
      statusText: 'Bad endpoint',
      status: 500
    });
    try {
      await post('/badendpoint');
    } catch (err) {
      expect(err).toEqual({ error: 'Bad endpoint' });
    }
  });
});
