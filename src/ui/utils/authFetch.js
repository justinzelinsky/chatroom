const headers = {
  'Content-Type': 'application/json'
};

export const get = async url => {
  return await fetch(url, {
    method: 'GET',
    headers
  }).then(async resp => {
    if (!resp.ok) {
      const errorBody = await resp.json();
      return Promise.reject(errorBody);
    }
    return Promise.resolve(resp);
  });
};

export const post = async (url, body) => {
  return await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }).then(async resp => {
    if (!resp.ok) {
      const errorBody = await resp.json();
      return Promise.reject(errorBody);
    }
    return Promise.resolve(resp);
  });
};

export const setAuthToken = token => {
  if (token) {
    headers['Authorization'] = token;
  } else {
    delete headers['Authorization'];
  }
};
