import { get, post, setAuthToken } from 'ui/utils/authFetch';
import fetchMock from 'fetch-mock';

describe('get request', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  it('should have successfully execute a get request', async () => {
    const expectedResponseBody = { greeting: 'Hello, World' };
    fetchMock.get('/greeting', expectedResponseBody);

    const response = await get('/greeting');
    const responseBody = await response.json();
    expect(responseBody).toEqual(expectedResponseBody);
    expect(fetchMock.calls()).toHaveLength(1);
  });

  it('should have no authorization headers by default', async () => {
    const expectedResponseBody = { greeting: 'Hello, World' };
    fetchMock.get('/greeting', expectedResponseBody);

    const response = await get('/greeting');
    const responseBody = await response.json();
    expect(responseBody).toEqual(expectedResponseBody);
    const options = fetchMock.lastOptions();
    const expectedHeaders = {
      'Content-Type': 'application/json'
    };
    expect(options.headers).toEqual(expectedHeaders);
  });

  it('should have authorization headers once added', async () => {
    setAuthToken('token');
    const expectedResponseBody = { greeting: 'Hello, World' };
    fetchMock.get('/greeting', expectedResponseBody);

    const response = await get('/greeting');
    const responseBody = await response.json();
    expect(responseBody).toEqual(expectedResponseBody);
    const options = fetchMock.lastOptions();
    const expectedHeaders = {
      Authorization: 'token',
      'Content-Type': 'application/json'
    };
    expect(options.headers).toEqual(expectedHeaders);
  });

  it('should not have authorization headers once removed', async () => {
    setAuthToken('token');
    const expectedResponseBody = { greeting: 'Hello, World' };
    fetchMock.get('/greeting', expectedResponseBody);

    const response = await get('/greeting');
    const responseBody = await response.json();
    expect(responseBody).toEqual(expectedResponseBody);
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
      body: {
        error: 'Bad endpoint'
      },
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

    const response = await post('/updateUser');
    const responseBody = await response.json();
    expect(responseBody).toEqual({ status: 'ok' });
    expect(fetchMock.calls()).toHaveLength(1);
  });

  it('should reject when api call fails', async () => {
    fetchMock.post('/badendpoint', {
      body: {
        error: 'Bad endpoint'
      },
      status: 500
    });
    try {
      await post('/badendpoint');
    } catch (err) {
      expect(err).toEqual({ error: 'Bad endpoint' });
    }
  });
});
